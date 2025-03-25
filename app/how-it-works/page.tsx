"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import colors from your color palette
const colors = {
  lightPurple: "#E6E6FA", // Lavender
  darkPurple: "#6A5ACD", // Slate Blue
  lightPink: "#FFC0CB", // Pink
  darkPink: "#FF69B4", // Hot Pink
  white: "#FFFFFF",
  black: "#000000",
  gray: "#CCCCCC",
  lightGray: "#F5F5F5",
  error: "#FF3B30",
  success: "#34C759",
};

const HowItWorksPage = () => {
  const steps = [
    {
      id: 1,
      title: "Post a Challenge",
      description: "Define your problem and set a deadline, budget, or coin value. Our AI helps categorize and optimize your listing for maximum visibility.",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill={colors.lightPurple} />
          <rect x="20" y="25" width="30" height="30" rx="4" fill={colors.darkPurple} />
          <path d="M56 32L35 32" stroke={colors.white} strokeWidth="3" strokeLinecap="round"/>
          <path d="M56 40L35 40" stroke={colors.white} strokeWidth="3" strokeLinecap="round"/>
          <path d="M56 48L35 48" stroke={colors.white} strokeWidth="3" strokeLinecap="round"/>
          <path d="M56 25L60 25L60 55L20 55" stroke={colors.darkPink} strokeWidth="3" strokeLinecap="round"/>
          <circle cx="25" cy="30" r="2" fill={colors.lightPink} />
          <circle cx="25" cy="38" r="2" fill={colors.lightPink} />
          <circle cx="25" cy="46" r="2" fill={colors.lightPink} />
        </svg>
      ),
      userType: "Problem Owners"
    },
    {
      id: 2,
      title: "Connect with Solvers",
      description: "Our matching algorithm connects your challenge with the perfect problem-solvers based on skills, experience, and past success.",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill={colors.lightPurple} />
          <circle cx="25" cy="35" r="10" fill={colors.darkPurple} />
          <circle cx="55" cy="35" r="10" fill={colors.darkPink} />
          <path d="M25 45L25 55" stroke={colors.darkPurple} strokeWidth="3" strokeLinecap="round"/>
          <path d="M55 45L55 55" stroke={colors.darkPink} strokeWidth="3" strokeLinecap="round"/>
          <path d="M25 55H55" stroke={colors.gray} strokeWidth="3" strokeLinecap="round"/>
          <path d="M35 35L45 35" stroke={colors.white} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 2"/>
        </svg>
      ),
      userType: "Platform"
    },
    {
      id: 3,
      title: "Collaborate & Iterate",
      description: "Work together through our secure workspace with built-in communication, file sharing, and milestone tracking tools.",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill={colors.lightPurple} />
          <rect x="15" y="25" width="30" height="30" rx="4" fill={colors.darkPurple} />
          <rect x="35" y="25" width="30" height="30" rx="4" fill={colors.darkPink} />
          <path d="M25 40C25 38.3431 26.3431 37 28 37H32C33.6569 37 35 38.3431 35 40V48C35 49.6569 33.6569 51 32 51H28C26.3431 51 25 49.6569 25 48V40Z" fill={colors.white} />
          <path d="M45 34C45 32.3431 46.3431 31 48 31H52C53.6569 31 55 32.3431 55 34V42C55 43.6569 53.6569 45 52 45H48C46.3431 45 45 43.6569 45 42V34Z" fill={colors.white} />
          <path d="M35 40L45 37" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2"/>
        </svg>
      ),
      userType: "Both Parties"
    },
    {
      id: 4,
      title: "Complete & Rate",
      description: "Finalize your project, exchange coins or payment, and provide feedback to build community reputation and trust.",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill={colors.lightPurple} />
          <path d="M25 40L35 50L55 30" stroke={colors.success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="30" cy="55" r="7" fill={colors.darkPurple} />
          <circle cx="50" cy="55" r="7" fill={colors.darkPink} />
          <path d="M27 55L33 55" stroke={colors.white} strokeWidth="2" strokeLinecap="round"/>
          <path d="M30 52L30 58" stroke={colors.white} strokeWidth="2" strokeLinecap="round"/>
          <path d="M47 55L53 55" stroke={colors.white} strokeWidth="2" strokeLinecap="round"/>
          <path d="M47 52L49 55L47 58" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M53 52L51 55L53 58" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      userType: "Both Parties"
    }
  ];

  const userTypes = [
    {
      title: "SaaS Builders",
      description: "Discover real-world problems worth solving and build SaaS products people actually need.",
      color: colors.darkPurple,
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="15" width="40" height="30" rx="4" fill={colors.darkPurple} />
          <path d="M16 25H44" stroke={colors.white} strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 35H44" stroke={colors.white} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="2" fill={colors.lightPink} />
          <circle cx="26" cy="20" r="2" fill={colors.lightPink} />
          <circle cx="32" cy="20" r="2" fill={colors.lightPink} />
          <rect x="16" y="28" width="10" height="4" rx="1" fill={colors.lightPink} />
          <rect x="16" y="38" width="16" height="4" rx="1" fill={colors.lightPink} />
        </svg>
      )
    },
    {
      title: "Freelancers",
      description: "Access urgent projects, get fairly compensated, and build your portfolio helping solve real problems.",
      color: colors.darkPink,
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="20" r="8" fill={colors.darkPink} />
          <path d="M15 45C15 37.268 21.268 31 29 31H31C38.732 31 45 37.268 45 45V45C45 45.5523 44.5523 46 44 46H16C15.4477 46 15 45.5523 15 45V45Z" fill={colors.darkPink} />
          <circle cx="30" cy="18" r="3" fill={colors.white} />
          <rect x="25" y="38" width="10" height="4" rx="2" fill={colors.white} />
        </svg>
      )
    },
    {
      title: "Students",
      description: "Post academic challenges, earn coins through participation, and exchange them for project help and notes.",
      color: "#5E60CE",
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 10L50 20L30 30L10 20L30 10Z" fill="#5E60CE" />
          <path d="M15 22V35C15 38.866 21.716 42 30 42C38.284 42 45 38.866 45 35V22" stroke="#5E60CE" strokeWidth="2"/>
          <circle cx="30" cy="20" r="3" fill={colors.white} />
          <rect x="48" y="20" width="4" height="20" rx="2" fill="#5E60CE" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white  mt-12 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            How Challenge2Solution Works
          </h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            We connect problems with problem-solvers in a community-driven ecosystem that benefits everyone.
          </p>
        </div>
      </div>

      {/* Platform Flow Diagram */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Platform Flow</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our seamless process connects problem owners with skilled solvers through a structured journey:
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="bg-white rounded-lg shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300 relative z-10"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
                {step.id}
              </div>
              
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* User Type Badge */}
              <div 
                className="mt-4 text-sm inline-block px-3 py-1 rounded-full" 
                style={{ 
                  backgroundColor: step.userType === "Both Parties" 
                    ? "rgba(106, 90, 205, 0.2)" 
                    : step.userType === "Problem Owners" 
                      ? "rgba(106, 90, 205, 0.2)" 
                      : "rgba(255, 105, 180, 0.2)",
                  color: step.userType === "Both Parties" 
                    ? colors.black
                    : step.userType === "Problem Owners" 
                      ? colors.darkPurple 
                      : colors.darkPink
                }}
              >
                {step.userType}
              </div>
            </div>
          ))}
          
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 z-0 transform -translate-y-1/2" />
        </div>
      </div>

      {/* User Types Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Built For Everyone</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Challenge2Solution serves different user needs with tailored features and benefits:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-xl p-6 border-t-4"
                style={{ borderColor: type.color }}
              >
                <div className="mb-4">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: type.color }}>{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            See how our platform has connected problems to solutions:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="80" height="60" rx="8" fill={colors.white} opacity="0.9" />
                <circle cx="40" cy="40" r="10" fill={colors.darkPurple} />
                <path d="M35 60L105 60" stroke={colors.darkPurple} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 6"/>
                <path d="M35 70L85 70" stroke={colors.darkPink} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 6"/>
                <path d="M90 35C90 32.2386 92.2386 30 95 30H100C102.761 30 105 32.2386 105 35V45C105 47.7614 102.761 50 100 50H95C92.2386 50 90 47.7614 90 45V35Z" fill={colors.darkPink} />
              </svg>
            </div>
            <div className="p-6">
              <span className="text-sm font-medium" style={{ color: colors.darkPurple }}>SaaS Builder Success</span>
              <h3 className="text-xl font-bold mt-2 mb-3">Learning Management System for Remote Schools</h3>
              <p className="text-gray-600 mb-4">
                A developer discovered rural schools struggling with online learning, built an offline-first LMS, and now serves 50+ schools globally.
              </p>
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: colors.darkPurple }}
                >
                  JS
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-gray-500">EducationTech Builder</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="35" r="15" fill={colors.darkPink} />
                <path d="M30 85C30 68.4315 43.4315 55 60 55C76.5685 55 90 68.4315 90 85V85H30V85Z" fill={colors.darkPink} />
                <circle cx="60" cy="35" r="5" fill={colors.white} />
                <rect x="25" y="90" width="70" height="10" rx="5" fill={colors.darkPurple} />
                <circle cx="35" cy="95" r="3" fill={colors.white} />
                <circle cx="45" cy="95" r="3" fill={colors.white} />
                <circle cx="55" cy="95" r="3" fill={colors.white} />
                <circle cx="65" cy="95" r="3" fill={colors.white} />
                <circle cx="75" cy="95" r="3" fill={colors.white} />
                <circle cx="85" cy="95" r="3" fill={colors.white} />
              </svg>
            </div>
            <div className="p-6">
              <span className="text-sm font-medium" style={{ color: colors.darkPink }}>Freelancer Success</span>
              <h3 className="text-xl font-bold mt-2 mb-3">AI-Powered Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">
                A data scientist helped a small business make sense of their customer data through a custom dashboard, increasing sales by 32%.
              </p>
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: colors.darkPink }}
                >
                  AR
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Alice Rodriguez</p>
                  <p className="text-xs text-gray-500">Data Scientist & Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold">Ready to Connect?</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Join our community today and start solving or finding solutions to real problems.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-white text-purple-600 font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Post a Challenge
            </button>
            <button className="bg-transparent border-2 border-white text-white font-medium py-3 px-6 rounded-lg hover:bg-white hover:text-purple-600 transition-all">
              Become a Solver
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about Challenge2Solution:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "How are payments handled?",
              answer: "We offer secure payment processing through Stripe with escrow protection, or our internal coin system for student exchanges."
            },
            {
              question: "What type of problems can I post?",
              answer: "From technical and business challenges to academic queries, our platform accepts a wide range of problem statements in various domains."
            },
            {
              question: "How is solver quality assured?",
              answer: "All solvers go through verification, and our rating system helps maintain quality through transparent feedback and success metrics."
            },
            {
              question: "What happens if my problem isn't solved?",
              answer: "We offer protection policies that ensure partial refunds or credits if solutions don't meet agreed specifications."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/faq" className="text-purple-600 font-medium hover:text-purple-700">
            View All FAQs →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;