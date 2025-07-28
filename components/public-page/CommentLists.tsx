import { formatTimeAgo } from "@/constants";
import { getPublicComments } from "@/lib/actions/comments.action";
import { User } from "lucide-react";

const CommentLists = async ({ fileId }: { fileId: string }) => {
  const comments = await getPublicComments(fileId); // Calling server action getting public comments

  // If no comments then show this message
  if (!comments) {
    return <p>No comments yet</p>;
  }

  return (
    <div className="p-8">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.$id}
            className="bg-gray-100 rounded-xl p-6 border border-gray-200 hover:bg-gray-200 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h5 className="font-medium text-gray-900">{comment.name}</h5>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CommentLists;
