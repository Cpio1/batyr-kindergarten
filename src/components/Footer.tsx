"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { NAV } from "./Header";
import { Rainbow, Star, Wave } from "./decor/Shapes";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { Logo } from "./ui/Logo";
import { useT } from "@/lib/i18n";
import { onAnchorClick } from "@/lib/scroll";
import { site, telHref, twoGisHref, waHref } from "@/lib/site";

export function Footer() {
  const t = useT();
  return (
    <footer className="relative isolate overflow-clip bg-ink text-white/85">
      <Wave className="absolute inset-x-0 -top-px h-6 w-full md:h-10" color="#FFF9ED" flip />
      <Rainbow className="absolute top-20 right-[4%] hidden w-24 opacity-25 lg:block" />
      <Star className="absolute top-16 left-[46%] hidden w-6 animate-twinkle opacity-70 md:block" />

      <div className="shell relative pt-14 pb-[calc(96px+env(safe-area-inset-bottom))] md:pt-20 md:pb-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <div>
            <div className="w-fit rounded-2xl bg-white px-3 py-2">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/75">{t.footer.tagline}</p>
            <div className="mt-4 flex gap-2">
              <a href={waHref(t.waMessage)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${t.newTab}`} className="grid size-11 place-items-center rounded-2xl bg-white/10 transition hover:bg-wa">
                <WhatsAppIcon className="size-5" />
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagram.handle} ${t.newTab}`} className="grid size-11 place-items-center rounded-2xl bg-white/10 transition hover:bg-[#DD2A7B]">
                <InstagramIcon className="size-5" />
              </a>
              <a href={telHref} aria-label={site.phone.display} className="grid size-11 place-items-center rounded-2xl bg-white/10 transition hover:bg-sky hover:text-ink">
                <Phone className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.nav}>
            <h2 className="text-[13px] font-extrabold tracking-wide text-sun">{t.footer.nav}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-1">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={(e) => onAnchorClick(e, n.id)} className="inline-block py-1 text-[15px] font-bold transition-colors hover:text-sun">
                    {t.nav[n.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-extrabold tracking-wide text-sun">{t.footer.contacts}</h2>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              <li>
                <a href={twoGisHref()} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 font-bold hover:text-sun">
                  <MapPin className="mt-0.5 size-[18px] shrink-0 text-peach" aria-hidden="true" />
                  {t.contacts.address}
                </a>
              </li>
              <li>
                <a href={telHref} className="flex gap-2.5 font-bold hover:text-sun">
                  <Phone className="mt-0.5 size-[18px] shrink-0 text-sky" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-2.5 font-bold">
                <Clock className="mt-0.5 size-[18px] shrink-0 text-mint" aria-hidden="true" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-white/10 pt-5 text-[13px] text-white/60 sm:flex-row sm:justify-between md:pr-24">
          <span>
            © {new Date().getFullYear()} {t.footer.legal}
          </span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
