"use client";
import React from "react";
import { colors } from "../style/theme";
import Link from "next/link";

const FamousShayariInfluencers = () => {
  const famousShayariInfluencers = [
    {
      name: "Manhar Seth",
      era: "Contemporary",
      description: "प्रेरणात्मक सकारात्मक शैली के शायर",
      imageUrl:
        "https://cdn2.allevents.in/transup/37/1dc2e7dad94a94853e176b3934d62a/images/manhar_seth_2374-mobile1710759381.jpeg",
    },
    {
      name: "Rajat Sood",
      era: "Contemporary",
      description: "युवा प्रतिभाशाली सोशल मीडिया शायर",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-93857402,width-400,resizemode-4/93857402.jpg",
    },
    {
      name: "Tehzeeb Hafi",
      era: "Contemporary",
      description: "गहरे भावनात्मक रोमांटिक शब्दों के जादूगर",
      imageUrl:
        "https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/tahzeeb-hafi.png",
    },
    {
      name: "Nayab Midha",
      era: "Contemporary",
      description: "आधुनिक नारीवादी दृष्टिकोण वाली शायरा",
      imageUrl:
        "https://yt3.googleusercontent.com/tmqr5cAewwMWDqAibo2CDJTGXExjaimSgetvxGES-YlpvFXtfXJnByakhPxbvZKePwmOyOYI=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      name: "Zakir Khan",
      era: "Contemporary",
      description: "हास्य और जीवन दर्शन मिश्रित",
      imageUrl:
        "https://ents24.imgix.net/image/000/475/864/7df5c132802d99234e31b5429e156979f68bebe0.jpg?auto=format&crop=faces&w=375&h=400&q=40",
    },
    {
      name: "Chetna Bahaar",
      era: "Contemporary",
      description: "भावनात्मक कथाओं की प्रतिभाशाली कवयित्री",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVwBSTzcMHBqWwJZGCQ8Qop5vf8ZUPwJUcMA&s",
    },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="roboto roboto-seven text-3xl md:text-4xl mb-3 text-white">
            Viral Shayari Sensations
          </h2>
          <p className="roboto roboto-four text-gray-400 max-w-2xl mx-auto">
            From YouTube shorts to sold-out live shows—these poets turned
            passion into fame.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {famousShayariInfluencers.map((influencer, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              style={{ border: `1px solid ${colors.lightPurple}33` }}
            >
              <img
                src={influencer.imageUrl}
                alt={influencer.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="roboto roboto-six text-xl text-white mb-2">
                {influencer.name}
              </h3>
              <p className="roboto roboto-four text-gray-400 mb-2">
                {influencer.era}
              </p>
              <p className="roboto roboto-five text-gray-300">
                {influencer.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="roboto roboto-five text-xl text-gray-300 mb-6">
            Imagine standing on India’s biggest shayari stage, your words
            captivating thousands, with legends watching in awe. With{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Shayriमंच
            </span>
            , rank among the Top 20 Shayars of the Year and perform live at our
            grand event—your spotlight awaits!
          </p>
          <Link
            href="/poetry"
            className="inline-block px-6 py-3 rounded-full roboto roboto-five text-white transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
              boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
            }}
          >
            Shine Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FamousShayariInfluencers;
