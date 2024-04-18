import express from 'express';
import cors from 'cors';
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(express.json());

import { JWTMiddlware } from "./src/middleware/jwt_middleware";
import { dataHandler } from "./src/handlers/data_handler";
// import { db } from "./src/config/database_config";
import { sendBuffering } from "./src/services/send_buffering";

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
  pingInterval: 1000,
  pingTimeout: 2000,
});

// io.use((socket, next) => {
//   console.log(socket.handshake.auth.token);
//   const token = socket.handshake.auth.token;
//   JWTMiddlware(socket, token, next);
// });

const onConnection = async (socket: Socket) => {
  console.log("Cliente conectado");

  //Package Buffering
  // const offset = socket.handshake.auth.offset;
  // if (offset) {
  //   sendBuffering(offset, socket);
  // }

  //Crear el room del usuario
  // socket.join(socket.data.id_user);

  //Handlers
  dataHandler(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

// db.connect()
//   .then(() => {
//     console.log("Database conected!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
