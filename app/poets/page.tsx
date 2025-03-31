import PoetsPage from "./components/PoetsPage";
import { API_ENDPOINTS, BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";
import { apiCall } from "@/api/fetchData";
import { getItem } from "@/lib/localStorage";
import { Metadata } from "next";

async function getMetaData(slug: string) {
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
    return null; // ✅ Return null in case of error
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getMetaData("poets");

  return {
    title: metaData.metaTitle,
    description: metaData.metaDescription,
    openGraph: {
      title: metaData.metaTitle, // Use metaTitle for consistency
      description: metaData.metaDescription,
      url: metaData.pageUrl, // Corrected from websiteUrl to pageUrl
      siteName: metaData.websiteName,
      images: [
        {
          url: metaData.logoUrl, // OpenGraph requires images array
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
      images: [metaData.logoUrl], // Twitter uses an array for images
    },
    alternates: {
      canonical: metaData.pageUrl, // Canonical link
    },
  };
}



const TopPoetsPage = () => {
 

  return (
   <div>
     <PoetsPage/>
     </div>
  );
};

export default TopPoetsPage;
