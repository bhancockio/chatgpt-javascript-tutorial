const express = require("express");
const { UserType } = require("../constants/chatGPTRoles");
const {
  postChatGPTMessage,
  addMessageToConveration,
  isValidRequest,
  createMessage,
} = require("../utils/chatGPTUtil");

// Create a new router instance
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  // Validate the request body
  if (!isValidRequest(req.body)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // Extract the message and conversation from the request body
  const { message, context, conversation = [] } = req.body;

  // Create context message
  const contextMessage = createMessage(context, UserType.SYSTEM);

  // Add user message to the conversation
  addMessageToConveration(message, conversation, UserType.USER);

  // Call postChatGPTMessage to get the response from the ChatGPT API
  const chatGPTResponse = await postChatGPTMessage(
    contextMessage,
    conversation
  );

  // Check if there was an error with the ChatGPT API
  if (!chatGPTResponse) {
    return res.status(500).json({ error: "Error with ChatGPT" });
  }

  // Get the content from the ChatGPT response
  const { content } = chatGPTResponse;

  // Add the ChatGPT response to the conversation
  addMessageToConveration(content, conversation, UserType.ASSISTANT);

  // Return the conversation as a JSON response
  return res.status(200).json({ message: conversation });
});

module.exports = router;
