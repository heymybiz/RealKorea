import { hubMetadata, SubHub } from "@/components/site/section-pages";

export const metadata = hubMetadata("neighborhoods", "local-rules");

export default function Page() {
  return <SubHub sectionId="neighborhoods" hubId="local-rules" />;
}
