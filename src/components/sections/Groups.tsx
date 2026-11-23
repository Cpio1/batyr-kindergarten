"use client";

import Image from "next/image";
import { Check, Info } from "lucide-react";
import { Cloud, Sparkle, Squiggle, Star, Wave } from "../decor/Shapes";
import { SectionHeading } from "../ui/SectionHeading";
import { useT } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import { stock } from "@/lib/stock";

/** Оформление карточек: у каждой свой цвет, форма шапки и фото для примера (src/lib/stock.ts). */
const CARDS = [
  { top: "bg-sun", soft: "bg-sun-soft", check: "text-sun-deep", shape: "rounded-[28px_28px_50%_50%/28px_28px_22px_22px]", num: "bg-white text-sun-deep" },
  { top: "bg-sky", soft: "bg-sky-soft", check: "text-sky-deep", shape: "rounded-[28px_28px_28px_80px]", num: "bg-white text-sky-deep" },
  { top: "bg-mint", soft: "bg-mint-soft", check: "text-mint-deep", shape: "rounded-[28px_28px_80px_28px]", num: "bg-white text-mint-deep" },
] as const;

export function Groups() {
  const t = useT();
  return (
    <section id="groups" aria-labelledby="groups-title" className="section bg-white">
      <Wave className="absolute inset-x-0 -top-px h-6 w-full md:h-10" color="#FFF9ED" flip />
      <Cloud className="absolute top-16 -left-8 hidden w-32 animate-drift opacity-80 md:block" color="#E5F5FE" />
      <Star className="absolute top-20 right-[6%] w-7 animate-twinkle md:w-9" />
      <Squiggle className="absolute bottom-12 left-[5%] hidden w-28 opacity-60 lg:block" color="#FFAD87" />

      <div className="shell relative">
        <SectionHeading id="groups-title" eyebrow={t.groups.eyebrow} title={t.groups.title} lead={t.groups.lead} tone="sun" />

        <ul data-reveal className="mt-5 flex flex-wrap justify-center gap-2 lg:hidden" aria-label={t.groups.title}>
          {t.groups.chips.map((c, i) => (
            <li key={c} className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold text-ink ${CARDS[i].soft}`}>
              {c}
            </li>
          ))}
        </ul>

        {/* Desktop / tablet: 3 в ряд */}
        <ul className="mt-8 hidden gap-5 md:grid md:grid-cols-3 lg:mt-[clamp(20px,4vh,40px)] lg:gap-7">
          {t.groups.items.map((g, i) => {
            const c = CARDS[i];
            return (
              <li key={g.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }} className="group card card-hover overflow-hidden">
                <div className={`relative h-[clamp(150px,22vw,190px)] p-2 lg:h-[clamp(110px,18vh,190px)] ${c.top} ${c.shape}`}>
                  <div className={`relative size-full overflow-hidden ${c.shape}`}>
                    <Image
                      src={withBasePath(stock.groups[i].src)}
                      alt={t.groups.photoAlts[i]}
                      width={stock.groups[i].width}
                      height={stock.groups[i].height}
                      sizes="(min-width: 1024px) 380px, 33vw"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <Sparkle className="absolute top-4 left-5 w-5 animate-twinkle drop-shadow" color="#fff" />
                  <span className={`absolute -bottom-5 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full text-xl font-black shadow-soft ${c.num}`}>
                    {i + 1}
                  </span>
                </div>
                <div className="px-5 pt-8 pb-6 text-center lg:px-6 lg:pt-7 lg:pb-5">
                  <h3 className="font-display text-[24px] font-black text-ink">{g.name}</h3>
                  <ul className="mt-4 space-y-2 text-left lg:mt-3 lg:space-y-1.5">
                    {t.groups.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 rounded-2xl px-3 py-2 text-[14.5px] font-bold text-ink lg:py-1 ${c.soft}`}>
                        <Check className={`size-[18px] shrink-0 ${c.check}`} strokeWidth={3} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Mobile: компактные горизонтальные карточки одна под другой */}
        <ul className="mt-6 grid gap-3 md:hidden">
          {t.groups.items.map((g, i) => {
            const c = CARDS[i];
            return (
              <li key={g.name} data-reveal className="card flex items-stretch overflow-hidden rounded-[26px]">
                <div className={`relative w-[108px] shrink-0 p-1.5 ${c.top}`}>
                  <Image
                    src={withBasePath(stock.groups[i].src)}
                    alt={t.groups.photoAlts[i]}
                    width={stock.groups[i].width}
                    height={stock.groups[i].height}
                    sizes="108px"
                    className="size-full rounded-[20px_20px_20px_6px] object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 p-3.5">
                  <h3 className="font-display text-[19px] font-black text-ink">{g.name}</h3>
                  <ul className="mt-1.5 space-y-1">
                    {t.groups.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[13.5px] leading-snug font-bold text-ink-soft">
                        <Check className={`mt-0.5 size-4 shrink-0 ${c.check}`} strokeWidth={3} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mx-auto mt-6 flex max-w-xl items-start justify-center gap-2 text-center text-[13.5px] font-semibold text-ink-soft lg:mt-5 lg:text-sm">
          <Info className="mt-0.5 size-4 shrink-0 text-sky-deep" aria-hidden="true" />
          {t.groups.note}
        </p>
      </div>
    </section>
  );
}
