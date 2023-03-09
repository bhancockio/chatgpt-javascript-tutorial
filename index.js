const express = require("express");
// Create an instance of the express application
const app = express();
// Import the body-parser middleware which allows the app to parse JSON data
const bodyParser = require("body-parser");

// Middleware
// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Import the chatGPT endpoint module
const chatGPTRoutes = require("./routes/chatGPT");

// Use the chatGPT endpoint module to handle requests to "/chatGPT" endpoint
app.use("/chatGPT", chatGPTRoutes);

// Error handling middleware
// Handle any errors by sending a 500 Internal Server Error status and message
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
