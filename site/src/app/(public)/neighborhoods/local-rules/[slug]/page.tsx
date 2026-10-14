import { ArticlePage, articleMetadata, articleParams } from "@/components/site/section-pages";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articleParams("neighborhoods")
    .filter((p) => p.hub === "local-rules")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return articleMetadata("neighborhoods", "local-rules", slug);
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  return <ArticlePage sectionId="neighborhoods" hubId={"local-rules"} slug={slug} query={await searchParams} />;
}
