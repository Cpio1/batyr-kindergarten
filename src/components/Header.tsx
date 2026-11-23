"use client";

import { Apple, FileText, Images, Menu, Music, Phone, Smile, Users, X, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { onAnchorClick } from "@/lib/scroll";
import { site, telHref, waHref } from "@/lib/site";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { LangSwitch } from "./ui/LangSwitch";
import { Logo } from "./ui/Logo";

export const NAV = [
  { id: "about", icon: Smile, tone: "bg-sky-soft text-sky-deep" },
  { id: "groups", icon: Users, tone: "bg-sun-soft text-sun-deep" },
  { id: "food", icon: Apple, tone: "bg-peach-soft text-peach-deep" },
  { id: "clubs", icon: Music, tone: "bg-mint-soft text-mint-deep" },
  { id: "gallery", icon: Images, tone: "bg-lilac-soft text-lilac-deep" },
  { id: "documents", icon: FileText, tone: "bg-sky-soft text-sky-deep" },
  { id: "contacts", icon: MapPin, tone: "bg-peach-soft text-peach-deep" },
] as const;

export type NavId = (typeof NAV)[number]["id"];

/** Текущий раздел — подсвечивается в меню. */
function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const line = window.innerHeight * 0.38;
      let current = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      // В самом низу страницы подсвечиваем последний раздел
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1)?.id ?? current;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

export function Header() {
  const t = useT();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Мобильное меню: блокировка прокрутки, Esc, закрытие при переходе на desktop
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    document.body.dataset.menu = "open";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prev;
      delete document.body.dataset.menu;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-10 h-[var(--header-h)] border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "border-line/80 bg-cream/85 shadow-[0_8px_24px_-18px_rgb(37_54_84/0.45)] backdrop-blur-xl"
            : "border-transparent bg-cream/60 backdrop-blur-md"
        }`}
      >
        <div className="shell flex h-full items-center justify-between gap-2 lg:gap-4">
          <Logo onNavigate={close} />

          {/* Desktop-навигация */}
          <nav aria-label={t.nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV.map((n) => {
                const isActive = active === n.id;
                return (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={(e) => onAnchorClick(e, n.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-2.5 py-2 text-[14px] font-extrabold whitespace-nowrap transition-colors duration-200 xl:px-3.5 xl:text-[15px] ${
                        isActive ? "bg-white text-ink shadow-[0_4px_12px_-6px_rgb(37_54_84/0.35)]" : "text-ink-soft hover:bg-white/70 hover:text-ink"
                      }`}
                    >
                      {t.nav[n.id]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LangSwitch />
            <a
              href={waHref(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa hidden min-h-10 px-4 text-sm xl:inline-flex"
              aria-label={`${t.contacts.wa} ${t.newTab}`}
            >
              <WhatsAppIcon className="size-[18px]" />
              WhatsApp
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-2xl bg-ink text-white shadow-[0_6px_14px_-6px_rgb(37_54_84/0.6)] transition-transform active:scale-95 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <>
          <button
            type="button"
            aria-label={t.nav.close}
            tabIndex={-1}
            className="fixed inset-0 top-[var(--header-h)] animate-fade-in bg-ink/30 backdrop-blur-[2px] lg:hidden"
            onClick={close}
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            className="absolute inset-x-0 top-[var(--header-h)] max-h-[calc(100dvh-var(--header-h))] animate-menu-in overflow-y-auto overscroll-contain rounded-b-[32px] bg-cream px-[var(--gutter)] pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] shadow-[0_24px_40px_-24px_rgb(37_54_84/0.5)] lg:hidden"
          >
            <nav aria-label={t.nav.primary}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {NAV.map((n, i) => {
                  const Icon = n.icon;
                  const isActive = active === n.id;
                  return (
                    <li key={n.id} className="animate-menu-in" style={{ animationDelay: `${i * 30}ms` }}>
                      <a
                        href={`#${n.id}`}
                        onClick={(e) => onAnchorClick(e, n.id, close)}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex min-h-14 items-center gap-3 rounded-2xl px-3 py-2 text-[17px] font-extrabold text-ink transition-colors ${
                          isActive ? "bg-white shadow-soft" : "bg-white/60 active:bg-white"
                        }`}
                      >
                        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${n.tone}`}>
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        {t.nav[n.id]}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={waHref(t.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa px-3 text-[15px]" onClick={close}>
                <WhatsAppIcon className="size-5" />
                WhatsApp
              </a>
              <a href={telHref} className="btn btn-light px-3 text-[15px]" onClick={close}>
                <Phone className="size-5" aria-hidden="true" />
                {t.contacts.call}
              </a>
            </div>
            <p className="mt-3 text-center text-[13px] font-bold text-ink-soft">
              {site.phone.display} · {site.hours}
            </p>
          </div>
        </>
      )}
    </header>
  );
}
