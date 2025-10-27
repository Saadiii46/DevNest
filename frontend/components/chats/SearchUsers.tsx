"use client";

import { sendFriendRequest } from "@/lib/firebase/friends";
import { searchUsersByName } from "@/lib/firebase/searchUsers";
import { getCurrentUser } from "@/lib/firebase/users";
import React, { useState } from "react";

const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.id) return console.log("No current user");

    const users = await searchUsersByName({
      name: query,
      currentUserId: currentUser.id,
    });

    setResults(users);
    setIsLoading(false);
  };

  const handleAddFriend = async (recieverId: string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) return console.log("No current user");

    await sendFriendRequest({
      requesterId: currentUser.id,
      recieverId: recieverId,
    });

    alert("Friend request sent!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Search Users</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((user) => (
            <li
              key={user.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => handleAddFriend(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default SearchUsers;
