import Link from "next/link";

import { SectionHub, sectionMetadata } from "@/components/site/section-pages";

export const metadata = sectionMetadata("arrival", "Your first 24 hours after landing, and the small fixes that save the trip.");

export default function Page() {
  return <SectionHub sectionId="arrival" intro="Your first 24 hours after landing, and the small fixes that save the trip." extra={<First24Callout />} />;
}

function First24Callout() {
  return (
    <p className="rk-callout">
      Just landed? Start with <Link href="/arrival/first-24-hours">your first 24 hours in Korea →</Link>
    </p>
  );
}
