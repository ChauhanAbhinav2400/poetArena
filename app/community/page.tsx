"use client"

import { colors } from '@/components/style/theme';
import React, { useState } from 'react';
import { FiSearch, FiFilter, FiTrendingUp, FiUsers, FiStar, FiMessageSquare, FiClock } from 'react-icons/fi';



const Community = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SaaS', 'Freelance', 'Student', 'Tech', 'Design', 'Marketing'];
  
  const problemPosts = [
    {
      id: 1,
      type: 'SaaS',
      title: "Need a solution for managing cross-team dependencies",
      description: "Our product team struggles with tracking dependencies between different teams. Looking for a simple tool that can visualize these relationships.",
      author: "Sarah Chen",
      authorRole: "Product Manager",
      votes: 42,
      comments: 8,
      timePosted: "2 days ago",
      tags: ["Project Management", "Team Collaboration", "Software"]
    },
    {
      id: 2,
      type: 'Freelance',
      title: "Looking for a data visualization expert",
      description: "We have complex sales data that needs to be visualized for our quarterly report. Require someone with D3.js experience.",
      author: "Michael Rodriguez",
      authorRole: "Sales Director",
      votes: 15,
      comments: 3,
      timePosted: "5 hours ago",
      tags: ["Data Visualization", "D3.js", "Reports"]
    },
    {
      id: 3,
      type: 'Student',
      title: "Need help with machine learning project",
      description: "Working on a final year project implementing a recommendation algorithm. Stuck on optimizing the model for better accuracy.",
      author: "Jamal Washington",
      authorRole: "Computer Science Student",
      votes: 28,
      comments: 12,
      timePosted: "1 day ago",
      tags: ["Machine Learning", "Python", "Academic"]
    },
    {
      id: 4,
      type: 'Tech',
      title: "Database optimization for high-traffic e-commerce site",
      description: "Our site experiences slowdowns during peak hours. Looking for database optimization strategies to handle 10K+ concurrent users.",
      author: "Priya Patel",
      authorRole: "CTO",
      votes: 61,
      comments: 17,
      timePosted: "3 days ago",
      tags: ["Database", "Performance", "E-commerce"]
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? problemPosts 
    : problemPosts.filter(post => post.type === selectedCategory);

  return (
    <div className="min-h-screen  mt-12 py-12">
      {/* Hero Section */}
      <div 
        className="relative py-16 px-4"
        style={{ 
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.darkPink} 100%)`,
          borderRadius: '0 0 15px 15px'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Challenge2Solution Community</h1>
          <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            Connect with other problem solvers, share challenges, and collaborate on innovative solutions
          </p>
          
          <div className="relative max-w-2xl mx-auto ">
            <input
              type="text"
              placeholder="Search for challenges or solutions..."
              className="w-full  px-6 py-4 rounded-full shadow-lg text-white focus:outline-none"
            />
            <button 
              className="absolute right-2 top-2 p-2 rounded-full"
              style={{ backgroundColor: colors.darkPink }}
            >
              <FiSearch className="text-white text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 p-6">
          <div className="text-center p-4">
            <div className="text-3xl font-bold mb-2" style={{ color: colors.darkPurple }}>12,500+</div>
            <div className="text-gray-600">Active Community Members</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold mb-2" style={{ color: colors.darkPink }}>8,200+</div>
            <div className="text-gray-600">Problems Solved</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold mb-2" style={{ color: colors.darkPurple }}>3,400+</div>
            <div className="text-gray-600">Active Challenges</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul>
                {categories.map(category => (
                  <li key={category} className="mb-2">
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        selectedCategory === category 
                          ? 'bg-opacity-10 font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                      style={{ 
                        backgroundColor: selectedCategory === category ? colors.lightPurple : 'transparent',
                        color: selectedCategory === category ? colors.darkPurple : colors.black 
                      }}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Community Leaders</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: i % 2 === 0 ? colors.darkPink : colors.darkPurple }}
                    >
                      <FiUsers />
                    </div>
                    <div>
                      <div className="font-medium">User Name</div>
                      <div className="text-sm text-gray-500">120 problems solved</div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="w-full py-2 mt-2 rounded-md text-sm"
                  style={{ color: colors.darkPink }}
                >
                  View All Leaders
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'all' ? 'text-white' : 'text-gray-700 bg-white'
                  }`}
                  style={{ backgroundColor: activeTab === 'all' ? colors.darkPurple : '' }}
                  onClick={() => setActiveTab('all')}
                >
                  All Challenges
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'trending' ? 'text-white' : 'text-gray-700 bg-white'
                  }`}
                  style={{ backgroundColor: activeTab === 'trending' ? colors.darkPurple : '' }}
                  onClick={() => setActiveTab('trending')}
                >
                  <FiTrendingUp className="inline mr-1" /> Trending
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'recent' ? 'text-white' : 'text-gray-700 bg-white'
                  }`}
                  style={{ backgroundColor: activeTab === 'recent' ? colors.darkPurple : '' }}
                  onClick={() => setActiveTab('recent')}
                >
                  <FiClock className="inline mr-1" /> Recent
                </button>
              </div>
              
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-white"
              >
                <FiFilter /> Filter
              </button>
            </div>
            
            {/* Challenge Posts */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div 
                    className="h-2"
                    style={{ 
                      backgroundColor: post.type === 'SaaS' 
                        ? colors.darkPurple 
                        : post.type === 'Freelance' 
                        ? colors.darkPink 
                        : '#5E60CE'
                    }}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span 
                        className="px-3 py-1 text-xs rounded-full text-white"
                        style={{ 
                          backgroundColor: post.type === 'SaaS' 
                            ? colors.darkPurple 
                            : post.type === 'Freelance' 
                            ? colors.darkPink 
                            : '#5E60CE'
                        }}
                      >
                        {post.type}
                      </span>
                      <span className="text-sm text-gray-500">{post.timePosted}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: colors.lightPurple,
                            color: colors.darkPurple
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: post.type === 'SaaS' ? colors.darkPurple : colors.darkPink }}
                        >
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.authorRole}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500">
                          <FiStar /> <span>{post.votes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500">
                          <FiMessageSquare /> <span>{post.comments}</span>
                        </button>
                        <button 
                          className="px-4 py-1 rounded-md text-white text-sm"
                          style={{ backgroundColor: colors.darkPink }}
                        >
                          Solve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8">
                <button 
                  className="px-6 py-2 rounded-md text-white"
                  style={{ backgroundColor: colors.darkPurple }}
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Community CTA */}
      <div 
        className="py-16 px-4 mt-8 text-center"
        style={{ backgroundColor: colors.lightPurple }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.darkPurple }}>
            Ready to solve challenges or find solutions?
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Join our growing community of problem solvers and innovators.
            Together, we can turn challenges into opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-3 rounded-md text-white font-medium"
              style={{ backgroundColor: colors.darkPurple }}
            >
              Post a Challenge
            </button>
            <button 
              className="px-8 py-3 rounded-md text-white font-medium"
              style={{ backgroundColor: colors.darkPink }}
            >
              Become a Solver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;