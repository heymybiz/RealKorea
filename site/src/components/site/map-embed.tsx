/**
 * PRD 02 §3.9, FR-041 — a lazy 16:9 map, on Place pages only. There is no
 * `/map` route and no custom map app in v1.
 *
 * Two guards, both deliberate:
 *
 * 1. No `geo`, no map. Guessing coordinates would drop a pin in the wrong
 *    place, which is worse than showing nothing.
 * 2. No API key, no iframe. The Maps Embed API needs a key
 *    (`NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`); until one exists this falls back to
 *    an outbound link rather than shipping a broken frame. The vendor decision
 *    is still open in PRD 01 §11.
 */
export function MapEmbed({
  geo,
  venueLabel,
}: {
  geo: { readonly lat: number; readonly lng: number } | null;
  venueLabel: string;
}) {
  if (!geo) return null;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const coordinates = `${geo.lat},${geo.lng}`;

  if (!apiKey) {
    return (
      <div className="border-rule bg-paper-warm border p-5">
        <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
          Map
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates)}`}
          target="_blank"
          rel="noreferrer"
          className="text-ink hover:text-crimson mt-2 inline-flex text-[15px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
        >
          {`Open ${venueLabel} in Google Maps`}
        </a>
      </div>
    );
  }

  const source = new URL("https://www.google.com/maps/embed/v1/place");
  source.searchParams.set("key", apiKey);
  source.searchParams.set("q", coordinates);

  return (
    <iframe
      title={`Map of ${venueLabel}`}
      src={source.toString()}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen={false}
      className="border-rule aspect-video w-full border"
    />
  );
}
