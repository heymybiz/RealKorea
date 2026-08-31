"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Check } from "lucide-react";

import type { ChecklistItem } from "@/lib/content/types";
import {
  getChecklistServerSnapshot,
  getChecklistSnapshot,
  parseChecklist,
  setChecklistItem,
  subscribeChecklist,
} from "@/lib/checklist";

/**
 * PRD 04 §5 — five rows on paper, keyed to `localStorage`. Not a todo-app skin:
 * no progress bar, no streaks, no confetti (PRD 04 §6). The check fades in over
 * 120ms and nothing else moves.
 */
export function ChecklistModule({
  items,
}: {
  items: readonly ChecklistItem[];
}) {
  const raw = useSyncExternalStore(
    subscribeChecklist,
    getChecklistSnapshot,
    getChecklistServerSnapshot,
  );

  const checked = useMemo(() => parseChecklist(raw), [raw]);

  return (
    <ul className="divide-rule divide-y">
      {items.map((item) => {
        const isChecked = checked[item.id] === true;
        const inputId = `checklist-${item.id}`;

        return (
          <li key={item.id}>
            <div className="flex items-start gap-3 py-3">
              <span className="relative mt-0.5 inline-flex size-5 shrink-0">
                <input
                  id={inputId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={(event) =>
                    setChecklistItem(item.id, event.target.checked)
                  }
                  className="peer border-rule bg-paper checked:border-crimson checked:bg-crimson size-5 cursor-pointer appearance-none border transition-colors duration-[120ms] ease-out"
                />
                <Check
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white opacity-0 transition-opacity duration-[120ms] ease-out peer-checked:opacity-100"
                />
              </span>

              <label htmlFor={inputId} className="cursor-pointer">
                <span className="text-ink text-[15px] leading-6 font-medium">
                  {item.label}
                </span>
                {item.help ? (
                  <span className="text-ink-soft mt-0.5 block text-[13px] leading-5">
                    {item.help}
                  </span>
                ) : null}
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
