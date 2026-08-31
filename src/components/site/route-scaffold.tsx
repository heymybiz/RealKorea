/**
 * Turn A ships the full URL map from PRD 02 §1 before the content layer
 * exists. This component renders the locked editorial copy for a route and
 * states plainly what still has to land there, so nothing on screen can be
 * mistaken for real, verified travel information.
 *
 * Remove each usage as the matching PRD turn fills the route.
 */
export function RouteScaffold({
  kicker,
  title,
  dek,
  turn,
  lands,
}: {
  kicker?: string;
  title: string;
  dek?: string;
  turn: string;
  lands: readonly string[];
}) {
  return (
    <div className="content-shell py-16 lg:py-24">
      {kicker ? (
        <p className="text-crimson mb-5 text-xs tracking-[0.12em] uppercase">
          {kicker}
        </p>
      ) : null}

      <h1 className="max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px] lg:text-[52px]">
        {title}
      </h1>

      {dek ? (
        <p className="text-ink-soft mt-6 max-w-2xl text-lg">{dek}</p>
      ) : null}

      <section
        aria-labelledby="scaffold-heading"
        className="border-rule bg-paper-warm mt-12 max-w-2xl border p-6"
      >
        <h2
          id="scaffold-heading"
          className="text-ink-soft font-sans text-xs tracking-[0.12em] uppercase"
        >
          Scaffolded route · {turn}
        </h2>
        <ul className="text-ink mt-4 space-y-2 text-[15px]">
          {lands.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-crimson mt-2.5 h-px w-3 shrink-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
