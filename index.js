const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.get('/api/message', this.getMessage.bind(this));
  }

  getMessage(req, res) {
    res.json({ message: 'Hello from Node.js Server!' });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
