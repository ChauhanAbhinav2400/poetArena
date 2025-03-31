"use client";

import React, { useEffect, useState } from "react";
import { colors } from "../style/theme";
import Link from "next/link";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";
import { getItem } from "@/lib/localStorage";
import { apiCall } from "@/api/fetchData";

const TopPoets = () => {
  const [topPoets, setTopPoets] = useState([]);

  const getname = (name) => {
    const poetNameSlug = name.toLowerCase().replace(/\s+/g, "-");
    return poetNameSlug;
  };

  const fetchTopPoets = async () => {
    try {
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}/top-poets/monthly`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching top poets for monthly:`, error);
    }
  };

  useEffect(() => {
    fetchTopPoets().then((resp) => {
      setTopPoets(resp);
    });
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="roboto roboto-seven text-3xl md:text-4xl mb-3">
            Top Shayar of the Month
          </h2>
          <p className="roboto roboto-four text-gray-400 max-w-2xl mx-auto">
            Meet the shayars who’ve captured hearts with their verses.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPoets?.map((poet, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              style={{ border: `1px solid ${colors.lightPurple}33` }}
            >
              <div
                className="w-24 h-24 mx-auto rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${colors.darkPurple}, ${colors.darkPink})`,
                }}
              >
                <span className="text-4xl text-white flex items-center justify-center h-full">
                  {poet?.fullName[0]}
                </span>
              </div>
              <h3 className="roboto roboto-six text-xl text-white mb-2">
                {poet?.fullName}
              </h3>
              <p className="roboto roboto-four text-gray-400 mb-2">
                {poet?.country}
              </p>
              <p className="roboto roboto-five text-yellow-400">
                {poet?.totalLikes} Likes
              </p>

              <Link
                href={`/poets/${getname(poet?.fullName)}?id=${poet?._id}`}
                className="inline-block mt-4 text-sm roboto roboto-five"
                style={{ color: colors.darkPink }}
              >
                Visit Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPoets;
