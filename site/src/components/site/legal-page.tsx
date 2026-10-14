import { LEGAL_UPDATED } from "@/lib/site-config";

/** Shared shell for the legal pages, in the design D page frame. */
export function LegalPage({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro: string;
  sections?: readonly { readonly heading: string; readonly id?: string; readonly paragraphs: readonly React.ReactNode[] }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="rk-w rk-page rk-legal">
      <p className="rk-legal-k">Legal</p>
      <h1 className="rk-h1">{title}</h1>
      <p className="rk-dek">{intro}</p>
      <p className="rk-legal-date">Last updated: <time dateTime={LEGAL_UPDATED}>{LEGAL_UPDATED}</time></p>
      {sections?.map((section) => (
        <section key={section.heading} id={section.id} className="rk-legal-sec">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ))}
      {children}
    </div>
  );
}
