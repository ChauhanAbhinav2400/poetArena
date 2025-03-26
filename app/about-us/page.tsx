"use client";

import React, { useState } from "react";
import {
  BookOpenIcon,
  StarIcon,
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  PenToolIcon,
  GlobeIcon,
  AwardIcon,
  CalendarIcon,
  MessageSquareIcon,
  VideoIcon,
} from "lucide-react";
import { colors } from "@/components/style/theme";
import Link from "next/link";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const sections = [
    {
      icon: BookOpenIcon,
      title: "Our Vision",
      content:
        "Shayri मंच is a digital sanctuary for poets, where every word is a brushstroke painting emotions, and every verse is a journey through the landscape of human experience. We aim to preserve the rich heritage of Shayari while embracing contemporary expressions and fostering a global poetic renaissance.",
      color: "text-purple-400",
    },
    {
      icon: StarIcon,
      title: "Our Mission",
      content:
        "To create a vibrant, inclusive platform that empowers poets of all levels, celebrates the art of Shayari, and connects creative souls across boundaries. We strive to nurture talent, provide cutting-edge tools, and cultivate a space where poetry flourishes in all its forms.",
      color: "text-pink-400",
    },
    {
      icon: UsersIcon,
      title: "Community",
      content:
        "We believe in the power of collective creativity. Our platform is more than a website - it's a thriving community where poets find inspiration, support, and a stage to shine. Join thousands of poetry enthusiasts worldwide in our daily writing circles and poetry exchanges.",
      color: "text-blue-400",
    },
    {
      icon: SparklesIcon,
      title: "Innovation",
      content:
        "Bridging traditional Shayari with modern digital expression, we provide tools and opportunities for poets to explore, share, and grow their craft. From AI-assisted writing to virtual poetry events and interactive workshops, we're redefining poetic expression for the digital age.",
      color: "text-green-400",
    },
  ];

  const stats = [
    { icon: HeartIcon, value: "100+", label: "Active Poets" },
    { icon: PenToolIcon, value: "1K+", label: "Poems Shared" },
    { icon: GlobeIcon, value: "10+", label: "Countries" },
    { icon: AwardIcon, value: "50+", label: "Awards Given" },
  ];

  const testimonials = [
    {
      quote:
        "Shayri मंच transformed my poetry journey with its supportive community and innovative tools!",
      author: "Neha Patel",
      role: "Aspiring Poet",
    },
    {
      quote:
        "The monthly challenges and virtual events keep me inspired and connected to poets worldwide.",
      author: "Sameer Khan",
      role: "Published Poet",
    },
    {
      quote:
        "A platform that truly understands the soul of Shayari and nurtures creativity.",
      author: "Priyanka Das",
      role: "Poetry Enthusiast",
    },
  ];

  const upcomingEvents = [
    { date: "Apr 5", title: "Spring Poetry Slam", icon: CalendarIcon },
    { date: "Apr 15", title: "Shayari Workshop", icon: PenToolIcon },
    { date: "Apr 25", title: "Virtual Open Mic", icon: VideoIcon },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="roboto roboto-eight text-4xl  lg:text-5xl mb-4">
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where words dance, emotions sing, and poetry becomes a bridge
            between hearts
          </p>
          <p className="text-gray-400 mt-2">
            Established 2025 | Serving Global Poets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sections Grid */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`
                  p-6 rounded-xl transition-all duration-300 ease-in-out
                  ${
                    activeSection === index
                      ? "bg-gray-700 scale-105 shadow-2xl"
                      : "bg-gray-800 hover:bg-gray-700"
                  }
                  cursor-pointer
                `}
                onClick={() =>
                  setActiveSection(activeSection === index ? null : index)
                }
              >
                <div className="flex items-center mb-4">
                  <section.icon className={`w-10 h-10 mr-4 ${section.color}`} />
                  <h3 className="text-2xl font-semibold">{section.title}</h3>
                </div>
                {activeSection === index && (
                  <p className="text-gray-300 animate-fade-in">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Features Showcase */}
          <div className="bg-gray-800 rounded-xl p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Why Shayri मंच?
            </h2>
            <ul className="space-y-4">
              {[
                "Discover Your Poetic Voice",
                "Monthly Poetry Challenges",
                "Poet of the Month Recognition",
                
                "Supportive Community Feedback",
                
                "Virtual Poetry Events",
                
              ].map((feature, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                >
                  <SparklesIcon className="w-6 h-6 mr-4 text-yellow-400" />
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800 rounded-xl hover:scale-105 transition-transform"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
            Voices of Our Community
          </h2>
          <div className="relative bg-gray-800 rounded-xl p-8">
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
              {testimonials.map((_, index) => (
                <button
                  key={index}
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

        {/* Upcoming Events */}
        {/* <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <event.icon className="w-8 h-8 mr-4 text-purple-400" />
                  <div>
                    <p className="text-gray-400">{event.date}</p>
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                  </div>
                </div>
                <button className="text-purple-400 hover:text-purple-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div> */}

        {/* Team Spotlight */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
            Our Founding Visionaries
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Creative Director",
                bio: "Passionate about poetry and design",
              },
              {
                name: "Abhinav Chauhan",
                role: "Tech Innovator",
                bio: "Building bridges through technology",
              },
              {
                name: "Dishant Chauhan",
                role: "Tech Innovator",
                bio: "Building bridges through technology",
              },
              // {
              //   name: "Aisha Khan",
              //   role: "Community Lead",
              //   bio: "Connecting poets worldwide",
              // },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
                <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
          href={"/poetry"}
            className="
              bg-gradient-to-r from-purple-600 to-pink-600 
              text-white font-bold py-4 px-8 rounded-full 
              text-xl hover:from-purple-700 hover:to-pink-700 
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-2xl
            "
          >
            Join Our Poetic Journey
          </Link>
          <p className="text-gray-400 mt-4">
            Free to join • No experience required • Start today
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
