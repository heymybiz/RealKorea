/**
 * PRD 04 §7 — a small geometric square stamp. Two colours, legible at 16px.
 * Deliberately not a palace, a taegeuk, or a hanbok icon.
 */
export function Seal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Real Korea seal"
      focusable="false"
    >
      <rect width="24" height="24" rx="2" fill="var(--crimson)" />
      <g fill="none" stroke="var(--paper)" strokeWidth="1.6">
        <path d="M6 5.5h5v5H6z" />
        <path d="M6 13.5h5v5H6z" />
        <path d="M14 5.5h4v13h-4" />
        <path d="M11 12h3" />
      </g>
    </svg>
  );
}
