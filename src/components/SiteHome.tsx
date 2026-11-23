"use client";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { RevealObserver } from "./RevealObserver";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { About } from "./sections/About";
import { Clubs } from "./sections/Clubs";
import { Contacts } from "./sections/Contacts";
import { Documents } from "./sections/Documents";
import { Food } from "./sections/Food";
import { Gallery } from "./sections/Gallery";
import { Groups } from "./sections/Groups";
import { Hero } from "./sections/Hero";
import { LangProvider, type Lang } from "@/lib/i18n";

/** Вся страница. Порядок разделов совпадает с меню. */
export function SiteHome({ lang }: { lang: Lang }) {
  return (
    <LangProvider initial={lang}>
      <Header />
      <main>
        <Hero />
        <About />
        <Groups />
        <Food />
        <Clubs />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </LangProvider>
  );
}
