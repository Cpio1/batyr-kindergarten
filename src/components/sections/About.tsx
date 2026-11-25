"use client";

import Image from "next/image";
import { Baby, Clock, Languages, Sparkles, Users, UtensilsCrossed } from "lucide-react";
import { Cloud, Dots, Flower, Heart, Sparkle, Star } from "../decor/Shapes";
import { SectionHeading } from "../ui/SectionHeading";
import { useLang, useT } from "@/lib/i18n";
import { aboutPhoto } from "@/lib/media";
import { sitePhotos, type SitePhoto } from "@/lib/photos";
import { withBasePath } from "@/lib/site";

const FACT_STYLE: Record<string, { icon: typeof Baby; tone: string; shape: string }> = {
  lang: { icon: Languages, tone: "bg-sky-soft text-sky-deep", shape: "rounded-[18px_18px_18px_6px]" },
  age: { icon: Baby, tone: "bg-peach-soft text-peach-deep", shape: "rounded-full" },
  groups: { icon: Users, tone: "bg-sun-soft text-sun-deep", shape: "rounded-[18px_6px_18px_18px]" },
  hours: { icon: Clock, tone: "bg-mint-soft text-mint-deep", shape: "rounded-full" },
  meals: { icon: UtensilsCrossed, tone: "bg-peach-soft text-peach-deep", shape: "rounded-[6px_18px_18px_18px]" },
  clubs: { icon: Sparkles, tone: "bg-lilac-soft text-lilac-deep", shape: "rounded-[18px_18px_6px_18px]" },
};

/** Казахские буквы-кубики — подчёркивают язык обучения (и проверяют отображение Ә Ғ Қ Ң Ө Ұ Ү Һ І). */
const LETTERS = [
  { ch: "Ә", c: "bg-sky text-white", r: "-rotate-6" },
  { ch: "Ғ", c: "bg-sun text-ink", r: "rotate-3" },
  { ch: "Қ", c: "bg-peach text-white", r: "-rotate-3" },
  { ch: "Ң", c: "bg-mint text-ink", r: "rotate-6" },
  { ch: "Ө", c: "bg-lilac text-ink", r: "-rotate-2" },
  { ch: "Ұ", c: "bg-sun text-ink", r: "rotate-4" },
  { ch: "Ү", c: "bg-sky text-white", r: "-rotate-5" },
  { ch: "Һ", c: "bg-peach text-white", r: "rotate-2" },
  { ch: "І", c: "bg-mint text-ink", r: "-rotate-3" },
];

function LetterBlocks({ small = false }: { small?: boolean }) {
  return (
    <div lang="kk" className={`grid grid-cols-3 ${small ? "gap-2" : "gap-3"}`} aria-hidden="true">
      {LETTERS.map((l, i) => (
        <span
          key={l.ch}
          className={`grid place-items-center font-display font-black shadow-[0_8px_16px_-10px_rgb(37_54_84/0.6)] ${l.c} ${l.r} ${
            small ? "size-12 rounded-2xl text-2xl" : "size-[clamp(52px,min(5.4vw,10vh),76px)] rounded-[22px] text-[clamp(26px,min(2.6vw,5vh),38px)]"
          } ${i % 2 ? "animate-float" : "animate-float-slow"}`}
          style={{ animationDelay: `${-i * 0.7}s` }}
        >
          {l.ch}
        </span>
      ))}
    </div>
  );
}

function Pic({ photo, sizes, className = "" }: { photo: SitePhoto; sizes: string; className?: string }) {
  const [lang] = useLang();
  return (
    <Image
      src={withBasePath(photo.src)}
      alt={photo.alt[lang]}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      className={`size-full object-cover ${className}`}
      style={{ objectPosition: photo.focus }}
    />
  );
}

/** Коллаж из реальных фото детского сада: большое фото-арка + два маленьких в «пузырях». */
function Collage({ mobile = false }: { mobile?: boolean }) {
  const { main, small } = sitePhotos.about;
  const [a, b] = small;
  if (!main) return null;
  if (mobile) {
    return (
      <div className="relative mx-auto w-full max-w-[460px] pb-6">
        <div className="absolute -inset-2 bottom-4 rounded-[36px_36px_36px_90px] bg-mint" aria-hidden="true" />
        <div className="relative aspect-[16/11] overflow-hidden rounded-[32px_32px_32px_84px] bg-sky-soft ring-4 ring-white">
          <Pic photo={main} sizes="100vw" />
        </div>
        {a && (
          <div className="absolute right-3 bottom-0 aspect-square w-[34%] overflow-hidden pebble bg-sky-soft shadow-lift ring-4 ring-white">
            <Pic photo={a} sizes="160px" />
          </div>
        )}
        <Star className="absolute -top-3 right-5 w-8 animate-twinkle" />
        <Heart className="absolute bottom-3 left-[44%] w-6 animate-float" />
      </div>
    );
  }
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[min(420px,calc((100svh-var(--header-h)-110px)*5/6))]">
      <div className="absolute top-0 left-[4%] h-[82%] w-[76%]">
        <div className="absolute -inset-3 arch bg-mint" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden arch bg-sky-soft ring-4 ring-white">
          <Pic photo={main} sizes="340px" />
        </div>
      </div>
      {a && (
        <div className="absolute right-0 bottom-0 aspect-square w-[48%] animate-float-slow overflow-hidden pebble bg-sky-soft shadow-lift ring-[6px] ring-white">
          <Pic photo={a} sizes="210px" />
        </div>
      )}
      {b && (
        <div className="absolute top-[6%] -right-[2%] aspect-[4/3] w-[34%] rotate-6 overflow-hidden rounded-[22px] bg-sky-soft shadow-lift ring-4 ring-white">
          <Pic photo={b} sizes="150px" />
        </div>
      )}
      <Star className="absolute -top-4 left-[38%] w-10 animate-twinkle" />
      <Flower className="absolute bottom-[10%] -left-4 w-11 animate-sway" color="#72C9F8" />
      <Heart className="absolute right-[44%] bottom-[2%] w-7 animate-float" />
    </div>
  );
}

function Visual({ mobile = false }: { mobile?: boolean }) {
  const t = useT();
  if (!aboutPhoto && sitePhotos.about.main) return <Collage mobile={mobile} />;
  if (aboutPhoto) {
    return (
      <div className={`relative mx-auto ${mobile ? "aspect-[4/3] w-full" : "aspect-[4/5] w-full max-w-[400px] max-h-[calc(100svh-var(--header-h)-120px)]"}`}>
        <div className="absolute -inset-3 arch bg-mint" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden arch bg-sky-soft ring-4 ring-white">
          <Image
            src={withBasePath(aboutPhoto.src)}
            alt={t.about.photoAlt}
            width={aboutPhoto.width}
            height={aboutPhoto.height}
            sizes={mobile ? "100vw" : "400px"}
            className="size-full object-cover"
          />
        </div>
        <Star className="absolute -top-4 -right-3 w-10 animate-twinkle" />
        <Flower className="absolute -bottom-3 -left-3 w-11 animate-sway" color="#72C9F8" />
      </div>
    );
  }
  return (
    <div className={`relative mx-auto flex flex-col items-center ${mobile ? "rounded-[32px] px-5 py-6" : "blob-c px-10 py-[clamp(32px,6vh,48px)]"} bg-gradient-to-br from-sky-soft via-white to-mint-soft`}>
      <Cloud className={`absolute ${mobile ? "-top-4 right-4 w-20" : "-top-6 right-6 w-28"} animate-drift`} />
      <Heart className={`absolute ${mobile ? "bottom-4 left-4 w-6" : "bottom-10 left-6 w-8"} animate-float`} />
      <Sparkle className="absolute top-8 left-8 w-5 animate-twinkle" color="#FFD966" />
      <LetterBlocks small={mobile} />
      <p className={`relative mt-5 max-w-[17rem] text-center font-extrabold text-ink ${mobile ? "text-[14px]" : "text-[15px]"}`}>{t.about.lettersCaption}</p>
    </div>
  );
}

export function About() {
  const t = useT();
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-cream">
      <Dots className="absolute top-10 right-[4%] hidden w-16 opacity-40 lg:block" color="#FFAD87" />
      <Flower className="absolute bottom-10 left-[2%] hidden w-10 animate-sway opacity-80 lg:block" color="#A9E5C1" />

      <div className="shell">
        {/* Desktop / tablet */}
        <div className="hidden items-center gap-12 md:grid md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <Visual />
          </div>
          <div>
            <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} align="left" />
            <p data-reveal className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-ink-soft">
              {t.about.text}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 lg:mt-[clamp(14px,3vh,28px)] lg:grid-cols-3">
              {t.about.facts.map((f, i) => {
                const s = FACT_STYLE[f.key];
                const Icon = s.icon;
                return (
                  <li key={f.key} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="card card-hover flex items-center gap-3 p-3.5 lg:rounded-[22px] lg:p-3">
                    <span className={`grid size-11 shrink-0 place-items-center ${s.shape} ${s.tone}`}>
                      <Icon className="size-[22px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold text-ink-soft">{f.title}</span>
                      <span className="block text-[16px] leading-snug font-black text-ink">{f.value}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} align="left" />
          <p data-reveal className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-soft">
            {t.about.text}
          </p>
          <div data-reveal className="mt-6">
            <Visual mobile />
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-2.5">
            {t.about.facts.map((f) => {
              const s = FACT_STYLE[f.key];
              const Icon = s.icon;
              return (
                <li key={f.key} data-reveal className="card flex flex-col gap-2 rounded-[22px] p-3">
                  <span className={`grid size-9 place-items-center ${s.shape} ${s.tone}`}>
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span className="text-[12px] font-bold text-ink-soft">{f.title}</span>
                  <span className="-mt-1.5 text-[14.5px] leading-snug font-black text-ink">{f.value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
