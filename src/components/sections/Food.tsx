"use client";

import { Info, MessageCircle } from "lucide-react";
import { Apple, Carrot, FruitPair, MilkCookie, Pear, Porridge, Soup, Strawberry, VeggiePlate } from "../decor/Illustrations";
import { Sparkle, Star, Wave } from "../decor/Shapes";
import { SectionHeading } from "../ui/SectionHeading";
import { useT } from "@/lib/i18n";
import { waHref } from "@/lib/site";

/** Пять приёмов пищи — у каждого свой цвет, форма и иллюстрация. */
const MEALS = [
  { Art: Porridge, bg: "bg-sun", soft: "bg-sun-soft", shape: "rounded-[50%_50%_44%_56%/56%_52%_48%_44%]", tilt: "md:-rotate-2" },
  { Art: FruitPair, bg: "bg-mint", soft: "bg-mint-soft", shape: "rounded-[40px_40px_40px_12px]", tilt: "md:rotate-2" },
  { Art: Soup, bg: "bg-peach", soft: "bg-peach-soft", shape: "rounded-full", tilt: "md:-rotate-1" },
  { Art: MilkCookie, bg: "bg-sky", soft: "bg-sky-soft", shape: "rounded-[40px_12px_40px_40px]", tilt: "md:rotate-1" },
  { Art: VeggiePlate, bg: "bg-lilac", soft: "bg-lilac-soft", shape: "rounded-[44%_56%_50%_50%/50%_44%_56%_50%]", tilt: "md:-rotate-2" },
] as const;

export function Food() {
  const t = useT();
  return (
    <section id="food" aria-labelledby="food-title" className="section bg-gradient-to-b from-peach-soft via-[#FFF4EC] to-cream">
      <Wave className="absolute inset-x-0 -top-px h-6 w-full md:h-10" color="#FFFFFF" flip />

      {/* Фрукты и овощи по краям */}
      <Apple className="absolute top-4 left-[3%] w-9 animate-float md:top-[14%] md:w-14" />
      <Carrot className="absolute right-[3%] bottom-[12%] hidden w-14 animate-sway md:block" />
      <Strawberry className="absolute top-[12%] right-[5%] hidden w-12 animate-float-slow md:block" />
      <Pear className="absolute bottom-[10%] left-[4%] hidden w-12 animate-float md:block" />
      <Sparkle className="absolute top-[30%] right-[14%] hidden w-5 animate-twinkle lg:block" color="#FFD966" />

      <div className="shell relative">
        <SectionHeading id="food-title" eyebrow={t.food.eyebrow} title={t.food.title} lead={t.food.lead} tone="peach" />

        {/* Desktop / tablet: «дорожка» из пяти приёмов пищи */}
        <div className="relative mt-10 hidden md:block lg:mt-[clamp(20px,4.5vh,48px)]">
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-x-[6%] top-[clamp(40px,8vh,62px)] hidden h-12 w-[88%] lg:block" aria-hidden="true">
            <path d="M0 30C100 0 150 60 250 30s150-30 250 0 150 30 250 0 150-30 250 0" fill="none" stroke="#FFAD87" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
          </svg>
          <ol className="relative flex flex-wrap justify-center gap-x-5 gap-y-8 lg:flex-nowrap lg:gap-6">
            {t.food.meals.map((name, i) => {
              const m = MEALS[i];
              const Art = m.Art;
              return (
                <li
                  key={name}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  className={`group w-[calc((100%-2.5rem)/3)] max-w-[210px] lg:w-auto lg:flex-1 ${i % 2 ? "lg:translate-y-3" : ""}`}
                >
                  <div className={`card card-hover flex flex-col items-center px-3 pt-4 pb-5 text-center lg:pb-4 ${m.tilt}`}>
                    <div className={`relative grid aspect-square w-[min(130px,72%)] lg:w-[clamp(84px,15vh,130px)] place-items-center ${m.shape} ${m.bg} transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}>
                      <Art className="w-[74%]" />
                      <span className="absolute -top-1 -right-1 grid size-9 place-items-center rounded-full bg-ink text-[15px] font-black text-white ring-4 ring-white">{i + 1}</span>
                    </div>
                    <h3 className="mt-4 lg:mt-3 text-[17px] leading-tight font-black text-ink lg:text-[18px]">{name}</h3>
                    <span className={`mt-3 h-1.5 w-10 rounded-full ${m.bg}`} aria-hidden="true" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: вертикальная лента с точками-соединителями */}
        <ol className="relative mt-7 space-y-3 md:hidden">
          <span className="absolute top-6 bottom-6 left-[38px] border-l-[3px] border-dotted border-peach" aria-hidden="true" />
          {t.food.meals.map((name, i) => {
            const m = MEALS[i];
            const Art = m.Art;
            return (
              <li key={name} data-reveal className={`relative flex items-center gap-3.5 rounded-[24px] bg-white p-2.5 pr-4 shadow-soft ${i % 2 ? "ml-3" : ""}`}>
                <span className={`grid size-[56px] shrink-0 place-items-center ${m.shape} ${m.bg}`}>
                  <Art className="w-[42px]" />
                </span>
                <h3 className="min-w-0 flex-1 text-[16px] leading-tight font-black text-ink">{name}</h3>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[14px] font-black text-ink ${m.soft}`}>{i + 1}</span>
              </li>
            );
          })}
        </ol>

        <div data-reveal className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-[28px] bg-white/80 p-4 text-center shadow-soft sm:flex-row sm:p-3 sm:pl-5 sm:text-left lg:mt-[clamp(20px,4.5vh,48px)]">
          <Star className="hidden w-7 shrink-0 animate-twinkle sm:block" />
          <p className="flex flex-1 items-start gap-2 text-[14px] font-semibold text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0 text-peach-deep sm:hidden" aria-hidden="true" />
            {t.food.note}
          </p>
          <a href={waHref(t.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-peach min-h-11 w-full shrink-0 px-5 text-[14.5px] sm:w-auto">
            <MessageCircle className="size-[18px]" aria-hidden="true" />
            {t.food.ask}
          </a>
        </div>
      </div>
    </section>
  );
}
