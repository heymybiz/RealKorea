import Link from "next/link";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SEARCH_SEEDS } from "@/lib/search-seeds";

import { loadHomeData, NAV } from "../shared";

/**
 * Saekdong — the same palette, held back.
 *
 * Colour arrives as bands, rails, and plates rather than as full sections. Paper
 * is the ground, type leads, and each colour marks one thing: the vertical
 * saekdong rail down the cover, a single red plate behind the kicker, a gold rule
 * per section, one blue-green band for the arrival guide.
 *
 * This is the intensity dial turned down. It answers the same brief — strongly
 * Korean colour, no ornament — but bets on the type carrying the page and the
 * colour punctuating it, which is closer to Monocle's discipline than to a poster.
 */
export default async function SaekdongVariant() {
  const { tips, eatPlaces, neighborhoods, first24 } = await loadHomeData();
  const [leadTip, ...restTips] = tips;

  return (
    <div className="korea">
      {/* Masthead on paper, with the saekdong band as the only chrome colour */}
      <header className="panel-paper">
        <div className="content-shell flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="size-4 translate-y-[2px]"
              style={{ background: "var(--k-red)" }}
            />
            <span className="font-[family-name:var(--display)] text-[26px] leading-none font-black tracking-[-0.02em] uppercase">
              Real Korea
            </span>
          </div>

          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="furniture text-[11px] transition-opacity duration-[180ms] ease-out hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="saekdong" />
      </header>

      {/* Cover: paper ground, vertical saekdong rail, one red plate */}
      <section className="panel-paper">
        <div className="flex">
          <div className="saekdong-rail shrink-0" aria-hidden="true" />

          <div className="min-w-0 flex-1">
            <div className="grid items-stretch lg:grid-cols-[1fr_0.85fr]">
              <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24 lg:pr-14">
                <p
                  className="furniture w-fit px-3 py-1.5 text-[11px] text-white"
                  style={{ background: "var(--k-red)" }}
                >
                  Local desk
                </p>

                <h1 className="mt-7 max-w-[16ch] text-[44px] sm:text-[62px] lg:text-[74px]">
                  What locals actually tell friends before you land.
                </h1>

                <p className="dek quiet mt-7 max-w-md text-[22px] leading-8">
                  Local answers. Not the brochure.
                </p>

                <form
                  action="/search"
                  method="get"
                  role="search"
                  className="mt-10 max-w-lg"
                >
                  <label htmlFor="s-search" className="sr-only">
                    Search Real Korea
                  </label>
                  <div
                    className="flex items-stretch border-2"
                    style={{ borderColor: "var(--k-ink)" }}
                  >
                    <input
                      id="s-search"
                      name="q"
                      type="search"
                      placeholder="Ask something tourists never get a straight answer to"
                      className="h-13 w-full bg-transparent px-4 py-3 text-[15px] outline-none placeholder:opacity-55"
                    />
                    <button
                      type="submit"
                      className="furniture shrink-0 px-6 text-[11px] text-white transition-opacity duration-[180ms] ease-out hover:opacity-85"
                      style={{ background: "var(--k-red)" }}
                    >
                      Search
                    </button>
                  </div>
                </form>

                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                  {SEARCH_SEEDS.slice(0, 4).map((seed) => (
                    <li key={seed}>
                      <Link
                        href={`/search?q=${encodeURIComponent(seed)}`}
                        className="text-[15px] underline decoration-[rgba(20,17,15,0.3)] underline-offset-4 transition-opacity duration-[180ms] ease-out hover:opacity-65"
                      >
                        {seed}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative min-h-[300px] lg:min-h-[600px]">
                <MediaPlaceholder
                  ratio="4/5"
                  label="Documentary cover photograph pending"
                  className="h-full w-full lg:absolute lg:inset-0 lg:aspect-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips. A single gold rule marks the section. */}
      <section className="panel-paper">
        <div className="content-shell py-16">
          <div
            className="h-1 w-full"
            style={{ background: "var(--k-gold)" }}
            aria-hidden="true"
          />
          <div className="mt-5 mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="furniture text-[11px]"
                style={{ color: "var(--k-red)" }}
              >
                The desk
              </p>
              <h2 className="mt-3 text-[34px] sm:text-[44px]">
                Tips locals send in a group chat.
              </h2>
            </div>
            <Link
              href="/tips"
              className="furniture border-b-2 pb-1 text-[11px]"
              style={{ borderColor: "var(--k-ink)" }}
            >
              All tips
            </Link>
          </div>

          {leadTip ? (
            <article className="mb-14 grid gap-9 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <Link href={`/tips/${leadTip.slug}`} className="block">
                <MediaPlaceholder ratio="16/9" label="Photograph pending" />
              </Link>
              <div>
                <span
                  className="furniture inline-flex px-3 py-1.5 text-[10px] text-white"
                  style={{ background: "var(--k-red)" }}
                >
                  {leadTip.topic}
                </span>
                <h3 className="mt-4 text-[30px] leading-[1.06] sm:text-[38px]">
                  <Link
                    href={`/tips/${leadTip.slug}`}
                    className="transition-opacity duration-[180ms] ease-out hover:opacity-70"
                  >
                    {leadTip.title}
                  </Link>
                </h3>
                {leadTip.dek ? (
                  <p className="mt-4 text-[17px] leading-7">{leadTip.dek}</p>
                ) : null}
              </div>
            </article>
          ) : null}

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {restTips.slice(0, 3).map((tip) => (
              <article key={tip.id}>
                <Link href={`/tips/${tip.slug}`} className="group block">
                  <MediaPlaceholder ratio="3/2" label="Photograph pending" />
                  <div className="mt-4 flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-[3px] w-7"
                      style={{ background: "var(--k-red)" }}
                    />
                    <span className="furniture quiet text-[10px]">
                      {tip.topic}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[23px] leading-[1.14] transition-opacity duration-[180ms] ease-out group-hover:opacity-70">
                    {tip.title}
                  </h3>
                  {tip.dek ? (
                    <p className="quiet mt-2.5 text-[16px] leading-7">
                      {tip.dek}
                    </p>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* One colour band on the page: the arrival guide */}
      {first24 ? (
        <section className="panel-blue">
          <div className="content-shell grid gap-12 py-18 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="furniture text-[11px] text-[rgba(255,255,255,0.75)]">
                Arrive
              </p>
              <h2 className="mt-4 text-[34px] sm:text-[44px]">
                {first24.title}
              </h2>
              <Link
                href="/first-24-hours"
                className="furniture mt-9 inline-flex items-center px-7 py-3.5 text-[11px] transition-opacity duration-[180ms] ease-out hover:opacity-85"
                style={{ background: "var(--k-gold)", color: "var(--k-ink)" }}
              >
                Open the full guide
              </Link>
            </div>

            <ol>
              {first24.checklistItems.map((item, index) => (
                <li
                  key={item.id}
                  className="hair flex items-baseline gap-6 border-t py-5 last:border-b"
                >
                  <span
                    className="furniture shrink-0 text-[12px]"
                    style={{ color: "var(--k-gold)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[19px] leading-7">{item.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Eat on paper, gold rule only */}
      {eatPlaces.length > 0 ? (
        <section className="panel-paper">
          <div className="content-shell py-16">
            <div
              className="h-1 w-full"
              style={{ background: "var(--k-gold)" }}
              aria-hidden="true"
            />
            <div className="mt-5 mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="furniture quiet text-[11px]">Eat now</p>
                <h2 className="mt-3 text-[34px] sm:text-[44px]">
                  Places we’d send a friend.
                </h2>
              </div>
              <Link
                href="/eat"
                className="furniture border-b-2 pb-1 text-[11px]"
                style={{ borderColor: "var(--k-ink)" }}
              >
                Eat &amp; Drink
              </Link>
            </div>

            <div className="grid gap-9 sm:grid-cols-3">
              {eatPlaces.map((place) => (
                <article key={place.id}>
                  <Link href={`/places/p/${place.slug}`} className="group block">
                    <MediaPlaceholder ratio="3/2" label="Photograph pending" />
                    <h3 className="mt-4 text-[22px] leading-[1.14] transition-opacity duration-[180ms] ease-out group-hover:opacity-70">
                      {place.editorialTitle}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Neighborhoods: ink tiles with saekdong edges instead of full colour */}
      <section className="panel-paper">
        <div className="content-shell pb-20">
          <div
            className="h-1 w-full"
            style={{ background: "var(--k-gold)" }}
            aria-hidden="true"
          />
          <div className="mt-5 mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="furniture quiet text-[11px]">Neighborhoods</p>
              <h2 className="mt-3 text-[34px] sm:text-[44px]">
                Where these answers apply.
              </h2>
            </div>
            <Link
              href="/places"
              className="furniture border-b-2 pb-1 text-[11px]"
              style={{ borderColor: "var(--k-ink)" }}
            >
              All places
            </Link>
          </div>

          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {neighborhoods.map((neighborhood, index) => {
              const edge = [
                "var(--k-red)",
                "var(--k-blue)",
                "var(--k-gold)",
                "var(--k-azure)",
              ][index % 4];

              return (
                <li key={neighborhood.id}>
                  <Link
                    href={`/places/${neighborhood.slug}`}
                    className="group block"
                  >
                    <MediaPlaceholder ratio="4/5" />
                    <div
                      className="h-[4px] w-full"
                      style={{ background: edge }}
                      aria-hidden="true"
                    />
                    <span className="mt-3 block text-[17px] leading-tight font-semibold transition-opacity duration-[180ms] ease-out group-hover:opacity-65">
                      {neighborhood.nameEn}
                    </span>
                    <span className="quiet mt-1 block text-[13px]">
                      {neighborhood.nameKo}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="saekdong" />
    </div>
  );
}
