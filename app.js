const Server = require("./models/sever");
require("dotenv").config();
const server = new Server();

server.listen();
