"use client";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../style/theme";
import Link from "next/link";

import { API_ENDPOINTS, BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";
import { getItem } from "@/lib/localStorage";
import { toast } from "react-toastify";
import { apiCall } from "@/api/fetchData";

const TrendingShayaris = () => {
  const [topShayaris, setTopShayaris] = useState([]);
  const scrollContainerRef = useRef(null);
  const cardRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (shayri) => {
    const text = `${shayri?.replace(/<[^>]*>/g, "")}\n`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  async function fetchPoetries() {
    try {
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}${API_ENDPOINTS.GET_TOP_POETRIES}?page=1&limit=10`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Network Problem");
    } finally {
    }
  }

  useEffect(() => {
    fetchPoetries().then((resp) => {
      setTopShayaris(resp);
    });
  }, []);

  const getTitle = (title) => {
    const newTitle = title.split(" ").join("-");
    return newTitle;
  };
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="roboto roboto-seven text-3xl md:text-4xl mb-3">
            Trending Shayaris
          </h2>
          <p className="roboto roboto-four text-gray-400 max-w-2xl mx-auto">
            The most loved verses from our poetic community—scroll to feel the
            rhythm.
          </p>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto  pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {topShayaris?.map((shayari, index) => (
            <div
              key={index}
              ref={cardRef}
              className="min-w-[320px] max-w-[320px] snap-start rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col"
              style={{
                background:
                  index % 5 === 0
                    ? `linear-gradient(135deg, ${colors.darkPurple}aa, ${colors.darkPink}aa)`
                    : index % 5 === 1
                    ? `radial-gradient(circle, ${colors.darkPink}cc, ${colors.darkPurple}cc)`
                    : index % 5 === 2
                    ? `radial-gradient(ellipse, ${colors.lightPurple}, ${colors.darkPurple})`
                    : index % 5 === 3
                    ? `linear-gradient(45deg, ${colors.darkPink}bb, ${colors.darkPurple}bb)`
                    : `radial-gradient(ellipse, ${colors.lightPurple}, ${colors.darkPurple})`,
                border: `1px solid ${colors.lightPurple}33`,
                height: "400px",
              }}
            >
              <div className="p-6 text-center flex flex-col h-full">
                <div
                  className="roboto roboto-five text-lg text-white whitespace-pre-line mb-4 flex-grow overflow-y-auto custom-scrollbar"
                  style={{
                    fontStyle: index % 5 === 2 ? "italic" : "normal",
                    textShadow:
                      index % 5 === 4
                        ? "0 0 10px rgba(255,255,255,0.2)"
                        : "none",
                  }}
                >
                  <div
                    className="text-gray-300 poetry-content"
                    dangerouslySetInnerHTML={{ __html: shayari?.content }}
                  />
                </div>
                <div className="flex-shrink-0">
                  <p className="roboto roboto-four text-sm text-gray-300 mb-4">
                    - {shayari?.posterName}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-400"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="text-gray-300">{shayari?.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(shayari?.content)}
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
                      </button>
                      {/* <button
                      onClick={() => downloadCard(shayari?.title)}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                    </button> */}
                      <Link
                        href={`/poetry/${getTitle(shayari.title)}?id=${
                          shayari._id
                        }`}
                        className="text-sm hover:underline cursor-pointer text-[#FF1493] hover:text-white roboto roboto-five"
                        // style={{ color: colors.darkPink }}
                      >
                        Read More
                      </Link>
                    </div>
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
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/poetry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full roboto roboto-five text-white transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
              boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
            }}
          >
            <span>Post & Explore Shayaris</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingShayaris;
