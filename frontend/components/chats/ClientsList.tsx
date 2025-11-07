"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface Client {
  id: number;
  name: string;
  status: "Online" | "Offline";
  avatar: string;
  lastMessage?: string;
  lastTime?: string;
}

interface Props {
  clients: Client[];
  onSelectClient: (c: Client) => void;
  selectedClientId?: number | null;
}

export default function ClientsList({
  clients,
  onSelectClient,
  selectedClientId,
}: Props) {
  const [q, setQ] = useState("");

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white border-r">
      {/* Headerrr */}
      <div className="p-4 border-b">
        <div className="text-lg font-semibold mb-3">Clients</div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* Client List */}
      <div className="overflow-y-auto p-2 space-y-2">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectClient(c)}
            className={`flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer transition
              ${
                selectedClientId === c.id
                  ? "bg-indigo-50 border border-indigo-200"
                  : "hover:bg-gray-50"
              }`}
          >
            {/*  Avatar +info */}
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="w-10 h-10">
                <AvatarImage src={c.avatar} alt={c.name} />
                <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="truncate">
                <div className="font-medium truncate">{c.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {c.lastMessage ?? "No messages yet"}
                </div>
              </div>
            </div>

            {/*  Right Side */}
            <div className="flex items-center ml-auto">
              {/* Fixed-width time */}
              <div className="w-14 text-right text-xs text-gray-400 flex-shrink-0">
                {c.lastTime ?? ""}
              </div>

              {/* Fixed-width Dot (always same vertical line) */}
              <div className="w-6 flex justify-end flex-shrink-0">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    c.status === "Online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
