import { ChecklistModule } from "@/components/site/checklist-module";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { Prose } from "@/components/site/prose";
import { SampleLabel } from "@/components/site/sample-label";
import { TipBoxes } from "@/components/site/tip-box";
import type { Guide } from "@/lib/content/types";

/**
 * PRD 02 §3.11 — long-form editor body with tip boxes and a checklist block.
 *
 * Shared by `/guides/:slug` and the `/first-24-hours` alias so both routes
 * render the identical article (FR-051).
 */
export function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <>
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">
        Long-form guide
      </p>

      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        {guide.title}
      </h1>

      {guide.dek ? (
        <p className="text-ink-soft mt-5 max-w-2xl text-lg italic">
          {guide.dek}
        </p>
      ) : null}

      {guide.sample ? (
        <div className="mt-6">
          <SampleLabel />
        </div>
      ) : null}

      <div className="border-rule mt-10 grid gap-10 border-t pt-10 min-[960px]:grid-cols-[1.3fr_0.7fr]">
        <div>
          {guide.hero ? null : (
            <MediaPlaceholder ratio="16/9" label="Photograph pending" />
          )}
          <Prose blocks={guide.body} />
          <TipBoxes tipBoxes={guide.tipBoxes} />
        </div>

        {guide.checklistItems.length > 0 ? (
          <aside className="border-rule bg-paper-warm border p-6 min-[960px]:sticky min-[960px]:top-8 min-[960px]:self-start">
            <h2 className="text-lg font-semibold">{guide.title}</h2>
            <p className="text-ink-soft mt-1 text-[13px]">
              Ticks are kept in this browser.
            </p>
            <div className="mt-4">
              <ChecklistModule items={guide.checklistItems} />
            </div>
          </aside>
        ) : null}
      </div>
    </>
  );
}
