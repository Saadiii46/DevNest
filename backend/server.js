import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import admin from "firebase-admin";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("No auth token provided"));

    const decodedToken = await admin.auth().verifyIdToken(token);
    socket.user = decodedToken;

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  console.log("🟢 User connected successfully:", socket.user.email);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.user.email} joined room: ${roomId}`);
  });

  socket.on("sendMessage", async ({ message, roomId }) => {
    const messageData = {
      message: message,
      sender: socket.user.email,
      roomId: roomId,
      time: new Date().toISOString(),
    };

    io.to(roomId).emit("recieveMessage", messageData);
    await db.collection("chats").add(messageData);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User ${socket.user.email} disconnected`);
  });
});

app.get("/", (req, res) => res.send("Socket server is running"));

httpServer.listen(4000, () =>
  console.log("✅ Socket server on http://localhost:4000")
);
