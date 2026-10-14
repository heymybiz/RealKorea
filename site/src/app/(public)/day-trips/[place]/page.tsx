import NeighborhoodPage, { generateMetadata as areaMetadata } from "../../neighborhoods/[area]/page";
import { itemsIn } from "@/lib/ia";

type Props = { params: Promise<{ place: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return itemsIn("neighborhoods", "day-trips").map((item) => ({ place: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { place } = await params;
  return areaMetadata({ params: Promise.resolve({ area: place }) });
}

export default async function DayTripPage({ params }: Props) {
  const { place } = await params;
  return <NeighborhoodPage params={Promise.resolve({ area: place })} />;
}
