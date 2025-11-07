"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Send,
  Image,
  Mic,
  MoreVertical,
  Plus,
  Reply,
  Trash2,
  X,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AddTaskModal from "./AddTaskModal";

export interface Message {
  id: string;
  sender: "me" | "client";
  text?: string;
  time?: string;
  image?: string;
}

interface Props {
  clientName: string;
  clientAvatar: string;
  clientStatus: "Online" | "Offline";
  messages: Message[];
  onSend: (text: string) => void;
  onMessageClick: (msg: Message) => void;
  onAddToTask?: (msg: Message) => void; 
  onBack?: () => void;
}

export default function ChatWindow({
  clientName,
  clientAvatar,
  clientStatus,
  messages: initialMessages,
  onSend,
  onMessageClick,
  onAddToTask, 
  onBack,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [selectedImagePreview, setSelectedImagePreview] =
    useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskMessage, setTaskMessage] = useState<Message | null>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !selectedImagePreview) return;

    const newMsg: Message = {
      id: Math.random().toString(),
      sender: "me",
      text: replyTo ? `↪️ ${replyTo.text}\n${input.trim()}` : input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    onSend(newMsg.text || "");
    setInput("");
    setSelectedImagePreview(null);
    setReplyTo(null);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

 
  const handleAddToTask = (message: Message) => {
    if (onAddToTask) {
      // parent will open its modal
      onAddToTask(message);
      return;
    }
    // fallback local modal
    setTaskMessage(message);
    setTaskModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* header */}
  
      <div className="flex items-center gap-3 p-4 border-b bg-white">
  <button onClick={onBack} className="p-2 rounded hover:bg-gray-100">
    <ArrowLeft size={18} />
  </button>

  <div className="flex items-center gap-3">
    {/* Avatar with online  */}
    <div className="relative">
      <Avatar className="w-10 h-10">
        <AvatarImage src={clientAvatar} alt={clientName} />
        <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
      </Avatar>

      {clientStatus === "Online" && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      )}
    </div>

    {/* Name and last seen */}
    <div>
      <div className="font-semibold">{clientName}</div>
      <div className="text-xs text-gray-400">Last seen: just now</div>
    </div>
  </div>

  <div className="ml-auto flex items-center gap-3 text-gray-500">
    <div className="hidden sm:block text-sm">Chat active</div>
  </div>
</div>

{/* messages */}
<div
  ref={scroller}
  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F9FB]"
>
  {messages.map((m) => (
    <div
      key={m.id}
      className={`flex items-end gap-2 ${
        m.sender === "me" ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar for client messages */}
      {m.sender === "client" && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={clientAvatar} alt={clientName} />
          <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      {/* Message bubble */}
      <div
        className={`relative max-w-[70%] p-5 rounded-lg break-words ${
          m.sender === "me"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {m.image ? (
          <img src={m.image} alt="img" className="rounded-md max-w-full" />
        ) : (
          <div className="whitespace-pre-wrap">{m.text}</div>
        )}

        <div
          className={`text-xs mt-2 ${
            m.sender === "me" ? "text-white/70" : "text-gray-400"
          }`}
        >
          {m.time}
        </div>

        <MessageMenu
          message={m}
          onAddToTask={handleAddToTask}
          onReply={(msg) => setReplyTo(msg)}
          onDelete={(id) => handleDeleteMessage(id)}
        />
      </div>

      {/* Avatar for user (you) messages */}
      {m.sender === "me" && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="/your-avatar.jpg" alt="Me" />
          <AvatarFallback>Me</AvatarFallback>
        </Avatar>
      )}
    </div>
  ))}
</div>

      {/* reply banner */}
      {replyTo && (
        <div className="p-2 border-t bg-gray-50 text-sm flex items-center justify-between">
          <div className="truncate text-gray-600">
            Replying to: <span className="font-medium">{replyTo.text}</span>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* image preview */}
      {selectedImagePreview && (
        <div className="p-3 border-t bg-white flex items-center gap-3">
          <img
            src={selectedImagePreview}
            className="w-20 h-20 object-cover rounded"
            alt="preview"
          />
          <button
            onClick={() => setSelectedImagePreview(null)}
            className="text-sm text-red-500"
          >
            Remove
          </button>
        </div>
      )}

      {/* input */}
      <div className="p-3 border-t bg-white relative">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () =>
              setSelectedImagePreview(reader.result as string);
            reader.readAsDataURL(f);
          }}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Image size={18} />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <button
            onClick={() => setIsRecording((p) => !p)}
            className={`p-2 rounded-full ${
              isRecording ? "bg-red-50 text-red-500" : "hover:bg-gray-100"
            }`}
            title={isRecording ? "Recording..." : "Record voice"}
          >
            <Mic size={18} />
          </button>

          <button
            onClick={handleSend}
            className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/*  local modal (used only when parent not handling it) */}
      {!onAddToTask && (
        <AddTaskModal
          open={taskModalOpen}
          onOpenChange={setTaskModalOpen}
          message={
            taskMessage
              ? { id: taskMessage.id, text: taskMessage.text }
              : undefined
          }
          clientName={clientName}
          onCreate={(payload) => {
            console.log("Task created:", payload);
            setTaskModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

/* ----------------------------- MessageMenu ----------------------------- */
interface MessageMenuProps {
  message: Message;
  onAddToTask: (m: Message) => void;
  onReply: (m: Message) => void;
  onDelete: (id: string) => void;
}

const MessageMenu: React.FC<MessageMenuProps> = ({
  message,
  onAddToTask,
  onReply,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="absolute top-1 right-1 " >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="p-1 rounded-full hover:bg-white/20"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border shadow-md rounded-lg z-50 text-gray-700">
          <button
            onClick={() => {
              onAddToTask(message);
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
          >
            <Plus size={14} /> Add to Task
          </button>

          <button
            onClick={() => {
              onReply(message);
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
          >
            <Reply size={14} /> Reply
          </button>

          <button
            onClick={() => {
              onDelete(message.id);
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 text-red-500"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};