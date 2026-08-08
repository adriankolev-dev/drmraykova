import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, Literata, Onest } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CookieConsent } from "@/components/cookies/CookieConsent";
import { SuperdocCompanion } from "@/components/booking/SuperdocCompanion";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageEnter } from "@/components/motion/PageEnter";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import "../globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${onest.variable} ${literata.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          <Header />
          <div className="flex flex-1 flex-col">
            <PageEnter>{children}</PageEnter>
          </div>
          <Footer />
          <BackToTop />
          <SuperdocCompanion />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
