"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "rk-consent";
type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie banner + consent-gated GA4.
 * Consent Mode defaults to denied, and gtag.js is not even requested until the
 * visitor clicks Accept. Reject keeps everything off. The choice is stored in
 * localStorage (strictly necessary) and can be changed from the footer.
 */
export function CookieConsent({ gaId }: { gaId: string }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer!.push(args); };
    window.gtag("consent", "default", {
      ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied",
    });
    const saved = readChoice();
    // localStorage only exists after hydration, so the stored choice is read here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(saved);
    setOpen(saved === null);
    const reopen = () => setOpen(true);
    window.addEventListener("rk-open-consent", reopen);
    return () => window.removeEventListener("rk-open-consent", reopen);
  }, []);

  function decide(next: Choice) {
    try { window.localStorage.setItem(KEY, next); } catch { /* storage blocked: ask again next visit */ }
    window.gtag?.("consent", "update", { analytics_storage: next });
    if (next === "denied" && choice === "granted") {
      // Drop GA cookies that were set before the change of mind.
      document.cookie.split(";").map((c) => c.trim().split("=")[0]).filter((n) => n === "_ga" || n.startsWith("_ga_"))
        .forEach((n) => { document.cookie = `${n}=; Max-Age=0; path=/; domain=${location.hostname}`; document.cookie = `${n}=; Max-Age=0; path=/`; });
    }
    setChoice(next);
    setOpen(false);
  }

  return (
    <>
      {gaId && choice === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="rk-ga" strategy="afterInteractive">
            {`window.gtag('consent','update',{analytics_storage:'granted'});window.gtag('js',new Date());window.gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {open ? (
        <div className="rk-consent" role="dialog" aria-live="polite" aria-label="Cookie choices">
          <p>
            We&apos;d like to use Google Analytics cookies to see which guides help. Nothing is tracked unless you accept.{" "}
            <Link href="/legal/privacy#cookies">Privacy Policy</Link>
          </p>
          <div className="rk-consent-btns">
            <button type="button" onClick={() => decide("denied")}>Reject</button>
            <button type="button" className="ok" onClick={() => decide("granted")}>Accept</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="rk-linkbtn" onClick={() => window.dispatchEvent(new Event("rk-open-consent"))}>
      Cookie settings
    </button>
  );
}
