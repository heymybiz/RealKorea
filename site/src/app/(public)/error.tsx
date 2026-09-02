"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Public Route Exception:", error);
  }, [error]);

  return (
    <div className="content-shell py-20 lg:py-28">
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold uppercase tracking-wider mb-6">
          <AlertTriangle className="w-3.5 h-3.5" />
          Unexpected Desk Exception
        </div>

        <h1 className="text-[32px] leading-[1.15] font-bold text-white sm:text-[40px]">
          Something stalled on the wire.
        </h1>

        <p className="text-ink-soft mt-4 text-base leading-relaxed">
          The editorial server encountered a temporary glitch while retrieving this dispatch. Your connection and local browser ticks remain intact.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-xs text-stone-500">
            Error Digest: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Request
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-stone-300 border border-stone-700 hover:bg-stone-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
