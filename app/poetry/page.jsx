"use client";
import { useState, useEffect } from "react";
import { apiCall } from "../../api/fetchData";
import {
  API_ENDPOINTS,
  BASE_URL,
  TOKEN_KEY,
} from "../../lib/constants/constants";
import PoetryCard from "./components/ProblemCard";
import AddPoetryModal from "./components/AddProblemModal";
import FilterBar from "./components/FilterBar";
import { useUser } from "@/hooks/useUser";
import { getItem } from "@/lib/localStorage";
import { toast } from "react-toastify";
import { colors } from "../../components/style/theme";

export default function PoetriesPage() {
  const [poetries, setPoetries] = useState([]);
  const [input, setInput] = useState({ search: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ type: "all" });
  const { user } = useUser();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    fetchPoetries();
  }, []);

  useEffect(() => {
    fetchPoetriesByType();
  }, [filters]);

  useEffect(() => {
    fetchPoetriesBySearch();
  }, [input.search]);

  async function fetchPoetriesByType() {
    const url =
      filters.type === "all"
        ? `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=1&limit=10`
        : `${BASE_URL}${API_ENDPOINTS.GET_POETRIES_BY_TYPE}/${filters.type}?page=1&limit=10`;
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setPoetries(response.data || []);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Failed to load poetries");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPoetriesBySearch() {
    const url =
      input.search === ""
        ? `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=1&limit=10`
        : `${BASE_URL}${API_ENDPOINTS.SEARCH_POETRIES}?search=${input.search}?page=1&limit=10`;
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setPoetries(response.data || []);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Failed to load poetries");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPoetries() {
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=1&limit=10`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setPoetries(response.data || []);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Failed to load poetries");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLikeDislike(poetryId, action) {
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
      fetchPoetries();
    } catch (error) {
      console.error(`Failed to ${action} poetry:`, error);
      toast.error(`Failed to ${action} poetry`);
    }
  }

  async function handleAddPoetry(poetryData) {
    try {
      await apiCall({
        method: "POST",
        url: `${BASE_URL}${API_ENDPOINTS.CREATE_POETRY}`,
        body: poetryData,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      toast.success("Poetry Posted Successfully");
      setIsAddModalOpen(false);
      fetchPoetries();
    } catch (error) {
      console.error("Failed to add poetry:", error);
      toast.error("Failed to post poetry");
    }
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-800 text-gray-300">
      {/* Header Section */}
      <div
        className="py-16"
        style={{
          background: `linear-gradient(to right, ${colors.darkPurple}, ${colors.darkPink})`,
        }}
      >
        <div className="container  mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Shayriमंच Community
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Dive into a world of shayri read, share, and connect with
              poets. Let your words weave magic.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-8 py-3 bg-gray-800 cursor-pointer text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-purple-500 transform hover:-translate-y-1"
            >

              Share Your शायरी

            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container bg-gray-800 mx-auto px-4 py-8 ">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          value={input.search}
          onchange={handleForm}
        />
      </div>

      {/* Poetries Grid */}
      <div className="container bg-gray-800 mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex bg-gray-800 justify-center py-20">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: colors.lightPurple }}
            ></div>
          </div>
        ) : (
          <div className="flex flex-wrap sm:justify-between justify-center items-center gap-10">
            {poetries?.map((poetry, index) => (
              <PoetryCard
                key={poetry.id}
                poetry={poetry}
                onLike={() => handleLikeDislike(poetry?._id, "like")}
                onDislike={() => handleLikeDislike(poetry?._id, "dislike")}
                cardStyle={index % 6} // Cycle through 6 card styles
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Poetry Modal */}
      <AddPoetryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPoetry}
        user={user}
      />
    </div>
  );
}
