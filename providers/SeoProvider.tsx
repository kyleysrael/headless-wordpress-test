"use client";

import { createContext, useContext, ReactNode } from "react";

interface SEOContextProps {
  generateMetadataServerSide: (pageId: string) => Promise<{ [key: string]: string }>;
}

const SEOContext = createContext<SEOContextProps | undefined>(undefined);

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error("useSEO must be used within a SEOProvider");
  }
  return context;
};

export const SEOProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SEOContext.Provider
      value={{
        generateMetadataServerSide: (pageId: string) => {
          console.log(pageId);
          return Promise.resolve({});
        }
      }}
    >
      {children}
    </SEOContext.Provider>
  );
};
