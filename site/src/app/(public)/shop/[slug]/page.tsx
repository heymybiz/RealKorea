import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ShopCard } from "@/components/site/shop-card";
import { getShopProducts } from "@/lib/cms";

/**
 * PRD 02 §1 — a Shop story or a partner collection.
 *
 * There is no ShopStory document in PRD 03, so a slug resolves to a category
 * collection drawn from `ShopProduct.category`. That keeps the route real
 * without inventing a schema the PRD has not agreed to.
 */
export async function generateStaticParams() {
  const products = await getShopProducts();
  return [...new Set(products.map((product) => product.category))].map(
    (category) => ({ slug: category }),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const products = await getShopProducts();
  const matches = products.filter((product) => product.category === slug);

  if (matches.length === 0) {
    return { title: "Shop", robots: { index: false } };
  }

  return {
    title: `Shop: ${slug}`,
    description: `Affiliate picks in ${slug}, marked as such.`,
    alternates: { canonical: `/shop/${slug}` },
    robots: matches.every((product) => product.sample)
      ? { index: false, follow: true }
      : undefined,
  };
}

export default async function ShopStoryPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const products = await getShopProducts();
  const matches = products.filter((product) => product.category === slug);

  if (matches.length === 0) notFound();

  return (
    <div className="content-shell py-16">
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">Shop</p>

      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold capitalize sm:text-[44px]">
        {slug}
      </h1>

      <p className="text-ink-soft mt-5 max-w-2xl text-lg">
        Affiliate links.{" "}
        <Link
          href="/legal/affiliates"
          className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
        >
          How this works
        </Link>
        .
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>

      <p className="border-rule mt-12 border-t pt-8">
        <Link
          href="/shop"
          className="text-ink hover:text-crimson text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
        >
          All of Shop
        </Link>
      </p>
    </div>
  );
}
