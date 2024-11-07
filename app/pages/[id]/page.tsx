// app/page/[id]/page.tsx
import { generateMetadataServerSide } from "@/providers/SeoFunctions";
import type { Metadata } from "next";

type Props = {
  params: { id: string }; // Getting the dynamic `id` from the URL
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Directly use the dynamic `id` from the URL path
  const pageId = params.id;
  const metadata = await generateMetadataServerSide(pageId); // Use the `pageId` to fetch SEO data
  return metadata;
}

const Page = ({ params }: Props) => {
  return (
    <main>
      <h1>Page {params.id}</h1>
    </main>
  );
};

export default Page;
