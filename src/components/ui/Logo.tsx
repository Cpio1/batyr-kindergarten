"use client";

import { useT } from "@/lib/i18n";
import { onAnchorClick } from "@/lib/scroll";

/** Название «Батыр ел» в шапке — возвращает на главный экран. */
export function Logo({ onNavigate, compact = false }: { onNavigate?: () => void; compact?: boolean }) {
  const t = useT();
  return (
    <a
      href="#top"
      onClick={(e) => onAnchorClick(e, "top", onNavigate)}
      className="group flex min-w-0 items-center gap-2 rounded-2xl sm:gap-2.5"
      aria-label={`«Батыр ел» — ${t.nav.home}`}
    >
      <span className="relative grid size-9 shrink-0 min-[360px]:size-10 place-items-center rounded-[14px] bg-sky shadow-[0_6px_14px_-6px_rgb(23_103_154/0.6)] transition-transform duration-300 group-hover:-rotate-6 lg:size-11">
        <svg viewBox="0 0 40 40" className="size-8" aria-hidden="true">
          <path d="M6 28a14 14 0 0 1 28 0" fill="none" stroke="#FFAD87" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M11 28a9 9 0 0 1 18 0" fill="none" stroke="#FFD966" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M16 28a4 4 0 0 1 8 0" fill="none" stroke="#A9E5C1" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M20 5l2 4.2 4.6.7-3.3 3.2.8 4.6L20 15.5l-4.1 2.2.8-4.6-3.3-3.2 4.6-.7z" fill="#fff" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-logo text-[19px] font-bold tracking-tight text-ink lg:text-[21px]">Батыр ел</span>
        {!compact && (
          <span className="mt-1 truncate text-[11px] font-bold tracking-wide text-ink-soft lg:text-xs">{t.brandCaption}</span>
        )}
      </span>
    </a>
  );
}
