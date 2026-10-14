import { SectionHub, sectionMetadata } from "@/components/site/section-pages";

export const metadata = sectionMetadata("money-phone", "Paying, withdrawing cash and getting your phone to work in Korea.");

export default function Page() {
  return <SectionHub sectionId="money-phone" intro="Paying, withdrawing cash and getting your phone to work in Korea." />;
}
