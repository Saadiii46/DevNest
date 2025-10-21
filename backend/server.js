import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Message recieved: ", data);

    io.emit("recieveMessage", {
      message: data.message,
      sender: data.sender,
      time: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => res.send("Socket server is running"));

httpServer.listen(4000, () =>
  console.log("✅ Socket server on http://localhost:4000")
);
