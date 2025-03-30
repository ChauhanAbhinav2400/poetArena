import Link from 'next/link'
import React from 'react'

const ActionBanner = () => {
  return (
    <div className=" bg-gradient-to-b from-gray-800 to-gray-900 py-6 ">
             
               <div className="container mx-auto px-4 ">
        <div className="bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Share Your Shayari?
            </h2>
            <p className="text-gray-200 mb-6">
              Sign up today and start your journey to becoming the next Shayari
              star.
            </p>
            <Link
              href={"/auth/signup"}
              className="
              bg-white text-purple-700 font-bold py-3 px-8 rounded-full 
              hover:bg-gray-100 transition-all duration-300 transform hover:scale-105
            "
            >
              Sign Up Now
            </Link>
          </div>
    </div>
    </div>
  )
}

export default ActionBanner
