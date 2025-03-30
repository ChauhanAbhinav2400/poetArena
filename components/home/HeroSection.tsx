"use client"

import React, { useEffect, useState } from 'react'
import { colors } from '../style/theme';
import Link from 'next/link';

const HeroSection = () => {
     const [activeSlide, setActiveSlide] = useState(0);



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


      
      // Autoplay for hero slides
      useEffect(() => {
        const interval = setInterval(() => {
          setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
      }, [heroSlides.length]);


  return (
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
  )
}

export default HeroSection
