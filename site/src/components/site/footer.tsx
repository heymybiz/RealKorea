import Image from "next/image";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/site/cookie-consent";
import { ARRIVE_NAV, COZYO_URL, FOOTER_NOTE, LEGAL_NAV, PRIMARY_NAV, SITE_NAME, SITE_PROMISE } from "@/lib/nav";

function Column({ title, items }: { title: string; items: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="rk-footer">
      <div className="rk-w rk-fgrid">
        <div>
          <p className="rk-logo">
            <Image src="/brand/kkami-avatar.webp" alt="" width={34} height={34} className="rk-kav" />
            <span>Real<b>KO</b></span>
          </p>
          <p className="rk-mute">{SITE_PROMISE}</p>
          <p className="rk-mute">
            Sister site: <a href={COZYO_URL} target="_blank" rel="noopener">Cozyo — where to stay</a>
          </p>
        </div>
        <Column title="Sections" items={PRIMARY_NAV} />
        <Column title="Trust" items={ARRIVE_NAV} />
        <Column title="Legal" items={LEGAL_NAV} />
      </div>
      <div className="rk-w rk-fnote">
        <p>{FOOTER_NOTE}</p>
        <p>
          © {SITE_NAME} · Photo credits are shown next to each photo. <Link href="/legal/image-credits">Image credits</Link> · Fares and rules change; check official sources (<Link href="/legal/terms#disclaimer">disclaimer</Link>) · <CookieSettingsButton />
        </p>
      </div>
    </footer>
  );
}
