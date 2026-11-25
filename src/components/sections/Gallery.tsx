"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
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

/** Сколько фото видно в разделе: desktop — сетка 3×2, mobile — 2×2. Остальные — в окне «Смотреть все». */
const PREVIEW_DESKTOP = 6;
const PREVIEW_MOBILE = 4;

/** Необычные формы плиток — повторяются по кругу. */
const SHAPES = [
  "rounded-[18px] lg:rounded-[24px]",
  "rounded-[18px_18px_18px_44px] lg:rounded-[24px_24px_24px_60px]",
  "rounded-[44px_18px_18px_18px] lg:rounded-[60px_24px_24px_24px]",
  "rounded-[18px_44px_18px_18px] lg:rounded-[24px_60px_24px_24px]",
  "rounded-[18px_18px_44px_18px] lg:rounded-[24px_24px_60px_24px]",
  "rounded-[18px] lg:rounded-[24px]",
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

/** Плитка-фото: object-fit: cover с точкой фокуса, чтобы не срезать лица. */
function Tile({ photo, index, shape, sizes, eager = false, onOpen }: { photo: Photo; index: number; shape: string; sizes: string; eager?: boolean; onOpen: () => void }) {
  const t = useT();
  const altOf = useAlt();
  const alt = altOf(photo, index);
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t.gallery.open}: ${alt}`}
      className={`group relative block size-full overflow-hidden bg-sky-soft shadow-soft ring-[3px] ring-white transition-shadow hover:shadow-lift lg:ring-4 ${shape}`}
    >
      <Image
        src={withBasePath(photo.src)}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        className="size-full animate-photo-in object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        style={{ objectPosition: photoMeta(photo.name)?.focus ?? "50% 40%" }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <span className="absolute right-2.5 bottom-2.5 grid size-8 scale-75 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
        <Expand className="size-4" />
      </span>
    </button>
  );
}

/** Окно «Все фотографии»: прокручиваемая сетка всех фото, нажатие открывает полноэкранный просмотр. */
function AllPhotos({ photos, onClose, onOpen, viewerOpen }: { photos: Photo[]; onClose: () => void; onOpen: (i: number) => void; viewerOpen: boolean }) {
  const t = useT();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    document.body.dataset.gallery = "open";
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = prev;
      delete document.body.dataset.gallery;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (viewerOpen) return; // клавиши обрабатывает окно просмотра поверх
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, viewerOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-photos-title"
      className="fixed inset-0 z-[65] flex animate-fade-in items-end justify-center bg-[#1b2740]/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] bg-cream shadow-2xl sm:max-h-[min(88svh,900px)] sm:rounded-[32px]">
        <div className="flex items-center justify-between gap-3 border-b border-ink/5 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <h3 id="all-photos-title" className="flex min-w-0 items-center gap-2 font-display text-[19px] font-black text-ink sm:text-[22px]">
            <Images className="size-5 shrink-0 text-lilac-deep" aria-hidden="true" />
            <span className="truncate">{t.gallery.allTitle}</span>
            <span className="shrink-0 rounded-full bg-lilac-soft px-2.5 py-0.5 text-[13px] font-extrabold text-lilac-deep tabular-nums">{photos.length}</span>
          </h3>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className="grid size-11 shrink-0 place-items-center rounded-full bg-sky-soft text-ink transition hover:bg-sky/30">
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-2.5 overflow-y-auto overscroll-contain p-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:grid-cols-3 sm:gap-3 sm:p-5 lg:grid-cols-4">
          {photos.map((p, i) => (
            <li key={p.src} className="aspect-[4/3]">
              <Tile photo={p} index={i} shape={SHAPES[i % SHAPES.length]} sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw" eager={i < 8} onOpen={() => onOpen(i)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Gallery() {
  const t = useT();
  const photos = orderedGallery;
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const closeAll = useCallback(() => setAll(false), []);

  // В разделе — сначала горизонтальные кадры: в плитке 3:2 они смотрятся лучше. Все фото — в окне «Смотреть все».
  const preview = [...photos].sort((a, b) => Number(isPortrait(a)) - Number(isPortrait(b))).slice(0, PREVIEW_DESKTOP);
  const openPhoto = (p: Photo) => setOpen(photos.indexOf(p));
  const hasMoreDesktop = photos.length > PREVIEW_DESKTOP;
  const hasMoreMobile = photos.length > PREVIEW_MOBILE;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-white lg:py-[clamp(24px,4.2vh,56px)]">
      <Wave className="absolute inset-x-0 -top-px h-6 w-full md:h-10" color="#FFF9ED" flip />
      <Cloud className="absolute top-14 right-[3%] hidden w-28 animate-drift md:block" color="#E5F5FE" />
      <Sparkle className="absolute top-20 left-[6%] w-5 animate-twinkle" color="#FFAD87" />
      <Star className="absolute bottom-[8%] left-[4%] hidden w-7 animate-twinkle lg:block" />
      <Flower className="absolute right-[4%] bottom-[10%] hidden w-9 animate-sway lg:block" color="#A9E5C1" />

      <div className="shell relative">
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} tone="lilac" />

        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop / tablet: 3 колонки × 2 ряда. Высота ряда считается от высоты экрана,
                чтобы заголовок, фото и кнопка помещались в один экран вместе с шапкой. */}
            <ul
              className="mx-auto mt-6 hidden grid-cols-3 gap-3 md:grid lg:mt-[clamp(14px,2.6vh,28px)] lg:gap-4"
              style={{
                ["--row" as string]: "clamp(120px, calc((100svh - var(--header-h) - 2 * clamp(24px, 4.2vh, 56px) - 13.5rem - 4vh) / 2), 250px)",
                gridAutoRows: "var(--row)",
                maxWidth: "calc(var(--row) * 3 * 1.55 + 2rem)",
              }}
            >
              {preview.map((p, i) => (
                <li key={p.src} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                  <Tile photo={p} index={photos.indexOf(p)} shape={SHAPES[i]} sizes="(min-width: 1280px) 390px, 33vw" eager={i < 3} onOpen={() => openPhoto(p)} />
                </li>
              ))}
            </ul>

            {/* Mobile: 2 колонки, 4 фото */}
            <ul className="mt-5 grid grid-cols-2 gap-2.5 md:hidden">
              {preview.slice(0, PREVIEW_MOBILE).map((p, i) => (
                <li key={p.src} data-reveal className="aspect-[4/3]">
                  <Tile photo={p} index={photos.indexOf(p)} shape={SHAPES[i]} sizes="50vw" eager={i < 2} onOpen={() => openPhoto(p)} />
                </li>
              ))}
            </ul>

            {(hasMoreDesktop || hasMoreMobile) && (
              <div className={`mt-5 justify-center lg:mt-[clamp(14px,2.4vh,24px)] ${hasMoreDesktop ? "flex" : "flex md:hidden"}`}>
                <button type="button" onClick={() => setAll(true)} aria-haspopup="dialog" className="btn btn-sky w-full px-6 sm:w-auto">
                  <Images className="size-[18px]" aria-hidden="true" />
                  <span className="md:hidden">{t.gallery.viewAllShort}</span>
                  <span className="hidden md:inline">{t.gallery.viewAll}</span>
                  <span className="rounded-full bg-white/25 px-2 py-0.5 text-[13px] tabular-nums">{photos.length}</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {all && createPortal(<AllPhotos photos={photos} onClose={closeAll} onOpen={setOpen} viewerOpen={open !== null} />, document.body)}
      {open !== null &&
        createPortal(<Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />, document.body)}
    </section>
  );
}
