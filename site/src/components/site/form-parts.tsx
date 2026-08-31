import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "border-rule bg-paper text-ink placeholder:text-ink-soft focus:border-crimson w-full border px-3 py-2.5 text-[15px] outline-none transition-colors duration-[180ms] ease-out";

export function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-ink mb-1.5 block text-xs tracking-[0.12em] uppercase"
    >
      {children}
      {hint ? (
        <span className="text-ink-soft ml-2 normal-case tracking-normal">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function TextField({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <input {...props} className={cn(FIELD_CLASS, className)} />;
}

export function TextArea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(FIELD_CLASS, className)} />;
}

export function SelectField({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return <select {...props} className={cn(FIELD_CLASS, className)} />;
}

export function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={cn(
        "bg-crimson hover:bg-crimson-dark inline-flex items-center px-5 py-3 text-xs tracking-[0.12em] text-white uppercase transition-colors duration-[180ms] ease-out",
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * FR-012 — the honeypot half of the spam check.
 *
 * Positioned off-screen rather than `display: none`, because some bots skip
 * hidden inputs. Hidden from assistive tech and removed from the tab order so a
 * real visitor can never fill it by accident.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
    >
      <label htmlFor="website">Leave this field blank</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormNotice({
  tone,
  children,
}: {
  tone: "success" | "error";
  children: React.ReactNode;
}) {
  return (
    <p
      role="status"
      className={cn(
        "border-l-[3px] px-4 py-3 text-[15px]",
        tone === "success"
          ? "border-ok bg-paper-warm text-ink"
          : "border-crimson bg-paper-warm text-ink",
      )}
    >
      {children}
    </p>
  );
}
