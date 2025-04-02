"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { apiCall } from "../../../../api/fetchData";
import {
  API_ENDPOINTS,
  BASE_URL,
  TOKEN_KEY,
} from "../../../../lib/constants/constants";
import CommentSection from "./CommentSection";
import CommentInput from "./CommentInput";
import PoetryActions from "./ProblemActions";
import { getItem } from "../../../../lib/localStorage";
import { colors } from "../../../../components/style/theme";
import RecommendedShayris from "./RecommendedShayris";
import { BookOpen, Download, Heart, Share2 } from "lucide-react";

export default function PoetryDetailPage() {
  const { poetryId } = useParams();
  const searchParams = useSearchParams(); // Get query parameters
  const id = searchParams.get("id");

  const router = useRouter();
  const [poetry, setPoetry] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [recommendedShayris, setRecommendedShayris] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFullPoetry, setShowFullPoetry] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  const handleShare = async () => {
    const shareMessage = "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shayri", // The title of the shared item
          text: "", // The formatted message to share
          url: window.location.href, // Optionally include the current page URL
        });
        console.log("Share was successful");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Open share links for social media or email
      const emailSubject = `${poetry.title}`;
      const emailBody = encodeURIComponent(shareMessage);
      const emailLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
      window.location.href = emailLink;
    }
  };

  const getname = (name) => {
    const poetNameSlug = name.toLowerCase().replace(/\s+/g, "-");
    return poetNameSlug;
  };

  useEffect(() => {
    fetchPoetryDetails();
    fetchComments();
  }, [id]);

  useEffect(() => {
    fetchPoetriesByType();
  }, [poetry]);

  async function fetchPoetriesByType() {
    const url = !poetry.type
      ? `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=1&limit=10`
      : `${BASE_URL}${API_ENDPOINTS.GET_POETRIES_BY_TYPE}/${poetry.type}?page=1&limit=10`;
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setRecommendedShayris(response.data || []);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Failed to load poetries");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPoetryDetails() {
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}${API_ENDPOINTS.GET_POETRY_BY_ID}/${id}`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setPoetry(response.data);
    } catch (error) {
      console.error("Failed to fetch poetry details:", error);
      // router.push("/poetries");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchComments() {
    try {
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}${API_ENDPOINTS.GET_COMMENTS}/${id}/comments`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setComments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }

  async function handleLikeDislike(action) {
    try {
      const endpoint =
        action === "like"
          ? `${BASE_URL}${API_ENDPOINTS.LIKE_POETRY}/${id}/like`
          : `${BASE_URL}${API_ENDPOINTS.LIKE_POETRY}/${id}/dislike`;

      await apiCall({
        method: "POST",
        url: endpoint,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      fetchPoetryDetails();
    } catch (error) {
      console.error(`Failed to ${action} poetry:`, error);
    }
  }

  async function handleAddComment(content) {
    try {
      await apiCall({
        method: "POST",
        url: `${BASE_URL}${API_ENDPOINTS.GET_COMMENTS}/${id}/comment`,
        body: { text: content },
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      fetchComments();
      fetchPoetryDetails();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen mt-20 flex justify-center items-center bg-gray-900">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.lightPurple }}
        ></div>
      </div>
    );
  }

  if (!poetry) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="text-center text-gray-300">
          <h2 className="text-2xl font-bold">Poetry not found</h2>
          <button
            onClick={() => router.push("/poetry")}
            className="mt-4 px-6 py-2 text-white rounded-lg"
            style={{
              background: `linear-gradient(to right, ${colors.darkPurple}, ${colors.darkPink})`,
            }}
          >
            Back to Poetries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-18 bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[3fr_1fr] gap-8">
          {/* Main Poetry Section */}

          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-200">
                {poetry.title}
              </h2>

              <div
                className="prose max-w-none mb-8 text-gray-300 poetry-content"
                dangerouslySetInnerHTML={{ __html: poetry.content }}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              <PoetryActions
                likes={poetry.likes}
                isLike={poetry.isLiked}
                isDislike={poetry.isDisliked}
                dislikes={poetry.dislikes}
                commentCount={comments.length}
                onLike={() => handleLikeDislike("like")}
                onDislike={() => handleLikeDislike("dislike")}
                onShare={() => handleShare()}
                poetry={poetry}
              />
            </div>
          </div>

          {/* Poet Profile Section */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16  rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                <span className="text-2xl font-normal">
                  {poetry?.posterName?.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl text-center mt-4 font-bold text-purple-200">
                {poetry?.posterName}
              </h3>

              <div className="flex space-x-4 mt-4">
                <a
                  href={`/poets/${getname(poetry?.posterName)}?id=${
                    poetry?.poster
                  }`}
                  className="bg-purple-700/30 px-2 py-1 rounded-full hover:bg-purple-700/50 transition"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>

          <CommentInput onSubmit={handleAddComment} />

          <div className="mt-6">
            <CommentSection comments={comments} />
          </div>
        </div>
        <RecommendedShayris recommendedShayris={recommendedShayris} />
      </div>
    </div>
  );
}
