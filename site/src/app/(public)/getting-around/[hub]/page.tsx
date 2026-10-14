import { hubMetadata, hubParams, SubHub } from "@/components/site/section-pages";

type Props = { params: Promise<{ hub: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return hubParams("getting-around");
}

export async function generateMetadata({ params }: Props) {
  const { hub } = await params;
  return hubMetadata("getting-around", hub);
}

export default async function Page({ params }: Props) {
  const { hub } = await params;
  return <SubHub sectionId="getting-around" hubId={hub} />;
}
