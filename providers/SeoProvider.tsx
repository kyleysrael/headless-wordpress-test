"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
}

interface SeoProviderProps {
  children: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const SEOProvider: React.FC<SeoProviderProps> = ({
  children,
  metaTitle,
  metaDescription,
  metaKeywords
}) => {
  const [seoData, setSeoData] = useState<SEOMeta | null>(null);

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const response = await axios.post("http://test-dlsu.test/graphql", {
          query: `
              query {
                seoSettings {
                  seoCustom {
                    metaTitle
                    metaDescription
                    metaKeywords
                  }
                }
              }
            `
        });

        const data = response.data;
        if (data) {
          setSeoData(data.data.seoSettings.seoCustom);
        }
      } catch (error) {
        console.log("Error fetching SEO data:", error);
      }
    };

    fetchSEOData();
  }, []);

  useEffect(() => {
    if (seoData || metaTitle || metaDescription || metaKeywords) {
      document.title = metaTitle || seoData?.metaTitle || "Default Title";
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          metaDescription || seoData?.metaDescription || "Default description"
        );
      if (metaKeywords || seoData?.metaKeywords) {
        document
          .querySelector('meta[name="keywords"]')
          ?.setAttribute("content", metaKeywords || seoData?.metaKeywords || "");
      }
    }
  }, [seoData, metaTitle, metaDescription, metaKeywords]);

  return <>{children}</>;
};

export default SEOProvider;
