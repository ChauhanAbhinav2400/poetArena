"use client";
import React from "react";
import { colors } from "../style/theme";
import Link from "next/link";

const LegendaryShayars = () => {
  const legendaryShayars = [
    {
      name: "Mirza Ghalib",
      era: "1797-1869",
      description: "उर्दू शायरी के महान उस्ताद",
      imageUrl:
        "https://s.saregama.tech/image/c/m/0/ea/ec/mirza-ghalib_1500x1500_1631895506.jpg",
    },
    {
      name: "Faiz Ahmed Faiz",
      era: "1911-1984",
      description: "क्रांतिकारी रोमांटिक प्रगतिशील शायर",
      imageUrl:
        "https://fl-i.thgim.com/public/the-nation/qzavjd/article30543236.ece/alternates/FREE_1200/FL31FAIZPOET",
    },
    {
      name: "Gulzar",
      era: "1934-present",
      description: "लिरिकल दृश्यात्मक समकालीन कवि",
      imageUrl:
        "https://static.wixstatic.com/media/75e611_3e6e75ce29ef43989ba4b6904d7a2777~mv2.jpg/v1/fill/w_800,h_800,al_c,q_85/Gulzar.jpg",
    },
    {
      name: "Jaun Elia",
      era: "1931-2002",
      description: "उदास दार्शनिक अपरंपरागत विचारक",
      imageUrl:
        "https://poetistic.com/_ipx/f_webp,s_360x360/https://d1a1sxzos5rrmb.cloudfront.net/writers-profile/8H9ANj3IL8w3dUmKhfilSpF5AbjmSe5WFhOGRxj0.jpeg",
    },
    {
      name: "Rahat Indori",
      era: "1950-2020",
      description: "शक्तिशाली राजनीतिक मंच शायर",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKswVn1k8bSAClQPcgWtvxtns_Y7npKPamGA&s",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="roboto roboto-seven text-3xl md:text-4xl mb-3 text-white">
            Legends of Shayari
          </h2>
          <p className="roboto roboto-four text-gray-400 max-w-2xl mx-auto">
            These icons carved their names in history with ink and soul—without
            a platform like today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {legendaryShayars.map((shayar, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              style={{ border: `1px solid ${colors.lightPurple}33` }}
            >
              <img
                src={shayar.imageUrl}
                alt={shayar.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="roboto roboto-six text-xl text-white mb-2">
                {shayar.name}
              </h3>
              <p className="roboto roboto-four text-gray-400 mb-2">
                {shayar.era}
              </p>
              <p className="roboto roboto-five text-gray-300">
                {shayar.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="roboto roboto-five text-xl text-gray-300 mb-6">
            In their time, reaching an audience meant years of struggle. Today,
            with{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Shayriमंच
            </span>
            , your voice can echo to millions in moments. Become the next
            shayari star!
          </p>
          <Link
            href="/poetry"
            className="inline-block px-6 py-3 rounded-full roboto roboto-five text-white transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
              boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
            }}
          >
            Start Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LegendaryShayars;
