"use client"
/* eslint-disable react/no-unescaped-entities */
import { AwardIcon, CalendarIcon, SparklesIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const ShayarsBenefits = () => {

    const [activeTestimonial, setActiveTestimonial] = useState(0);
     const testimonials = [
        {
          quote:
            "Shayri मंच gave me a platform to showcase my talent and earn rewards from fans!",
          author: "Neha Patel",
          role: "Aspiring Shayar",
          id: 1,
        },
        {
          quote:
            "Winning Shayar of the Month and performing at the Shayari Munch was a dream come true.",
          author: "Sameer Khan",
          role: "Awarded Shayar",
          id: 2,
        },
        {
          quote:
            "The best place to read amazing shayari and support talented poets directly.",
          author: "Priyanka Das",
          role: "Shayari Lover",
          id: 3,
        },
      ];
    
    
  return (
    <div>
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

          {/* <div className="bg-gray-800 rounded-xl p-8 mb-16">
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
          </div> */}

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
                  Become a Shayar Star
                </h3>
                <p className="text-gray-300 mb-6">
                  Share your shayari, win awards, and perform at our annual
                  Shayari Munch event.
                </p>
                <Link
                  href={"/poets"}
                  className="bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition-colors"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>

    </div>
    </div>
    </div>
  )
}

export default ShayarsBenefits
