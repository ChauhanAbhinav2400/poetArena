"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { apiCall } from "../../api/fetchData";
import { colors } from "../../components/style/theme";
import { getItem } from "../../lib/localStorage";
import { toast } from "react-toastify";
import {
  API_ENDPOINTS,
  BASE_URL,
  TOKEN_KEY,
} from "../../lib/constants/constants";
import { UserPen, Instagram, Twitter, MessageCircle } from "lucide-react";
import EditProfileModal from "./components/EditProfileModal";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    country: "",
    email: "",
    instagramLink: "",
    twitterLink: "",
    whatsappNumber: "",
    poetries: [],
  });
  const [editProfile, setEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const userData = await apiCall({
          method: "GET",
          url: `${BASE_URL}${API_ENDPOINTS.GET_USER_PROFILE}`,
          headers: {
            Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
          },
        });

        // Mock poetries data (replace with actual API call if available)
        const poetriesData = [
          {
            id: 1,
            title: "Moonlit Whispers",
            content: "In the silence of the night, whispers take flight...",
            date: "2023-05-10",
          },
          {
            id: 2,
            title: "Echoes of the Soul",
            content: "Echoes resound, in the heart they're found...",
            date: "2023-06-15",
          },
        ];

        setProfileData({
          fullName: userData.data.fullName || "Unknown Poet",
          country: userData.data.country || "Not Specified",
          email: userData.data.email || "N/A",
          instagramLink: userData.data.instagramLink || "",
          twitterLink: userData.data.twitterLink || "",
          whatsappNumber: userData.data.whatsappNumber || "",
          poetries: userData.data.poetries,
          upiId: userData.data.upiId,
          paypalId: userData.data.paypalId,
        });
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const editProfileFunc = async (data) => {
    try {
      const response = await apiCall({
        method: "PUT",
        url: `${BASE_URL}${API_ENDPOINTS.UPDATE_USER_PROFILE}`,
        body: data,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });

      if (response) {
        toast.success("Profile Updated Successfully");
        const updatedData = await apiCall({
          method: "GET",
          url: `${BASE_URL}${API_ENDPOINTS.GET_USER_PROFILE}`,
          headers: {
            Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
          },
        });
        setProfileData({
          ...profileData,
          ...updatedData.data,
        });
        setEditProfile(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleSocialClick = (type) => {
    if (type === "whatsapp" && profileData.whatsappNumber) {
      window.open(`https://wa.me/${profileData.whatsappNumber}`, "_blank");
    } else if (type === "instagram" && profileData.instagramLink) {
      window.open(profileData.instagramLink, "_blank");
    } else if (type === "twitter" && profileData.twitterLink) {
      window.open(profileData.twitterLink, "_blank");
    } else {
      toast.info("No link available for this platform");
    }
  };

  return (
    <section className="py-12 mt-12 bg-gray-900 min-h-screen text-gray-300">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: colors.lightPurple }}
            ></div>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="mb-8 relative bg-gray-800 rounded-2xl shadow-lg p-6">
              <button
                onClick={handleEditProfile}
                className="absolute right-5 top-3 flex gap-2 px-3 py-1 cursor-pointer rounded-md border border-purple-500 hover:shadow-lg hover:scale-105 text-xs text-white"
              >
                <UserPen size={16} /> Edit
              </button>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.darkPurple}, ${colors.darkPink})`,
                  }}
                >
                  {profileData.fullName.charAt(0)}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {profileData.fullName}
                  </h1>
                  <p className="text-gray-400">{profileData.country}</p>
                  <p className="text-gray-400">{profileData.email}</p>
                  <div className="flex justify-center md:justify-start gap-4 mt-2">
                    {profileData.instagramLink && (
                      <button onClick={() => handleSocialClick("instagram")}>
                        <Instagram
                          size={20}
                          className="text-lightPurple cursor-pointer hover:text-darkPurple"
                        />
                      </button>
                    )}
                    {profileData.twitterLink && (
                      <button onClick={() => handleSocialClick("twitter")}>
                        <Twitter
                          size={20}
                          className="text-lightPurple cursor-pointer hover:text-darkPurple"
                        />
                      </button>
                    )}
                    {profileData.whatsappNumber && (
                      <button onClick={() => handleSocialClick("whatsapp")}>
                        <MessageCircle
                          size={20}
                          className="text-lightPurple cursor-pointer hover:text-darkPurple"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {editProfile && (
              <EditProfileModal
                isOpen={editProfile}
                onClose={() => setEditProfile(false)}
                onSubmit={editProfileFunc}
                data={profileData}
              />
            )}

            {/* Tabs */}
            <div className="mb-6 bg-gray-800 rounded-xl shadow-md p-1 flex flex-wrap">
              <button
                className={`px-5 py-3 rounded-lg cursor-pointer text-sm md:text-base transition-all ${
                  activeTab === "profile"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                style={{
                  background:
                    activeTab === "profile"
                      ? `linear-gradient(90deg, ${colors.darkPurple} 30%, ${colors.darkPink} 100%)`
                      : "transparent",
                }}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`px-5 py-3 rounded-lg cursor-pointer text-sm md:text-base transition-all ${
                  activeTab === "poetries"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                style={{
                  background:
                    activeTab === "poetries"
                      ? `linear-gradient(90deg, ${colors.darkPurple} 30%, ${colors.darkPink} 100%)`
                      : "transparent",
                }}
                onClick={() => setActiveTab("poetries")}
              >
                My Poetries
              </button>
            </div>

            {/* Content Section */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      About Me
                    </h3>
                    <p className="text-gray-400">
                      Name: {profileData?.fullName}
                    </p>
                    <p className="text-gray-400">
                      Country: {profileData?.country}
                    </p>
                    <p className="text-gray-400">Email: {profileData?.email}</p>
                  </div>

                  {/* Reward Section */}
                  <div
                    className="border-l-4 p-4 rounded-lg bg-gray-700"
                    style={{ borderColor: colors.lightPurple }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Support This Poet
                    </h3>
                    <p className="text-gray-300 mb-4">
                      If you like my content and find that my shayari adds value
                      and makes your time good, you can reward me!
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-400">
                        UPI ID: {profileData?.upiId || "Not set"}
                      </p>
                      <p className="text-gray-400">
                        PayPal: {profileData?.paypalId || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "poetries" && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    My Poetries
                  </h3>
                  {profileData?.poetries?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileData?.poetries?.map((poetry) => (
                        <div
                          key={poetry?._id}
                          className="bg-gray-700 p-4 rounded-lg shadow"
                        >
                          <h4 className="text-lg font-semibold text-white">
                            {poetry?.title}
                          </h4>
                          <div
                            className="text-gray-300 mb-4 poetry-content"
                            dangerouslySetInnerHTML={{
                              __html: poetry?.content,
                            }}
                          />
                          <p className="text-gray-500 text-sm mt-2">
                            {poetry?.createdAt?.slice(0, 10)}
                          </p>
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 text-yellow-400"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="text-gray-300">
                              {poetry?.likes}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center">
                      No poetries found. Start writing your masterpiece!
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
