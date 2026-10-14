/**
 * Information architecture for the redesign (design D, 2026-10-14).
 *
 * `ia-map.json` is the single source of truth. Every content item has exactly
 * one new URL. `next.config.ts` reads the same file to emit permanent
 * redirects from the old URLs, so links and redirects can never drift apart.
 */
import map from "./ia-map.json";

export type SectionId =
  | "getting-around"
  | "money-phone"
  | "arrival"
  | "neighborhoods"
  | "ask"
  | "about";

export type Section = {
  readonly id: SectionId;
  readonly label: string;
  readonly href: string;
  /** Pastel underline colour used by the navbar. */
  readonly color: string;
};

export type Hub = { readonly id: string; readonly label: string; readonly blurb: string };

export type IaItem = {
  readonly type: "tip" | "guide" | "neighborhood" | "place" | "question";
  readonly slug: string;
  readonly section: SectionId;
  readonly hub: string | null;
  readonly old: string;
  readonly new: string;
};

export const SECTIONS = map.sections as readonly Section[];
export const HUBS = map.hubs as Readonly<Record<string, readonly Hub[]>>;
export const IA_ITEMS = map.items as readonly IaItem[];

/** Sections that hold tip and guide articles at `/{section}/{hub}/{slug}`. */
export type ArticleSectionId = "getting-around" | "money-phone" | "arrival" | "neighborhoods";

export function sectionById(id: SectionId): Section {
  const section = SECTIONS.find((candidate) => candidate.id === id);
  if (!section) throw new Error(`Unknown section ${id}`);
  return section;
}

export function hubsFor(section: string): readonly Hub[] {
  return HUBS[section] ?? [];
}

export function hubById(section: string, hub: string): Hub | null {
  return hubsFor(section).find((candidate) => candidate.id === hub) ?? null;
}

function find(type: IaItem["type"], slug: string): IaItem | undefined {
  return IA_ITEMS.find((item) => item.type === type && item.slug === slug);
}

export function itemsIn(section: string, hub?: string | null): readonly IaItem[] {
  return IA_ITEMS.filter(
    (item) => item.section === section && (hub === undefined || item.hub === hub),
  );
}

/** Content that is not in the map yet falls back to its section root. */
export function tipHref(slug: string): string {
  return find("tip", slug)?.new ?? "/getting-around";
}
export function guideHref(slug: string): string {
  return find("guide", slug)?.new ?? "/getting-around";
}
export function placeHref(slug: string): string {
  return find("place", slug)?.new ?? `/places/${slug}`;
}
export function neighborhoodHref(slug: string): string {
  return find("neighborhood", slug)?.new ?? `/neighborhoods/${slug}`;
}
export function questionHref(slug: string): string {
  return `/ask/${slug}`;
}
export function oldUrlFor(type: IaItem["type"], slug: string): string | null {
  const item = find(type, slug);
  return item && item.old !== item.new ? item.old : null;
}

export function isDayTrip(slug: string): boolean {
  return find("neighborhood", slug)?.hub === "day-trips";
}

/** Which section a pathname belongs to, for the active navbar underline. */
export function sectionForPath(pathname: string): SectionId | null {
  const first = pathname.split("/")[1] ?? "";
  if (first === "day-trips" || first === "places") return "neighborhoods";
  const match = SECTIONS.find((section) => section.id === first);
  return match ? match.id : null;
}

/** The date the IA changed. Shown in every page's "What changed" log. */
export const IA_CHANGED_ON = "2026-10-14";
