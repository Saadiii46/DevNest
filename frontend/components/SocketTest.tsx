"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function SocketTest() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:4000", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket?.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection error:", err);
    });

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Socket.IO Connection: {connected ? "🟢 Connected" : "🔴 Disconnected"}
      </h1>
      <button
        onClick={() => {
          if (socket) {
            socket.emit("test", "Hello Server!");
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Send Test Event
      </button>
    </div>
  );
}
