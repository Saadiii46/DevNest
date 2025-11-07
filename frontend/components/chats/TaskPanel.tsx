"use client";

import React, { useState } from "react";
import { Trash2, ListTodo, Activity } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface Task {
  id: string;
  text: string;
  from: string;
  time: string;
  status: "Pending" | "In Progress" | "Completed";
  avatar: string;
  tag?: string;
}

interface ActivityItem {
  client: string;
  action: string;
  time: string;
  avatar?: string;
}

interface TaskPanelProps {
  tasks: Task[];
  activities: ActivityItem[];
  onDelete: (id: string) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ tasks, activities, onDelete }) => {
  const [viewMode, setViewMode] = useState<"tasks" | "activity">("tasks");

  return (
    <div className="h-full flex flex-col bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">
          {viewMode === "tasks" ? "Tasks" : "Client Activity"}
        </h2>
        <button
          onClick={() => setViewMode(viewMode === "tasks" ? "activity" : "tasks")}
          className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition"
        >
          {viewMode === "tasks" ? (
            <>
              <Activity size={16} /> <span>Activity</span>
            </>
          ) : (
            <>
              <ListTodo size={16} /> <span>Tasks</span>
            </>
          )}
        </button>
      </div>

      {/* Tasks View */}
      {viewMode === "tasks" ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center mt-8">No tasks added yet</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 border rounded-lg p-3 flex items-start justify-between shadow-sm hover:shadow transition"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={task.avatar} />
                    <AvatarFallback>{task.from[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium text-sm">{task.text}</p>
                    <p className="text-xs text-gray-500">
                      From: {task.from} • {task.time}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDelete(task.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        // Activity View
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activities.length === 0 ? (
            <p className="text-gray-400 text-center mt-8">No recent activity</p>
          ) : (
            activities.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-50 border rounded-lg p-3 hover:shadow-sm transition"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={act.avatar || ""} />
                  <AvatarFallback>{act.client[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{act.client}</p>
                  <p className="text-xs text-gray-500">{act.action}</p>
                  <p className="text-xs text-gray-400">{act.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPanel;