// import axios from "axios";
// import { getModel } from "../utils/model.js";

// import { uploadToS3 } from "../utils/uploadToS3.js";
// import { getDownloadUrl } from "../utils/getDownloadUrl.js";
// import { checkAgentLimit } from "../config/agentRateLimit.js";
// import { deductCredits } from "../utils/deductCredits.js";

// export const imageAgent = async (state) => {

//   try {

// await checkAgentLimit(
//     state.userId,
//     "image"
//   );
//  await deductCredits(

//         state.userId,

//         "image"

//     );

//     const llm =
//       getModel("image");

//     const promptResponse =
//       await llm.invoke(`

// You are an elite AI image prompt engineer.

// Convert the user request into a highly detailed image generation prompt.

// Requirements:

// - Cinematic lighting
// - Professional composition
// - Ultra realistic
// - High detail
// - Beautiful color palette
// - Sharp focus
// - 8K quality
// - Photorealistic
// - Depth of field
// - Professional photography
// - Stunning visuals

// Return only the image prompt.

// User Request:

// ${state.prompt}

// `);

//     const enhancedPrompt =
//       promptResponse.content.trim();

//     const imageUrl =
//       `https://image.pollinations.ai/prompt/${encodeURIComponent(
//         enhancedPrompt
//       )}`;

//     const imageResponse =
//       await axios.get(
//         imageUrl,
//         {
//           responseType:
//             "arraybuffer"
//         }
//       );

//     const imageBuffer =
//       Buffer.from(
//         imageResponse.data
//       );

//     const fileName =
//       `image-${Date.now()}.png`;

//     await uploadToS3(
//       imageBuffer,
//       fileName,
//       "image/png"
//     );

//     const downloadUrl =
//       await getDownloadUrl(
//         fileName,
//         24*60*60
//       );

//     return {

//       ...state,

//      response: `
// # 🖼️ Image Generated Successfully

// ![Generated Image](${downloadUrl})

// 📥 [Download Image](${downloadUrl})

// ⏳ Link expires in 10 minutes.
// `

//     };

//   } catch (error) {

//     console.log(
//       "Image Agent Error:",
//       error
//     );

//     return {

//       ...state,

//       response:
//         "❌ Failed to generate image."

//     };

//   }

// };

import axios from "axios";
import fs from "fs/promises";
import path from "path";

import { getModel } from "../utils/model.js";
import { checkAgentLimit } from "../config/agentRateLimit.js";
import { deductCredits } from "../utils/deductCredits.js";

export const imageAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "image");
    await deductCredits(state.userId, "image");

    const llm = getModel("image");

    const promptResponse = await llm.invoke(`
You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:
- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:
${state.prompt}
`);

    const enhancedPrompt = String(promptResponse.content).trim();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhancedPrompt,
    )}`;

    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 120000,
    });

    const imageBuffer = Buffer.from(imageResponse.data);

    // Save images inside the agent service locally
    const imageDirectory = path.resolve("generated-images");
    await fs.mkdir(imageDirectory, { recursive: true });

    const contentType = imageResponse.headers["content-type"] || "image/png";

    const extension = contentType.includes("webp")
      ? "webp"
      : contentType.includes("jpeg")
        ? "jpg"
        : contentType.includes("png")
          ? "png"
          : null;

    if (!extension || !contentType.startsWith("image/")) {
      throw new Error(
        `Image provider returned an unexpected content type: ${contentType}`,
      );
    }

    const fileName = `image-${Date.now()}.${extension}`;
    const filePath = path.join(imageDirectory, fileName);

    await fs.writeFile(filePath, imageBuffer);

    // Local URL served by the agent service
    const downloadUrl = `http://localhost:8003/generated-images/${fileName}`;

    return {
      ...state,
      response: `
# 🖼️ Image Generated Successfully

![Generated Image](${downloadUrl})

📥 [Download Image](${downloadUrl})
`,
    };
  } catch (error) {
    console.error(
      "Image Agent Error:",
      error.response?.data || error.message || error,
    );

    return {
      ...state,
      response: "❌ Failed to generate image. Please try again.",
    };
  }
};
