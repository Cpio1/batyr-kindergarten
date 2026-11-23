/** Заголовок раздела: «бейдж» + заголовок + вводный текст. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "sky",
  className = "",
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "sky" | "sun" | "peach" | "mint" | "lilac";
  className?: string;
  id?: string;
}) {
  const tones = {
    sky: "bg-sky-soft text-sky-deep",
    sun: "bg-sun-soft text-sun-deep",
    peach: "bg-peach-soft text-peach-deep",
    mint: "bg-mint-soft text-mint-deep",
    lilac: "bg-lilac-soft text-lilac-deep",
  } as const;
  const center = align === "center";
  return (
    <div data-reveal className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-extrabold ${tones[tone]}`}>
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
          <path d="M8 .5c.6 4 3.5 6.9 7.5 7.5-4 .6-6.9 3.5-7.5 7.5C7.4 11.5 4.5 8.6.5 8 4.5 7.4 7.4 4.5 8 .5z" fill="currentColor" />
        </svg>
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 lg:mt-2.5 text-balance font-display text-[28px] leading-[1.15] font-black tracking-tight text-ink sm:text-[34px] lg:text-[clamp(28px,min(2.6vw,5.2vh),40px)]">
        {title}
      </h2>
      {lead && <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-ink-soft sm:text-base lg:mt-2 lg:text-[clamp(15px,2.3vh,17px)]">{lead}</p>}
    </div>
  );
}
