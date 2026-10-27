// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { FiExternalLink, FiX } from "react-icons/fi";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { Copy, Check } from "lucide-react";

// function MessageBubble({ role, content ,images}) {
//   const isUser = role === "user";
//   const [lightboxSrc, setLightboxSrc] = useState(null);
// const [copiedCode, setCopiedCode] = useState("");
// const copyCode = async (code) => {
//   await navigator.clipboard.writeText(code);

//   setCopiedCode(code);

//   setTimeout(() => {
//     setCopiedCode("");
//   }, 2000);
// };

// const markdown = (content || "")
//   .replace(/```review/gi, "```")
//   .replace(/```text/gi, "```")
//   .replace(/```[a-zA-Z0-9_-]+\s+id="[^"]*"/g, "```");
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`w-fit max-w-[92vw] md:max-w-[72%]
//   px-4 py-2.5 rounded-2xl
//   break-words overflow-hidden
//   leading-relaxed
//         ${
//           isUser
//             ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
//             : " text-slate-200 rounded-tl-sm"
//         }`}
//       >
//         {images.length > 0 && (
//     <div className="flex flex-wrap gap-3 mt-4">
//         {images.map((img, i) => (
//             <img
//                 key={i}
//                 src={img}
//                 loading="lazy"
//                 onClick={() => setLightboxSrc(img)}
//                 onError={(e)=>e.currentTarget.remove()}
//                 className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
//             />
//         ))}
//     </div>
// )}<ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   components={{
//     h1: ({ children }) => (
//       <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
//     ),

//     h2: ({ children }) => (
//       <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>
//     ),

//     h3: ({ children }) => (
//       <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
//     ),

//     p: ({ children }) => (
//       <p className="mb-3 whitespace-pre-wrap break-words">
//         {children}
//       </p>
//     ),

//     ul: ({ children }) => (
//       <ul className="list-disc pl-5 space-y-1 my-2">
//         {children}
//       </ul>
//     ),

//     ol: ({ children }) => (
//       <ol className="list-decimal pl-5 space-y-1 my-2">
//         {children}
//       </ol>
//     ),

//     table: ({ children }) => (
//       <div className="overflow-x-auto my-4">
//         <table className="min-w-full border border-white/10">
//           {children}
//         </table>
//       </div>
//     ),

//     th: ({ children }) => (
//       <th className="border border-white/10 bg-white/5 px-3 py-2 text-left">
//         {children}
//       </th>
//     ),

//     td: ({ children }) => (
//       <td className="border border-white/10 px-3 py-2">
//         {children}
//       </td>
//     ),

//     a: ({ href, children }) => (
//       <a
//         href={href}
//         target="_blank"
//         rel="noreferrer"
//         className="text-indigo-400 underline inline-flex items-center gap-1"
//       >
//         {children}
//         <FiExternalLink size={11} />
//       </a>
//     ),

//     img: ({ src }) => {
//       if (!src) return null;

//       return (
//         <img
//           src={src}
//           loading="lazy"
//           onClick={() => setLightboxSrc(src)}
//           onError={(e) => e.currentTarget.remove()}
//           className="w-40 h-28 rounded-xl object-cover cursor-pointer"
//         />
//       );
//     },

//     code({ className, children }) {
//       console.log(children)
//       const value = String(children)
//   .replace(/^\s*```[^\n]*\n/, "")
//   .replace(/\n```\s*$/, "")
//   .trim();

//       if (!className) {
//         return (
//           <code className="px-1.5 py-0.5 rounded bg-white/10 text-pink-400">
//             {value}
//           </code>
//         );
//       }

//       const language = className.replace("language-", "");

//       return (
//         <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318]">

//           <div className="flex items-center justify-between bg-[#1b1d24] border-b border-white/10 px-4 py-2">

//             <span className="uppercase text-xs text-slate-400">
//               {language}
//             </span>

//             <button
//               onClick={() => copyCode(value)}
//               className="flex items-center gap-1 text-xs"
//             >
//               {copiedCode === value ? (
//                 <>
//                   <Check size={14} />
//                   Copied
//                 </>
//               ) : (
//                 <>
//                   <Copy size={14} />
//                   Copy
//                 </>
//               )}
//             </button>

//           </div>

//           <SyntaxHighlighter
//             language={language}
//             style={oneDark}
//             wrapLongLines
//             showLineNumbers
//             customStyle={{
//               margin: 0,
//               padding: "16px",
//               background: "#0d1117",
//               fontSize: "13px",
//             }}
//           >
//             {value}
//           </SyntaxHighlighter>

//         </div>
//       );
//     },
//   }}
// >
//   {markdown}
// </ReactMarkdown>
//       </div>

//       {lightboxSrc && (
//         <div
//           className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
//           onClick={() => setLightboxSrc(null)}
//         >
//           <button
//             type="button"
//             onClick={() => setLightboxSrc(null)}
//             className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2"
//           >
//             <FiX size={20} />
//           </button>
//           <img
//             src={lightboxSrc}
//             onClick={(e) => e.stopPropagation()}
//             className="max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default MessageBubble;

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiExternalLink, FiX } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, FileText, FileImage } from "lucide-react";

function MessageBubble({ role, content, images = [], file }) {
  const isUser = role === "user";

  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const markdown = (content || "")
    .replace(/```review/gi, "```")
    .replace(/```text/gi, "```")
    .replace(/```[a-zA-Z0-9_-]+\s+id="[^"]*"/g, "```");

  const isImageFile = file?.type?.startsWith("image/");
  const isPdfFile =
    file?.type === "application/pdf" ||
    file?.name?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`w-fit max-w-[92vw] md:max-w-[72%]
            px-4 py-2.5 rounded-2xl
            break-words overflow-hidden
            leading-relaxed
            ${
              isUser
                ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
                : "text-slate-200 rounded-tl-sm"
            }`}
        >
          {/* User's uploaded attachment */}
          {isUser && file && (
            <div className="mb-3">
              {isImageFile && file.url ? (
                <div className="max-w-full">
                  <img
                    src={file.url}
                    alt={file.name || "Uploaded image"}
                    onClick={() => setLightboxSrc(file.url)}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className="max-w-full max-h-64 rounded-xl object-contain cursor-zoom-in border border-white/20"
                  />

                  <p className="mt-1 text-xs text-white/75 break-all">
                    {file.name}
                  </p>
                </div>
              ) : isPdfFile ? (
                <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/10 p-3">
                  <div className="rounded-lg bg-red-500/15 p-2">
                    <FileText size={25} className="text-red-200" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {file.name || "Uploaded PDF"}
                    </p>

                    <p className="text-xs opacity-70">
                      PDF document
                      {file.size ? ` · ${Math.ceil(file.size / 1024)} KB` : ""}
                    </p>
                  </div>
                </div>
              ) : file.url ? (
                <div className="flex items-center gap-2">
                  <FileImage size={20} />
                  <span className="text-sm break-all">
                    {file.name || "Attachment"}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FileText size={20} />
                  <span className="text-sm break-all">
                    {file.name || "Attachment"}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* AI-generated or search-result images */}
          {Array.isArray(images) && images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4 mb-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`AI result ${index + 1}`}
                  loading="lazy"
                  onClick={() => setLightboxSrc(img)}
                  onError={(event) => event.currentTarget.remove()}
                  className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
                />
              ))}
            </div>
          )}

          {/* Message content and Markdown */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
              ),

              p: ({ children }) => (
                <p className="mb-3 whitespace-pre-wrap break-words last:mb-0">
                  {children}
                </p>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
              ),

              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-white/10">
                    {children}
                  </table>
                </div>
              ),

              th: ({ children }) => (
                <th className="border border-white/10 bg-white/5 px-3 py-2 text-left">
                  {children}
                </th>
              ),

              td: ({ children }) => (
                <td className="border border-white/10 px-3 py-2">{children}</td>
              ),

              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-300 underline inline-flex items-center gap-1"
                >
                  {children}
                  <FiExternalLink size={11} />
                </a>
              ),

              img: ({ src, alt }) => {
                if (!src) return null;

                return (
                  <img
                    src={src}
                    alt={alt || "Image"}
                    loading="lazy"
                    onClick={() => setLightboxSrc(src)}
                    onError={(event) => event.currentTarget.remove()}
                    className="w-40 h-28 rounded-xl object-cover cursor-zoom-in"
                  />
                );
              },

              code({ className, children }) {
                const value = String(children)
                  .replace(/^\s*```[^\n]*\n/, "")
                  .replace(/\n```\s*$/, "")
                  .replace(/\n$/, "");

                if (!className) {
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-pink-300">
                      {value}
                    </code>
                  );
                }

                const language = className.replace("language-", "");

                return (
                  <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318]">
                    <div className="flex items-center justify-between bg-[#1b1d24] border-b border-white/10 px-4 py-2">
                      <span className="uppercase text-xs text-slate-400">
                        {language}
                      </span>

                      <button
                        type="button"
                        onClick={() => copyCode(value)}
                        className="flex items-center gap-1 text-xs text-slate-300 hover:text-white"
                      >
                        {copiedCode === value ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>

                    <SyntaxHighlighter
                      language={language}
                      style={oneDark}
                      wrapLongLines
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        padding: "16px",
                        background: "#0d1117",
                        fontSize: "13px",
                      }}
                    >
                      {value}
                    </SyntaxHighlighter>
                  </div>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>

      {/* Image lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close image preview"
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2"
          >
            <FiX size={20} />
          </button>

          <img
            src={lightboxSrc}
            alt="Expanded image"
            onClick={(event) => event.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain"
          />
        </div>
      )}
    </>
  );
}

export default MessageBubble;
