const express = require("express");
const { UserType } = require("../constants/chatGPTRoles");
const {
  postChatGPTMessage,
  addMessageToConveration,
} = require("../utils/chatGPTUtil");
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { message, conversation = [] } = req.body;
  console.log("Message", message);
  console.log("conversation", conversation);
  // Validate inputs

  // Add user message to our conversation
  addMessageToConveration(message, conversation, UserType.USER);

  // Send request
  const response = await postChatGPTMessage(conversation);
  console.log("response", response);

  // Add request to our conversation
  addMessageToConveration(message, conversation, UserType.ASSISTANT);

  // Return response
  res.status(200).json({ message: conversation });
});

// Delete an existing post
router.delete("/", (req, res) => {
  // Code to delete an existing post from your database
  res.send(`Post with ID ${req.params.id} deleted`);
});

module.exports = router;
