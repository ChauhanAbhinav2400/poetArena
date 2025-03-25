"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Users, Briefcase, GraduationCap, Code, Check, Heart } from 'lucide-react';

// Color scheme
const colors = {
  darkPurple: "#6A5ACD", // Slate Blue
  darkPink: "#FF69B4",   // Hot Pink
  lightGray: '#F8F9FA',
  textDark: '#2D3748',
  textLight: '#718096',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #6A5ACD 0%, #FF69B4 100%)',
  gray: "#CCCCCC",
};

// Statistics data
const stats = [
  { label: 'Problems Solved', value: '1000+' },
  { label: 'Active Users', value: '10000+' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Cities', value: '10+' }
];

// Testimonial data
const testimonials = [
  {
    name: 'Alex Rodriguez',
    role: 'SaaS Entrepreneur',
    content: 'Challenge2Solution helped me validate my business idea with real users before I wrote a single line of code. The platform saved me months of development time.',
  },
  {
    name: 'Sarah Chen',
    role: 'Freelance Developer',
    content: 'I\'ve found high-quality clients who truly value my expertise. The pre-validated challenges make it easy to deliver impactful solutions quickly.',
  },
  {
    name: 'Jordan Taylor',
    role: 'Computer Science Student',
    content: 'The coin system is brilliant! I\'ve earned enough to get help with my senior project while building real-world experience that stands out on my resume.',
  }
];

// Our approach steps
const approachSteps = [
  {
    title: 'Problem Validation',
    description: 'Real challenges from real users, validated through our proprietary scoring system',
    icon: <Check className="h-6 w-6" />
  },
  {
    title: 'Solver Matching',
    description: 'AI-powered matching connects problems with the right solvers based on skills and interests',
    icon: <Users className="h-6 w-6" />
  },
  {
    title: 'Solution Delivery',
    description: 'Structured process ensures quality solutions with feedback loops and fair compensation',
    icon: <Code className="h-6 w-6" />
  },
  {
    title: 'Community Learning',
    description: 'Each solution strengthens our ecosystem, creating a knowledge base that benefits everyone',
    icon: <Heart className="h-6 w-6" />
  }
];

const AboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Function to handle testimonial navigation
  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
  };
  



  return (
    <div className="bg-white mt-12 py-12">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-pink-500"
         
        />
       
        
        <div className="container mx-auto px-4 z-10 mt-10 flex flex-col items-center">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl roboto-seven  text-white mb-8 leading-tight">
              Connecting Problems With Their Perfect Solutions
            </h1>
            <p className="text-2xl text-white opacity-90 mb-12 leading-relaxed">
              At Challenge2Solution, we're building the bridge between those who face challenges
              and those who solve them — creating impact through collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/explore" legacyBehavior>
                <a className="px-8 py-4 text-lg font-medium rounded-full bg-white text-purple-700 transition-transform duration-300 hover:transform hover:scale-105 shadow-lg">
                  Explore Challenges
                </a>
              </Link>
              <Link href="/how-it-works" legacyBehavior>
                <a className="px-8 py-4 text-lg font-medium rounded-full border-2 border-white text-white transition-transform duration-300 hover:transform hover:scale-105">
                  How It Works
                </a>
              </Link>
            </div>
          </div>
          
          <div className="mt-20 w-full max-w-5xl">
            <div className="p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-4xl font-bold text-purple-700 mb-2">{stat.value}</p>
                    <p className="text-purple-700 text-opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
            <ChevronDown className="h-10 w-10 text-white" />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 ">
            <div className="lg:w-1/2 hidden sm:flex">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full opacity-20" style={{ background: colors.gradient }}></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* Our Story SVG Image */}
                  <svg width="600" height="450" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
                    <rect width="600" height="450" fill="#f5f5f5" />
                    
                    {/* Abstract background shapes */}
                    <circle cx="150" cy="200" r="100" fill="#6A5ACD" opacity="0.1" />
                    <circle cx="450" cy="250" r="120" fill="#FF69B4" opacity="0.1" />
                    
                    {/* People collaborating */}
                    <g transform="translate(180, 150)">
                      {/* Person 1 */}
                      <circle cx="50" cy="50" r="40" fill="#6A5ACD" opacity="0.8" />
                      <circle cx="50" cy="30" r="20" fill="#f5f5f5" />
                      <rect x="30" y="60" width="40" height="80" rx="10" fill="#6A5ACD" opacity="0.8" />
                      
                      {/* Person 2 */}
                      <circle cx="150" cy="50" r="40" fill="#FF69B4" opacity="0.8" />
                      <circle cx="150" cy="30" r="20" fill="#f5f5f5" />
                      <rect x="130" y="60" width="40" height="80" rx="10" fill="#FF69B4" opacity="0.8" />
                      
                      {/* Connection */}
                      <line x1="85" y1="90" x2="135" y2="90" stroke="#333" strokeWidth="3" strokeDasharray="5,5" />
                      <circle cx="110" cy="90" r="15" fill="#FFF" stroke="#333" strokeWidth="2" />
                      <text x="104" y="95" fontFamily="Arial" fontSize="20" fontWeight="bold">+</text>
                    </g>
                    
                    {/* Building/Solution */}
                    <g transform="translate(150, 300)">
                      <rect x="0" y="0" width="300" height="100" fill="#f0f0f0" stroke="#ddd" />
                      <rect x="40" y="-30" width="220" height="30" fill="#6A5ACD" opacity="0.7" />
                      <rect x="60" y="30" width="40" height="70" fill="#fff" stroke="#ddd" />
                      <rect x="130" y="30" width="40" height="70" fill="#fff" stroke="#ddd" />
                      <rect x="200" y="30" width="40" height="70" fill="#fff" stroke="#ddd" />
                    </g>
                  </svg>
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-20" style={{ background: colors.gradient }}></div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8" style={{ color: colors.darkPurple }}>Our Story</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  Challenge2Solution began with a simple observation: everywhere we looked, 
                  we saw disconnects between problems and potential solvers. Businesses struggled 
                  to find the right talent for specific challenges. Freelancers hunted for meaningful 
                  work. Students sought real-world applications for their skills.
                </p>
                
                <p className="text-lg text-gray-700">
                  Founded in 2023 by a team of entrepreneurs, developers, and educators, we set out to 
                  create more than just another marketplace — we wanted to build an ecosystem where 
                  validated problems find their perfect solvers across all domains.
                </p>
                
                <p className="text-lg text-gray-700">
                  Today, Challenge2Solution connects thousands of problem owners with skilled problem 
                  solvers, fostering innovation through collaboration and creating impact in industries 
                  ranging from healthcare to education, technology to sustainability.
                </p>
                
                <div className="pt-6">
                  <Link href="/full-story" legacyBehavior>
                    <a className="inline-flex items-center text-lg font-medium" style={{ color: colors.darkPink }}>
                      Read our full story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-24" style={{ backgroundColor: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.darkPurple }}>
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Our platform brings together three key communities, creating a unique ecosystem where everyone benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* SaaS Builders */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-2" style={{ backgroundColor: colors.darkPurple }}></div>
              <div className="p-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${colors.darkPurple}20` }}>
                  <Code color={colors.darkPurple} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4" style={{ color: colors.darkPurple }}>
                  SaaS Builders
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Discover real problems that need solving. Find validated problem statements from 
                  real users across industries. Build solutions people actually need.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPurple }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Validated market needs</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPurple }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Direct access to first customers</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPurple }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Feedback-driven development</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Freelancers */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-2" style={{ backgroundColor: colors.darkPink }}></div>
              <div className="p-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${colors.darkPink}20` }}>
                  <Briefcase color={colors.darkPink} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4" style={{ color: colors.darkPink }}>
                  Freelancers
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Connect with clients who need your skills. Access urgent projects, earn fair 
                  compensation, and build your portfolio while helping others.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPink }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Pre-qualified clients</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPink }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Transparent compensation</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPink }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Portfolio-building projects</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Students */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-2" style={{ backgroundColor: colors.darkPurple }}></div>
              <div className="p-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${colors.darkPurple}20` }}>
                  <GraduationCap color={colors.darkPurple} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4" style={{ color: colors.darkPurple }}>
                  Students
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Earn coins, get help, build skills. Post academic challenges, earn through 
                  participation, and exchange coins for help with projects.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPurple }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Learn by doing</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPurple }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Build real-world resume</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" style={{ color: colors.darkPurple }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Coin-based exchange system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/learn-more" legacyBehavior>
              <a className="inline-flex items-center text-lg font-medium" style={{ color: colors.darkPink }}>
                Learn more about how it works
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.darkPurple }}>
              Our Approach
            </h2>
            <p className="text-xl text-gray-600">
              What makes Challenge2Solution different is our structured methodology for connecting 
              problems with the right solvers and ensuring quality solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approachSteps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" 
                  style={{ 
                    backgroundImage: colors.gradient,
                    color: colors.white
                  }}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.darkPurple }}>
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-24" style={{ backgroundColor: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.darkPurple }}>
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community members who have transformed challenges into opportunities.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 flex flex-col">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className={`p-6 cursor-pointer transition-all duration-300 flex items-center ${activeTestimonial === index ? 'bg-opacity-10' : 'hover:bg-opacity-5'}`}
                      style={{ 
                        backgroundColor: activeTestimonial === index ? colors.darkPurple : 'transparent',
                        color: activeTestimonial === index ? colors.darkPurple : "white"
                      }}
                      onClick={() => handleTestimonialChange(index)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        {/* Avatar SVG */}
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="24" cy="24" r="24" fill={activeTestimonial === index ?colors.white:colors.gray} opacity="0.2" />
                          <circle cx="24" cy="19" r="8" fill={activeTestimonial === index ?colors.white:colors.gray} opacity="0.6" />
                          <path d="M10 38C10 32 16 27 24 27C32 27 38 32 38 38" fill={activeTestimonial === index ?colors.white:colors.gray} opacity="0.4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`roboto-six ${activeTestimonial === index ? "text-white":" text-gray-500"}`}>{testimonial.name}</h4>
                        <p className={`text-sm ${activeTestimonial === index ? "text-white":" text-gray-500"}`} >{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="md:w-2/3 p-10" style={{ background: 'linear-gradient(to bottom right, #fcfcfc, #f5f5f5)' }}>
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className={`transition-opacity duration-300 ${activeTestimonial === index ? 'block' : 'hidden'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-6 opacity-20" viewBox="0 0 24 24" fill={colors.darkPurple}>
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-xl mb-8 italic leading-relaxed text-gray-700">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={colors.darkPink}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      
      {/* Call to Action Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0" style={{ background: colors.gradient }}></div>
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Ready to Join the Solution Revolution?</h2>
            <p className="text-xl opacity-90 mb-12 leading-relaxed">
              Whether you're facing a challenge that needs solving or you're ready to apply your skills 
              to meaningful problems, Challenge2Solution is your platform to connect, collaborate, and create impact.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/auth/signup" legacyBehavior>
                <a className="px-8 py-4 text-lg font-bold rounded-full bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-105" 
                  style={{ color: colors.darkPurple }}>
                  Get Started Now
                </a>
              </Link>
              <Link href="/schedule-demo" legacyBehavior>
                <a className="px-8 py-4 text-lg font-bold rounded-full bg-transparent border-2 border-white text-white transition-all duration-300 hover:bg-white hover:bg-opacity-10">
                  Schedule a Demo
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;