"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

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

const Elementor = ({ number }: { number: string | number }) => {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchPageContent = async () => {
      try {
        const response = await axios.post(
          "https://limegreen-hornet-657242.hostingersite.com/graphql",
          {
            query: `
            query GetPageWithSEO {
              page(id: "${number}", idType: DATABASE_ID) {
                title
                content
                elementorCssUrl
                elementorJsUrl
                globalCssUrl
                frontendCssUrl
                frontendMinCssUrl
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
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            Loading content...
          </h2>
          <p className="mt-2 text-muted-foreground">
            Please wait while we fetch the latest posts from WordPress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl text-center">{pageData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
};

export default Elementor;
