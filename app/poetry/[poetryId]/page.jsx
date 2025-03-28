"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiCall } from "../../../api/fetchData";
import {
  API_ENDPOINTS,
  BASE_URL,
  TOKEN_KEY,
} from "../../../lib/constants/constants";
import CommentSection from "./components/CommentSection";
import CommentInput from "./components/CommentInput";
import PoetryActions from "./components/ProblemActions";
import { useUser } from "../../../hooks/useUser";
import { getItem } from "../../../lib/localStorage";
import { colors } from "../../../components/style/theme";
import RecommendedShayris from "./components/RecommendedShayris";
import { BookOpen, Download, Heart, Share2 } from "lucide-react";

export default function PoetryDetailPage() {
  const { poetryId } = useParams();
  const router = useRouter();
  const [poetry, setPoetry] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [recommendedShayris, setRecommendedShayris] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFullPoetry, setShowFullPoetry] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  console.log(poetry);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: poetry.title,
        text: poetry.fullText,
      });
    } else {
      navigator.clipboard.writeText(poetry.fullText);
      alert("Poetry copied to clipboard");
    }
  };

  useEffect(() => {
    fetchPoetryDetails();
    fetchComments();
  }, [poetryId]);

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
        url: `${BASE_URL}${API_ENDPOINTS.GET_POETRY_BY_ID}/${poetryId}`,
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
        url: `${BASE_URL}${API_ENDPOINTS.GET_COMMENTS}/${poetryId}/comments`,
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
          ? `${BASE_URL}${API_ENDPOINTS.LIKE_POETRY}/${poetryId}/like`
          : `${BASE_URL}${API_ENDPOINTS.LIKE_POETRY}/${poetryId}/dislike`;

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
        url: `${BASE_URL}${API_ENDPOINTS.GET_COMMENTS}/${poetryId}/comment`,
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
            onClick={() => router.push("/problem")}
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
              />
            </div>
          </div>

          {/* Poet Profile Section */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col items-center">
              <img
                src="/api/placeholder/150/150"
                alt="Dishant"
                className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-purple-600"
              />
              <h3 className="text-2xl font-bold text-purple-200">
                Dishant Chauhan
              </h3>
              <p className="text-purple-300 mb-4"></p>

              <div className="text-center mb-6">
                <p className="text-white/80"></p>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-purple-700/30 p-3 rounded-full hover:bg-purple-700/50 transition"
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

          <CommentInput onSubmit={handleAddComment} user={user} />

          <div className="mt-6">
            <CommentSection comments={comments} />
          </div>
        </div>
        <RecommendedShayris recommendedShayris={recommendedShayris} />
      </div>
    </div>
  );
}
