"use client";

import { useLang, useT } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/config";

const OPTIONS: { lang: Lang; short: string; full: string }[] = [
  { lang: "kk", short: "KZ", full: "Қазақша" },
  { lang: "ru", short: "RU", full: "Русский" },
];

/** Переключатель KZ / RU. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const [lang, setLang] = useLang();
  const t = useT();
  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center rounded-full bg-white p-1 shadow-[inset_0_0_0_1.5px_var(--color-line)] ${className}`}>
      {OPTIONS.map((o) => {
        const active = o.lang === lang;
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.lang}
            onClick={() => setLang(o.lang)}
            aria-pressed={active}
            aria-label={o.full}
            title={o.full}
            className={`min-h-9 min-w-9 rounded-full px-2 sm:min-w-10 sm:px-2.5 text-[13px] font-extrabold transition-colors duration-200 ${
              active ? "bg-ink text-white shadow-sm" : "text-ink-soft hover:text-ink"
            }`}
          >
            {o.short}
          </button>
        );
      })}
    </div>
  );
}
