"use client";

import React, { useMemo, useState } from "react";
import ClientsList, { Client } from "./ClientsList";
import ChatWindow, { Message } from "./ChatWindow";
import TaskPanel, { Task } from "./TaskPanel";
import AddTaskModal from "./AddTaskModal";

export default function ChatLayout() {
  const initialClients: Client[] = [
    {
      id: 1,
      name: "Innovate Inc.",
      status: "Online",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Hey, how’s everything going?",
      lastTime: "10:30 AM",
    },
    {
      id: 2,
      name: "Quantum Solutions",
      status: "Offline",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "Send update",
      lastTime: "Yesterday",
    },
    {
      id: 3,
      name: "Apex Designs",
      status: "Online",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Received files",
      lastTime: "2d",
    },
  ];

  const [clients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<
    { client: string; action: string; time: string; avatar?: string }[]
  >([]);
  const [messagesMap, setMessagesMap] = useState<Record<number, Message[]>>({
    1: [
      { id: "msg1", sender: "client", text: "Hey! How’s the redesign?", time: "10:30 AM" },
      { id: "msg2", sender: "me", text: "Wireframes are done.", time: "10:32 AM" },
    ],
  });

  const clientMessages = useMemo(
    () => (selectedClient ? messagesMap[selectedClient.id] ?? [] : []),
    [messagesMap, selectedClient]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<Message | null>(null);

  const handleSelectClient = (c: Client) => setSelectedClient(c);

  const handleSend = (text: string) => {
    if (!selectedClient) return;
    const newMsg: Message = {
      id: "msg" + Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessagesMap((prev) => ({
      ...prev,
      [selectedClient.id]: [...(prev[selectedClient.id] ?? []), newMsg],
    }));
  };

  const handleAddToTask = (msg: Message) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const handleCreateTask = (payload: { title: string }) => {
    if (!selectedClient) return;
    const newTask: Task = {
      id: "task" + Date.now(),
      text: payload.title,
      from: selectedClient.name,
      time: new Date().toLocaleString(),
      status: "Pending",
      avatar: selectedClient.avatar,
    };
    setTasks((prev) => [newTask, ...prev]);
    setActivities((prev) => [
      {
        client: selectedClient.name,
        action: `added a task: ${payload.title}`,
        time: "just now",
        avatar: selectedClient.avatar,
      },
      ...prev,
    ]);
    setModalOpen(false);
    setModalMessage(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#F3F5F7] overflow-hidden">
      {/*  clients */}
      <div
        className={`transition-all duration-300 overflow-y-auto border-r
          ${selectedClient ? "w-1/4 md:w-1/4" : "w-full"}
        `}
      >
        <ClientsList
          clients={clients}
          onSelectClient={handleSelectClient}
          selectedClientId={selectedClient?.id ?? null}
        />
      </div>

      {/* Middle*/}
      {selectedClient && (
        <>
          {/* Chat Panel */}
          <div className="flex-1 min-w-0 overflow-y-auto border-r">
            <ChatWindow
              clientName={selectedClient.name}
              clientAvatar={selectedClient.avatar}
              clientStatus={selectedClient.status}
              messages={clientMessages}
              onSend={handleSend}
              onMessageClick={handleAddToTask}
              onAddToTask={handleAddToTask}
              onBack={() => setSelectedClient(null)}
            />
          </div>

          {/* Task Panelll */}
          <div className="w-1/4 min-w-[300px] flex-shrink-0 border-l overflow-y-auto">
            <TaskPanel
              tasks={tasks}
              onDelete={handleDeleteTask}
              activities={activities}
            />
          </div>
        </>
      )}

      {/* Modall */}
      <AddTaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        message={
          modalMessage ? { id: modalMessage.id, text: modalMessage.text } : undefined
        }
        clientName={selectedClient?.name}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
