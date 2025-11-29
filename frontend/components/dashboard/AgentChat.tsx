"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "agent" | "user"; text: string };

export default function AgentChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // start session
    (async () => {
      const res = await fetch("/api/agent-gather/start", { method: "POST" });
      const data = await res.json();
      setSessionId(data.sessionId);
      // push first question (from base list)
      if (data.firstQuestion) {
        setMessages([{ role: "agent", text: data.firstQuestion.text }]);
      }
      // if more initial questions exist, show first; rest agent will handle
    })();
  }, []);

  const send = async () => {
    if (!input.trim() || !sessionId) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setWaiting(true);

    // get the last agent question id: we don't have id for initial base question;
    // For base question we send questionId as clientName/projectName accordingly.
    // MVP: if last agent message text matches base first question, set known id.
    // We'll send questionId null for initial flow and backend will map.
    // Simpler: send lastAgentText as questionId param.
    const lastAgent = messages
      .slice()
      .reverse()
      .find((m) => m.role === "agent");
    const questionId = lastAgent
      ? `qa_${Buffer.from(lastAgent.text).toString("base64").slice(0, 10)}`
      : `qa_init`;

    // POST to message route
    const res = await fetch("/api/agent-gather/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, questionId, answer: userText }),
    });
    const data = await res.json();
    setWaiting(false);

    if (data.error) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "Server error. Try again." },
      ]);
      return;
    }

    if (data.done) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "All information collected — saving..." },
      ]);
      // call save
      const saveRes = await fetch("/api/agent-gather/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const saveData = await saveRes.json();
      if (saveData.success) {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: `Saved at prebuilds/${saveData.folder}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text: `Save failed: ${saveData.error || "unknown"}`,
          },
        ]);
      }
      return;
    }

    if (data.nextQuestion) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: data.nextQuestion.text },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "No next question, please try again." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 flex flex-col bg-card border border-border rounded-lg shadow-xl overflow-hidden">
      <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold text-sm">
        Agent Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 bg-background">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            Start a conversation...
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "agent" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed ${
                    m.role === "agent"
                      ? "bg-muted text-muted-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {waiting && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg rounded-bl-none text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t border-border bg-card p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !waiting && send()}
          placeholder="Type your answer..."
          className="flex-1 bg-input border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          disabled={waiting}
        />
        <button
          onClick={send}
          disabled={waiting || !input.trim()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {waiting ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
