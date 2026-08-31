import Link from "next/link";

import { VARIANTS } from "./shared";

export default function DesignIndexPage() {
  return (
    <div className="korea">
      <div className="saekdong" />

      <div className="content-shell py-16">
        <p className="furniture text-[11px]" style={{ color: "var(--k-red)" }}>
          Design preview
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] sm:text-[58px]">
          Korean colour, at two intensities.
        </h1>
        <p className="dek mt-6 max-w-2xl text-[21px] leading-8">
          One palette, one type pairing, one information architecture. The only
          variable is how much of the screen the colour owns.
        </p>

        <ul className="mt-14 space-y-8">
          {VARIANTS.map((variant, index) => (
            <li key={variant.slug}>
              <Link href={`/design/${variant.slug}`} className="group block">
                <div
                  className="h-2 w-full"
                  style={{
                    background:
                      index === 0 ? "var(--k-red)" : "var(--k-blue)",
                  }}
                />
                <div className="mt-4 flex flex-wrap items-baseline gap-x-4">
                  <h2 className="text-[32px] transition-opacity duration-[180ms] ease-out group-hover:opacity-70">
                    {variant.name}
                  </h2>
                  <span className="furniture quiet text-[11px]">
                    {index === 0 ? "Maximum" : "Restrained"}
                  </span>
                </div>
                <p className="quiet mt-2 max-w-2xl text-[17px] leading-7">
                  {variant.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
