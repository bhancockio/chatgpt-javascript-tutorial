// Require packages and constants
require("dotenv").config();
const axios = require("axios");
const Yup = require("yup");
const { UserType } = require("../constants/chatGPTRoles");

// Define constants
const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";

// Set config for axios request
const config = {
  headers: {
    Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
  },
};

// Function to post a message to the ChatGPT API
const postChatGPTMessage = async (contextMessage, conversation) => {
  const messages = buildConversation(contextMessage, conversation);
  const chatGPTData = {
    model: CHATGPT_MODEL,
    messages: messages,
  };

  try {
    const resp = await axios.post(CHATGPT_END_POINT, chatGPTData, config);
    const data = resp.data;
    const message = data?.choices[0]?.message; // Get response message
    return message;
  } catch (error) {
    console.error("Error with ChatGPT API"); // Log error message
    console.error(error);
    return null;
  }
};

// Function to build a conversation array
const buildConversation = (contextMessage, conversation) => {
  return [contextMessage].concat(conversation);
};

const createMessage = (message, role) => {
  return {
    role: role,
    content: message,
  };
};

// Function to add a message to a conversation array
const addMessageToConveration = (message, conversation, role) => {
  conversation.push(createMessage(message, role));
};

// Define Yup validation schema for conversation object
const conversationSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  content: Yup.string().required("Content is required"),
});

// Define Yup validation schema for request object
const requestSchema = Yup.object().shape({
  context: Yup.string().required(),
  message: Yup.string().required(),
  conversation: Yup.array().of(conversationSchema).notRequired(),
});

// Function to validate request object using Yup schema
const isValidRequest = (request) => {
  try {
    requestSchema.validateSync(request);
    return true;
  } catch (error) {
    return false;
  }
};

// Export functions and constants
module.exports = {
  postChatGPTMessage,
  addMessageToConveration,
  isValidRequest,
  createMessage,
};
