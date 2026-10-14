import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AdSlot, Breadcrumb, CheckedBadge, CozyoBanner, PhotoCredit } from "@/components/site/realko-blocks";
import { getNeighborhoods, getPlaces, getTips } from "@/lib/cms";
import { hubsFor, itemsIn, neighborhoodHref, placeHref, sectionById } from "@/lib/ia";
import { firstMention } from "@/lib/romanize";

export const metadata: Metadata = {
  title: "Neighborhoods & Day Trips",
  description: "Seoul neighborhoods, day trips outside the city, local places and the house rules locals follow.",
  alternates: { canonical: "/neighborhoods" },
};

export default async function NeighborhoodsPage() {
  const section = sectionById("neighborhoods");
  const [areas, places, tips] = await Promise.all([getNeighborhoods(), getPlaces(), getTips()]);
  const seoul = itemsIn("neighborhoods", null).filter((i) => i.type === "neighborhood");
  const trips = itemsIn("neighborhoods", "day-trips");
  const rules = itemsIn("neighborhoods", "local-rules");
  const rulesHub = hubsFor("neighborhoods")[0];
  const area = (slug: string) => areas.find((a) => a.slug === slug);

  return (
    <div className="rk-w rk-page">
      <Breadcrumb trail={[{ label: section.label }]} />
      <header className="rk-hubhead" style={{ "--c": section.color } as React.CSSProperties}>
        <h1>{section.label}</h1>
        <p>Where to go in Seoul, what is worth the train ride out, and the places a local actually sends friends to.</p>
      </header>

      <figure className="rk-band">
        <Image src="/photos/street.webp" alt="A busy shopping street in Myeongdong, Seoul" width={1200} height={800} sizes="(max-width: 900px) 100vw, 900px" />
        <PhotoCredit>
          Photo: lumoplank via Flickr,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Myeongdong,_Seoul_-_Myeongdong3165.jpg">Wikimedia Commons</a>, CC0
        </PhotoCredit>
      </figure>

      <section className="rk-hubsec" aria-labelledby="seoul">
        <h2 id="seoul">Seoul neighborhoods</h2>
        <ul className="rk-cards">
          {seoul.map((item) => {
            const a = area(item.slug);
            return a ? (
              <li key={item.slug} className="rk-card">
                <span className="kind">{a.region}</span>
                <h3><Link href={item.new}>{firstMention(a.nameEn, a.nameKo)}</Link></h3>
                {a.dek ? <p>{a.dek}</p> : null}
              </li>
            ) : null;
          })}
        </ul>
      </section>

      <AdSlot placement="hub-between" />

      <section className="rk-hubsec" aria-labelledby="day-trips">
        <h2 id="day-trips">Day trips outside Seoul</h2>
        <ul className="rk-cards">
          {trips.map((item) => {
            const a = area(item.slug);
            return a ? (
              <li key={item.slug} className="rk-card">
                <span className="kind">Day trip</span>
                <h3><Link href={neighborhoodHref(item.slug)}>{firstMention(a.nameEn, a.nameKo)}</Link></h3>
                {a.dek ? <p>{a.dek}</p> : null}
              </li>
            ) : null;
          })}
        </ul>
      </section>

      <section className="rk-hubsec" aria-labelledby="places">
        <h2 id="places">Places a local sends friends to</h2>
        <ul className="rk-cards">
          {places.map((place) => (
            <li key={place.id} className="rk-card">
              <span className="kind">{area(place.neighborhoodSlug)?.nameEn ?? "Place"}</span>
              <h3><Link href={placeHref(place.slug)}>{place.editorialTitle}</Link></h3>
              <CheckedBadge lastVerifiedAt={place.lastVerifiedAt} sample={place.sample} />
            </li>
          ))}
        </ul>
      </section>

      {rulesHub ? (
        <section className="rk-hubsec" aria-labelledby="local-rules">
          <div className="rk-sechead">
            <h2 id="local-rules">{rulesHub.label}</h2>
            <Link href="/neighborhoods/local-rules">All →</Link>
          </div>
          <ul className="rk-cards">
            {rules.map((item) => {
              const tip = tips.find((t) => t.slug === item.slug);
              return tip ? (
                <li key={item.slug} className="rk-card">
                  <span className="kind">Local rule</span>
                  <h3><Link href={item.new}>{tip.title}</Link></h3>
                  <CheckedBadge lastVerifiedAt={tip.lastVerifiedAt} sample={tip.sample} />
                </li>
              ) : null;
            })}
          </ul>
        </section>
      ) : null}

      <CozyoBanner title="Picked a neighborhood? Find a stay there." />
    </div>
  );
}
