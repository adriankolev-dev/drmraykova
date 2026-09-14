import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Turbopack infer the wrong
  // workspace root, so it is pinned here.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
