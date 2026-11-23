"use client";

import Image from "next/image";
import { BookOpen, Music2 } from "lucide-react";
import { CloudPuffy, Rainbow, Sparkle, Star } from "../decor/Shapes";
import { SectionHeading } from "../ui/SectionHeading";
import { useT } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import { stock } from "@/lib/stock";

const STYLE = {
  english: {
    Icon: BookOpen,
    img: stock.clubs.english,
    imgShape: "rounded-[28px_28px_28px_90px]",
    mobileShape: "rounded-[28px_28px_28px_72px]",
    focus: "object-center",
    panel: "bg-gradient-to-br from-sky-soft to-[#D3EEFD]",
    shape: "rounded-[32px_32px_32px_96px]",
    tag: "bg-sky-soft text-sky-deep",
    icon: "bg-sky text-ink",
  },
  dance: {
    Icon: Music2,
    img: stock.clubs.dance,
    imgShape: "rounded-[28px_90px_28px_28px]",
    mobileShape: "rounded-[28px_28px_72px_28px]",
    focus: "object-[62%_35%]",
    panel: "bg-gradient-to-br from-peach-soft to-[#FFE0D1]",
    shape: "rounded-[32px_32px_96px_32px]",
    tag: "bg-peach-soft text-peach-deep",
    icon: "bg-peach text-ink",
  },
} as const;

export function Clubs() {
  const t = useT();
  return (
    <section id="clubs" aria-labelledby="clubs-title" className="section bg-cream">
      <Rainbow className="absolute top-12 left-[4%] hidden w-24 animate-float opacity-90 lg:block" />
      <CloudPuffy className="absolute -right-10 bottom-16 hidden w-44 animate-drift opacity-80 md:block" color="#E5F5FE" />
      <Sparkle className="absolute top-24 right-[10%] w-5 animate-twinkle" color="#A9E5C1" />

      <div className="shell relative">
        <SectionHeading id="clubs-title" eyebrow={t.clubs.eyebrow} title={t.clubs.title} lead={t.clubs.lead} tone="mint" />

        <ul className="mt-7 grid gap-4 md:grid-cols-2 md:gap-6 lg:mt-[clamp(20px,4.5vh,40px)] lg:gap-7">
          {t.clubs.items.map((c, i) => {
            const s = STYLE[c.key as keyof typeof STYLE];
            const { Icon, img } = s;
            return (
              <li key={c.key} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }} className={`group card card-hover overflow-hidden ${s.shape}`}>
                {/* Desktop / tablet */}
                <div className="hidden md:block lg:flex lg:items-stretch">
                  <div className={`relative h-[240px] p-4 lg:h-auto lg:min-h-[clamp(210px,34vh,290px)] lg:w-[46%] lg:shrink-0 lg:p-3.5 ${s.panel}`}>
                    <div className={`relative size-full overflow-hidden shadow-soft ring-4 ring-white ${s.imgShape}`}>
                      <Image
                        src={withBasePath(img.src)}
                        alt={c.photoAlt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 260px, 50vw"
                        className={`absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105 ${s.focus}`}
                      />
                    </div>
                    <Star className="absolute top-2 right-3 w-8 animate-twinkle drop-shadow" />
                    <Sparkle className="absolute bottom-3 left-3 w-5 animate-twinkle [animation-delay:-1.5s]" color="#fff" />
                  </div>
                  <div className="p-6 lg:flex lg:flex-col lg:justify-center lg:p-6">
                    <div className="flex items-center gap-3">
                      <span className={`grid size-11 place-items-center rounded-2xl ${s.icon}`}>
                        <Icon className="size-[22px]" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-[24px] leading-tight font-black text-ink">{c.title}</h3>
                    </div>
                    <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-ink-soft">{c.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((tag) => (
                        <li key={tag} className={`rounded-full px-3 py-1 text-[13px] font-extrabold ${s.tag}`}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                  <div className={`relative h-[178px] p-2.5 ${s.panel}`}>
                    <Image
                      src={withBasePath(img.src)}
                      alt={c.photoAlt}
                      width={img.width}
                      height={img.height}
                      sizes="100vw"
                      className={`size-full object-cover ring-[3px] ring-white ${s.mobileShape} ${s.focus}`}
                    />
                    <Star className="absolute top-1 right-2 w-6 animate-twinkle drop-shadow" />
                  </div>
                  <div className="p-4">
                    <h3 className="flex items-center gap-2.5 font-display text-[20px] font-black text-ink">
                      <span className={`grid size-9 place-items-center rounded-xl ${s.icon}`}>
                        <Icon className="size-[18px]" aria-hidden="true" />
                      </span>
                      {c.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-ink-soft">{c.text}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {c.tags.map((tag) => (
                        <li key={tag} className={`rounded-full px-2.5 py-1 text-[12px] font-extrabold ${s.tag}`}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
