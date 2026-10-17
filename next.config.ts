import type { NextConfig } from "next";

// Static export for GitHub Pages. The site lives under the repo name, so
// every internal link and asset is prefixed with basePath.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ac.art_tattoo_studio",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
