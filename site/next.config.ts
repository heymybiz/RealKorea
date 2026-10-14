import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { NextConfig } from "next";

/**
 * Redirects come from the same IA map the site links from (src/lib/ia-map.json),
 * so an old URL always lands on the page that now owns it. See docs/redirect-map.md.
 */
type IaMap = {
  items: { old: string; new: string }[];
  staticRedirects: { source: string; destination: string }[];
};
const ia = JSON.parse(readFileSync(join(process.cwd(), "src/lib/ia-map.json"), "utf8")) as IaMap;

const nextConfig: NextConfig = {
  // Required for App Hosting; postbuild merges public/ into standalone (adapter skips when NFT pre-creates a partial public/).
  output: "standalone",
  serverExternalPackages: ["sanity"],
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      ...ia.items
        .filter((item) => item.old !== item.new)
        .map((item) => ({ source: item.old, destination: item.new, permanent: true })),
      ...ia.staticRedirects.map((rule) => ({ ...rule, permanent: true })),
      { source: "/day-trips", destination: "/neighborhoods#day-trips", permanent: false },
      // Any old tip, guide or place we did not list still lands somewhere useful.
      { source: "/tips/:slug", destination: "/getting-around", permanent: false },
      { source: "/guides/:slug", destination: "/getting-around", permanent: false },
      { source: "/places/p/:slug", destination: "/neighborhoods#places", permanent: false },
    ];
  },
};

export default nextConfig;
