"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { colors } from "@/components/style/theme";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  // Hero slides data for poets and readers
  const heroSlides = [
    {
      title: "Unleash Your Inner Shayar",
      subtitle: "A stage for poets to shine",
      description:
        "Step into the spotlight, share your shayari, and become the next poetic star.",
      image: "/images/poet-star.svg",
      color: colors.darkPurple,
    },
    {
      title: "Dive into Shayari Bliss",
      subtitle: "Explore emotions in verse",
      description:
        "Read heart-touching shayaris—heartbreak, motivation, humor, and more.",
      image: "/images/shayari-reader.svg",
      color: colors.darkPink,
    },
    {
      title: "Be the Voice of a Nation",
      subtitle: "Earn titles that echo",
      description:
        "Rise to 'Shayar of the Month' or 'Poet of the Year' with your words.",
      image: "/images/poet-award.svg",
      color: "#5E60CE",
    },
  ];

  // Sample top shayaris data
  const topShayaris = [
    {
      id: 1,
      text: "Dil ke zakhm chhupaaye baitha hoon,\nTere bina bhi jeeye ja raha hoon.",
      poet: "Mirza Aadil",
      category: "Heartbreak",
      likes: 1245,
      poetLink: "/poets/mirza-aadil",
    },
    {
      id: 2,
      text: "Zindagi ek safar hai suhana,\nHar kadam pe hai nayaa thikana.",
      poet: "Neha Sharma",
      category: "Motivational",
      likes: 987,
      poetLink: "/poets/neha-sharma",
    },
    {
      id: 3,
      text: "Hansi se dard chhupa liya,\nDuniya ko bewakoof bana diya.",
      poet: "Rahul Khan",
      category: "Funny",
      likes: 876,
      poetLink: "/poets/rahul-khan",
    },
    {
      id: 4,
      text: "Mohabbat mein junoon hai mera,\nHar saans tera naam le mera.",
      poet: "Sana Qureshi",
      category: "Love",
      likes: 754,
      poetLink: "/poets/sana-qureshi",
    },
  ];

  // Top poets data
  const topPoets = [
    {
      id: 1,
      name: "Mirza Aadil",
      likes: 5421,
      country: "India",
      profileLink: "/poets/mirza-aadil",
    },
    {
      id: 2,
      name: "Neha Sharma",
      likes: 4890,
      country: "India",
      profileLink: "/poets/neha-sharma",
    },
    {
      id: 3,
      name: "John Keats Jr.",
      likes: 4500,
      country: "USA",
      profileLink: "/poets/john-keats-jr",
    },
    {
      id: 4,
      name: "Sana Qureshi",
      likes: 4200,
      country: "Pakistan",
      profileLink: "/poets/sana-qureshi",
    },
  ];

  // Autoplay for hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <main className="pt-16   text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 z-10">
              <h1 className="roboto roboto-eight text-4xl md:text-5xl lg:text-6xl mb-4">
                Poet
                <span
                  className="ml-2"
                  style={{
                    background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Arena
                </span>
              </h1>
              <p className="roboto roboto-five text-xl text-gray-300 mb-6">
                Where words weave emotions and poets rise to stardom
              </p>
              <div className="relative h-64 mb-8">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                      activeSlide === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                    }`}
                  >
                    <h2
                      className="roboto roboto-six text-2xl md:text-3xl mb-3"
                      style={{ color: slide.color }}
                    >
                      {slide.title}
                    </h2>
                    <h3 className="roboto roboto-five text-xl text-gray-200 mb-3">
                      {slide.subtitle}
                    </h3>
                    <p className="roboto roboto-four text-gray-400 mb-6 max-w-lg">
                      {slide.description}
                    </p>
                    <Link
                      href={
                        index === 0
                          ? "/submit-shayari"
                          : index === 1
                          ? "/explore"
                          : "/awards"
                      }
                      className="inline-block px-6 py-3 rounded-full cursor-pointer text-white roboto roboto-five transition-transform hover:scale-105"
                      style={{
                        background: `linear-gradient(90deg, ${slide.color}, ${
                          index === 0 ? colors.darkPurple : colors.darkPink
                        })`,
                        boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
                      }}
                    >
                      {index === 0
                        ? "Share Your Verse"
                        : index === 1
                        ? "Read Now"
                        : "Claim Your Title"}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                      activeSlide === index
                        ? "w-8 bg-darkPurple"
                        : "bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative h-64 md:h-96">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeSlide === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-12"
                  }`}
                >
                  <div className="w-full h-full relative flex items-center justify-center">
                    <div
                      className="w-48 h-48 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${slide.color}33, ${colors.darkPink}33)`,
                        border: `2px solid ${slide.color}66`,
                      }}
                    >
                      <span className="text-6xl" style={{ color: slide.color }}>
                        {index === 0 ? "✍️" : index === 1 ? "📖" : "🏆"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-b from-darkPurple to-transparent opacity-30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      </section>

      {/* Top Shayaris Section (Infinite Scroll) */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="roboto roboto-seven text-3xl md:text-4xl mb-3">
              Trending Shayaris
            </h2>
            <p className="roboto roboto-four text-gray-400 max-w-2xl mx-auto">
              The most loved verses from our poetic community—scroll to feel the
              rhythm.
            </p>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {topShayaris?.map((shayari, index) => (
              <div
                key={shayari.id}
                className="min-w-[300px] max-w-[300px] snap-start rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
                style={{
                  background:
                    index % 5 === 0
                      ? `linear-gradient(135deg, ${colors.darkPurple}aa, ${colors.darkPink}aa)`
                      : index % 5 === 1
                      ? `radial-gradient(circle, ${colors.darkPink}cc, ${colors.darkPurple}cc)`
                      : index % 5 === 2
                      ? `linear-gradient(to bottom, ${colors.darkPurple}dd, ${colors.gray})`
                      : index % 5 === 3
                      ? `linear-gradient(45deg, ${colors.darkPink}bb, ${colors.darkPurple}bb)`
                      : `radial-gradient(ellipse, ${colors.lightPurple}aa, ${colors.darkPurple}aa)`,
                  border: `1px solid ${colors.lightPurple}33`,
                }}
              >
                <div className="p-6 text-center">
                  <p
                    className="roboto roboto-five text-lg text-white whitespace-pre-line mb-4"
                    style={{
                      fontStyle: index % 5 === 2 ? "italic" : "normal",
                      textShadow:
                        index % 5 === 4
                          ? "0 0 10px rgba(255,255,255,0.2)"
                          : "none",
                    }}
                  >
                    {shayari.text}
                  </p>
                  <p className="roboto roboto-four text-sm text-gray-300">
                    - {shayari.poet}
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-400"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="text-gray-300">{shayari.likes}</span>
                    </div>
                    <Link
                      href={shayari.poetLink}
                      className="text-sm roboto roboto-five"
                      style={{ color: colors.darkPink }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full roboto roboto-five text-white transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
              }}
            >
              <span>Explore All Shayaris</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Poets Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="roboto roboto-seven text-3xl md:text-4xl mb-3">
              Top Poets of the Month
            </h2>
            <p className="roboto roboto-four text-gray-400 max-w-2xl mx-auto">
              Meet the shayars who’ve captured hearts with their verses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPoets.map((poet) => (
              <div
                key={poet.id}
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
                    {poet.name[0]}
                  </span>
                </div>
                <h3 className="roboto roboto-six text-xl text-white mb-2">
                  {poet.name}
                </h3>
                <p className="roboto roboto-four text-gray-400 mb-2">
                  {poet.country}
                </p>
                <p className="roboto roboto-five text-yellow-400">
                  {poet.likes} Likes
                </p>
                <Link
                  href={poet.profileLink}
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

      {/* Benefits for New Shayars */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <span
                className="inline-block px-4 py-1 rounded-full mb-4 text-sm"
                style={{
                  background: `${colors.lightPurple}30`,
                  color: colors.darkPurple,
                }}
              >
                For Aspiring Poets
              </span>
              <h2 className="roboto roboto-seven text-3xl md:text-4xl lg:text-5xl mb-6">
                Rise as the Next
                <span
                  style={{
                    background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                  className="ml-2"
                >
                  Shayar Star
                </span>
              </h2>
              <p className="roboto roboto-four text-gray-300 text-lg mb-8 max-w-xl">
                Share your verses, connect with fans, and turn your passion into
                a legacy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${colors.darkPurple}22`,
                    border: `1px solid ${colors.lightPurple}33`,
                  }}
                >
                  <h3 className="roboto roboto-six text-lg mb-2">
                    Showcase Talent
                  </h3>
                  <p className="text-sm text-gray-400">
                    Post your shayaris and let the world admire your craft.
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${colors.darkPink}22`,
                    border: `1px solid ${colors.lightPink}33`,
                  }}
                >
                  <h3 className="roboto roboto-six text-lg mb-2">
                    Gain Recognition
                  </h3>
                  <p className="text-sm text-gray-400">
                    Earn titles like ‘Shayar of the Month’ or ‘Poet of the
                    Year’.
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${colors.darkPurple}22`,
                    border: `1px solid ${colors.lightPurple}33`,
                  }}
                >
                  <h3 className="roboto roboto-six text-lg mb-2">
                    Build a Fanbase
                  </h3>
                  <p className="text-sm text-gray-400">
                    Share your profile link and connect with poetry lovers.
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${colors.darkPink}22`,
                    border: `1px solid ${colors.lightPink}33`,
                  }}
                >
                  <h3 className="roboto roboto-six text-lg mb-2">
                    Event Invites
                  </h3>
                  <p className="text-sm text-gray-400">
                    Get invited to poetry shows and live events by admirers.
                  </p>
                </div>
              </div>
              <Link
                href="/join-as-poet"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full text-white roboto roboto-five transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                  boxShadow: `0 8px 16px -4px ${colors.darkPurple}50`,
                }}
              >
                <span>Start Your Journey</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div
                  className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20 blur-3xl"
                  style={{ background: colors.darkPurple }}
                ></div>
                <div
                  className="bg-gray-800 p-6 rounded-xl shadow-xl"
                  style={{ border: `2px solid ${colors.darkPink}33` }}
                >
                  <p className="roboto roboto-five text-lg text-white italic text-center">
                    "Kalam se dil tak ka safar,\nShayariVerse banaye ek nayaa
                    asar."
                  </p>
                  <p className="text-center text-gray-400 mt-4">
                    - Your Name Here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
