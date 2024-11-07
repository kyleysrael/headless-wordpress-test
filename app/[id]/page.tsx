import type { Metadata } from "next"

import { generateMetadataServerSide } from "@/config/SeoConfig"
import Elementor from "@/components/Organism/Elementor"

type Params = { id: string }

export async function generateStaticParams(): Promise<Params[]> {
  const pageIds = Array.from({ length: 200 }, (_, i) => (i + 1).toString())

  return pageIds.map((id) => ({ id }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const pageId = params.id
  const metadata = await generateMetadataServerSide(pageId)
  return metadata
}

export default async function Page({ params }: { params: Params }) {
  const pageId = params.id

  console.log(pageId)

  return (
    <main>
      <Elementor number={parseInt(pageId, 10)} />
    </main>
  )
}
