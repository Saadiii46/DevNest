"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function SocketTest() {
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState<
    { message: string; sender: string; time: string }[]
  >([]);
  const { id } = useParams();
  const roomId = id as string;

  useEffect(() => {
    socket = io("http://localhost:4000", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket?.id);

      socket.emit("joinRoom", roomId);
      console.log("Joined room:", roomId);
    });

    socket.on("recieveMessage", (data) => {
      console.log("New message from server:", data);
      setChat((prev) => [...prev, data]);
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection error:", err);
    });

    return () => {
      socket.off("recieveMessage");
      socket.disconnect();
    };
  }, [roomId]);

  const handleSend = () => {
    if (!messages.trim()) return;

    const msgData = {
      message: messages,
      sender: "Saad",
      roomId: roomId,
    };

    socket?.emit("sendMessage", msgData);
    setMessages("");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">💬 Real-time Chat Test</h1>

      <div className="border rounded p-4 h-64 overflow-y-auto bg-gray-50 mb-4">
        {chat.map((c, i) => (
          <div key={i} className="mb-2 text-gray-500">
            <strong>{c.sender}</strong>: {c.message}{" "}
            <span className="text-gray-500 text-sm">({c.time})</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
