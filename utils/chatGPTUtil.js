require("dotenv").config();
const axios = require("axios");
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

const postChatGPTMessage = (conversation) => {
  const messages = buildConversation(conversation);
  const chatGPTData = {
    model: CHATGPT_MODEL,
    messages: messages,
  };

  return axios
    .post(CHATGPT_END_POINT, chatGPTData, config)
    .then((resp) => {
      return resp.data;
    })
    .then((data) => {
      return data?.choices[0]?.message;
    })
    .then((message) => {
      console.log("Message from assistant", message);
      return message;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
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

module.exports = {
  postChatGPTMessage,
  addMessageToConveration,
};
