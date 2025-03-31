import React from 'react'
import ContactUsPage from "./component/contactUsPage"
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
  const metaData = await getMetaData("contact-us");

  return {
    title: metaData.metaTitle,
    description: metaData.metaDescription,
    openGraph: {
      title: metaData.metaTitle,
      description: metaData.metaDescription,
      url: `${metaData.websiteUrl}${metaData.pageUrl}`,
      siteName: metaData.websiteName,
      images: [
        {
          url: metaData.logoUrl,
          width: 1200,
          height: 630,
          alt: metaData.websiteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaData.metaTitle,
      description: metaData.metaDescription,
      images: [metaData.logoUrl],
    },
    alternates: {
      canonical: `${metaData.websiteUrl}${metaData.pageUrl}`,
    },
  };
}

const Page = () => {
  return (
    <div>
      <ContactUsPage/>
    </div>
  )
}

export default Page
