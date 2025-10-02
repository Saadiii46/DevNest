"use client";

import { signOutUser } from "@/lib/firebase/users";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { handleClientError } from "@/lib/handleClientError";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "../Loader";
import { LogOut } from "lucide-react";
import { Bell } from "lucide-react";
import { auth } from "@/lib/firebase/firebase";
import { getCurrentUser } from "@/lib/firebase/users";
//Dummy Data
const dummyData = [
  {
    id: 1,
    name: "David Johnson",
    message:
      "Liked your post about React components. Great work on the new design!",
    time: "2 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    name: "Sarah Chen",
    message:
      "Added you as a collaborator on the UI Design project. Please review the latest updates.",
    time: "15 minutes ago",
    isRead: false,
  },
  {
    id: 3,
    name: "Mike Wilson",
    message:
      "Commented on your code review: 'This looks perfect, ready to merge!'",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 4,
    name: "Emma Davis",
    message:
      "Mentioned you in the team discussion about the upcoming sprint planning.",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    message:
      "Shared a new document with you: 'Q4 Project Roadmap - Please Review'",
    time: "1 day ago",
    isRead: true,
  },
];

// Styles
const styles = {
  logoutBtn:
    "mt-4 px-4 py-2 bg-red-500 text-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-medium flex items-center justify-center gap-2 max-md:hidden",
};

interface DashboardHeaderProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);

  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    setIsloading(true);
    try {
      await signOutUser();

      router.push("/sign-in");
    } catch (error) {
      const { message } = handleClientError(error);
      toast.error(message);
    } finally {
      setIsloading(false);
    }
  };
  const unreadCount = dummyData.filter((item) => !item.isRead).length;

  return (
    <div className="flex justify-between">
      <div className="header">
        <h1 className="max-lg:text-[24px]">
          Welcome Back,{" "}
          {currentUser ? (
            <span className="max-[864]:hidden">{user.name}</span>
          ) : (
            <Skeleton className="h-6 w-[200px] inline-block loader" />
          )}
        </h1>
        <p className="text-slate-600 text-sm font-light">
          Today is {new Date().toLocaleDateString()}
        </p>
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Notification Bell + Slider */}
      <div className="relative">
        {/* Notification Bell Button */}
        <button
          onClick={() => setOpen(!open)}
          className="relative p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />

            {/* Dropdown Panel */}
            <div className="absolute right-0 mt-2 z-20 w-96 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Notifications
                  </h2>
                  <p className="text-sm text-blue-600 font-medium">
                    {unreadCount} new notifications
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // Mark all as read logic here
                      console.log("Mark all as read");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close notifications"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {dummyData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${
                      !item.isRead
                        ? "border-l-blue-500 bg-blue-50/30"
                        : "border-l-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {item.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm mb-1">
                          {item.name}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                          {item.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {item.time}
                          </span>
                          {!item.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => {
                    console.log("View all notifications");
                    setOpen(false);
                  }}
                  className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  View all notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  );
};

export default DashboardHeader;
