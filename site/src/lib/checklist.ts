/**
 * Checklist persistence — FR-050.
 *
 * State lives in `localStorage` under `rk.checklist.v1`. There are no accounts
 * in v1 (PRD 01, C1-A), so clearing storage clears progress, which the PRD
 * accepts.
 *
 * Exposed as an external store so components can read it with
 * `useSyncExternalStore`. That keeps the read out of an effect: hydrating from
 * storage inside `useEffect` would mean calling `setState` during an effect,
 * which cascades renders and is what React advises against.
 *
 * The snapshot is the raw JSON string rather than a parsed object, because
 * `useSyncExternalStore` compares snapshots by identity and a fresh object on
 * every read would loop forever.
 */

export const CHECKLIST_STORAGE_KEY = "rk.checklist.v1";

const EMPTY_SNAPSHOT = "{}";

let cache = EMPTY_SNAPSHOT;
let initialized = false;
const listeners = new Set<() => void>();

function readRaw(): string {
  try {
    return window.localStorage.getItem(CHECKLIST_STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    // Private mode or blocked storage: behave as if nothing is checked.
    return EMPTY_SNAPSHOT;
  }
}

function emit(): void {
  for (const listener of listeners) listener();
}

function syncFromStorage(): void {
  const next = readRaw();
  if (next !== cache) {
    cache = next;
    emit();
  }
}

export function subscribeChecklist(listener: () => void): () => void {
  listeners.add(listener);
  // Keep other tabs in step.
  window.addEventListener("storage", syncFromStorage);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", syncFromStorage);
    }
  };
}

export function getChecklistSnapshot(): string {
  if (!initialized) {
    initialized = true;
    cache = readRaw();
  }
  return cache;
}

/** Server render shows every item unchecked, then hydration fills it in. */
export function getChecklistServerSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

export function parseChecklist(raw: string): Record<string, boolean> {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const result: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "boolean") result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

export function setChecklistItem(id: string, checked: boolean): void {
  const next = { ...parseChecklist(getChecklistSnapshot()), [id]: checked };
  const serialized = JSON.stringify(next);

  try {
    window.localStorage.setItem(CHECKLIST_STORAGE_KEY, serialized);
  } catch {
    // Storage unavailable: keep the change in memory for this session only.
  }

  cache = serialized;
  emit();
}
