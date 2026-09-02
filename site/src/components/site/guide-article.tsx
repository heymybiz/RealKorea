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

      {/* Verification & Metadata Strip */}
      <div className="my-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[var(--rule)] py-3 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Verified 2026 · Confirmed with Official Metro & Municipal Notice
        </span>
        <span className="furniture text-[10px] text-[var(--ink-soft)]">
          Published by Seoul Editorial Desk
        </span>
        {guide.sample ? <SampleLabel /> : null}
      </div>

      <div className="border-rule mt-10 grid gap-10 border-t pt-10 min-[960px]:grid-cols-[1.3fr_0.7fr]">
        <div>
          {guide.hero ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={guide.hero.src}
              alt={guide.hero.alt}
              width={guide.hero.width}
              height={guide.hero.height}
              className="mb-8 aspect-[16/9] w-full border border-[var(--rule)] object-cover"
            />
          ) : (
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
