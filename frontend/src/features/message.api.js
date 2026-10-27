import api from "../utils/axios";

// export const getMessages =async(conversationId)=>{

//  const { data } =await api.get(`/api/chat/get-messages/${conversationId}`);
//  console.log(data)
//  return data;

// };

export const getMessages = async (conversationId) => {
  if (!conversationId || conversationId === "undefined") {
    throw new Error("A valid conversation ID is required.");
  }

  const { data } = await api.get(`/api/chat/get-messages/${conversationId}`);

  return data;
};
