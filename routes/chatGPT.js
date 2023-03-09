const express = require("express");
const { UserType } = require("../constants/chatGPTRoles");
const {
  postChatGPTMessage,
  addMessageToConveration,
  isValidRequest,
} = require("../utils/chatGPTUtil");
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  if (!isValidRequest(req.body)) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const { message, conversation = [] } = req.body;
  console.log("Message", message);
  console.log("conversation", conversation);
  // Validate inputs

  // Add user message to our conversation
  addMessageToConveration(message, conversation, UserType.USER);

  // Send request
  const chatGPTResponse = await postChatGPTMessage(conversation);
  if (!chatGPTResponse) {
    return res.status(500).json({ error: "Error with ChatGPT" });
  }

  const { content } = chatGPTResponse;
  console.log("content", content);

  // Add request to our conversation
  addMessageToConveration(content, conversation, UserType.ASSISTANT);

  // Return response
  return res.status(200).json({ message: conversation });
});

module.exports = router;
