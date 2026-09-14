import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale routing for bg/en/es.
 *
 * Next 16 deprecates this filename in favour of `proxy`, but do NOT rename it
 * yet. `proxy` runs on the node runtime and leaves `middleware-manifest.json`
 * empty, while @netlify/plugin-nextjs (5.15.13) still builds an edge function
 * from that manifest and has no knowledge of `proxy`. Renaming therefore ships
 * a site with no locale rewrites — and since `localePrefix` is "as-needed",
 * every unprefixed Bulgarian URL (/, /uslugi, /tseni …) would 404.
 *
 * Revisit once the Netlify adapter supports the proxy convention.
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(bg|en|es)/:path*",
    "/((?!api|_next|_vercel|.*\\..*|opengraph-image|twitter-image|icon|apple-icon|robots|sitemap).*)",
  ],
};
