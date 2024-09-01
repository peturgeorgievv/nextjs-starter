import { locales } from "@/i18n";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const LOCALE_KEY = "x-locale";

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get(LOCALE_KEY) || locales[0];

  const handleI18nRouting = createMiddleware({
    locales,
    localePrefix: "always",
    defaultLocale: locales[0],
    localeDetection: false,
  });

  const response = handleI18nRouting(request);
  response.headers.set(LOCALE_KEY, defaultLocale);

  return response;
}

export const config = {
  matcher: ["/", "/((?!_next|api|icons|images|robots.txt).*)"],
};
