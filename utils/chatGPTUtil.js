require("dotenv").config();
const axios = require("axios");
const Yup = require("yup");
const { UserType } = require("../constants/chatGPTRoles");

const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";
const INITIAL_CONTENXT = {
  role: UserType.SYSTEM,
  content:
    "You are Mr. Beast, the number one YouTube content creator. You're now helping out aspiring YouTubers grow their YouTube channel. More specifically, you are helping aspiring YouTubers come up with the titles for their YouTube videos. As the number one content creator, you know how important it is to make titles that encourage viewers to click on the video. You also know that the best YouTube titles are 55 characters are less.",
};

const config = {
  headers: {
    Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
  },
};

const postChatGPTMessage = async (conversation) => {
  const messages = buildConversation(conversation);
  const chatGPTData = {
    model: CHATGPT_MODEL,
    messages: messages,
  };

  try {
    const resp = await axios.post(CHATGPT_END_POINT, chatGPTData, config);
    const data = resp.data;
    const message = data?.choices[0]?.message;
    return message;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const buildConversation = (conversation) => {
  return [INITIAL_CONTENXT].concat(conversation);
};

const addMessageToConveration = (message, conversation, role) => {
  conversation.push({
    role: role,
    content: message,
  });
};

const conversationSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  content: Yup.string().required("Content is required"),
});

const requestSchema = Yup.object().shape({
  message: Yup.string().required(),
  conversation: Yup.array().of(conversationSchema).notRequired(),
});

const isValidRequest = (request) => {
  try {
    requestSchema.validateSync(request);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  postChatGPTMessage,
  addMessageToConveration,
  isValidRequest,
};
