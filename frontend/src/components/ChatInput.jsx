// import { useState } from "react";
// import { Send, Paperclip,  Square, Zap, MessageSquare, Code2, Presentation, Image as ImageIcon, Globe, FileText,X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { addMessage, setArtifacts, setIsLoading } from "../redux/message.slice";
// import { sendPrompt } from "../features/agent.api";
// import { Mic, MicOff } from "lucide-react";
// import { useEffect } from "react";
// import { createConversation, updateConversations } from "../features/conversation.api";
// import { addConversation, setConvTitle, setSelectedConversation } from "../redux/conversation.slice";
// import { useRef } from "react";

// export default function ChatInput({
//   setBanner
// }) {
//   const [selectedAgent, setSelectedAgent] =useState("auto");
//   const [value, setValue] = useState("");
// const [isListening, setIsListening] = useState(false);

// const recognitionRef = useRef(null);
//   const dispatch = useDispatch();
//   const { selectedConversation } = useSelector(state => state.conversation);
//    const { isLoading } = useSelector(state => state.message);
// const fileRef = useRef(null);

// const [

// selectedFile,

// setSelectedFile

// ]=useState(null);

//    const placeholders={

// auto:"Ask kesh.AI...",

// chat:"Chat with kesh.AI...",

// coding:"Describe the software you want...",

// pdf:"Generate a PDF about...",

// ppt:"Create a presentation about...",

// image:"Describe the image...",

// search:"Search the web..."

// };

//    const agents = [

//   {
//     id:"auto",
//     icon:Zap,
//     label:"Auto"
//   },

//   {
//     id:"chat",
//     icon:MessageSquare,
//     label:"Chat"
//   },

//   {
//     id:"coding",
//     icon:Code2,
//     label:"Coding"
//   },

//   {
//     id:"pdf",
//     icon:FileText,
//     label:"PDF"
//   },

//   {
//     id:"ppt",
//     icon:Presentation,
//     label:"PPT"
//   },

//   {
//     id:"image",
//     icon:ImageIcon,
//     label:"Image"
//   },

//   {
//     id:"search",
//     icon:Globe,
//     label:"Search"
//   }

// ];

// useEffect(() => {

//   const SpeechRecognition =
//     window.SpeechRecognition ||
//     window.webkitSpeechRecognition;

//   if (!SpeechRecognition) return;

//   const recognition = new SpeechRecognition();

//   recognition.lang = "en-IN";

//   recognition.interimResults = true;

//   recognition.continuous = true;

//   recognition.onresult = (event) => {

//     let transcript = "";

//     for (

//       let i = event.resultIndex;

//       i < event.results.length;

//       i++

//     ) {

//       transcript += event.results[i][0].transcript;

//     }

//     setValue(transcript);

//   };

//   recognition.onend = () => {

//     setIsListening(false);

//   };

//   recognitionRef.current = recognition;

// }, []);

// const toggleMic = () => {

//   if (!recognitionRef.current) {

//     alert("Speech Recognition not supported");

//     return;

//   }

//   if (isListening) {

//     recognitionRef.current.stop();

//     setIsListening(false);

//   } else {

//     recognitionRef.current.start();

//     setIsListening(true);

//   }

// };

//   const handleSend = async () => {
//     const prompt = value.trim();
//     if (!prompt) return;

//     dispatch(setIsLoading(true));

//     try {

//       let conversation = selectedConversation;

//       if (!conversation) {
//         const newConversation = await createConversation();
//         dispatch(addConversation(newConversation));
//         dispatch(setSelectedConversation(newConversation));
//         conversation = newConversation;
//       }

//       if (conversation.title === "New Chat") {
//         await updateConversations(conversation._id, prompt.slice(0, 40));
//         dispatch(setConvTitle({ conversationId: conversation._id, title: prompt.slice(0, 40) }));
//       }

//       dispatch(addMessage({ role: "user", content: prompt }));
//       setValue("");

//       const formData = new FormData();

// formData.append(
//     "conversationId",
//     conversation._id
// );

// formData.append(
//     "prompt",
//     prompt
// );

// formData.append(
//     "agent",
//     selectedAgent
// );

// if(selectedFile){

//     formData.append(
//         "file",
//         selectedFile
//     );

// }

// setSelectedFile(null)

//       const data = await sendPrompt(formData);
//     console.log(data)
//      dispatch(
//   addMessage({
//     role: "assistant",
//     content: data.answer,
//     images:data.images
//   })
// );

// console.log(data)

// if(data.artifacts){
//   dispatch(
//     setArtifacts(
//       data.artifacts
//     )
//   );
// }}
// catch(error){

//   setBanner({

//     open:true,

//     title:
//       error.response?.data?.title ||
//       "Something went wrong",

//     message:
//       error.response?.data?.message ||
//       "Please try again."

//   });

// }
//   finally {
//        dispatch(setIsLoading(false));
//     }
//   };

//   return (
//    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
//       <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3">

//     <div className="flex w-[80%] gap-2 pr-2 flex-wrap">

//     {agents.map((agent) => {

//       const Icon = agent.icon;
//       const isActive = selectedAgent === agent.id;

//       return (

//         <button
//           key={agent.id}
//           onClick={() => setSelectedAgent(agent.id)}
//           className={`
//             flex-shrink-0

//             inline-flex
//             items-center
//             gap-1.5
//             px-3
//             py-2
//             rounded-full
//             text-xs
//             font-medium
//             border
//             transition-all

//             ${
//               isActive
//                 ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]"
//                 : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
//             }
//           `}
//         >

//           <Icon
//             size={14}
//             className={
//               isActive
//                 ? "text-white"
//                 : "text-slate-500"
//             }
//           />

//           {agent.label}

//         </button>

//       );

//     })}

// </div>

// {

// selectedFile && (

// <div className="my-3">

// <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">

// {

// selectedFile.type==="application/pdf"

// ?

// <FileText

// size={16}

// className="text-red-400"

// />

// :

// selectedFile?.type.startsWith("image/")

// &&

// <img

// src={URL.createObjectURL(selectedFile)}

// className="h-10 w-10 rounded-xl object-cover mt-3"

// />

// }

// <div>

// <p className="text-xs text-white">

// {

// selectedFile.name

// }

// </p>

// <p className="text-[10px] text-slate-500">

// {

// Math.ceil(

// selectedFile.size/

// 1024

// )

// }

// KB

// </p>

// </div>

// <button

// onClick={()=>{

// setSelectedFile(null);

// fileRef.current.value="";

// }}

// className="ml-2"

// >

// <X

// size={14}

// className="text-slate-500 hover:text-white"

// />

// </button>

// </div>

// </div>

// )
// }

//         {/* Textarea */}
//         <textarea
//           value={value}
//           onChange={e => setValue(e.target.value)}
//           placeholder={
// placeholders[selectedAgent]
// }
//           rows={3}
//           disabled={isLoading}
//           className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
//         />

//         {/* Bottom row */}
//         <div className="flex items-center justify-between">

//           {/* Left — attach + mic */}
//           <div className="flex items-center gap-1">
//   <input

// ref={fileRef}

// type="file"

// hidden

// accept=".pdf,image/*"

// onChange={(e)=>{

// const file =
// e.target.files[0];

// if(file){

// setSelectedFile(file);

// }

// }}

// />
//             <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer"
//             onClick={()=>
// fileRef.current.click()
// }
//             >
//               <Paperclip size={14} />
//             </button>
//            <button

// onClick={toggleMic}

// className={`

// flex

// items-center

// justify-center

// w-8

// h-8

// rounded-lg

// transition-all

// cursor-pointer

// ${

// isListening

// ?

// "bg-red-500 text-white"

// :

// "text-slate-600 hover:bg-white/[0.05]"

// }

// `}

// >

// {

// isListening

// ?

// <MicOff size={14}/>

// :

// <Mic size={14}/>

// }

// </button>
//           </div>

//           {/* Right — send / stop */}
//           <button
//             onClick={handleSend}
//             disabled={!isLoading && !value.trim()}
//             className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150
//               ${isLoading
//                 ? "bg-white text-[#0d0f14] hover:bg-slate-200"
//                 : value.trim()
//                 ? "bg-gradient-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white"
//                 : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
//               }`}
//           >
//             {isLoading ? <Square size={12} fill="currentColor" /> : <Send size={14} />}
//           </button>

//         </div>
//       </div>

//       <p className="text-center text-[10.5px] text-slate-700 mt-2.5">
//         kesh.AI can make mistakes. Verify important info.
//       </p>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Paperclip,
  Square,
  Zap,
  MessageSquare,
  Code2,
  Presentation,
  Image as ImageIcon,
  Globe,
  FileText,
  X,
  Mic,
  MicOff,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { addMessage, setArtifacts, setIsLoading } from "../redux/message.slice";

import { sendPrompt } from "../features/agent.api";

import {
  createConversation,
  updateConversations,
} from "../features/conversation.api";

import {
  addConversation,
  setConvTitle,
  setSelectedConversation,
} from "../redux/conversation.slice";

export default function ChatInput({ setBanner }) {
  const [selectedAgent, setSelectedAgent] = useState("auto");
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const recognitionRef = useRef(null);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const { selectedConversation } = useSelector((state) => state.conversation);

  const { isLoading } = useSelector((state) => state.message);

  const placeholders = {
    auto: "Ask kesh.AI...",
    chat: "Chat with kesh.AI...",
    coding: "Describe the software you want...",
    pdf: "Generate a PDF about...",
    ppt: "Create a presentation about...",
    image: "Describe the image...",
    search: "Search the web...",
  };

  const agents = [
    { id: "auto", icon: Zap, label: "Auto" },
    { id: "chat", icon: MessageSquare, label: "Chat" },
    { id: "coding", icon: Code2, label: "Coding" },
    { id: "pdf", icon: FileText, label: "PDF" },
    { id: "ppt", icon: Presentation, label: "PPT" },
    { id: "image", icon: ImageIcon, label: "Image" },
    { id: "search", icon: Globe, label: "Search" },
  ];

  // Configure speech recognition.
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setValue((previous) => {
        const earlierText = previous.trim();

        return earlierText ? `${earlierText} ${transcript}`.trim() : transcript;
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  // Start or stop microphone.
  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Could not start speech recognition:", error);
      }
    }
  };

  // Remove selected attachment.
  const removeSelectedFile = () => {
    setSelectedFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // Send message and optional attachment.
  const handleSend = async () => {
    const prompt = value.trim();

    // Allow sending a file without typing text.
    if ((!prompt && !selectedFile) || isLoading) return;

    const messagePrompt = prompt || "Please analyze this file.";

    dispatch(setIsLoading(true));

    try {
      let conversation = selectedConversation;

      // Create a conversation when necessary.
      if (!conversation) {
        const newConversation = await createConversation();

        dispatch(addConversation(newConversation));
        dispatch(setSelectedConversation(newConversation));

        conversation = newConversation;
      }

      // Update the title for a new conversation.
      if (conversation.title === "New Chat") {
        const title = messagePrompt.slice(0, 40);

        await updateConversations(conversation._id, title);

        dispatch(
          setConvTitle({
            conversationId: conversation._id,
            title,
          }),
        );
      }

      // Save a local preview URL before clearing the selected file.
      const filePreview = selectedFile
        ? {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            url: URL.createObjectURL(selectedFile),
          }
        : null;

      // Immediately display the user's message and attachment.
      dispatch(
        addMessage({
          role: "user",
          content: messagePrompt,
          file: filePreview,
        }),
      );

      setValue("");

      // Prepare the backend request.
      const formData = new FormData();

      formData.append("conversationId", conversation._id);
      formData.append("prompt", messagePrompt);
      formData.append("agent", selectedAgent);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Clear the composer after capturing the selected file.
      setSelectedFile(null);

      if (fileRef.current) {
        fileRef.current.value = "";
      }

      // Send the request to the backend.
      const data = await sendPrompt(formData);

      console.log("Agent response:", data);

      // Display the assistant's answer.
      dispatch(
        addMessage({
          role: "assistant",
          content: data.answer || "",
          images: data.images || [],
        }),
      );

      // Update generated artifacts.
      if (data.artifacts) {
        dispatch(setArtifacts(data.artifacts));
      }
    } catch (error) {
      console.error(
        "Failed to send message:",
        error.response?.data || error.message,
      );

      setBanner({
        open: true,
        title: error.response?.data?.title || "Something went wrong",
        message: error.response?.data?.message || "Please try again.",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  // Handle Enter to send and Shift+Enter for a new line.
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3">
        {/* Agent selector */}
        <div className="flex w-full gap-2 pr-2 flex-wrap">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isActive = selectedAgent === agent.id;

            return (
              <button
                key={agent.id}
                type="button"
                disabled={isLoading}
                onClick={() => setSelectedAgent(agent.id)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]"
                    : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
                }`}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-white" : "text-slate-500"}
                />
                {agent.label}
              </button>
            );
          })}
        </div>

        {/* Selected file preview in the composer */}
        {selectedFile && (
          <div className="my-3">
            <div className="inline-flex max-w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                <FileText size={24} className="shrink-0 text-red-400" />
              )}

              <div className="min-w-0">
                <p className="truncate text-xs text-white">
                  {selectedFile.name}
                </p>

                <p className="text-[10px] text-slate-500">
                  {Math.ceil(selectedFile.size / 1024)} KB
                </p>
              </div>

              <button
                type="button"
                aria-label="Remove attachment"
                onClick={removeSelectedFile}
                className="ml-1 shrink-0"
              >
                <X size={15} className="text-slate-500 hover:text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Message input */}
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[selectedAgent]}
          rows={3}
          disabled={isLoading}
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
        />

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* File picker */}
            <input
              ref={fileRef}
              type="file"
              hidden
              accept=".pdf,image/*"
              disabled={isLoading}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setSelectedFile(file);
                }
              }}
            />

            <button
              type="button"
              disabled={isLoading}
              aria-label="Attach image or PDF"
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer disabled:opacity-50"
            >
              <Paperclip size={14} />
            </button>

            {/* Microphone */}
            <button
              type="button"
              onClick={toggleMic}
              disabled={isLoading}
              aria-label={isListening ? "Stop microphone" : "Start microphone"}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer ${
                isListening
                  ? "bg-red-500 text-white"
                  : "text-slate-600 hover:bg-white/[0.05]"
              }`}
            >
              {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading || (!value.trim() && !selectedFile)}
            aria-label="Send message"
            className={`flex items-center justify-center w-8 h-8 rounded-lg border-none transition-all duration-150 ${
              isLoading
                ? "bg-white text-[#0d0f14] cursor-wait"
                : value.trim() || selectedFile
                  ? "bg-gradient-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white cursor-pointer"
                  : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <Square size={12} fill="currentColor" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>
      </div>

      <p className="text-center text-[10.5px] text-slate-700 mt-2.5">
        kesh.AI can make mistakes. Verify important info.
      </p>
    </div>
  );
}
