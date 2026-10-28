// import fs from "fs";
// import { PDFParse } from "pdf-parse";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { createVectorStore } from "../utils/vectorStore.js";
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// import { getModel } from "../utils/model.js";
// import { QdrantVectorStore } from "@langchain/qdrant";
// export const pdfRagAgent = async (state) => {
//   try {
//     const buffer = fs.readFileSync(state.file.path);

//     const pdf = new PDFParse({
//       data: buffer,
//     });

//     const result = await pdf.getText();

//     const text = result.text;

//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 1000,

//       chunkOverlap: 200,
//     });

//     const docs = await splitter.createDocuments([text]);

//     const collectionName = `pdf-${Date.now()}`;

//     const vectorStore = await createVectorStore(
//       collectionName,

//       docs,
//     );

//     const relevantDocs = await vectorStore.similaritySearch(
//       state.prompt,

//       5,
//     );
//     console.log(relevantDocs);
//     const context = relevantDocs

//       .map((doc) => doc.pageContent)

//       .join("\n\n");
//     const llm = getModel("pdf-rag");

//     const messages = [
//       new SystemMessage(`

// You are kesh.AI PDF Assistant.

// Rules:

// - Answer ONLY from the uploaded PDF.

// - Never make up information.

// - If the answer is not present in the PDF, reply:

// "I couldn't find this information in the uploaded PDF."

// - Use Markdown formatting.

// `),

//       new HumanMessage(`

// Context:

// ${context}

// Question:

// ${state.prompt}

// `),
//     ];

//     const response = await llm.invoke(messages);

//     return {
//       ...state,

//       docs,

//       response: response.content,
//     };
//   } finally {
//     try {
//       fs.unlinkSync(state.file.path);

//       await QdrantVectorStore.deleteCollection(collectionName);
//     } catch (err) {
//       console.log(err.message);
//     }
//   }
// };

import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createVectorStore } from "../utils/vectorStore.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../utils/model.js";
import { QdrantClient } from "@qdrant/js-client-rest";

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const pdfRagAgent = async (state) => {
  let collectionName;

  try {
    // 1. Read the uploaded PDF
    const buffer = fs.readFileSync(state.file.path);

    const pdf = new PDFParse({ data: buffer });
    const result = await pdf.getText();
    const text = result.text;

    console.log("PDF extracted text length:", text?.length);
    console.log("PDF extracted text preview:", text?.slice(0, 1500));

    if (!text?.trim()) {
      throw new Error("No readable text found in the uploaded PDF.");
    }

    // 2. Split the extracted PDF text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await splitter.createDocuments([text]);

    // 3. Create the vector store
    collectionName = `pdf-${Date.now()}`;

    const vectorStore = await createVectorStore(collectionName, docs);

    // 4. Retrieve relevant chunks for the user's question
    const relevantDocs = await vectorStore.similaritySearch(state.prompt, 5);

    console.log("Retrieved documents count:", relevantDocs.length);

    relevantDocs.forEach((doc, index) => {
      console.log(`Document ${index + 1}:`);
      console.log(doc.pageContent);
    });

    // 5. Use the full extracted text for this PDF.
    // This avoids missing company names when similarity search
    // does not rank the relevant chunks highly enough.
    const context = docs.map((doc) => doc.pageContent).join("\n\n");

    console.log("Final context sent to LLM:", context);

    // 6. Get the PDF question-answering model
    const llm = getModel("pdf-rag");

    // 7. Prepare instructions and user question
    const messages = [
      new SystemMessage(`
You are kesh.AI PDF Assistant and an expert document reviewer.

Answer the user's question using the provided PDF context.

Rules:
- Read the provided context before answering.
- Answer the actual question directly.
- Identify relevant information even when the question uses different wording.
- If the PDF contains company names and the user asks which companies
  need a particular job role or technology, list the relevant companies
  mentioned in the PDF.
- If the PDF does not explicitly state which companies are hiring,
  clearly explain that their hiring status cannot be confirmed.
- Never claim that a company is hiring without evidence in the PDF.
- If the PDF contains partially relevant information, provide it and
  explain what information is missing.
- Do not return the generic fallback when the PDF contains information
  that can partially answer the question.
- Only reply "I couldn't find this information in the uploaded PDF."
  when the context contains no useful information relevant to the question.
- For resume evaluation, consider education, technical skills, projects,
  experience, achievements, and presentation where supported by the PDF.
- Never invent facts, skills, experience, achievements, or qualifications.
- Explain conclusions using specific details from the PDF.
- Use clear, well-organized Markdown formatting.
`),
      new HumanMessage(`
PDF Context:
${context}

User Question:
${state.prompt}
`),
    ];

    // 8. Generate the answer

    const question = state.prompt.toLowerCase();

    const asksAboutHiring =
      /\b(need|needs|hiring|hire|recruiting|recruit|vacanc(?:y|ies)|job openings?)\b/i.test(
        question,
      ) &&
      /\b(mern|developer|developers|react|node\.?js|web developer)\b/i.test(
        question,
      );

    if (asksAboutHiring) {
      const companyLines = text
        .split(/\r?\n/)
        .filter((line) =>
          /^\s*\d+\s+.+\s+(Ahmedabad|Ahmedababd|Gandhinagar|Anand|Bangalore|Banglore|Hyderabad|Hydrabad|Pune|Mumbai|Rajkot|Surat|Vadodara|Valsad)\s*$/i.test(
            line.trim(),
          ),
        );

      if (companyLines.length > 0) {
        return {
          ...state,
          docs,
          response:
            "The PDF lists the following companies, but it does not specify which ones currently need MERN developers:\n\n" +
            companyLines
              .map(
                (line) =>
                  `- ${line
                    .trim()
                    .replace(/^\d+\s+/, "")
                    .replace(
                      /\s+(Ahmedabad|Ahmedababd|Gandhinagar|Anand|Bangalore|Banglore|Hyderabad|Hydrabad|Pune|Mumbai|Rajkot|Surat|Vadodara|Valsad)\s*$/i,
                      " — $1",
                    )}`,
              )
              .join("\n") +
            "\n\n**Note:** Please check current job openings to confirm which companies are hiring MERN developers.",
        };
      }
    }

    const response = await llm.invoke(messages);

    console.log("PDF RAG response:", response.content);

    return {
      ...state,
      docs,
      response: response.content,
    };
  } finally {
    // 9. Delete the temporary Qdrant collection
    try {
      if (collectionName) {
        await qdrantClient.deleteCollection(collectionName);
      }
    } catch (err) {
      console.error("Qdrant collection cleanup failed:", err.message);
    }

    // 10. Delete the temporary uploaded PDF
    try {
      if (state.file?.path && fs.existsSync(state.file.path)) {
        fs.unlinkSync(state.file.path);
      }
    } catch (err) {
      console.error("Temporary PDF cleanup failed:", err.message);
    }
  }
};
