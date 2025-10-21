import React from "react";

interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300">
      {message}
    </div>
  );
};

export default Notification;
