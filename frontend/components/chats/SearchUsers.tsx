"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { searchUsers } from "@/lib/firebase/searchUsers";
import { user } from "@/lib/types";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setUsers([]);
      setNoResults(false);
      return;
    }

    const delay = setTimeout(async () => {
      if (!currentUserId) {
        setUsers([]);
        setNoResults(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const found = await searchUsers({
          name: searchTerm,
          currentUserId: currentUserId,
        });

        setUsers(found);
        setNoResults(found?.length === 0);
      } catch (err) {
        console.error("Search Error:", err);
        setUsers([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delay);
  }, [searchTerm, currentUserId]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />

      {loading && <p className="mt-2 text-gray-500">Searching...</p>}
      {noResults && !loading && (
        <p className="mt-2 text-gray-500">No users found</p>
      )}

      <ul className="mt-3 space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="border p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="font-semibold text-black">{u.fullName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
