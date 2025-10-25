"use client";

import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("❌ No user found — not connecting to socket.");

        return;
      }

      const idToken = await user.getIdToken();

      const newSocket = io("http://localhost:4000", {
        transports: ["websocket"],
        auth: { token: idToken }, // send Firebase token for backend validation
      });
      newSocket.on("connect", () =>
        console.log("✅ Connected to socket:", newSocket.id)
      );

      newSocket.on("disconnect", () => console.log("❌ Socket disconnected"));
      setSocket(newSocket);

      return () => {
        unsubscribe();
        newSocket.disconnect();
      };
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
