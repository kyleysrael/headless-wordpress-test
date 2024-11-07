import axios from "axios";

interface Metadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: string[];
  };
}

export const generateMetadataServerSide = async (pageId: string): Promise<Metadata> => {
  const response = await axios.post(
    "https://limegreen-hornet-657242.hostingersite.com/graphql",
    {
      query: `
        query GetPageWithSEO {
          page(id: "${pageId}", idType: DATABASE_ID) {
            title
            seo {
              title
              metaDesc
              opengraphImage {
                sourceUrl
              }
            }
          }
        }
      `
    }
  );

  const data = response.data.data.page;

  return {
    title: data.seo.title || data.title,
    description: data.seo.metaDesc,
    openGraph: {
      title: data.seo.title || data.title,
      description: data.seo.metaDesc,
      images: data.seo.opengraphImage ? [data.seo.opengraphImage.sourceUrl] : []
    }
  };
};
