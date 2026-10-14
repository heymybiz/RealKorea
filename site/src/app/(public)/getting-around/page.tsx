import { SectionHub, sectionMetadata } from "@/components/site/section-pages";

export const metadata = sectionMetadata("getting-around", "Transit cards, the airport run, subway and bus, taxis and map apps. Checked on the ground by a local.");

export default function Page() {
  return <SectionHub sectionId="getting-around" intro="Transit cards, the airport run, subway and bus, taxis and map apps. Checked on the ground by a local." />;
}
