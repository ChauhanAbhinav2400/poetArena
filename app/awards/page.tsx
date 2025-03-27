"use client"

import React, { useState } from 'react';
import { 
  AwardIcon, 
  TrophyIcon, 
  StarIcon, 
  MedalIcon, 
  SparklesIcon 
} from 'lucide-react';
import Link from 'next/link';

const Awards = () => {
  const [activeAward, setActiveAward] = useState(null);

  const awardCategories = [
    {
      icon: TrophyIcon,
      title: "Poet of the Year",
      description: "Celebrating the most outstanding poet who has captivated our community with exceptional creativity and emotional depth throughout the year.",
      winners: [
        { year: "2024", name: "Arjun Mehra", poem: "Whispers of the Soul" },
        { year: "2023", name: "Sana Ali", poem: "Echoes of Eternity" },
        { year: "2022", name: "Kavya Singh", poem: "Threads of Silence" }
      ],
      color: "text-yellow-400"
    },
    {
      icon: MedalIcon,
      title: "Monthly Muse",
      description: "Recognizing poets who shine in our monthly challenges, showcasing consistency, innovation, and mastery in Shayari.",
      winners: [
        { month: "March 2025", name: "Rohan Desai", poem: "Dancing Shadows" },
        { month: "February 2025", name: "Meera Patel", poem: "Fading Stars" },
        { month: "January 2025", name: "Amit Roy", poem: "River of Words" }
      ],
      color: "text-blue-400"
    },
    {
      icon: StarIcon,
      title: "Community Star",
      description: "Honoring members who inspire and uplift our poetic community through mentorship, feedback, and active participation.",
      winners: [
        { year: "2024", name: "Priya Sharma", contribution: "500+ Feedback Comments" },
        { year: "2023", name: "Vikram Seth", contribution: "Hosted 20 Workshops" },
        { year: "2022", name: "Nisha Khan", contribution: "Organized Open Mics" }
      ],
      color: "text-purple-400"
    }
  ];

  const platformAchievements = [
    { icon: AwardIcon, title: "Best Poetry Platform 2024", source: "Global Arts Awards" },
    { icon: SparklesIcon, title: "Innovation in Literature 2023", source: "Digital Culture Forum" },
    { icon: TrophyIcon, title: "Community Excellence 2022", source: "Creative Minds Summit" }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-600">
            Awards & Recognition
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Celebrating excellence in poetry and community spirit at Shayri मंच
          </p>
        </div>

        {/* Award Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Our Award Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {awardCategories.map((category, index) => (
              <div
                key={index}
                className={`
                  p-6 rounded-xl bg-gray-800 transition-all duration-300 ease-in-out
                  ${activeAward === index ? 'scale-105 shadow-2xl bg-gray-700' : 'hover:bg-gray-700'}
                  cursor-pointer
                `}
                onClick={() => setActiveAward(activeAward === index ? null : index)}
              >
                <div className="flex items-center mb-4">
                  <category.icon className={`w-10 h-10 mr-4 ${category.color}`} />
                  <h3 className="text-2xl font-semibold">{category.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{category.description}</p>
                {activeAward === index && (
                  <div className="animate-fade-in">
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">Recent Winners:</h4>
                    <ul className="space-y-2">
                      {category.winners.map((winner, i) => (
                        <li key={i} className="text-gray-400">
                          <span className="text-white">{winner.name}</span>
                          {winner.poem && ` - "${winner.poem}"`}
                          {winner.contribution && ` - ${winner.contribution}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Platform Achievements */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Platform Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {platformAchievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <achievement.icon className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                <p className="text-gray-400">{achievement.source}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* How to Participate */}
        <div className="bg-gray-800 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
            How to Win an Award
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "Write & Share", desc: "Submit your best Shayari to our monthly challenges." },
              { step: "Engage", desc: "Provide feedback and participate in community events." },
              { step: "Excel", desc: "Stand out with originality and emotional impact." }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold">{item.step}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
        <Link
          href={"/poetry"}
            className="
              bg-gradient-to-r from-purple-600 to-yellow-600 
              text-white font-bold py-4 px-8 rounded-full 
              text-xl hover:from-purple-700 hover:to-yellow-700 
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-2xl
            "
          >
            Submit Your Poetry Today
          </Link>
          <p className="text-gray-400 mt-4">Join the ranks of our celebrated poets</p>
        </div>
      </div>
    </div>
  );
};

export default Awards;