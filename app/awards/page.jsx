"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { colors } from "../../components/style/theme";
import { apiCall } from "../../api/fetchData";
import { getItem } from "../../lib/localStorage";
import { TOKEN_KEY, BASE_URL } from "../../lib/constants/constants";

const AwardsPage = () => {
  const router = useRouter();
  const [topPoets, setTopPoets] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [topShayaris, setTopShayaris] = useState({
    month: [],
  });

  useEffect(() => {
    fetchAwardsData();
  }, []);

  const fetchAwardsData = async () => {
    try {
      // Fetch top poets
      const poetPeriods = ["weekly", "monthly", "yearly"];
      for (const period of poetPeriods) {
        const poetResponse = await apiCall({
          method: "GET",
          url: `${BASE_URL}/top-poets/${period}`,
          headers: { Authorization: `Bearer ${getItem(TOKEN_KEY)}` },
        });
        setTopPoets((prev) => ({
          ...prev,
          [period]: poetResponse.data.slice(0, 3),
        }));
      }

      // Fetch top shayaris (monthly only)
      const shayariResponse = await apiCall({
        method: "GET",
        url: `${BASE_URL}/top-poetries`,
        headers: { Authorization: `Bearer ${getItem(TOKEN_KEY)}` },
        params: { limit: 3, period: "monthly" }, // Adjusted to fetch only monthly
      });
      setTopShayaris({
        month: shayariResponse.data.slice(0, 3) || [],
      });
    } catch (error) {
      console.error("Failed to fetch awards data:", error);
    }
  };

  const handlePoetClick = (poetId, name) => {
    const poetNameSlug = name?.toLowerCase().replace(/\s+/g, "-");
    router.push(`/poets/${poetNameSlug}?id=${poetId}`);
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h1
        className="text-4xl font-bold text-center text-white mb-12"
        style={{ textShadow: `0 0 10px ${colors.lightPurple}` }}
      >
        Awards Hall of Fame
      </h1>

      {/* How to Win Section */}
      <div className="mb-16">
        <h2
          className="text-3xl font-semibold text-center text-white mb-8"
          style={{ color: colors.lightPurple }}
        >
          How to Win an Award
        </h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          <StepCard
            step={1}
            title="Share Your Shayri"
            description="Create and post your original shayri on our platform to start gaining attention."
          />
          <StepCard
            step={2}
            title="Get Likes"
            description="Encourage users to like your shayri. More likes increase your chances of winning!"
          />
          <StepCard
            step={3}
            title="Win Awards"
            description="Top shayars with the most likes win weekly, monthly, or yearly awards."
          />
        </div>
      </div>

      {/* Shayar Awards */}
      {["weekly", "monthly", "yearly"].map((period) => (
        <AwardSection
          key={`shayar-${period}`}
          title={`${
            period === "monthly"
              ? `Shayar's of the ${
                  period.charAt(0).toUpperCase() + period.slice(1, 5)
                }`
              : `Shayar's of the ${
                  period.charAt(0).toUpperCase() + period.slice(1, 4)
                }`
          }`}
          items={topPoets[period]}
          renderItem={(poet, index) => (
            <PoetAwardCard
              poet={poet}
              rank={index + 1}
              onClick={() => handlePoetClick(poet._id, poet.fullName)}
            />
          )}
        />
      ))}

      {/* Shayri Awards (Monthly Only) */}
      {["month"].map((period) => (
        <AwardSection
          key={`shayri-${period}`}
          title={`Shayri's of the ${
            period.charAt(0).toUpperCase() + period.slice(1, 5)
          }`}
          items={topShayaris[period]}
          renderItem={(shayari, index) => (
            <ShayriAwardCard shayari={shayari} rank={index + 1} />
          )}
        />
      ))}

      <style jsx>{`
        .award-section {
          background: linear-gradient(
            135deg,
            ${colors.darkPurple}20,
            ${colors.darkPink}20
          );
          border: 2px solid ${colors.lightPurple}40;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        .award-section:hover {
          box-shadow: 0 6px 20px ${colors.lightPurple}40;
        }
        .step-card {
          background: ${colors.darkPurple}40;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s ease;
        }
        .step-card:hover {
          transform: translateY(-5px);
        }
        @media (max-width: 768px) {
          .step-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

const StepCard = ({ step, title, description }) => (
  <div className="step-card">
    <div
      className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold text-white"
      style={{ background: colors.darkPink }}
    >
      {step}
    </div>
    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

const AwardSection = ({ title, items, renderItem }) => (
  <div className="award-section mb-12 p-6">
    <h2
      className="text-2xl font-semibold text-white mb-6 text-center"
      style={{ color: colors.lightPurple }}
    >
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items?.map((item, index) => renderItem(item, index))}
    </div>
  </div>
);

const PoetAwardCard = ({ poet, rank, onClick }) => (
  <div
    className="relative bg-gray-800 rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
    onClick={onClick}
    style={{
      border: `2px solid ${
        rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : "#CD7F32"
      }`,
      boxShadow: `0 0 15px ${
        rank === 1 ? "#FFD70040" : rank === 2 ? "#C0C0C040" : "#CD7F3240"
      }`,
    }}
  >
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold">
      {rank}
    </div>
    <div
      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl text-white"
      style={{
        background: `linear-gradient(135deg, ${colors.darkPurple}, ${colors.darkPink})`,
      }}
    >
      {poet?.fullName?.charAt(0)}
    </div>
    <h3 className="text-lg font-medium text-white mb-2">{poet.fullName}</h3>
    <p className="text-gray-300 text-sm mb-2">{poet.country || "Unknown"}</p>
    <p className="text-gray-400 text-sm">Total Likes: {poet.totalLikes}</p>
  </div>
);

const ShayriAwardCard = ({ shayari, rank }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const text = `${shayari.title}\n\n${shayari.content.replace(
      /<[^>]*>/g,
      ""
    )}\n\nBy: ${shayari.posterName}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="relative bg-gray-800 rounded-lg p-4 transform hover:scale-105 transition-all duration-300"
      style={{
        border: `2px solid ${
          rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : "#CD7F32"
        }`,
        boxShadow: `0 0 15px ${
          rank === 1 ? "#FFD70040" : rank === 2 ? "#C0C0C040" : "#CD7F3240"
        }`,
      }}
    >
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold">
        {rank}
      </div>
      <Link href={`/poetry/${shayari._id}`}>
        <h3 className="text-lg font-medium text-white mb-2 hover:text-lightPurple">
          {shayari.title}
        </h3>
      </Link>
      <div
        className="text-gray-300 text-sm mb-4 h-24 overflow-y-auto custom-scrollbar"
        dangerouslySetInnerHTML={{ __html: shayari.content }}
      />
      <p className="text-gray-400 text-sm mb-2">By: {shayari.posterName}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Likes: {shayari.likes}</span>
        <button
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
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default AwardsPage;
