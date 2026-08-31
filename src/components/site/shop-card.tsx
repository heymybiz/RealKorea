import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SampleLabel } from "@/components/site/sample-label";
import type { ShopProduct } from "@/lib/content/types";

/**
 * PRD 04 §5 and FR-060 — image, why, an `Affiliate` mark, and an outbound link
 * carrying `rel="sponsored nofollow"`.
 *
 * The mark is not optional (PRD 05 legal notes). A product with no partner link
 * yet renders in a disabled state rather than shipping a dead outbound anchor.
 */
export function ShopCard({ product }: { product: ShopProduct }) {
  const label = (
    <span className="border-rule text-ink inline-flex items-center border px-1.5 py-0.5 text-[11px] tracking-[0.12em] uppercase">
      Affiliate
    </span>
  );

  return (
    <article className="border-rule flex flex-col border">
      {product.image ? null : (
        <MediaPlaceholder ratio="1/1" label="Product image pending" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {label}
          {product.sample ? <SampleLabel /> : null}
        </div>

        <h3 className="mt-3 text-lg leading-snug font-semibold">
          {product.title}
        </h3>

        <p className="text-ink-soft mt-2 flex-1 text-[15px] leading-6">
          {product.why}
        </p>

        {product.priceHint ? (
          <p className="text-ink-soft mt-3 text-[13px]">{product.priceHint}</p>
        ) : null}

        {product.outboundUrl ? (
          <a
            href={product.outboundUrl}
            target="_blank"
            rel="sponsored nofollow noreferrer"
            className="text-crimson hover:text-crimson-dark mt-4 inline-flex text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
          >
            Open the listing
          </a>
        ) : (
          <p className="text-ink-soft mt-4 text-xs tracking-[0.12em] uppercase">
            Partner link pending
          </p>
        )}
      </div>
    </article>
  );
}
