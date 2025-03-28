"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { colors } from "@/components/style/theme";
import {
  SparklesIcon,
  PenToolIcon,
  UsersIcon,
  CalendarIcon,
  HeartIcon,
  AwardIcon,
} from "lucide-react";
import { API_ENDPOINTS, BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";
import { getItem } from "@/lib/localStorage";
import { toast } from "react-toastify";
import { apiCall } from "@/api/fetchData";
import domtoimage from "dom-to-image";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [topShayaris, setTopShayaris] = useState([]);
  const [topPoets, setTopPoets] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef(null);

  const copyToClipboard = (shayri: string) => {
    const text = `${shayri?.replace(/<[^>]*>/g, "")}\n`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  console.log("topPoets", topPoets);

  const heroSlides = [
    {
      title: "Shayriमंच – A Stage for Every Poet",
      subtitle: "जहाँ हर शब्द एहसास बन जाता है",
      description:
        "Express your emotions through words, share your shayari, and let the world feel your poetry.",
      image: "/images/poet-star.svg",
      color: colors.darkPurple,
      id: 1,
    },
    {
      title: "Dive into the World of Shayari",
      subtitle: "हर जज़्बात के लिए एक शायरी",
      description:
        "Read soulful poetry—love, heartbreak, inspiration, humor, and more, only on Shayriमंच.",
      image: "/images/shayari-reader.svg",
      color: colors.darkPink,
      id: 2,
    },
    {
      title: "Let Your Words Make History",
      subtitle: "बनें 'Shayar of the Month' या 'Poet of the Year'",
      description:
        "Shayriमंच gives you the platform to rise, shine, and earn prestigious titles with your poetry.",
      image: "/images/poet-award.svg",
      color: "#5E60CE",
      id: 3,
    },
  ];

  // Top poets data
  // const topPoets = [
  //   {
  //     id: 1,
  //     name: "Mirza Aadil",
  //     likes: 5421,
  //     country: "India",
  //     profileLink: "/poets/mirza-aadil",
  //   },
  //   {
  //     id: 2,
  //     name: "Neha Sharma",
  //     likes: 4890,
  //     country: "India",
  //     profileLink: "/poets/neha-sharma",
  //   },
  //   {
  //     id: 3,
  //     name: "John Keats Jr.",
  //     likes: 4500,
  //     country: "USA",
  //     profileLink: "/poets/john-keats-jr",
  //   },
  //   {
  //     id: 4,
  //     name: "Sana Qureshi",
  //     likes: 4200,
  //     country: "Pakistan",
  //     profileLink: "/poets/sana-qureshi",
  //   },
  // ];

  const testimonials = [
    {
      quote:
        "Shayri मंच transformed my poetry journey with its supportive community and innovative tools!",
      author: "Neha Patel",
      role: "Aspiring Poet",
      id: 1,
    },
    {
      quote:
        "The monthly challenges and virtual events keep me inspired and connected to poets worldwide.",
      author: "Sameer Khan",
      role: "Published Poet",
      id: 2,
    },
    {
      quote:
        "A platform that truly understands the soul of Shayari and nurtures creativity.",
      author: "Priyanka Das",
      role: "Poetry Enthusiast",
      id: 3,
    },
  ];

  const quickStats = [
    { icon: UsersIcon, value: "10K+", label: "Poets" },
    { icon: PenToolIcon, value: "50K+", label: "Poems" },
    { icon: HeartIcon, value: "1M+", label: "Likes" },
  ];

  const getname = (name: string) => {
    const poetNameSlug = name.toLowerCase().replace(/\s+/g, "-");
    return poetNameSlug;
  };

  const featuredPoem = {
    title: "Whispers of the Soul",
    author: "Arjun Mehra",
    excerpt:
      "In the silence of the night, my heart speaks, a melody of stars, a whisper of dreams...",
    link: "#",
  };
  // Autoplay for hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  async function fetchPoetries() {
    try {
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}${API_ENDPOINTS.GET_POETRIES}?page=1&limit=10`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setTopShayaris(response.data || []);
    } catch (error) {
      console.error("Failed to fetch poetries:", error);
      toast.error("Failed to load poetries");
    } finally {
    }
  }

  const fetchTopPoets = async () => {
    try {
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}/top-poets/monthly`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });

      setTopPoets(response.data);
    } catch (error) {
      console.error(`Error fetching top poets for monthly:`, error);
    }
  };

  useEffect(() => {
    fetchPoetries();
    fetchTopPoets();
  }, []);

  return (
    <main className="pt-20  text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 z-10">
              <h1 className="roboto roboto-eight text-4xl md:text-5xl lg:text-6xl mb-4">
                Shayri
                <span
                  className="ml-2"
                  style={{
                    background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  मंच
                </span>
              </h1>
              <p className="roboto roboto-five text-xl text-gray-300 mb-6">
                A place where poetry finds its voice, और शायर को मिलता है उसका
                मंच।
              </p>
              <div className="relative h-64 mb-8">
                {heroSlides?.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                      activeSlide === index
                        ? "opacity-100 z-50 translate-y-0"
                        : "opacity-0 z-0 translate-y-12"
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
                        Number(slide.id) === 1
                          ? "/poetry"
                          : Number(slide.id) === 2
                          ? "/poetry"
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
                      {slide.id === 1
                        ? "Share Your Verse"
                        : slide.id === 2
                        ? "Read Now"
                        : "Claim Your Title"}
                    </Link>
                  </div>
                ))}
              </div>
              {/* <div className="flex gap-2 mt-4">
                {heroSlides?.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                      activeSlide === index
                        ? "w-8 bg-darkPurple"
                        : "bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
            <div className="w-full lg:w-1/2 relative h-64 md:h-96">
              {heroSlides?.map((slide, index) => (
                <div
                  key={slide?.id}
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
            className="flex gap-6 overflow-x-auto  pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {topShayaris?.map((shayari, index) => (
              <div
                ref={cardRef}
                className="min-w-[380px] max-w-[380px] snap-start rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col"
                style={{
                  background:
                    index % 5 === 0
                      ? `linear-gradient(135deg, ${colors.darkPurple}aa, ${colors.darkPink}aa)`
                      : index % 5 === 1
                      ? `radial-gradient(circle, ${colors.darkPink}cc, ${colors.darkPurple}cc)`
                      : index % 5 === 2
                      ? `radial-gradient(ellipse, ${colors.lightPurple}, ${colors.darkPurple})`
                      : index % 5 === 3
                      ? `linear-gradient(45deg, ${colors.darkPink}bb, ${colors.darkPurple}bb)`
                      : `radial-gradient(ellipse, ${colors.lightPurple}, ${colors.darkPurple})`,
                  border: `1px solid ${colors.lightPurple}33`,
                  height: "400px",
                }}
              >
                <div className="p-6 text-center flex flex-col h-full">
                  <div
                    className="roboto roboto-five text-lg text-white whitespace-pre-line mb-4 flex-grow overflow-y-auto custom-scrollbar"
                    style={{
                      fontStyle: index % 5 === 2 ? "italic" : "normal",
                      textShadow:
                        index % 5 === 4
                          ? "0 0 10px rgba(255,255,255,0.2)"
                          : "none",
                    }}
                  >
                    <div
                      className="text-gray-300 poetry-content"
                      dangerouslySetInnerHTML={{ __html: shayari?.content }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <p className="roboto roboto-four text-sm text-gray-300 mb-4">
                      - {shayari?.posterName}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-400"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-gray-300">{shayari?.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(shayari?.content)}
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
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          )}
                        </button>
                        {/* <button
                          onClick={() => downloadCard(shayari?.title)}
                          className="text-gray-400 hover:text-white cursor-pointer"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                          </svg>
                        </button> */}
                        <Link
                          href={`/poetry/${shayari._id}`}
                          className="text-sm roboto roboto-five"
                          style={{ color: colors.darkPink }}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <style jsx>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${colors.darkPurple};
                    border-radius: 4px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${colors.lightPurple};
                    border-radius: 4px;
                    border: 1px solid ${colors.darkPink};
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${colors.darkPink};
                  }
                `}</style>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/poetry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full roboto roboto-five text-white transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(90deg, ${colors.darkPurple}, ${colors.darkPink})`,
                boxShadow: `0 4px 14px rgba(106, 90, 205, 0.25)`,
              }}
            >
              <span>Post & Explore Shayaris</span>
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

      {/* Benefits for New Shayars */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <p className="text-sm text-gray-400 mb-2">For Aspiring Poets</p>
            <h1 className="text-5xl md:text-6xl py-2 font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Rise as the Next Shayari Star
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Share your verses, connect with fans, and turn your passion into a
              legacy.
            </p>
            <button
              className="
              bg-gradient-to-r from-purple-600 to-pink-600 
              text-white font-bold py-4 px-8 rounded-full 
              text-xl hover:from-purple-700 hover:to-pink-700 
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-2xl
            "
            >
              Start Your Journey
            </button>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: SparklesIcon,
                title: "Showcase Talent",
                desc: "Post your shayari and let the world admire your craft.",
              },
              {
                icon: AwardIcon,
                title: "Gain Recognition",
                desc: "Earn titles like 'Shayar of the Month' or 'Poet of the Year'.",
              },
              {
                icon: UsersIcon,
                title: "Build a Fanbase",
                desc: "Share your profile link and connect with poetry lovers.",
              },
              {
                icon: CalendarIcon,
                title: "Event Invites",
                desc: "Get admired in poetry shows and live events by admirers.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <benefit.icon className="w-8 h-8 mb-4 text-purple-400" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          {/* <div className="grid md:grid-cols-3 gap-6 mb-16">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-pink-400" />
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div> */}

          {/* Featured Poem */}
          <div className="bg-gray-800 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Featured Poem of the Week
            </h2>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-2">
                {featuredPoem.title}
              </h3>
              <p className="text-gray-400 mb-4">by {featuredPoem.author}</p>
              <p className="text-gray-300 italic max-w-xl mx-auto mb-6">
                "{featuredPoem.excerpt}"
              </p>
              <a
                href={featuredPoem.link}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Read Full Poem
              </a>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
                Voices of Our Community
              </h2>
              <div className="bg-gray-800 rounded-xl p-6">
                <p className="text-xl text-gray-300 italic mb-4">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <p className="text-gray-400">
                  - {testimonials[activeTestimonial].author},{" "}
                  <span className="text-gray-500">
                    {testimonials[activeTestimonial].role}
                  </span>
                </p>
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials?.map((item, index) => (
                    <button
                      key={item.id}
                      className={`w-3 h-3 rounded-full ${
                        activeTestimonial === index
                          ? "bg-purple-400"
                          : "bg-gray-600"
                      }`}
                      onClick={() => setActiveTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Join a Global Community
                </h3>
                <p className="text-gray-300 mb-6">
                  Connect with poets from over 10+ countries, share your work,
                  and grow together.
                </p>
                <Link
                  href={"/poets"}
                  className="bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition-colors"
                >
                  Explore Community
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action Banner */}
          <div className="bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Share Your Shayari?
            </h2>
            <p className="text-gray-200 mb-6">
              Sign up today and start your journey to becoming the next Shayari
              star.
            </p>
            <Link
              href={"/auth/signup"}
              className="
              bg-white text-purple-700 font-bold py-3 px-8 rounded-full 
              hover:bg-gray-100 transition-all duration-300 transform hover:scale-105
            "
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
