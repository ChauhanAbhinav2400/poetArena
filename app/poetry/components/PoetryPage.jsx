"use client";
import { useState, useEffect, useRef } from "react";
import { apiCall } from "../../../api/fetchData";
import {
  API_ENDPOINTS,
  BASE_URL,
  TOKEN_KEY,
} from "../../../lib/constants/constants";
import PoetryCard from "./ProblemCard";
import AddPoetryModal from "./AddProblemModal";
import FilterBar from "./FilterBar";

import { getItem } from "../../../lib/localStorage";
import { toast } from "react-toastify";
import { colors } from "../../../components/style/theme";
import { useSearchParams } from "../../../hooks/useSearchParams";
import { useUser } from "@/hooks/useUser";

const PoetryPage = () => {
  const [poetries, setPoetries] = useState([]);
  const [input, setInput] = useState({ search: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "all" });
  const { user } = useUser();
  const loaderRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [incres, setIncres] = useState(0);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    pages: 0,
  });

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page")) || 0;
    setPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    if (incres >= 1 && page < pagination.total - 1) {
      const nextPage = incres;
      setSearchParams({ page: nextPage+1 });
    }
  }, [incres]);

  useEffect(() => {
    if (page < pagination.total - 1) {
      setPage((prev) => prev + 1);
    }
  }, [incres]);



  // Intersection Observer callback
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setIncres((prev) => prev + 1);
    }
  };

  // Set up Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 60% of the loader element is visible
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup the observer
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isLoading]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    fetchPoetries();
  }, [page]);

  useEffect(() => {
    setPage(1)
    fetchPoetriesByType();
  }, [filters]);

  useEffect(() => {
    setPage(1)
    fetchPoetriesBySearch();
  }, [input.search]);

  async function fetchPoetriesByType() {
    const url =
      filters.type === "all"
        ? `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=${page}&limit=50`
        : `${BASE_URL}${API_ENDPOINTS.GET_POETRIES_BY_TYPE}/${filters.type}?page=1&limit=50`;
    try {
      setIsLoading(false);
      const response = await apiCall({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });

      setPagination(response?.pagination);
      setPoetries(response.data || []);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Network Problem");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPoetriesBySearch() {
    const url =
      input.search === ""
        ? `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=${page}&limit=50`
        : `${BASE_URL}${API_ENDPOINTS.SEARCH_POETRIES}?search=${input.search}&page=1&limit=50`;
    try {
      setIsLoading(false);
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
      toast.error("Network Problem");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPoetries() {
    try {
     
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=${page}&limit=50`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setIsLoading(false);
      setPoetries((prev) => [...prev, ...response?.data]);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Network Problem");
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
    <div>
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
              Dive into a world of shayri read, share, and connect with poets.
              Let your words weave magic.
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
          <div className="flex flex-wrap  justify-center items-center gap-14">
            {poetries?.map((poetry, index) => (
              <PoetryCard
                key={poetry?._id}
                poetry={poetry}
                onLike={() => handleLikeDislike(poetry?._id, "like")}
                onDislike={() => handleLikeDislike(poetry?._id, "dislike")}
                cardStyle={index % 6} // Cycle through 6 card styles
              />
            ))}
            {isLoading && <p>Loading...</p>}

            {/* The div that will trigger loading more articles */}
            <div
              ref={loaderRef}
              style={{ height: "20px", background: "transparent" }}
            />
          </div>
        )}
      </div>

      {/* Add Poetry Modal */}
      {isAddModalOpen && (
        <AddPoetryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddPoetry}
        />
      )}
    </div>
  );
};

export default PoetryPage;
