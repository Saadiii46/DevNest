"use client";

import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { generateRoomId } from "@/lib/utils";
import { getCurrentUser } from "@/lib/firebase/getCurrentUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export default function SocketTest() {
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState<
    { message: string; sender: string; time: string }[]
  >([]);

  const [status, setStatus] = useState("Disconnected");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const friendId = "friend_123";
  const socket = useSocket();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  });

  useEffect(() => {
    if (!currentUser) return console.log("No current user found");

    const roomId = generateRoomId(currentUser.uid, friendId);

    socket?.on("connect", () => {
      console.log("✅ Connected to socket:", socket?.id);
      setStatus("Connected");

      socket?.emit("joinRoom", roomId);
      console.log("Joined room:", roomId);
    });

    socket?.on("recieveMessage", (data) => {
      console.log("📩 New message:", data);
      setChat((prev) => [...prev, data]);
    });

    socket?.on("connect_error", (err) => {
      console.error("⚠️ Connection error:", err.message);
    });

    return () => {
      socket?.off("recieveMessage");
      socket?.off("connect");
      socket?.off("connect_error");
    };
  }, [socket, currentUser]);

  const handleSend = () => {
    if (!messages.trim()) return;
    const roomId = generateRoomId(currentUser.uid, friendId);
    socket?.emit("sendMessage", { message: messages, roomId: roomId });
    setMessages("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💬 Chat Room:</h1>
      <p className="text-gray-600 mb-2">Status: {status}</p>

      {/* Chat window */}
      <div className="border rounded bg-gray-50 p-3 h-64 overflow-y-auto mb-4">
        {chat.map((c, i) => (
          <div key={i}>
            <strong className="text-gray-500">{c.sender}</strong>:{" "}
            <span className="text-gray-500">{c.message}</span>
            <span className="text-sm text-gray-500">
              {" "}
              ({new Date(c.time).toLocaleTimeString()})
            </span>
          </div>
        ))}
      </div>

      {/* Input + button */}
      <div className="flex gap-2">
        <input
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
