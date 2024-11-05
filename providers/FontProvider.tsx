import localFont from "next/font/local";
import React from "react";

export const EBGaramond = localFont({
  src: [
    {
      path: "../app/fonts/EBGaramond/EBGaramond-Bold.ttf",
      weight: "100",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-ExtraLight.ttf",
      weight: "200",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-Light.ttf",
      weight: "300",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-SemiBold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-Bold.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-ExtraBold.ttf",
      weight: "800",
      style: "normal"
    },
    {
      path: "../fonts/Onest/Onest-Black.ttf",
      weight: "900",
      style: "normal"
    }
  ],
  variable: "--font-onest"
});

const FontProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default FontProvider;
