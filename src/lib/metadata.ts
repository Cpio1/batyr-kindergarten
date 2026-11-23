import type { Metadata } from "next";
import { langPath, type Lang } from "./i18n/config";
import { kk } from "./i18n/kk";
import { ru } from "./i18n/ru";
import { SITE_URL } from "./site";

/** SEO-метаданные страницы на казахском («/») или русском («/ru/») языке. */
export function pageMetadata(lang: Lang): Metadata {
  const d = lang === "ru" ? ru : kk;
  const url = `${SITE_URL}${langPath(lang)}`;
  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: d.meta.title,
    description: d.meta.description,
    applicationName: "Батыр ел",
    keywords:
      lang === "kk"
        ? ["Батыр ел", "Батыр ел балабақшасы", "балабақша Алматы", "Медеу ауданы балабақша", "қазақ тілді балабақша", "Верненская 73"]
        : ["Батыр ел", "детский сад Батыр ел", "детский сад Алматы", "детский сад Медеуский район", "казахоязычный детский сад", "Верненская 73"],
    alternates: {
      canonical: url,
      languages: { kk: `${SITE_URL}/`, ru: `${SITE_URL}/ru/`, "x-default": `${SITE_URL}/` },
    },
    openGraph: {
      type: "website",
      url,
      title: d.meta.title,
      description: d.meta.description,
      siteName: d.meta.siteName,
      locale: lang === "kk" ? "kk_KZ" : "ru_RU",
      alternateLocale: [lang === "kk" ? "ru_RU" : "kk_KZ"],
    },
    twitter: { card: "summary", title: d.meta.title, description: d.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, address: false, email: false },
    other: { google: "notranslate" },
  };
}
