import { CONTACT_EMAIL } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, AlertCircle, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "How to reach the Real Korea editorial desk in Seoul for inquiries, corrections, press, and errata.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="content-shell py-16">
      <div className="max-w-3xl">
        <p className="text-crimson text-xs font-semibold tracking-[0.12em] uppercase">
          Editorial Desk
        </p>

        <h1 className="mt-4 text-[32px] leading-[1.15] font-bold sm:text-[44px]">
          Contact the Editors
        </h1>

        <p className="text-ink-soft mt-4 text-lg leading-relaxed">
          Real Korea is an independent travel intelligence publication researched, verified, and written by editors living and working in Seoul, South Korea. We welcome reader questions, factual corrections, partnership inquiries, and press contacts.
        </p>

        {/* Quick Contact Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="border border-[var(--rule)] bg-[#1a1715] p-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-500" />
              <h2 className="text-base font-bold text-white">General Inquiries & Desk</h2>
            </div>
            <p className="mt-2 text-sm text-stone-300">
              For editorial questions, partnerships, and general feedback:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block font-mono text-sm font-semibold text-amber-400 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="border border-[var(--rule)] bg-[#1a1715] p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500" />
              <h2 className="text-base font-bold text-white">Fact Corrections & Errata</h2>
            </div>
            <p className="mt-2 text-sm text-stone-300">
              Did a transit fare, business hour, or policy change? Let our verification team know:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block font-mono text-sm font-semibold text-rose-400 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Operating Base & Standards */}
        <div className="border-rule mt-12 border-t pt-10 space-y-8 text-[16px] leading-7">
          <section>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <MapPin className="h-5 w-5 text-amber-500" />
              <h3>Physical Operating Base</h3>
            </div>
            <p className="mt-3 text-stone-300">
              Our core editorial staff is based locally in central Seoul (Jongno-gu / Mapo-gu), Republic of Korea. Because our reporters personally verify physical venues, transit gates, and ticketing machines on foot, our responses reflect actual ground conditions.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <Clock className="h-5 w-5 text-amber-500" />
              <h3>Response Timeframe (SLA)</h3>
            </div>
            <p className="mt-3 text-stone-300">
              • <strong>Fact Corrections (Errata):</strong> Reviewed within 24–48 hours. If verified, the article is updated immediately and the revision date is logged.
              <br />
              • <strong>Reader Questions:</strong> Submitted through the{" "}
              <Link href="/ask" className="text-amber-400 hover:underline">
                Ask a Local
              </Link>{" "}
              portal and answered in our public Q&A index once vetted.
              <br />
              • <strong>Business & Press:</strong> Inquiries are responded to within 2–3 Korean business days (KST).
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <ShieldCheck className="h-5 w-5 text-amber-500" />
              <h3>Editorial Independence Guarantee</h3>
            </div>
            <p className="mt-3 text-stone-300">
              We do not accept paid compensation to remove warnings or tourist trap designations. All restaurant, hotel, and transit reviews reflect anonymous, unannounced visits funded entirely by our publication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
