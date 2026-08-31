import Link from "next/link";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SEARCH_SEEDS } from "@/lib/search-seeds";

import { JOGAKBO_PANELS, loadHomeData, NAV } from "../shared";

/**
 * Jogakbo — maximum intensity.
 *
 * Every major section is a saturated colour field. The cover is a full red plate,
 * the arrival guide is deep blue-green, Eat is gold, and the neighborhood grid is
 * an actual patchwork of alternating panels with paper seams.
 *
 * What keeps it from being a flyer: only flat colour, one colour per panel, very
 * large type, and a lot of empty space inside each field. The restraint is in the
 * spacing, not in the saturation.
 */
export default async function JogakboVariant() {
  const { tips, eatPlaces, neighborhoods, first24 } = await loadHomeData();
  const [leadTip, ...restTips] = tips;

  return (
    <div className="korea">
      <div className="saekdong" />

      {/* Masthead on ink */}
      <header className="panel-ink">
        <div className="content-shell flex flex-wrap items-center justify-between gap-4 py-5">
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
                    className="furniture quiet text-[11px] transition-colors duration-[180ms] ease-out hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Cover: full red plate beside a dark photograph */}
      <section className="grid items-stretch lg:grid-cols-[1.04fr_0.96fr]">
        <div className="panel-red flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24 lg:pr-14 lg:pl-[max(48px,calc((100vw-1120px)/2))]">
          <p className="furniture text-[11px] text-[rgba(255,255,255,0.75)]">
            Local desk
          </p>

          <h1 className="mt-7 max-w-[16ch] text-[46px] sm:text-[64px] lg:text-[78px]">
            What locals actually tell friends before you land.
          </h1>

          <p className="dek mt-7 max-w-md text-[22px] leading-8 text-[rgba(255,255,255,0.85)]">
            Local answers. Not the brochure.
          </p>

          <form
            action="/search"
            method="get"
            role="search"
            className="mt-10 max-w-lg"
          >
            <label htmlFor="k-search" className="sr-only">
              Search Real Korea
            </label>
            <div className="flex items-stretch border-2 border-white">
              <input
                id="k-search"
                name="q"
                type="search"
                placeholder="Ask something tourists never get a straight answer to"
                className="h-13 w-full bg-transparent px-4 py-3 text-[15px] text-white outline-none placeholder:text-[rgba(255,255,255,0.65)]"
              />
              <button
                type="submit"
                className="furniture shrink-0 bg-white px-6 text-[11px] transition-opacity duration-[180ms] ease-out hover:opacity-85"
                style={{ color: "var(--k-red)" }}
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
                  className="text-[15px] text-[rgba(255,255,255,0.9)] underline decoration-[rgba(255,255,255,0.45)] underline-offset-4 transition-colors duration-[180ms] ease-out hover:text-white hover:decoration-white"
                >
                  {seed}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <MediaPlaceholder
            ratio="4/5"
            label="Documentary cover photograph pending"
            className="h-full w-full lg:absolute lg:inset-0 lg:aspect-auto"
          />
        </div>
      </section>

      {/* Tips on paper, photo-first cards */}
      <section className="panel-paper">
        <div className="content-shell py-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
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
                  <span
                    className="furniture mt-4 inline-flex px-3 py-1.5 text-[10px]"
                    style={{
                      background: "var(--k-gold)",
                      color: "var(--k-ink)",
                    }}
                  >
                    {tip.topic}
                  </span>
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

      {/* Arrival guide on the blue-green plate */}
      {first24 ? (
        <section className="panel-blue">
          <div className="content-shell grid gap-12 py-20 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="furniture text-[11px] text-[rgba(255,255,255,0.75)]">
                Arrive
              </p>
              <h2 className="mt-4 text-[36px] sm:text-[48px]">
                {first24.title}
              </h2>
              {first24.dek ? (
                <p className="dek mt-6 max-w-sm text-[20px] leading-8 text-[rgba(255,255,255,0.85)]">
                  {first24.dek}
                </p>
              ) : null}
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

      {/* Eat on the gold plate. Ink text, never white. */}
      {eatPlaces.length > 0 ? (
        <section className="panel-gold">
          <div className="content-shell py-16">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="furniture text-[11px] opacity-70">Eat now</p>
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

      {/* The signature: neighborhoods as an actual patchwork */}
      <section className="panel-ink">
        <div className="content-shell py-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="furniture text-[11px]"
                style={{ color: "var(--k-gold)" }}
              >
                Neighborhoods
              </p>
              <h2 className="mt-3 text-[34px] sm:text-[44px]">
                Where these answers apply.
              </h2>
            </div>
            <Link
              href="/places"
              className="furniture border-b-2 pb-1 text-[11px]"
              style={{ borderColor: "var(--k-paper)" }}
            >
              All places
            </Link>
          </div>

          <ul className="jogakbo grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {neighborhoods.map((neighborhood, index) => (
              <li
                key={neighborhood.id}
                className={`${JOGAKBO_PANELS[index % JOGAKBO_PANELS.length]} ${
                  index % 5 === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <Link
                  href={`/places/${neighborhood.slug}`}
                  className="flex h-full flex-col justify-between p-5 transition-opacity duration-[180ms] ease-out hover:opacity-85"
                >
                  <span className="furniture quiet text-[10px]">
                    {neighborhood.region}
                  </span>
                  <span className="mt-10 block">
                    <span className="font-[family-name:var(--display)] block text-[22px] leading-[1.08] font-extrabold tracking-[-0.02em]">
                      {neighborhood.nameEn}
                    </span>
                    <span className="quiet mt-1.5 block text-[13px]">
                      {neighborhood.nameKo}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="saekdong" />
    </div>
  );
}
