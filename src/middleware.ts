import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(bg|en|es)/:path*",
    "/((?!api|_next|_vercel|.*\\..*|opengraph-image|twitter-image|icon|apple-icon|robots|sitemap).*)",
  ],
};
