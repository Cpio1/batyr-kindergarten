"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { useT } from "@/lib/i18n";
import { waHref } from "@/lib/site";

/** Плавающая кнопка WhatsApp. Появляется после первого экрана, скрывается при открытом меню и просмотре фото. */
export function WhatsAppFloat() {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waHref(t.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.waFloat} ${t.newTab}`}
      title={t.waFloat}
      tabIndex={visible ? 0 : -1}
      className={`wa-float group fixed right-[max(16px,env(safe-area-inset-right))] bottom-[calc(16px+env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-wa p-3 text-white shadow-[0_14px_30px_-10px_rgb(21_128_61/0.75)] transition-all duration-300 hover:bg-wa-hover md:right-6 md:bottom-6 md:p-3.5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-wa/40 [animation-duration:2.8s] motion-reduce:hidden" aria-hidden="true" />
      <WhatsAppIcon className="size-7" />
      <span className="hidden max-w-0 overflow-hidden text-[15px] font-extrabold whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[240px] group-hover:pr-1.5 lg:block">
        {t.waFloat}
      </span>
    </a>
  );
}
