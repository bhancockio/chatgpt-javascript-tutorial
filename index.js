const express = require("express");
const app = express();

// Import endpoint modules
const chatGPTRoutes = require("./routes/chatGPT");

// Use endpoint modules
app.use("/chatGPT", chatGPTRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
