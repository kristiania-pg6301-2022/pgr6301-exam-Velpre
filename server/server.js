import express from "express";
import * as path from "path";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { LoginApi } from "./loginApi.js";
import { ArticlesApi } from "./articlesApi.js";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  app.use(
    "/api/articles",
    ArticlesApi(mongoClient.db(process.env.MONGODB_DATABASE || "MyTest"))
  );
});

app.use("/api/login", LoginApi());
app.use(express.static("../client/dist/"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const wsServer = new WebSocketServer({ noServer: true });

const sockets = [];

wsServer.on("connect", (socket) => {
  sockets.push(socket);

  socket.on("message", (message) => {
    for (const recipient of sockets) {
      recipient.send(message.toString());
    }
  });
});

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
  //Websockets
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connect", socket, req);
    });
  });
});
