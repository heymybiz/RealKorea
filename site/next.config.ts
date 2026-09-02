import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sanity"],
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
