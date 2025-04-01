import React from "react";
import { UsersIcon, AwardIcon, HeartIcon, PenToolIcon } from "lucide-react";
import { colors } from "@/components/style/theme";
import Link from "next/link";

import { apiCall } from "../../api/fetchData";
import { getItem } from "../../lib/localStorage";
import { API_ENDPOINTS, BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";

async function getMetaData(slug) {
  try {
    const response = await apiCall({
      method: "GET",
      url: `${BASE_URL}/${API_ENDPOINTS.GET_METADATA}?pageName=${slug}`,
      headers: {
        Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
      },
    });
    return response.data || {};
  } catch (error) {
    console.error(`Error fetching metadata:`, error);
    return null;
  }
}

export async function generateMetadata() {
  const metaData = await getMetaData("about-us");
  return {
    title: metaData?.metaTitle,
    description: metaData?.metaDescription,
    openGraph: {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      url: `${metaData?.websiteUrl}${metaData?.pageUrl}`,
      siteName: metaData?.websiteName,
      images: [
        {
          url: metaData?.logoUrl,
          width: 1200,
          height: 630,
          alt: metaData?.websiteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      images: [metaData?.logoUrl],
    },
    alternates: {
      canonical: `${metaData?.websiteUrl}${metaData?.pageUrl}`,
    },
  };
}

const AboutUs = () => {
  const team = [
    {
      name: "Priya Sharma",
      role: "Creative Director",
      image: "https://i.ibb.co/3m6Dd9b5/abhinav-photo-mysore.jpg", // Replace with actual image path
    },
    {
      name: "Abhinav Chauhan",
      role: "Tech Innovator",
      image: "https://i.ibb.co/3m6Dd9b5/abhinav-photo-mysore.jpg", // Replace with actual image path
    },
    {
      name: "Dishant Chauhan",
      role: "Tech Innovator",
      image: "https://i.ibb.co/3m6Dd9b5/abhinav-photo-mysore.jpg", // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="roboto roboto-eight text-4xl lg:text-5xl mb-4">
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A revolution in Shayari, connecting talented poets with lovers of
            poetry.
          </p>
        </div>

        {/* Our Aim */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Our Aim
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <UsersIcon className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-center mb-2">
                Empower Shayars
              </h3>
              <p className="text-gray-300 text-center">
                We provide a platform for deserving shayars to showcase their
                talent, win hearts, and earn rewards through UPI or PayPal.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <HeartIcon className="w-12 h-12 text-pink-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-center mb-2">
                For Poetry Lovers
              </h3>
              <p className="text-gray-300 text-center">
                Enjoy high-quality shayari as shayars compete for titles like
                Shayar of the Week, Month, and Year.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <AwardIcon className="w-10 h-10 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-center mb-2">
                Awards & Recognition
              </h3>
              <p className="text-gray-300 text-center">
                Win titles like Shayar of the Week, Month, or Year based on
                likes from users.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <PenToolIcon className="w-10 h-10 text-green-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-center mb-2">
                Shayari Munch Event
              </h3>
              <p className="text-gray-300 text-center">
                Top 20 shayars perform live yearly, judged by famous Indian
                shayars, telecast on TV and YouTube.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <UsersIcon className="w-10 h-10 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-center mb-2">
                Connect & Earn
              </h3>
              <p className="text-gray-300 text-center">
                Share social links for bookings and get paid directly by fans
                via UPI or PayPal.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-center mt-4">
            Three passionate individuals building a revolution in Shayari.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/poetry"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Start Your Shayari Journey
          </Link>
          <p className="text-gray-400 mt-4">
            Join as a Shayar or Reader • Free to Start • Be the Next Star
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
