"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical Global Exception:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full bg-[#121110] text-stone-200">
      <body className="flex min-h-full items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Critical System Glitch
          </h1>

          <p className="mt-3 text-sm text-stone-400 leading-relaxed">
            A fatal error interrupted the site shell. Please click below to refresh the page state.
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Real Korea
          </button>
        </div>
      </body>
    </html>
  );
}
