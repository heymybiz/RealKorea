import { hubMetadata, hubParams, SubHub } from "@/components/site/section-pages";

type Props = { params: Promise<{ hub: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return hubParams("money-phone");
}

export async function generateMetadata({ params }: Props) {
  const { hub } = await params;
  return hubMetadata("money-phone", hub);
}

export default async function Page({ params }: Props) {
  const { hub } = await params;
  return <SubHub sectionId="money-phone" hubId={hub} />;
}
