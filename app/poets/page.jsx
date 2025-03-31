import PoetsPage from "./components/PoetsPage";
import { API_ENDPOINTS, BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";
import { apiCall } from "@/api/fetchData";
import { getItem } from "@/lib/localStorage";

// async function getMetaData(slug) {
//   try {
//     const response = await apiCall({
//       method: "GET",
//       url: `${BASE_URL}/${API_ENDPOINTS.GET_METADATA}?pageName=${slug}`,
//       headers: {
//         Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
//       },
//     });
//     return response.data || {};
//   } catch (error) {
//     console.error(`Error fetching metadata:`, error);
//     return null;
//   }
// }

// export async function generateMetadata() {
//   const metaData = await getMetaData("poets");

//   return {
//     title: metaData.metaTitle,
//     description: metaData.metaDescription,
//     openGraph: {
//       title: metaData.metaTitle,
//       description: metaData.metaDescription,
//       url: metaData.pageUrl,
//       siteName: metaData.websiteName,
//       images: [
//         {
//           url: metaData.logoUrl,
//           width: 1200,
//           height: 630,
//           alt: metaData.websiteName,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: metaData.metaTitle,
//       description: metaData.metaDescription,
//       images: [metaData.logoUrl],
//     },
//     alternates: {
//       canonical: metaData.pageUrl,
//     },
//   };
// }

const TopPoetsPage = () => {
  return (
    <div>
      <PoetsPage />
    </div>
  );
};

export default TopPoetsPage;
