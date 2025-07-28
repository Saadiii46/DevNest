"use client";

import { submitPublicComments } from "@/lib/actions/comments.action";
import { MessageCircle, Send, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CommentForm = ({ fileId }: { fileId: string }) => {
  // Use states

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state of the submit form
  const [name, setName] = useState(""); // setting name of the commenter
  const [comment, setComment] = useState(""); // setting actual comment

  const router = useRouter();

  // Handle submit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Setting loading state = true

    try {
      await submitPublicComments({ fileId, name, comment }); // Calling server action submit form function
      toast.success("Comment submitted!"); // Success message after submitting the form
      // Setting name and comment = empty after submitting the form
      setName("");
      setComment("");
    } catch (error) {
      toast.error("Failed to submit comment");
    } finally {
      setIsSubmitting(false); // Setting the loading state = false
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments
      </h3>

      {/* Add Comment Form */}
      <div className="mb-8">
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
          <h4 className="text-gray-900 font-medium mb-4">Leave a Comment</h4>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <textarea
                placeholder="Write your comment here..."
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Send className="w-4 h-4" />
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
