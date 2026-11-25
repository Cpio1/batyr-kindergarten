"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Clock, MapPin, Volume2, VolumeX } from "lucide-react";
import { KindergartenScene } from "../decor/Illustrations";
import { Cloud, CloudPuffy, Flower, Rainbow, Sparkle, Star, Wave } from "../decor/Shapes";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { useT } from "@/lib/i18n";
import { heroPhoto, heroVideo } from "@/lib/media";
import { onAnchorClick } from "@/lib/scroll";
import { waHref, withBasePath } from "@/lib/site";

const STAT_TONES = ["bg-sun-soft text-sun-deep", "bg-sky-soft text-sky-deep", "bg-mint-soft text-mint-deep"];

/** Есть ли реальное фото/видео: тогда кадр широкий (не обрезаем детей по краям), иначе — квадратная иллюстрация. */
const HAS_MEDIA = Boolean(heroVideo || heroPhoto);

/**
 * Видео первого экрана (main-page2.mp4). Запускается без звука — так браузеры (и iOS) разрешают автозапуск;
 * кнопка включает и выключает звук. Если видео не загрузилось, остаётся фото-постер.
 */
function HeroVideo({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {
      /* автозапуск запрещён (режим энергосбережения) — видео стартует по нажатию */
    });
  }, []);

  if (!heroVideo || failed) return <HeroImage sizes={compact ? "100vw" : "(min-width: 1024px) 620px, 50vw"} />;

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) void v.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={ref}
        className="size-full object-cover"
        style={{ objectPosition: "50% 40%" }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPhoto ? withBasePath(heroPhoto.src) : undefined}
        aria-label={t.hero.photoAlt}
        onError={() => setFailed(true)}
      >
        <source src={withBasePath(heroVideo.src)} type={heroVideo.type} onError={() => setFailed(true)} />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
        className={`absolute z-10 grid place-items-center rounded-full bg-white/95 text-ink shadow-lift transition hover:scale-105 ${
          compact ? "top-3 right-3 size-10" : "top-5 right-6 size-12"
        }`}
      >
        {muted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5 text-sky-deep" aria-hidden="true" />}
      </button>
    </>
  );
}

function HeroImage({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  const t = useT();
  if (!heroPhoto) return <KindergartenScene className="size-full" title={t.hero.artLabel} />;
  return (
    <Image
      src={withBasePath(heroPhoto.src)}
      alt={t.hero.photoAlt}
      width={heroPhoto.width}
      height={heroPhoto.height}
      sizes={sizes}
      priority={priority}
      className="size-full object-cover"
      style={{ objectPosition: "50% 40%" }}
    />
  );
}

/** Видео (если есть main-page2.mp4) → фото main-page.* → иллюстрация. */
function HeroVisual({ sizes, priority = false, compact = false }: { sizes: string; priority?: boolean; compact?: boolean }) {
  if (heroVideo) return <HeroVideo compact={compact} />;
  return <HeroImage sizes={sizes} priority={priority} />;
}

function Title({ className }: { className: string }) {
  const t = useT();
  return (
    <h1 className={className}>
      {t.hero.before}
      <span className="relative inline-block whitespace-nowrap text-sky-deep">
        {t.hero.brand}
        <svg viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full lg:-bottom-2 lg:h-3.5" aria-hidden="true">
          <path d="M3 9c40-8 80-8 120-3s50 4 74-2" fill="none" stroke="#FFD966" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </span>
      {t.hero.after}
    </h1>
  );
}

export function Hero() {
  const t = useT();
  const wa = waHref(t.waMessage);

  return (
    <section id="top" aria-label={t.hero.photoAlt} className="relative isolate overflow-clip bg-gradient-to-b from-sky-soft via-[#F2FAFE] to-cream pt-[var(--header-h)]">
      {/* ---------- Desktop / tablet (от 768px) ---------- */}
      <div className="shell relative hidden md:block">
        <Cloud className="absolute top-10 left-[38%] w-28 animate-drift opacity-90" />
        <CloudPuffy className="absolute top-[58%] -left-10 w-40 animate-drift opacity-70 [animation-delay:-8s]" />
        <Sparkle className="absolute top-[18%] left-[3%] w-5 animate-twinkle" color="#FFAD87" />
        <Star className="absolute bottom-[14%] left-[44%] w-6 animate-twinkle [animation-delay:-1.4s]" />

        <div className="grid min-h-[min(calc(100svh-var(--header-h)),820px)] items-center gap-8 py-10 md:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-[clamp(20px,4vh,56px)]">
          <div className="relative z-10">
            <span data-reveal className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[13px] font-extrabold text-ink shadow-soft">
              <MapPin className="size-4 text-peach-deep" aria-hidden="true" />
              {t.hero.badge}
            </span>
            <Title className="mt-4 lg:mt-[clamp(12px,2.2vh,20px)] text-balance font-display text-[clamp(32px,min(4.1vw,7.4vh),58px)] leading-[1.08] font-black tracking-tight text-ink" />
            <p data-reveal className="mt-4 max-w-[34rem] lg:mt-[clamp(10px,2.2vh,20px)] text-pretty text-[clamp(16px,1.35vw,19px)] leading-relaxed text-ink-soft" style={{ ["--reveal-delay" as string]: "80ms" }}>
              {t.hero.text}
            </p>

            <div data-reveal className="mt-7 flex flex-wrap gap-3 lg:mt-[clamp(16px,3.4vh,28px)]" style={{ ["--reveal-delay" as string]: "140ms" }}>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa px-6 text-base" aria-label={`${t.hero.ctaWa} ${t.newTab}`}>
                <WhatsAppIcon className="size-5" />
                {t.hero.ctaWa}
              </a>
              <a href="#about" onClick={(e) => onAnchorClick(e, "about")} className="btn btn-light px-6 text-base">
                {t.hero.ctaAbout}
                <ArrowDown className="size-[18px]" aria-hidden="true" />
              </a>
            </div>

            <ul data-reveal className="mt-8 flex flex-wrap gap-3 lg:mt-[clamp(16px,3.6vh,32px)]" style={{ ["--reveal-delay" as string]: "200ms" }}>
              {t.hero.stats.map((s, i) => (
                <li key={s.label} className="flex items-center gap-2.5 rounded-[20px] bg-white px-3.5 py-2.5 shadow-soft">
                  <span className={`grid h-10 min-w-10 place-items-center rounded-[14px] px-2 text-lg font-black ${STAT_TONES[i]}`}>{s.value}</span>
                  <span className="max-w-[8.5rem] text-[14px] leading-tight font-extrabold text-ink">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Визуал */}
          <div
            data-reveal
            className={`relative mx-auto w-full min-w-[300px] ${
              HAS_MEDIA
                ? "aspect-[3/2] max-w-[min(640px,calc((100svh-var(--header-h)-110px)*1.5))]"
                : "aspect-square max-w-[min(520px,calc(100svh-var(--header-h)-90px))]"
            }`}
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <div className={`absolute -inset-4 bg-sun/70 ${HAS_MEDIA ? "leaf-alt rotate-[-2deg]" : "blob-b"}`} aria-hidden="true" />
            <div className={`absolute -inset-1 bg-white ${HAS_MEDIA ? "leaf" : "blob-a"}`} aria-hidden="true" />
            <div className={`absolute inset-2 overflow-hidden bg-sky-soft ${HAS_MEDIA ? "leaf" : "blob-a"}`}>
              <HeroVisual sizes="(min-width: 1024px) 640px, 50vw" priority />
            </div>
            <Rainbow className="absolute -top-8 -left-10 w-32 animate-float lg:w-40" />
            <Cloud className="absolute top-[12%] -right-10 w-28 animate-float-slow lg:w-32" />
            <Star className="absolute -right-2 bottom-[18%] w-9 animate-twinkle" />
            <Flower className="absolute -bottom-3 left-[6%] w-11 animate-sway" />
            <Sparkle className="absolute top-[40%] -left-7 w-6 animate-twinkle [animation-delay:-2s]" color="#A9E5C1" />
            <div className="absolute right-[4%] -bottom-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[14px] font-extrabold text-ink shadow-lift">
              <Clock className="size-[18px] text-sky-deep" aria-hidden="true" />
              {t.hero.hours}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile (до 767px) ---------- */}
      <div className="shell relative pt-6 pb-12 md:hidden">
        <Cloud className="absolute top-3 -right-6 w-24 animate-drift opacity-90" />
        <Sparkle className="absolute top-24 left-2 w-4 animate-twinkle" color="#FFAD87" />

        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-extrabold text-ink shadow-soft">
          <MapPin className="size-3.5 text-peach-deep" aria-hidden="true" />
          {t.hero.badge}
        </span>
        <Title className="relative mt-4 text-balance font-display text-[clamp(28px,8.4vw,36px)] leading-[1.12] font-black tracking-tight text-ink" />
        <p className="relative mt-4 text-pretty text-[15.5px] leading-relaxed text-ink-soft">{t.hero.text}</p>

        <div className={`relative mx-auto mt-7 w-full ${HAS_MEDIA ? "aspect-[16/11] max-w-[min(480px,calc(44svh*16/11))]" : "aspect-[5/4] max-w-[min(400px,44svh)]"}`}>
          <div className={`absolute -inset-2 bg-sun/70 ${HAS_MEDIA ? "leaf-alt" : "blob-c"}`} aria-hidden="true" />
          <div className={`absolute inset-1 overflow-hidden bg-sky-soft ring-4 ring-white ${HAS_MEDIA ? "leaf" : "blob-c"}`}>
            <HeroVisual sizes="100vw" compact />
          </div>
          <Rainbow className="absolute -top-5 -left-3 w-20 animate-float" />
          <Star className="absolute -top-2 right-6 w-7 animate-twinkle" />
          <Flower className="absolute -right-1 -bottom-2 w-9 animate-sway" />
          <div className="absolute -bottom-4 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[12.5px] font-extrabold text-ink shadow-lift">
            <Clock className="size-4 text-sky-deep" aria-hidden="true" />
            {t.hero.hours}
          </div>
        </div>

        <div className="relative mt-9 grid gap-2.5">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa min-h-[52px] w-full text-[16px]" aria-label={`${t.hero.ctaWa} ${t.newTab}`}>
            <WhatsAppIcon className="size-5" />
            {t.hero.ctaWa}
          </a>
          <a href="#about" onClick={(e) => onAnchorClick(e, "about")} className="btn btn-light min-h-[52px] w-full text-[16px]">
            {t.hero.ctaAbout}
            <ArrowDown className="size-[18px]" aria-hidden="true" />
          </a>
        </div>

        <ul className="relative mt-5 grid grid-cols-3 gap-2">
          {t.hero.stats.map((s, i) => (
            <li key={s.label} className="flex flex-col items-center rounded-[20px] bg-white px-1.5 py-3 text-center shadow-soft">
              <span className={`grid h-9 min-w-9 place-items-center rounded-xl px-1.5 text-[17px] font-black ${STAT_TONES[i]}`}>{s.value}</span>
              <span className="mt-1.5 text-[12.5px] leading-tight font-extrabold text-ink">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Wave className="absolute inset-x-0 -bottom-px h-6 w-full md:h-10" color="#FFF9ED" />
    </section>
  );
}
