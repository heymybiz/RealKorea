import type { MetadataRoute } from "next";

import { absoluteUrl, hasSiteUrl } from "@/lib/site-url";

/**
 * `/studio` is disallowed ahead of the CMS landing, and `/api` and `/search`
 * are kept out of the crawl: neither produces a page worth indexing.
 *
 * The sitemap reference is only emitted once a real domain exists, because a
 * `Sitemap:` line has to be an absolute URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search", "/studio", "/design"],
      },
    ],
    ...(hasSiteUrl() ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
