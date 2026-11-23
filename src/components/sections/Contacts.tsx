"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Cloud, Flower, Heart, Star } from "../decor/Shapes";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";
import { useT } from "@/lib/i18n";
import { googleMapsHref, site, telHref, twoGisEmbed, twoGisHref, waHref } from "@/lib/site";

/** Карта: встроенная 2GIS (если координаты подтверждены) или схематичная карточка со ссылкой на 2GIS. */
function MapCard({ className = "" }: { className?: string }) {
  const t = useT();
  const embed = twoGisEmbed();
  if (embed) {
    return (
      <div className={`relative overflow-hidden rounded-[32px] bg-sky-soft shadow-soft ring-4 ring-white ${className}`}>
        <iframe src={embed} title={t.contacts.mapTitle} loading="lazy" className="absolute inset-0 size-full border-0" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    );
  }
  return (
    <a
      href={twoGisHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.contacts.open2gis}: ${t.contacts.address} ${t.newTab}`}
      className={`group relative block overflow-hidden rounded-[32px] bg-[#EAF6EE] shadow-soft ring-4 ring-white ${className}`}
    >
      {/* Схематичная карта (без координат — только для наглядности) */}
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
        <rect width="400" height="300" fill="#EAF6EE" />
        <path d="M0 40 C70 30 110 70 160 60 S260 20 400 50 V0 H0z" fill="#DDF0FB" />
        <path d="M300 300 C310 240 360 220 400 200 V300z" fill="#CDEBD8" />
        <path d="M-10 70 C60 60 120 100 170 92 S280 50 410 80" fill="none" stroke="#B9E2F8" strokeWidth="10" strokeLinecap="round" />
        <g stroke="#fff" strokeLinecap="round">
          <path d="M-10 190 L410 150" strokeWidth="22" />
          <path d="M150 -10 L190 310" strokeWidth="18" />
          <path d="M-10 255 L410 232" strokeWidth="12" />
          <path d="M300 -10 L320 310" strokeWidth="12" />
          <path d="M60 -10 L80 310" strokeWidth="9" />
        </g>
        {[
          [92, 108, 44, 30, "#FFE6D9"],
          [210, 104, 72, 34, "#FFF1C2"],
          [92, 200, 48, 40, "#E2F3FD"],
          [212, 194, 76, 30, "#FFE6D9"],
          [330, 100, 54, 40, "#E2F3FD"],
          [330, 180, 50, 36, "#FFF1C2"],
        ].map(([x, y, w, h, c]) => (
          <rect key={`${x}-${y}`} x={x as number} y={y as number} width={w as number} height={h as number} rx="8" fill={c as string} />
        ))}
        <circle cx="110" cy="268" r="14" fill="#A9E5C1" />
        <circle cx="128" cy="276" r="10" fill="#8FDAAE" />
        <circle cx="370" cy="270" r="12" fill="#8FDAAE" />
      </svg>
      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11.5px] font-extrabold text-ink-soft">{t.contacts.mapScheme}</span>

      {/* Метка с адресом */}
      <span className="absolute top-[38%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="rounded-2xl bg-white px-3.5 py-2 text-center text-[13px] leading-tight font-black whitespace-nowrap text-ink shadow-lift">
          «Батыр ел»
          <span className="block text-[11.5px] font-bold text-ink-soft">Верненская, 73</span>
        </span>
        <span className="mt-1.5 grid size-12 animate-float place-items-center rounded-full bg-peach text-white shadow-[0_10px_20px_-8px_rgb(173_74_31/0.7)] ring-4 ring-white">
          <MapPin className="size-6" aria-hidden="true" />
        </span>
      </span>

      <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-2 pl-4 shadow-soft">
        <span className="min-w-0 text-[13px] leading-snug font-bold text-ink-soft">{t.contacts.mapHint}</span>
        <span className="btn min-h-10 shrink-0 bg-[#2FB34A] px-4 text-[14px] text-white group-hover:bg-[#28a041]">
          <Navigation className="size-4" aria-hidden="true" />
          2GIS
        </span>
      </span>
    </a>
  );
}

export function Contacts() {
  const t = useT();
  const c = t.contacts;
  const rows = [
    { icon: MapPin, label: c.addressLabel, value: c.address, tone: "bg-peach-soft text-peach-deep", href: twoGisHref(), external: true },
    { icon: Phone, label: c.phoneLabel, value: site.phone.display, tone: "bg-sky-soft text-sky-deep", href: telHref, external: false },
    { icon: InstagramIcon, label: c.instagramLabel, value: site.instagram.handle, tone: "bg-lilac-soft text-lilac-deep", href: site.instagram.url, external: true },
    { icon: Clock, label: c.hoursLabel, value: site.hours, tone: "bg-mint-soft text-mint-deep", href: null, external: false },
  ];

  const buttons = (
    <>
      <a href={waHref(t.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa col-span-2 min-h-[52px] text-[15.5px] sm:col-span-1 lg:px-3" aria-label={`${c.wa} ${t.newTab}`}>
        <WhatsAppIcon className="size-5" />
        {c.wa}
      </a>
      <a href={telHref} className="btn btn-sky min-h-[52px] text-[15.5px] lg:px-3">
        <Phone className="size-5" aria-hidden="true" />
        {c.call}
      </a>
      <a
        href={site.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn min-h-[52px] lg:px-3 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-[15.5px] text-white shadow-[0_10px_22px_-12px_rgb(221_42_123/0.7)]"
        aria-label={`Instagram ${site.instagram.handle} ${t.newTab}`}
      >
        <InstagramIcon className="size-5" />
        {c.instagram}
      </a>
    </>
  );

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section bg-cream">
      <Cloud className="absolute top-10 -left-6 hidden w-32 animate-drift md:block" color="#E5F5FE" />
      <Heart className="absolute top-16 right-[5%] w-7 animate-float md:w-8" />
      <Flower className="absolute bottom-8 left-[3%] hidden w-10 animate-sway lg:block" color="#72C9F8" />

      <div className="shell relative">
        <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="peach" />

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-[clamp(20px,4.5vh,40px)] lg:grid-cols-[1.25fr_1fr] lg:gap-7">
          <div data-reveal className="card relative flex flex-col rounded-[32px] p-4 sm:p-6 lg:p-7">
            <Star className="absolute -top-3 -right-2 w-9 animate-twinkle" />
            <h3 className="font-display text-[20px] font-black text-ink sm:text-[22px]">{c.name}</h3>
            <ul className="mt-4 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-2 lg:space-y-0">
              {rows.map((r) => {
                const Icon = r.icon;
                const inner = (
                  <>
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${r.tone}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] font-bold text-ink-soft">{r.label}</span>
                      <span className="block text-[15.5px] leading-snug font-black break-words text-ink">{r.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={r.label}>
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-3 rounded-2xl p-1.5 transition-colors hover:bg-cream"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-1.5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-1 lg:mt-auto lg:flex lg:flex-wrap lg:pt-5 [&>a]:lg:flex-auto [&>a]:lg:whitespace-nowrap">{buttons}</div>
          </div>

          <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="flex flex-col gap-3">
            <MapCard className="aspect-[4/3] w-full md:aspect-auto md:min-h-[300px] md:flex-1 lg:min-h-[240px]" />
            <div className="grid grid-cols-2 gap-2.5">
              <a href={twoGisHref()} target="_blank" rel="noopener noreferrer" className="btn btn-light min-h-11 px-3 text-[14px]" aria-label={`${c.open2gis} ${t.newTab}`}>
                <Navigation className="size-4 text-[#2FB34A]" aria-hidden="true" />
                {c.open2gis}
              </a>
              <a href={googleMapsHref()} target="_blank" rel="noopener noreferrer" className="btn btn-light min-h-11 px-3 text-[14px]" aria-label={`${c.openGoogle} ${t.newTab}`}>
                <MapPin className="size-4 text-peach-deep" aria-hidden="true" />
                {c.openGoogle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
