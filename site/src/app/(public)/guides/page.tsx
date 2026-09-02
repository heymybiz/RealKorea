import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/cms";
import { ArrowUpRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Comprehensive Field Guides | Real Korea",
  description:
    "Long-form Seoul survival protocols, transit mastery, payment rules, and post-midnight navigation.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesIndexPage() {
  const guides = await getGuides();
  const publishedGuides = guides.filter((g) => !g.sample);

  return (
    <div className="content-shell py-16">
      <div className="max-w-4xl">
        <p className="text-crimson text-xs font-semibold tracking-[0.12em] uppercase">
          Editorial Library
        </p>

        <h1 className="mt-4 text-[32px] leading-[1.15] font-bold text-white sm:text-[44px]">
          Comprehensive Seoul Field Guides
        </h1>

        <p className="text-ink-soft mt-4 text-lg leading-relaxed max-w-2xl">
          Multi-section logistical blueprints designed for first-time and returning visitors. Each guide covers zero-fluff checklists, exact door coordinates, and economic rationale.
        </p>

        <div className="mt-12 space-y-8">
          {publishedGuides.map((guide, idx) => {
            const guideUrl = guide.isFirst24Alias ? "/first-24-hours" : `/guides/${guide.slug}`;

            return (
              <article
                key={guide.id}
                className="group relative border border-[var(--rule)] bg-[#1a1715] p-6 sm:p-8 transition-all hover:border-amber-500/50"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {guide.hero && (
                    <div className="relative aspect-[16/9] w-full md:w-64 flex-shrink-0 overflow-hidden border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={guide.hero.src}
                        alt={guide.hero.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-amber-400">
                      <span className="font-mono">GUIDE #{String(idx + 1).padStart(2, "0")}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-stone-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Verified Editorial Protocol
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      <Link href={guideUrl}>
                        {guide.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-stone-300 leading-relaxed">
                      {guide.dek}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-stone-400">
                        {guide.checklistItems.length > 0 && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                            {guide.checklistItems.length} Checklist Actions
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-500" />
                          10–12 min read
                        </span>
                      </div>

                      <Link
                        href={guideUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                      >
                        Read Guide <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
