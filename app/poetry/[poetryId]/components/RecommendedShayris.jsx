"use client"

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Filter, Grid, List } from 'lucide-react';
import { colors } from '../../../../components/style/theme';
import Link from 'next/link';
import PoetryCard from '../../components/ProblemCard';



const RecommendedShayris = ({recommendedShayris=[]}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);


  return (
    
    <div className="py-10 bg-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Related Shayris</h2>
       
      
      </div>

   
     

      {/* Shayri Grid or List View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {recommendedShayris?.map((poetry, index) => (
                     <PoetryCard
                       key={poetry.id}
                       poetry={poetry}
                       onLike={() => handleLikeDislike(poetry?._id, "like")}
                       onDislike={() => handleLikeDislike(poetry?._id, "dislike")}
                       cardStyle={index % 6} // Cycle through 6 card styles
                     />
                   ))}
                 </div>

      {/* No Results Handling */}
      {recommendedShayris.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p>No Shayris found in this category.</p>
        </div>
      )}

    
      
    </div>
  );
};

export default RecommendedShayris;