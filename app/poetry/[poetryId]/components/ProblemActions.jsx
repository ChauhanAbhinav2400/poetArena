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
          className={`flex items-center space-x-2 ${
            isLiked ? "text-blue-400" : "text-gray-400"
          }`}
          onClick={handleLike}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span className="font-medium">{likes}</span>
        </button>

        <button
          className={`flex items-center space-x-2 ${
            isDisliked ? "text-red-400" : "text-gray-400"
          }`}
          onClick={handleDislike}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
          </svg>
          <span className="font-medium">{dislikes}</span>
        </button>
       
        <div className="flex items-center space-x-2 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{commentCount} comments</span>
        </div>
        </div>


        <button
          onClick={onShare}
          className="flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full hover:bg-purple-700/50 transition text-white"
        >
          <Share2 />
          <span>Share</span>
        </button>
      </div>
  
  );
}
