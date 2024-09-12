// api/index.js
const app = require('./server'); // Import the server

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
