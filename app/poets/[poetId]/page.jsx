"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { apiCall } from "../../../api/fetchData";
import { BASE_URL, TOKEN_KEY } from "../../../lib/constants/constants";
import { getItem } from "../../../lib/localStorage";
import {
  FaHeart,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaRupeeSign,
  FaPaypal,
  FaUser,
} from "react-icons/fa";

const PoetProfilePage = () => {
  const router = useRouter();
  const { poetId } = useParams(); // Get the poetName from the URL (e.g., "John-Doe")
  const poetName = poetId;
  const searchParams = useSearchParams(); // Get query parameters
  const id = searchParams.get("id"); // Get the poetId from the query (e.g., "67e2db10433feabfa637dd32")
  console.log(id, "id");
  const [poet, setPoet] = useState(null);
  const [poetries, setPoetries] = useState([]);
  const [selectedPoetry, setSelectedPoetry] = useState(null);

  useEffect(() => {
    if (!id) return; // Ensure poetId exists
    const fetchPoetProfile = async () => {
      try {
        const poetResponse = await apiCall({
          method: "GET",
          url: `${BASE_URL}/poet/${id}`,
          headers: {
            Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
          },
        });
        setPoet(poetResponse.data);

        const poetryResponse = await apiCall({
          method: "GET",
          url: `${BASE_URL}/poetry/user/${id}`,
          headers: {
            Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
          },
        });
        setPoetries(poetryResponse.data);

        // Set the first poetry as selected by default
        if (poetryResponse.data.length > 0) {
          setSelectedPoetry(poetryResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching poet profile:", error);
      }
    };

    fetchPoetProfile();
  }, [id]);

  if (!poet)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Profile Avatar and Social Links */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-800 to-pink-600 flex items-center justify-center text-6xl shadow-2xl mb-6">
              {poet?.fullName?.charAt(0)}
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mb-6">
              {poet?.socialAccounts?.twitter && (
                <a
                  href={poet.socialAccounts.twitter}
                  target="_blank"
                  className="text-yellow-400 text-2xl hover:text-red-400 transition-colors"
                >
                  <FaTwitter />
                </a>
              )}
              {poet.socialAccounts?.instagram && (
                <a
                  href={poet.socialAccounts.instagram}
                  target="_blank"
                  className="text-yellow-400 text-2xl hover:text-red-400 transition-colors"
                >
                  <FaInstagram />
                </a>
              )}
              {poet.socialAccounts?.linkedin && (
                <a
                  href={poet.socialAccounts.linkedin}
                  target="_blank"
                  className="text-yellow-400 text-2xl hover:text-red-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              {poet?.fullName}
            </h1>
            <p className="text-gray-300 mb-6">
              {poet.country || "No Country available."}
            </p>

            {/* Reward Section */}
            {(poet.upiId || poet.paypalId) && (
              <div className="bg-yellow-800 bg-opacity-20 p-6 rounded-xl border border-yellow-400 mb-6">
                <h3 className="text-xl text-yellow-400 mb-4 flex items-center gap-2">
                  <FaUser /> Reward this Poet
                </h3>
                {poet.upiId && (
                  <div className="flex items-center gap-2 text-white mb-2">
                    <FaRupeeSign />
                    <span>UPI ID: {poet.upiId}</span>
                  </div>
                )}
                {poet.paypalId && (
                  <div className="flex items-center gap-2 text-white">
                    <FaPaypal />
                    <span>PayPal ID: {poet.paypalId}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Poetries Section */}
        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          {/* Featured Poetry */}
          <div>
            <h2 className="text-3xl text-yellow-400 mb-6">Featured Poetry</h2>
            {selectedPoetry && (
              <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border-l-4 border-yellow-400">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  {selectedPoetry.title}
                </h3>
                <div
                  className="text-white prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPoetry.content }}
                />
                <div className="flex items-center gap-2 text-yellow-400 text-sm mt-4">
                  <FaHeart /> {selectedPoetry.likes}
                </div>
              </div>
            )}
          </div>

          {/* Poetry List */}
          <div>
            <h2 className="text-3xl text-yellow-400 mb-6">All Poetries</h2>
            <div className="space-y-4">
              {poetries?.map((poetry) => (
                <div
                  key={poetry._id}
                  onClick={() => setSelectedPoetry(poetry)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 
                    ${
                      selectedPoetry?._id === poetry._id
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    }`}
                >
                  <h3 className="text-xl font-bold mb-1">{poetry.title}</h3>
                  <p className="text-sm line-clamp-2 opacity-70">
                    {poetry.content.replace(/<[^>]*>/g, "")}
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <FaHeart
                      className={
                        selectedPoetry?._id === poetry._id
                          ? "text-gray-900"
                          : "text-yellow-400"
                      }
                    />
                    {poetry.likes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetProfilePage;
