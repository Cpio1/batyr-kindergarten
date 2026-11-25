"use client";

import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CameraArt } from "../decor/Illustrations";
import { Cloud, Flower, Sparkle, Star, Wave } from "../decor/Shapes";
import { InstagramIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";
import { useLang, useT } from "@/lib/i18n";
import { type Photo } from "@/lib/media";
import { orderedGallery, photoMeta } from "@/lib/photos";
import { site, withBasePath } from "@/lib/site";

/** Сколько фото показывать сразу (остальные — по кнопке). */
const INITIAL_DESKTOP = 10;
const INITIAL_MOBILE = 7;

/** Необычные формы плиток — повторяются по кругу. */
const SHAPES = [
  "rounded-[22px] md:rounded-[30px]",
  "rounded-[22px_22px_22px_56px] md:rounded-[30px_30px_30px_80px]",
  "rounded-[56px_22px_22px_22px] md:rounded-[80px_30px_30px_30px]",
  "rounded-[22px_56px_22px_22px] md:rounded-[30px_80px_30px_30px]",
  "rounded-[22px_22px_56px_22px] md:rounded-[30px_30px_80px_30px]",
];

const isPortrait = (p: Photo) => p.height > p.width * 1.1;

/** Подпись фото на текущем языке (из src/lib/photos.ts) или общий текст для новых файлов. */
function useAlt() {
  const t = useT();
  const [lang] = useLang();
  return (p: Photo, i: number) => photoMeta(p.name)?.alt[lang] ?? t.gallery.photoAlt(i + 1);
}

function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const t = useT();
  const altOf = useAlt();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);
  const p = photos[index];

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    document.body.dataset.lightbox = "open";
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = prev;
      delete document.body.dataset.lightbox;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Фокус остаётся внутри окна просмотра
        const dialog = closeRef.current?.closest("[role=dialog]");
        const items = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>("button")) : [];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Подгружаем соседние фото заранее
  useEffect(() => {
    if (n < 2) return;
    for (const i of [(index + 1) % n, (index - 1 + n) % n]) {
      const img = new window.Image();
      img.src = withBasePath(photos[i].src);
    }
  }, [index, n, photos]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.viewer}
      className="fixed inset-0 z-[70] flex animate-fade-in flex-col bg-[#1b2740]/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        const s = touch.current;
        touch.current = null;
        if (!s) return;
        const dx = e.changedTouches[0].clientX - s.x;
        const dy = e.changedTouches[0].clientY - s.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose();
      }}
    >
      <div className="flex items-center justify-between px-4 pt-[calc(12px+env(safe-area-inset-top))] pb-2 text-white">
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold tabular-nums" aria-live="polite">
          {t.gallery.counter(index + 1, n)}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-[calc(84px+env(safe-area-inset-bottom))] sm:px-20 sm:pb-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- полноразмерный просмотр: нужен исходный файл с object-contain */}
        <img
          key={p.src}
          src={withBasePath(p.src)}
          alt={altOf(p, index)}
          width={p.width}
          height={p.height}
          className="max-h-full max-w-full animate-photo-in rounded-2xl object-contain shadow-2xl select-none"
          draggable={false}
        />
        <p className="pointer-events-none absolute inset-x-20 bottom-[calc(30px+env(safe-area-inset-bottom))] text-center text-[13.5px] leading-snug font-bold text-white/90 sm:inset-x-24 sm:bottom-5 sm:text-[15px]">
          {altOf(p, index)}
        </p>
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t.gallery.prev} className="absolute bottom-[calc(20px+env(safe-area-inset-bottom))] left-4 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lift transition hover:scale-105 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2">
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t.gallery.next} className="absolute right-4 bottom-[calc(20px+env(safe-area-inset-bottom))] grid size-12 place-items-center rounded-full bg-white text-ink shadow-lift transition hover:scale-105 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2">
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const t = useT();
  return (
    <div data-reveal className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-[36px] bg-white p-7 text-center shadow-soft sm:p-10 md:p-8 lg:mt-[clamp(20px,4.5vh,40px)]">
      <div className="absolute inset-0 dots-bg opacity-60" aria-hidden="true" />
      <Star className="absolute top-6 left-8 w-7 animate-twinkle" />
      <Flower className="absolute right-8 bottom-6 w-9 animate-sway" color="#A9E5C1" />
      <div className="relative flex flex-col items-center gap-4 md:flex-row md:gap-8 md:text-left">
        <CameraArt className="w-28 shrink-0 animate-float sm:w-32 md:w-36" />
        <div>
        <h3 className="font-display text-[21px] font-black text-ink sm:text-[24px]">{t.gallery.emptyTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-soft md:mx-0">{t.gallery.emptyText}</p>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-5 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[0_10px_22px_-10px_rgb(221_42_123/0.7)]"
          aria-label={`Instagram ${site.instagram.handle} ${t.newTab}`}
        >
          <InstagramIcon className="size-5" />
          {site.instagram.handle}
        </a>
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const t = useT();
  const altOf = useAlt();
  const photos = orderedGallery;
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const shown = expanded ? photos : photos.slice(0, INITIAL_DESKTOP);
  const needsDesktopBtn = photos.length > INITIAL_DESKTOP;
  const needsMobileBtn = photos.length > INITIAL_MOBILE;

  const collapse = () => {
    setExpanded(false);
    const el = sectionRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - header });
    }
  };

  return (
    <section ref={sectionRef} id="gallery" aria-labelledby="gallery-title" className="section bg-white">
      <Wave className="absolute inset-x-0 -top-px h-6 w-full md:h-10" color="#FFF9ED" flip />
      <Cloud className="absolute top-14 right-[3%] hidden w-28 animate-drift md:block" color="#E5F5FE" />
      <Sparkle className="absolute top-20 left-[6%] w-5 animate-twinkle" color="#FFAD87" />

      <div className="shell relative">
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} tone="lilac" />

        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ul className="mt-7 grid grid-flow-dense auto-rows-[clamp(104px,28vw,160px)] grid-cols-2 gap-2.5 md:grid-cols-4 md:auto-rows-[clamp(120px,15vw,170px)] md:gap-3 lg:mt-[clamp(20px,4.5vh,36px)] lg:auto-rows-[clamp(120px,18vh,190px)] lg:gap-4">
              {shown.map((p, i) => (
                <li
                  key={p.src}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(i % 6) * 50}ms` }}
                  className={`${i === 0 ? "col-span-2 row-span-2" : isPortrait(p) ? "row-span-2" : ""} ${!expanded && i >= INITIAL_MOBILE ? "max-md:hidden" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`${t.gallery.open}: ${altOf(p, i)}`}
                    className={`group relative block size-full overflow-hidden bg-sky-soft shadow-soft ring-4 ring-white transition-shadow hover:shadow-lift ${SHAPES[i % SHAPES.length]}`}
                  >
                    <Image
                      src={withBasePath(p.src)}
                      alt={altOf(p, i)}
                      width={p.width}
                      height={p.height}
                      loading={i < 3 ? "eager" : "lazy"}
                      sizes={i === 0 ? "(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 300px, (min-width: 768px) 25vw, 50vw"}
                      className="size-full animate-photo-in object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      style={{ objectPosition: photoMeta(p.name)?.focus ?? "50% 40%" }}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                    <span className="absolute right-3 bottom-3 grid size-9 scale-75 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
                      <Expand className="size-4" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {(needsDesktopBtn || needsMobileBtn) && (
              <div className={`mt-6 justify-center lg:mt-[clamp(16px,3vh,24px)] ${needsDesktopBtn ? "flex" : "flex md:hidden"}`}>
                <button type="button" onClick={() => (expanded ? collapse() : setExpanded(true))} aria-expanded={expanded} className="btn btn-sky px-6">
                  {expanded ? t.gallery.showLess : `${t.gallery.showAll} (${photos.length})`}
                  {expanded ? <ChevronUp className="size-[18px]" aria-hidden="true" /> : <ChevronDown className="size-[18px]" aria-hidden="true" />}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {open !== null &&
        createPortal(<Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />, document.body)}
    </section>
  );
}
