"use client";
import { useState } from "react";
import Link from "next/link";
import { colors } from "../../../components/style/theme";

export default function PoetryCard({ poetry, onLike, onDislike, cardStyle }) {
  const { title, type, content, posterName, likes, dislikes, comments } =
    poetry;
  const [isLiked, setIsLiked] = useState(poetry.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(poetry.isDisliked || false);

  console.log(poetry, "jjj");

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

  const cardStyles = [
    // Style 0: Classic
    "bg-gray-800 rounded-xl shadow-md p-6 text-gray-300",
    // Style 1: Bordered Gradient
    "bg-gray-800 rounded-xl shadow-md p-6 border-2 border-t-0 border-l-0",
    // Style 2: Minimalist
    "bg-gray-700 rounded-lg p-4 text-gray-200 shadow-sm",
    // Style 3: Elegant
    "bg-gray-800 rounded-xl shadow-lg p-6 text-gray-300 border-t-4",
    // Style 4: Vintage
    "bg-gray-700 rounded-xl shadow-md p-6 text-gray-200 border border-gray-600",
    // Style 5: Bold
    "bg-gray-800 rounded-xl shadow-md p-6 text-gray-300",
  ];

  return (
    <div
      className={`${cardStyles[cardStyle]} relative`}
      style={{
        background:
          cardStyle === 0
            ? `linear-gradient(135deg, ${colors.darkPurple}aa, ${colors.darkPink}aa)`
            : cardStyle === 1
            ? `radial-gradient(circle, ${colors.darkPink}cc, ${colors.darkPurple}cc)`
            : cardStyle === 2
            ? `radial-gradient(ellipse, ${colors.lightPurple}aa, ${colors.darkPurple}aa)`
            : cardStyle === 3
            ? `linear-gradient(45deg, ${colors.darkPink}bb, ${colors.darkPurple}bb)`
            : `radial-gradient(ellipse, ${colors.lightPurple}aa, ${colors.darkPurple}aa)`,
        border: `1px solid ${colors.lightPurple}33`,
      }}
    >
      <div className="flex absolute right-2 top-2 items-center mb-3">
        <span
          className="px-3 py-1 text-xs text-pink-500 rounded-full"
          style={{
            background: `#ffff`,
          }}
        >
          {type}
        </span>
      </div>
      <Link href={`/poetry/${poetry?._id}`}>
        <h3 className="text-xl font-semibold text-white mb-4 hover:text-lightPurple transition-colors">
          {title}
        </h3>
      </Link>
      <div
        className="text-gray-200 snap-start text-center text-lg mb-4 poetry-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex items-center text-white text-sm mb-4">
        By: <span className="font-medium ml-1">{posterName}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex space-x-4">
          <button
            className={`flex items-center cursor-pointer space-x-1 ${
              isLiked ? "text-blue-400" : "text-gray-400"
            }`}
            onClick={handleLike}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>{likes}</span>
          </button>

          <button
            className={`flex items-center cursor-pointer space-x-1 ${
              isDisliked ? "text-red-400" : "text-gray-400"
            }`}
            onClick={handleDislike}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
            </svg>
            <span>{dislikes}</span>
          </button>

          <Link
            href={`/poetry/${poetry?._id}`}
            className="flex items-center space-x-1 text-gray-400"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            <span>{comments?.length}</span>
          </Link>
        </div>

        <Link
          href={`/poetry/${poetry?._id}`}
          className="text-sm font-medium hover:underline hover:text-white text-lightPurple "
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
