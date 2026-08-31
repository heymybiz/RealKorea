import type { Metadata } from "next";
import Link from "next/link";

import { ShopCard } from "@/components/site/shop-card";
import { getShopProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The only commerce surface on Real Korea. Affiliate links, clearly marked, for things worth buying before you fly.",
  alternates: { canonical: "/shop" },
};

/**
 * PRD 02 §3.10 — the only page whose primary grid is commerce, and the only
 * surface allowed to carry affiliate links (PRD 01 §7, FR-061). No editorial
 * Places are mixed in here.
 */
export default async function ShopIndexPage() {
  const products = await getShopProducts();

  return (
    <div className="content-shell py-16">
      <h1 className="max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        Stuff we’d actually tell a friend to buy before they fly.
      </h1>

      <p className="text-ink-soft mt-5 max-w-2xl text-lg">
        Affiliate links. We only list what we would text a friend.{" "}
        <Link
          href="/legal/affiliates"
          className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
        >
          How this works
        </Link>
        .
      </p>

      {products.length > 0 ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ShopCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border-rule bg-paper-warm mt-12 border p-6">
          <p className="text-ink text-[15px]">Nothing listed yet.</p>
        </div>
      )}
    </div>
  );
}
