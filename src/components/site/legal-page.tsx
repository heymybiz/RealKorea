/**
 * Shared shell for the three legal pages (FR-072).
 *
 * These pages describe how the product actually behaves, which is drawn from the
 * PRD, so nothing here is invented. What they deliberately do *not* do is state
 * binding legal terms, retention periods, or jurisdiction: that is a lawyer's
 * call, not a build step's. Every page carries a visible review notice until a
 * person signs off, so nobody mistakes scaffolding for a reviewed policy.
 */
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: readonly {
    readonly heading: string;
    readonly paragraphs: readonly string[];
  }[];
}) {
  return (
    <div className="content-shell py-16">
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">Legal</p>

      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        {title}
      </h1>

      <p className="text-ink-soft mt-6 max-w-2xl text-lg">{intro}</p>

      <div className="border-crimson bg-paper-warm mt-8 max-w-2xl border-l-[3px] px-5 py-4">
        <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
          Pending legal review
        </p>
        <p className="text-ink mt-2 text-[15px] leading-6">
          This page describes how the site works today. It has not been reviewed
          by a lawyer and is not the final policy text.
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.heading} className="border-rule mt-12 border-t pt-10">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-7">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
