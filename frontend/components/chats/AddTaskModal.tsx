"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: { id: string; text?: string };
  clientName?: string;
  onCreate: (task: { title: string; messageId?: string; client?: string }) => void;
}

export default function AddTaskModal({
  open,
  onOpenChange,
  message,
  clientName,
  onCreate,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onCreate({ title, messageId: message?.id, client: clientName });
    setTitle("");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

        {/* Modal Content */}
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 
            rounded-2xl bg-white p-6 shadow-lg
            focus:outline-none
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">Add New Task</Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-gray-400 hover:text-gray-700 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="space-y-3">
            <input
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {message?.text && (
              <p className="text-sm text-gray-600 border rounded-md p-2">
                Related message: “{message.text.slice(0, 60)}...”
              </p>
            )}
            {clientName && (
              <p className="text-sm text-gray-500">Client: <strong>{clientName}</strong></p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Dialog.Close asChild>
              <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Add Task
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
