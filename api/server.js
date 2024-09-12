// api/server.js
const express = require('express');
const app = express();

app.use(express.json());

// Define your routes here
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Node.js Server!' });
});

// Export the app for Vercel serverless function
module.exports = app;
