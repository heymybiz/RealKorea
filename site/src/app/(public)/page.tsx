import Link from "next/link";

import { ChecklistModule } from "@/components/site/checklist-module";
import { CoverSearch } from "@/components/site/cover-search";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { PlaceCard } from "@/components/site/place-card";
import { QuestionCard } from "@/components/site/question-card";
import { SectionHeading } from "@/components/site/section-heading";
import { TipCard } from "@/components/site/tip-card";
import {
  getFirst24Guide,
  getNeighborhoods,
  getPlaces,
  getQuestions,
  getTips,
} from "@/lib/cms";
import { SITE_PROMISE } from "@/lib/nav";

/**
 * Home — Modern Korean Heritage & Editorial Magazine.
 */
export default async function HomePage() {
  const [featuredTips, eatPlaces, answeredQuestions, neighborhoods, first24] =
    await Promise.all([
      getTips({ limit: 4 }),
      getPlaces({ vertical: "eat", limit: 3 }),
      getQuestions({ answeredOnly: true, limit: 3 }),
      getNeighborhoods({ limit: 8 }),
      getFirst24Guide(),
    ]);

  const [leadTip, ...restTips] = featuredTips;

  const HERO_PHOTO =
    "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=85";

  return (
    <>
      {/* 1. Cover Hero Section */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper)]">
        <div className="content-shell py-12 lg:py-16">
          <div className="grid items-stretch gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="furniture text-[11px] font-bold text-[var(--lacquer)]">
                  Issue 01
                </span>
                <span className="text-[var(--rule-strong)]">/</span>
                <span className="furniture text-[11px] text-[var(--ink-soft)]">
                  Seoul Local Intelligence
                </span>
              </div>

              <h1 className="mt-5 text-[40px] leading-[1.04] font-bold sm:text-[54px] lg:text-[62px]">
                What locals actually tell friends before you land.
              </h1>

              <p className="font-display mt-6 text-[21px] leading-8 italic text-[var(--ink-soft)]">
                “{SITE_PROMISE}”
              </p>

              <CoverSearch seedCount={4} />
            </div>

            {/* Right Column: Signature Seoul Street Documentary Photo */}
            <div className="relative flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--rule)] bg-[#1a1715] shadow-lg sm:aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HERO_PHOTO}
                  alt="Seoul Euljiro Printing Alley at Night"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Verified Local Desk Seal Badge */}
                <div className="absolute right-4 bottom-4 flex items-center gap-3 border border-white/30 bg-[var(--charcoal)]/90 px-4 py-2.5 text-white backdrop-blur-md shadow-lg">
                  <div className="flex size-6 items-center justify-center border border-[var(--lacquer)] bg-[var(--lacquer)] text-[11px] font-black text-white">
                    正
                  </div>
                  <div>
                    <p className="furniture text-[10px] tracking-wider text-white">
                      Verified Local Desk
                    </p>
                    <p className="text-[11px] text-white/70">
                      Jung-gu, Seoul · Verified 2026.08
                    </p>
                  </div>
                </div>
              </div>
              <p className="furniture mt-3 text-right text-[10px] text-[var(--ink-soft)]">
                Photography: Euljiro Printing Alley at 01:30 AM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Desk Strip: Tips (Amber Gold Theme) */}
      {featuredTips.length >= 3 ? (
        <section className="border-b border-[var(--rule)] bg-[#fcfaf6] py-16 lg:py-20">
          <div className="content-shell">
            <SectionHeading
              kicker="The Desk · Tips"
              title="Tips locals send in a group chat."
              action={{ href: "/tips", label: "View All Tips →" }}
              themeColor="amber"
            />

            {leadTip ? (
              <article className="heritage-card mb-12 overflow-hidden border-t-4 border-t-[var(--amber)] p-6 sm:p-8 lg:p-10">
                <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
                  <Link href={`/tips/${leadTip.slug}`} className="group relative block overflow-hidden border border-[var(--rule)]">
                    <MediaPlaceholder
                      ratio="16/9"
                      label="Transit Intel: Seoul Metro"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="fact-chip bg-[var(--amber-light)] text-[var(--amber)]">
                        {leadTip.topic}
                      </span>
                      <span className="furniture text-[10px] text-[var(--ink-soft)]">
                        Verified by Editor
                      </span>
                    </div>
                    <h3 className="mt-4 text-[28px] leading-[1.12] font-bold sm:text-[36px]">
                      <Link
                        href={`/tips/${leadTip.slug}`}
                        className="transition-colors hover:text-[var(--amber)]"
                      >
                        {leadTip.title}
                      </Link>
                    </h3>
                    {leadTip.dek ? (
                      <p className="mt-4 text-[16px] leading-7 text-[var(--ink-soft)]">
                        {leadTip.dek}
                      </p>
                    ) : null}

                    {/* Friend TipBox */}
                    <div className="mt-6 border-l-4 border-[var(--amber)] bg-[var(--amber-light)]/70 p-4 text-[14px] leading-6 text-[var(--ink)]">
                      <p className="furniture mb-1 text-[10px] font-bold text-[var(--amber)]">
                        ⚡ Direct Friend Advice
                      </p>
                      <p>
                        {leadTip.title.includes("T-money")
                          ? "If you land after 23:30, AREX trains stop. Skip the taxi queue and take the night bus 6001 with cash or T-money."
                          : "Always check the basement subway exit number before climbing. Naver Map shows the correct elevator."}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ) : null}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {restTips.slice(0, 3).map((tip) => (
                <TipCard key={tip.id} tip={tip} neighborhoods={neighborhoods} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. Essential Arrival Guide: First 24 Hours (Warm Hanji Linen Theme) */}
      {first24 ? (
        <section className="bg-[#f0ebe1] text-[var(--ink)] py-18 lg:py-24 border-b border-[var(--rule)]">
          <div className="content-shell">
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="furniture rounded-xs bg-[var(--ink)] px-2.5 py-1 text-[10px] font-bold tracking-widest text-white">
                    FIRST 24H · PROTOCOL
                  </span>
                  <span className="text-[var(--rule-strong)]">/</span>
                  <span className="furniture text-[11px] font-bold text-[var(--ink-soft)]">
                    Essential Guide
                  </span>
                </div>
                <h2 className="font-display mt-4 text-[38px] leading-[1.08] font-bold text-[var(--ink)] sm:text-[50px]">
                  {first24.title}
                </h2>
                {first24.dek ? (
                  <p className="font-display mt-6 text-[20px] leading-8 italic text-[var(--ink-soft)]">
                    {first24.dek}
                  </p>
                ) : null}
                <div className="mt-10">
                  <Link
                    href="/first-24-hours"
                    className="btn-action btn-ink-solid shadow-md"
                  >
                    <span>Open Step-by-Step Checklist →</span>
                  </Link>
                </div>
              </div>

              {/* Checklist Cards */}
              <div className="border border-[var(--rule)] bg-white p-6 sm:p-8 rounded-xs shadow-md">
                <p className="furniture mb-6 border-b border-[var(--rule)] pb-3 text-[11px] font-bold tracking-wider text-[var(--ink-soft)]">
                  Landing Protocol Checkpoints
                </p>
                <div className="space-y-4">
                  <ChecklistModule items={first24.checklistItems} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 4. Eat & Drink (Chili Burgundy Theme) */}
      {eatPlaces.length > 0 ? (
        <section className="border-b border-[var(--rule)] bg-[#fffafb] py-16 lg:py-20">
          <div className="content-shell">
            <SectionHeading
              kicker="Eat & Drink · No Tourist Traps"
              title="Places we’d send a friend, traps we’d pull them out of."
              action={{ href: "/eat", label: "All Dining & Bars →" }}
              themeColor="chili"
            />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {eatPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 5. From the Desk: Questions (Lacquer Red Theme) */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper)] py-16 lg:py-20">
        <div className="content-shell">
          <SectionHeading
            kicker="Ask a Local · Community Feed"
            title="Questions the desk has answered."
            action={{ href: "/ask", label: "Ask the Desk →" }}
            themeColor="lacquer"
          />

          {answeredQuestions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {answeredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <div className="border-l-4 border-[var(--lacquer)] bg-[var(--lacquer-light)] p-6">
              <p className="text-lg text-[var(--ink)]">
                Questions are waiting at the desk. Editors publish verified answers weekly.
              </p>
              <Link
                href="/ask"
                className="furniture text-[11px] font-bold text-[var(--lacquer)] mt-3 inline-block hover:underline"
              >
                Submit a question to the desk →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 6. Neighborhoods (Pine Celadon Theme) */}
      {neighborhoods.length > 0 ? (
        <section className="bg-[#f4f9f7] py-16 lg:py-20">
          <div className="content-shell">
            <SectionHeading
              kicker="Neighborhoods · Capital Scope"
              title="Seoul & Capital Area: Where answers apply."
              action={{ href: "/places", label: "Explore All Areas →" }}
              themeColor="pine"
            />

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {neighborhoods.map((neighborhood) => (
                <li key={neighborhood.id} className="heritage-card overflow-hidden border-t-2 border-t-[var(--pine)]">
                  <Link
                    href={`/places/${neighborhood.slug}`}
                    className="group flex h-full flex-col justify-between p-5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="furniture text-[10px] font-bold text-[var(--pine)]">
                          {neighborhood.region}
                        </span>
                        <span className="size-1.5 rounded-full bg-[var(--pine)] opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <h3 className="mt-3 text-[22px] font-bold leading-tight transition-colors group-hover:text-[var(--pine)]">
                        {neighborhood.nameEn}
                      </h3>
                      <p className="text-[13px] text-[var(--ink-soft)]">
                        {neighborhood.nameKo}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-[var(--rule)] pt-3">
                      <p className="line-clamp-2 text-[12px] leading-5 text-[var(--ink-soft)]">
                        {neighborhood.dek || "Traditional hanok alleys meets third-wave coffee roasters."}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
