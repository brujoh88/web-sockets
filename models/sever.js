const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    //this.app.use(this.paths.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on("connection", (socket) => {
      socket.on("disconnect", () => {
        console.log("cliente desconectado");
      });
      socket.on("enviar-mensaje", (payload) => {
        this.io.emit("enviar-mensaje-server", payload);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(
        "Servidor corriendo en puerto",
        `http://localhost:${this.port}/`
      );
    });
  }
}

module.exports = Server;
