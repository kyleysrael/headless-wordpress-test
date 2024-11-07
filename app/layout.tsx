import { SEOProvider } from "@/providers/SeoProvider";
import "./globals.css";
export const metadata = {
  title: "My Website",
  description: "A description for my website"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SEOProvider>{children}</SEOProvider>
      </body>
    </html>
  );
}
