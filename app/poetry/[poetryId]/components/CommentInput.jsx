"use client";
import { useState } from "react";
import { colors } from "../../../../components/style/theme";
import { useUser } from "../../../../hooks/useUser";

export default function CommentInput({ onSubmit }) {
  const [content, setContent] = useState("");

  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
            style={{
              background: `linear-gradient(to right, ${colors.darkPurple}, ${colors.darkPink})`,
            }}
          >
            {user?.fullName?.[0] || "A"}
          </div>
          <span className="ml-2 font-medium text-gray-300">
            {user?.fullName || "Anonymous"}
          </span>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="3"
          placeholder="Add your comment..."
          required
        ></textarea>

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-lg hover:opacity-90"
            style={{
              background: `linear-gradient(to right, ${colors.darkPurple}, ${colors.darkPink})`,
            }}
            disabled={!content.trim()}
          >
            Post Comment
          </button>
        </div>
      </div>
    </form>
  );
}
