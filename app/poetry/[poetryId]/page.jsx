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

export default function PoetryDetailPage() {
  const { poetryId } = useParams();
  const router = useRouter();
  const [poetry, setPoetry] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    fetchPoetryDetails();
    fetchComments();
  }, [poetryId]);

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
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
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
    <div className="min-h-screen mt-12 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Poetry Section */}
        <div className="bg-gray-800 relative rounded-xl shadow-md overflow-hidden">
          <div
            className="p-1"
            style={{
              background: `linear-gradient(to right, ${colors.darkPurple}, ${colors.darkPink})`,
            }}
          ></div>
          <div className="p-8 relative">
            <div className="flex absolute right-5 top-5 items-center mb-3">
              <span
                className="px-3 py-1 text-xs text-pink-500 rounded-full"
                style={{
                  background: `#ffff`,
                }}
              >
                {poetry.type}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              {poetry.title}
            </h1>

            <div className="flex items-center text-gray-400 mb-6">
              <span>By: </span>
              <span className="font-medium ml-1">{poetry.posterName}</span>
            </div>

            <div
              className="prose max-w-none mb-8 text-gray-300 poetry-content"
              dangerouslySetInnerHTML={{ __html: poetry.content }}
            />

            <PoetryActions
              likes={poetry.likes}
              isLike={poetry.isLiked}
              isDislike={poetry.isDisliked}
              dislikes={poetry.dislikes}
              commentCount={comments.length}
              onLike={() => handleLikeDislike("like")}
              onDislike={() => handleLikeDislike("dislike")}
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>

          <CommentInput onSubmit={handleAddComment} user={user} />

          <div className="mt-6">
            <CommentSection comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
