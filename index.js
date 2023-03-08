const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Import endpoint modules
const chatGPTRoutes = require("./routes/chatGPT");

// Use endpoint modules
app.use("/chatGPT", chatGPTRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
