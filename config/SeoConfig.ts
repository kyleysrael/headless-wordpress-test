import axios from "axios"

interface Metadata {
  metadatabase: string
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    images: string
  }
}

export const generateMetadataServerSide = async (
  pageId: string
): Promise<Metadata> => {
  try {
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
                }
              }
            }
          `,
      }
    )

    const data = response.data.data.page

    return {
      metadatabase: "",
      title: data?.seo.title || data?.title,
      description: data?.seo.metaDesc,
      openGraph: {
        title: data?.seo.title || data?.title,
        description: data?.seo.metaDesc,
        images: "/favicon.ico",
      },
    }
  } catch (error) {
    console.error("Error fetching page data:", error)
    throw new Error("Failed to generate metadata")
  }
}
