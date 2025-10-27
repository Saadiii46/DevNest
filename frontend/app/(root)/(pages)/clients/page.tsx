import SearchUsers from "@/components/chats/SearchUsers";
import SocketTest from "@/components/SocketTest";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <SearchUsers />
      </div>
      <SocketTest />
    </div>
  );
};

export default page;
