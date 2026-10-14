import { ArticlePage, articleMetadata, articleParams } from "@/components/site/section-pages";

type Props = {
  params: Promise<{ hub: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articleParams("arrival");
}

export async function generateMetadata({ params }: Props) {
  const { hub, slug } = await params;
  return articleMetadata("arrival", hub, slug);
}

export default async function Page({ params, searchParams }: Props) {
  const { hub, slug } = await params;
  return <ArticlePage sectionId="arrival" hubId={hub} slug={slug} query={await searchParams} />;
}
