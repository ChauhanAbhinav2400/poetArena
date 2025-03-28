"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { colors } from "../../../components/style/theme";
import domtoimage from "dom-to-image"; // New library

export default function DownloadShayri({ poetry, onLike, onDislike, cardStyle }) {
  const { title, type, content, posterName, likes, dislikes, comments } =
    poetry;
  const [isLiked, setIsLiked] = useState(poetry.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(poetry.isDisliked || false);
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef(null);

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

  const copyToClipboard = () => {
    const text = `${title}\n\n${content.replace(
      /<[^>]*>/g,
      ""
    )}\n\nBy: ${posterName}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCard = () => {
    domtoimage
      .toPng(cardRef.current, {
        quality: 0.95,
        bgcolor: "#4B0082", // Fallback background
        style: {
          // Ensure we override any problematic colors
          background: "#4B0082",
          border: "1px solid #9370DB",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Download failed:", error);
        // Fallback to basic screenshot method
        basicDownloadFallback();
      });
  };

  const basicDownloadFallback = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 400;

    // Basic styling with safe colors
    ctx.fillStyle = "#4B0082";
    ctx.fillRect(0, 0, 300, 400);
    ctx.strokeStyle = "#9370DB";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 300, 400);

    // Add text
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px sans-serif";
    ctx.fillText(title, 20, 40);
    ctx.font = "16px sans-serif";
    const cleanContent = content.replace(/<[^>]*>/g, "");
    const lines = cleanContent.split("\n");
    let y = 80;
    lines.forEach((line) => {
      ctx.fillText(line, 20, y);
      y += 20;
    });
    ctx.fillText(`By: ${posterName}`, 20, 360);

    const link = document.createElement("a");
    link.download = `${title}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const cardStyles = [
    "bg-gray-800 rounded-xl shadow-md p-6 text-gray-300",
    "bg-gray-800 rounded-xl shadow-md p-6 border-2 border-t-0 border-l-0",
    "bg-gray-700 rounded-lg p-4 text-gray-200 shadow-sm",
    "bg-gray-800 rounded-xl shadow-lg p-6 text-gray-300 border-t-4",
    "bg-gray-700 rounded-xl shadow-md p-6 text-gray-200 border border-gray-600",
    "bg-gray-800 rounded-xl shadow-md p-6 text-gray-300",
  ];

  return (
    <div
      ref={cardRef}
      className={`${cardStyles[cardStyle]} relative flex flex-col poetry-card`}
      style={{
        background:
          cardStyle === 0
            ? `linear-gradient(135deg, ${colors.darkPurple}, ${colors.darkPink})`
            : cardStyle === 1
            ? `radial-gradient(circle, ${colors.darkPink}, ${colors.darkPurple})`
            : cardStyle === 2
            ? `radial-gradient(ellipse, ${colors.lightPurple}, ${colors.darkPurple})`
            : cardStyle === 3
            ? `linear-gradient(45deg, ${colors.darkPink}, ${colors.darkPurple})`
            : `radial-gradient(ellipse, ${colors.lightPurple}, ${colors.darkPurple})`,
        border: `1px solid ${colors.lightPurple}`,
        height: "auto",
        width: "400px",
      }}
    >
      <div className="flex-shrink-0">
        <div className="flex absolute right-2 top-2 items-center">
          <span
            className="px-3 py-1 text-xs text-pink-500 rounded-full"
            style={{ background: `#ffff` }}
          >
            {type}
          </span>
        </div>
        <Link href={`/poetry/${poetry?._id}`}>
          <h3 className="text-xl font-semibold text-white mb-4 hover:text-lightPurple transition-colors pr-10">
            {title}
          </h3>
        </Link>
      </div>

      <div
        className="text-gray-200 snap-start text-center text-lg mb-4 poetry-content flex-grow "
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="flex-shrink-0">
        <div className="flex items-center text-white text-sm mb-4">
          By: <span className="font-medium ml-1">{posterName}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex space-x-4">
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

            <Link
              href={`/poetry/${poetry?._id}`}
              className={`flex items-center space-x-1 ${
                comments?.length > 0 ? "text-white" : "text-gray-400"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  className={`${
                    comments?.length > 0 ? "text-white" : "text-gray-400"
                  }`}
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{comments?.length}</span>
            </Link>
          </div>

          <div className="flex space-x-2">
            {/* <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              {isCopied ? (
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </button> */}
            {/* <button
              onClick={downloadCard}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
            </button> */}
            <Link
              href={`/poetry/${poetry?._id}`}
              className="text-sm font-medium hover:underline hover:text-white text-lightPurple cursor-pointer"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${colors.darkPurple};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.lightPurple};
          border-radius: 4px;
          border: 1px solid ${colors.darkPink};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.darkPink};
        }
      `}</style>
    </div>
  );
}
