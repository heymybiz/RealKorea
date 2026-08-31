import Link from "next/link";

/**
 * PRD 04 §5 and FR-042 — outline only, never a filled crimson block, and
 * always linked to the disclosure page. Rendered if and only if
 * `isPartner` is true (PRD 01 §7: partner must never look like editorial).
 */
export function PartnerBadge() {
  return (
    <Link
      href="/legal/affiliates"
      className="border-crimson text-crimson hover:bg-crimson inline-flex items-center border px-2 py-1 text-[11px] tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out hover:text-white"
    >
      Partner
    </Link>
  );
}
