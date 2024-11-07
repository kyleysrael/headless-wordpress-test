import Elementor from "@/components/organism/elementor";
import { generateMetadataServerSide } from "@/providers/SeoFunctions";
import type { Metadata } from "next";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const pageId = resolvedParams.id || "41";
  const metadata = await generateMetadataServerSide(pageId);
  return metadata;
}

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;

  return (
    <main>
      <h1 className="text-3xl text-center">{resolvedParams.id}</h1>
      <Elementor />
    </main>
  );
}
