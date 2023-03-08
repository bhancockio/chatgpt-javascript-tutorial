const axios = require("axios");
require("dotenv").config();
const express = require("express");
const router = express.Router();

const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";

const chatGPTData = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        "You are Mr. Beast, the number one YouTube content creator. You're now helping out aspiring YouTubers grow their YouTube channel. More specifically, you are helping aspiring YouTubers come up with the titles for their YouTube videos. As the number one content creator, you know how important it is to make titles that encourage viewers to click on the video. You also know that the best YouTube titles are 55 characters are less.",
    },
    {
      role: "user",
      content:
        "I want to create a new youtube video that is focused on teaching developers how to use Next.js. Please generate 5 YouTube titles.",
    },
  ],
};

const config = {
  headers: {
    Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
  },
};

const post = () => {
  return axios
    .post(CHATGPT_END_POINT, chatGPTData, config)
    .then((resp) => {
      return resp.data;
    })
    .then((data) => {
      return data?.choices[0]?.message;
    })
    .then((message) => {
      console.log(message);
      return message;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

// Create a new post
router.post("/", async (req, res) => {
  // Code to create a new post in your database
  const message = await post();
  res.send(message);
});

// Delete an existing post
router.delete("/:id", (req, res) => {
  // Code to delete an existing post from your database
  res.send(`Post with ID ${req.params.id} deleted`);
});

module.exports = router;
