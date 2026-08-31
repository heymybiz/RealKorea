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
 * Home — PRD 02 §3.1.
 *
 * Section order is fixed: cover, desk strip, First 24 hours, Eat now, from the
 * desk, neighborhood filmstrip. The PRD's empty rule applies throughout: hide a
 * strip rather than pad it with invented cards.
 *
 * The cover is a split: editorial column on paper, image plate bleeding off the
 * right edge. That is how the v2 still is composed, and it is what gives the page
 * its value contrast — a magazine cover is dark photography against pale paper,
 * not paper against paper.
 */
export default async function HomePage() {
  const [featuredTips, eatPlaces, answeredQuestions, neighborhoods, first24] =
    await Promise.all([
      getTips({ limit: 3 }),
      getPlaces({ vertical: "eat", limit: 3 }),
      getQuestions({ answeredOnly: true, limit: 3 }),
      getNeighborhoods({ limit: 8 }),
      getFirst24Guide(),
    ]);

  return (
    <>
      {/* 1. Cover */}
      <section className="border-ink border-b-2">
        <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:py-20 lg:pr-12 lg:pl-[max(48px,calc((100vw-1120px)/2))]">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="bg-crimson h-[3px] w-10" />
              <p className="text-crimson text-xs tracking-[0.16em] uppercase">
                Local desk
              </p>
            </div>

            <h1 className="mt-6 max-w-[18ch] text-[38px] leading-[1.02] font-semibold sm:text-[54px] lg:text-[64px]">
              What locals actually tell friends before you land.
            </h1>

            <p className="text-ink-soft mt-6 max-w-md text-lg">
              {SITE_PROMISE}
            </p>

            <CoverSearch />
          </div>

          <div className="relative min-h-[280px] lg:min-h-[560px]">
            <MediaPlaceholder
              ratio="4/5"
              label="Documentary cover photograph pending"
              className="h-full w-full lg:absolute lg:inset-0 lg:aspect-auto"
            />
          </div>
        </div>
      </section>

      {/* 2. Desk strip — PRD 02 §3.1: hide it rather than fake cards. */}
      {featuredTips.length >= 3 ? (
        <section className="content-shell py-14">
          <SectionHeading
            kicker="The desk"
            title="Tips locals send in a group chat."
            action={{ href: "/tips", label: "All tips" }}
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} neighborhoods={neighborhoods} />
            ))}
          </div>
        </section>
      ) : null}

      {/* 3. First 24 hours — the ink panel is the page's second anchor. */}
      {first24 ? (
        <section className="content-shell pb-14">
          <SectionHeading
            kicker="Arrive"
            title={first24.title}
            action={{ href: "/first-24-hours", label: "Open the full guide" }}
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              {first24.dek ? (
                <p className="text-ink-soft max-w-xl text-lg">{first24.dek}</p>
              ) : null}
              <Link
                href="/first-24-hours"
                className="border-ink text-ink hover:bg-ink mt-6 inline-flex items-center border-2 px-5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out hover:text-white"
              >
                Read the guide
              </Link>
            </div>

            <div className="bg-ink p-6">
              <p className="text-[11px] tracking-[0.16em] text-[color:rgba(244,239,230,0.6)] uppercase">
                Checklist
              </p>
              <h3 className="mt-1 text-xl font-semibold text-[color:var(--paper)]">
                First 24 hours
              </h3>
              <div className="mt-4 [--rule:rgba(244,239,230,0.18)] [&_label_span]:text-[color:var(--paper)]">
                <ChecklistModule items={first24.checklistItems} />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 4. Eat now */}
      {eatPlaces.length > 0 ? (
        <section className="content-shell pb-14">
          <SectionHeading
            kicker="Eat now"
            title="Places we’d send a friend."
            action={{ href: "/eat", label: "Eat & Drink" }}
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {eatPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>
      ) : null}

      {/* 5. From the desk */}
      <section className="content-shell pb-14">
        <SectionHeading
          kicker="From the desk"
          title="Questions the desk has answered."
          action={{ href: "/ask", label: "Ask a Local" }}
        />

        {answeredQuestions.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {answeredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          /* No answer has been published yet, and an answer is a factual
             claim, so nothing is generated here. */
          <div className="border-ink border-l-[3px] pl-5">
            <p className="text-ink text-lg">
              No answer has been published yet. Questions are waiting at the
              desk.
            </p>
            <Link
              href="/ask"
              className="text-crimson hover:text-crimson-dark mt-3 inline-flex text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
            >
              Ask the desk
            </Link>
          </div>
        )}
      </section>

      {/* 6. Neighborhood filmstrip */}
      {neighborhoods.length > 0 ? (
        <section className="content-shell pb-20">
          <SectionHeading
            kicker="Neighborhoods"
            title="Where these answers apply."
            action={{ href: "/places", label: "All places" }}
          />

          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {neighborhoods.map((neighborhood) => (
              <li key={neighborhood.id}>
                <Link
                  href={`/places/${neighborhood.slug}`}
                  className="group block"
                >
                  <MediaPlaceholder ratio="4/5" />
                  <p className="group-hover:text-crimson mt-3 text-[15px] font-medium transition-colors duration-[180ms] ease-out">
                    {neighborhood.nameEn}
                  </p>
                  {/* PRD 02 §5 — Hangul on first mention, English after. */}
                  <p className="text-ink-soft text-[13px]">
                    {neighborhood.nameKo}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
