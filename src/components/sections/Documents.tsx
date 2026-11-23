"use client";

import { Download, ExternalLink as ExternalIcon, Eye, FileImage, FileSpreadsheet, FileText, FolderOpen } from "lucide-react";
import { FolderArt } from "../decor/Illustrations";
import { Dots, Sparkle, Star } from "../decor/Shapes";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";
import { documents, type DocKind } from "@/lib/documents";
import { useLang, useT } from "@/lib/i18n";
import { waHref, withBasePath } from "@/lib/site";

const KIND: Record<DocKind, { icon: typeof FileText; tone: string }> = {
  pdf: { icon: FileText, tone: "bg-peach-soft text-peach-deep" },
  doc: { icon: FileText, tone: "bg-sky-soft text-sky-deep" },
  sheet: { icon: FileSpreadsheet, tone: "bg-mint-soft text-mint-deep" },
  image: { icon: FileImage, tone: "bg-lilac-soft text-lilac-deep" },
  drive: { icon: FolderOpen, tone: "bg-sun-soft text-sun-deep" },
};

function formatSize(bytes: number) {
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.max(1, Math.round(kb))} КБ` : `${(kb / 1024).toFixed(1).replace(".", ",")} МБ`;
}

export function Documents() {
  const t = useT();
  const [lang] = useLang();

  return (
    <section id="documents" aria-labelledby="documents-title" className="section bg-gradient-to-b from-sky-soft/70 to-cream">
      <Dots className="absolute top-12 left-[3%] hidden w-14 opacity-40 md:block" color="#72C9F8" />
      <Star className="absolute right-[6%] bottom-14 w-7 animate-twinkle" />

      <div className="shell relative">
        <SectionHeading id="documents-title" eyebrow={t.documents.eyebrow} title={t.documents.title} lead={t.documents.lead} tone="sky" />

        {documents.length === 0 ? (
          <div data-reveal className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-5 rounded-[32px] border-2 border-dashed border-sky/60 bg-white/80 p-6 text-center md:flex-row md:gap-8 md:p-8 md:text-left">
            <div className="relative shrink-0">
              <FolderArt className="w-28 animate-float md:w-36" />
              <Sparkle className="absolute -top-2 -right-2 w-5 animate-twinkle" color="#FFAD87" />
            </div>
            <div>
              <h3 className="font-display text-[20px] font-black text-ink md:text-[23px]">{t.documents.emptyTitle}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t.documents.emptyText}</p>
              <a href={waHref(t.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-4 min-h-11 px-5 text-[14.5px]" aria-label={`${t.documents.ask} ${t.newTab}`}>
                <WhatsAppIcon className="size-[18px]" />
                {t.documents.ask}
              </a>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {documents.map((d, i) => {
              const k = KIND[d.kind];
              const Icon = k.icon;
              const href = d.local ? withBasePath(d.href) : d.href;
              const title = d.title[lang];
              return (
                <li key={d.href} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }} className="card card-hover flex flex-col rounded-[24px] p-4 lg:p-5">
                  <div className="flex items-start gap-3">
                    <span className={`grid size-12 shrink-0 place-items-center rounded-[16px_16px_16px_4px] ${k.tone}`}>
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[16px] leading-snug font-black break-words text-ink">{title}</h3>
                      <p className="mt-0.5 text-[13px] font-bold text-ink-soft">
                        {t.documents.kinds[d.kind]}
                        {d.size ? ` · ${formatSize(d.size)}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-light min-h-10 flex-1 px-3 text-[14px]" aria-label={`${d.kind === "drive" ? t.documents.openDrive : t.documents.view}: ${title} ${t.newTab}`}>
                      {d.kind === "drive" ? <ExternalIcon className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                      {d.kind === "drive" ? t.documents.openDrive : t.documents.view}
                    </a>
                    {d.local && (
                      <a href={href} download className="btn btn-sky min-h-10 flex-1 px-3 text-[14px]" aria-label={`${t.documents.download}: ${title}`}>
                        <Download className="size-4" aria-hidden="true" />
                        {t.documents.download}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
