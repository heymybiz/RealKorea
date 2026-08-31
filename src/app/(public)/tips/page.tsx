import type { Metadata } from "next";

import { FilterChips, type FilterChip } from "@/components/site/filter-chips";
import { TipCard } from "@/components/site/tip-card";
import { getNeighborhoods, getTips } from "@/lib/cms";
import type { TipTopic } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Tips",
  description:
    "Short, practical tips locals send in a group chat: arrival, transit, money, etiquette, survival, seasonal.",
  alternates: { canonical: "/tips" },
};

/** PRD 02 §3.4 — single-select filters plus All, in the PRD's order. */
const TOPIC_CHIPS: readonly FilterChip[] = [
  { value: null, label: "All" },
  { value: "arrival", label: "Arrival" },
  { value: "transit", label: "Transit" },
  { value: "money", label: "Money" },
  { value: "etiquette", label: "Etiquette" },
  { value: "survival", label: "Survival" },
  { value: "seasonal", label: "Seasonal" },
];

const VALID_TOPICS = new Set(
  TOPIC_CHIPS.flatMap((chip) => (chip.value ? [chip.value] : [])),
);

function readTopic(value: string | string[] | undefined): TipTopic | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && VALID_TOPICS.has(candidate)
    ? (candidate as TipTopic)
    : null;
}

export default async function TipsIndexPage({
  searchParams,
}: PageProps<"/tips">) {
  const topic = readTopic((await searchParams).topic);

  const [tips, neighborhoods] = await Promise.all([
    getTips(topic ? { topic } : undefined),
    getNeighborhoods(),
  ]);

  return (
    <div className="content-shell py-16">
      <h1 className="max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        Tips locals send in a group chat.
      </h1>

      <div className="mt-8">
        <FilterChips
          basePath="/tips"
          paramName="topic"
          chips={TOPIC_CHIPS}
          active={topic}
          label="Filter tips by topic"
        />
      </div>

      {tips.length > 0 ? (
        /* PRD 02 §3.4 — two columns on desktop, one on mobile. */
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} neighborhoods={neighborhoods} />
          ))}
        </div>
      ) : (
        <div className="border-rule bg-paper-warm mt-12 border p-6">
          <p className="text-ink text-[15px]">
            Nothing filed under this topic yet.
          </p>
        </div>
      )}
    </div>
  );
}
