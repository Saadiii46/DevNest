"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  // Send message to API
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply || "No response" }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    setAutoScroll(isNearBottom);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-card text-card-foreground rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">DevNest AI Assistant</h2>
              <p className="text-sm text-primary-foreground/80">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div
  ref={containerRef}
  onScroll={handleScroll}
  className="h-[240px] w-[384px] p-4 space-y-4 bg-card overflow-y-auto scrollbar-thin scrollbar-thumb-primary/60 scrollbar-track-muted/20 hover:scrollbar-thumb-primary/80 transition-colors duration-200"
>

            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <MessageCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Start a conversation</p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-muted-foreground rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground px-4 py-3 rounded-xl rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border bg-card p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center hover:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

