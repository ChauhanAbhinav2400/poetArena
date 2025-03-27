"use client"
import React, { useState } from 'react';
import { 
  Heart, Share2, BookOpen, User, Copy, 
  Download, BookmarkPlus, MessageCircle 
} from 'lucide-react';

const PoetryDetailsPage = ({ poetry, poet }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFullPoetry, setShowFullPoetry] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: poetry.title,
        text: poetry.fullText,
      });
    } else {
      navigator.clipboard.writeText(poetry.fullText);
      alert('Poetry copied to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
     
     

      {/* Poetry Content */}
      <div className="w-full container mx-auto px-4 py-12 mt-16">
        <div className="grid md:grid-cols-[3fr_1fr] gap-8">
          {/* Main Poetry Section */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-purple-200">
              {poetry.title}
            </h2>
            
            <div className="text-xl leading-relaxed mb-6">
              {showFullPoetry 
                ? poetry.fullText 
                : `${poetry.fullText.slice(0, 300)}...`}
              {!showFullPoetry && poetry.fullText.length > 300 && (
                <button 
                  onClick={() => setShowFullPoetry(true)}
                  className="text-purple-300 ml-2 hover:text-purple-200"
                >
                  Read More
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full hover:bg-purple-700/50 transition ${liked ? 'text-red-400' : 'text-white'}`}
              >
                <Heart fill={liked ? 'currentColor' : 'none'} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>

              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full hover:bg-purple-700/50 transition text-white"
              >
                <Share2 />
                <span>Share</span>
              </button>

              <button 
                onClick={handleBookmark}
                className={`flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full hover:bg-purple-700/50 transition ${bookmarked ? 'text-yellow-400' : 'text-white'}`}
              >
                <BookmarkPlus fill={bookmarked ? 'currentColor' : 'none'} />
                <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
            </div>
          </div>

          {/* Poet Profile Section */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col items-center">
              <img 
                src="/api/placeholder/150/150" 
                alt={poet.name} 
                className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-purple-600"
              />
              <h3 className="text-2xl font-bold text-purple-200">{poet.name}</h3>
              <p className="text-purple-300 mb-4">{poet.era}</p>
              
              <div className="text-center mb-6">
                <p className="text-white/80">{poet.bio}</p>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-purple-700/30 p-3 rounded-full hover:bg-purple-700/50 transition"
                >
                  <BookOpen size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-purple-700/30 p-3 rounded-full hover:bg-purple-700/50 transition"
                >
                  <Download size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Poems Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Poems</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="bg-gray-900 rounded-xl p-4 hover:bg-gray-600 transition cursor-pointer"
              >
                <h4 className="text-lg font-semibold text-purple-200 mb-2">
                  Related Poetry Title
                </h4>
                <p className="text-white/80 mb-4">
                  A short excerpt of the related poetry goes here...
                </p>
                <div className="flex items-center">
                  <User className="text-purple-300 mr-2" size={20} />
                  <span className="text-purple-300">Poet Name</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center mb-6">
            <MessageCircle className="mr-3 text-purple-300" size={24} />
            <h3 className="text-2xl font-bold text-purple-200">Comments</h3>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map((comment) => (
              <div
              key={comment?._id}
              className="bg-gray-700 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {comment?.userName?.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <div className="font-medium text-gray-300">
                      {comment?.userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(comment?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{comment?.text}</p>
              </div>
            </div>
            ))}
          </div>

          <div className="mt-6">
            <textarea 
              placeholder="Write your comment..."
              className="w-full bg-gray-700 p-4 rounded-xl text-white border-none focus:ring-2 focus:ring-purple-600 outline-none"
              rows="4"
            ></textarea>
            <button className="mt-4 bg-purple-700 px-6 py-2 rounded-full hover:bg-purple-600 transition">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage
const ExamplePoetryPage = () => {
  const samplePoetry = {
    title: "प्रेम की परिभाषा",
    fullText: `वो कहते हैं कि प्यार में दर्द है, मगर मुझे तो दर्द में भी प्यार है
    हर पल, हर सांस में तुम्हारी याद बसी है
    आंखों में आंसू, होठों पर मुस्कान
    यही है प्रेम की अनकही कहानी
    जो शब्दों में बयां नहीं होती
    सिर्फ महसूस की जा सकती है`
  };

  const samplePoet = {
    name: "दुष्यंत कुमार",
    era: "20वीं शताब्दी",
    bio: "प्रसिद्ध हिंदी कवि, जिन्होंने गजल और शायरी को नई ऊंचाइयों तक पहुंचाया।"
  };

  return <PoetryDetailsPage poetry={samplePoetry} poet={samplePoet} />;
};

export default ExamplePoetryPage;