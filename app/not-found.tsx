"use client"

import React from 'react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { colors } from '@/components/style/theme';

const NotFoundPage = () => {
  // Define your brand colors
  const color = {
    darkPurple: colors.darkPurple,
    darkPink: colors.darkPink
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-center max-w-md">
        {/* Blob background with error icon */}
        <div className="relative inline-block mb-8">
          {/* Yellow blob */}
          <div style={{backgroundColor:color.darkPink}} className="absolute -top-4 -right-2 w-12 h-12 rounded-full opacity-70"></div>
          
          {/* Light blue blob */}
          <div className="absolute -bottom-2 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-70"></div>
          
          {/* Red/pink blob */}
          <div style={{backgroundColor:color.darkPurple}} className="absolute -top-2 -right-6 w-28 h-28  rounded-full opacity-70"></div>
          
          {/* Alert circle */}
          <div className="relative z-10 w-24 h-24 bg-white rounded-full border-2 border-gray-800 flex items-center justify-center">
            <AlertCircle size={48} className="text-gray-800" />
          </div>
        </div>
        
        {/* Error message with gradient */}
        <h1 
          className="text-3xl font-bold mb-4"
          style={{
            background: `linear-gradient(90deg, ${color.darkPurple}, ${color.darkPink})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Welp, this 404 is awkward.
        </h1>
        
        {/* Humorous subtext */}
        <p className="text-gray-600 mb-10">
          But maybe not as awkward as when you go in for a high five and they go in for a fist bump.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/"
            className="flex items-center justify-center gap-2 py-2 px-6 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
            style={{ background: `linear-gradient(90deg, ${color.darkPurple}, ${color.darkPink})` }}
          >
            <Home size={18} />
            Go Home
          </a>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 py-2 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
