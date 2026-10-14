import Link from "next/link";

/** Short disclosure + disclaimer shown at the top of every article. */
export function ArticleNotice() {
  return (
    <p className="rk-notice" role="note">
      Some links on this page may earn us a commission or point to our sister site Cozyo, at no cost to you (
      <Link href="/legal/affiliates">disclosure</Link>). Fares and rules change: confirm with the official source before you go (
      <Link href="/legal/terms#disclaimer">disclaimer</Link>).
    </p>
  );
}

/** One-line notice placed right next to a partner or Cozyo link. */
export function PartnerNotice() {
  return (
    <small className="rk-pnote">
      Partner link: we may benefit if you use it. <Link href="/legal/affiliates">Learn more</Link>
    </small>
  );
}
