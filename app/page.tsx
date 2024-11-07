import Elementor from "@/components/organism/elementor";
import { generateMetadataServerSide } from "@/providers/SeoFunctions"; // Server-side function
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageId = params.id || "41";
  const metadata = await generateMetadataServerSide(pageId);
  return metadata;
}

export default function Page({ params }: Props) {
  return (
    <main>
      <h1>{params.id}</h1>
      <Elementor />
    </main>
  );
}
