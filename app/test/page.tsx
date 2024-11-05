"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SEOProvider from "@/providers/SeoProvider";

interface PageContent {
  title: string;
  content: string;
  elementorCssUrl: string;
  elementorJsUrl: string;
  globalCssUrl: string;
  globalPostCssUrl: string;
  frontendCssUrl: string;
  seo: {
    title: string;
    metaDesc: string;
    opengraphImage?: {
      sourceUrl: string;
    };
  };
}

const Page = () => {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchPageContent = async () => {
      try {
        const response = await axios.post("http://test-dlsu.test/graphql", {
          query: `
            query GetPageWithSEO {
              page(id: "35", idType: DATABASE_ID) {
                title
                content
                elementorCssUrl
                elementorJsUrl
                globalCssUrl
                globalPostCssUrl
                frontendCssUrl
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
        });

        const data = response.data.data.page;
        setPageData(data);

        // Inject CSS and JS as needed
        if (data.elementorCssUrl) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = data.elementorCssUrl;
          document.head.appendChild(link);
        }

        if (data.globalCssUrl) {
          const globalLink = document.createElement("link");
          globalLink.rel = "stylesheet";
          globalLink.href = data.globalCssUrl;
          document.head.appendChild(globalLink);
        }

        if (data.elementorJsUrl) {
          const script = document.createElement("script");
          script.src = data.elementorJsUrl;
          script.defer = true;
          document.body.appendChild(script);
        }

        if (data.globalPostCssUrl) {
          const globalLink = document.createElement("link");
          globalLink.rel = "stylesheet";
          globalLink.href = data.globalPostCssUrl;
          document.head.appendChild(globalLink);
        }

        if (data.frontendCssUrl) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = data.frontendCssUrl;
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    fetchPageContent();
  }, []);

  if (!pageData || !isClient) {
    return <p>Loading...</p>;
  }

  return (
    <SEOProvider
      metaTitle={pageData.seo.title}
      metaDescription={pageData.seo.metaDesc}
      //   metaImage={pageData.seo.opengraphImage?.sourceUrl}
    >
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </SEOProvider>
  );
};

export default Page;
