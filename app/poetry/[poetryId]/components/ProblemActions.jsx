"use client";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function PoetryActions({
  likes,
  dislikes,
  commentCount,
  onLike,
  onDislike,
  isLike,
  isDislike,
  onShare,
}) {
  const [isLiked, setIsLiked] = useState(isLike);
  const [isDisliked, setIsDisliked] = useState(isDislike);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      if (isDisliked) setIsDisliked(false);
      onLike();
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      setIsDisliked(true);
      if (isLiked) setIsLiked(false);
      onDislike();
    }
  };

  
  return (
    <div className="flex items-center justify-between pt-4  border-t border-gray-700 w-full">
      <div className="flex items-center space-x-6">
       
        <button
              className={`flex cursor-pointer items-center space-x-2 ${
                isLiked ? "text-blue-400" : "text-gray-400"
              }`}
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  isLiked ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-gray-300">{likes}</span>
            </button>

      
        <div className="flex items-center space-x-2 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{commentCount}</span>
        </div>
      </div>

      <button
        onClick={onShare}
        className="flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full hover:bg-purple-700/50 transition text-white"
      >
        <Share2 size={14} />
        <span className="text-sm">Share</span>
      </button>
    </div>
  );
}
