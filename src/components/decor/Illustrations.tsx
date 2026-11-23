/** Векторные иллюстрации разделов (используются, пока нет фотографий, и как украшения). */

type P = { className?: string; title?: string };

function svgProps(title?: string) {
  return title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const, focusable: "false" as const };
}

/** Сцена первого экрана: здание детского сада, радуга, солнце, холмы. */
export function KindergartenScene({ className, title }: P) {
  return (
    <svg viewBox="0 0 400 400" className={className} preserveAspectRatio="xMidYMid slice" {...svgProps(title)}>
      <defs>
        <linearGradient id="ks-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFE8FD" />
          <stop offset="1" stopColor="#E9F7FE" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#ks-sky)" />
      {/* радуга */}
      <g fill="none" strokeLinecap="round" strokeWidth="14" opacity=".9">
        <path d="M40 250a150 150 0 0 1 300 0" stroke="#FFAD87" />
        <path d="M60 250a130 130 0 0 1 260 0" stroke="#FFD966" />
        <path d="M80 250a110 110 0 0 1 220 0" stroke="#A9E5C1" />
        <path d="M100 250a90 90 0 0 1 180 0" stroke="#fff" opacity=".9" />
      </g>
      {/* солнце */}
      <g>
        <circle cx="318" cy="78" r="30" fill="#FFD966" />
        <g stroke="#FFD966" strokeWidth="6" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="318" y1="32" x2="318" y2="22" transform={`rotate(${i * 45} 318 78)`} />
          ))}
        </g>
        <circle cx="308" cy="74" r="3" fill="#253654" />
        <circle cx="328" cy="74" r="3" fill="#253654" />
        <path d="M307 86c6 5 16 5 22 0" fill="none" stroke="#253654" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* облака */}
      <path d="M52 112h70a18 18 0 0 0 0-36 26 26 0 0 0-48-6 18 18 0 0 0-22 42z" fill="#fff" />
      <path d="M232 150h50a13 13 0 0 0 0-26 19 19 0 0 0-35-4 13 13 0 0 0-15 30z" fill="#fff" opacity=".95" />
      {/* холмы */}
      <path d="M0 300c60-40 140-44 210-18s130 24 190-6v124H0z" fill="#A9E5C1" />
      <path d="M0 330c80-26 160-22 230 2s120 18 170 0v68H0z" fill="#8FDAAE" />
      {/* здание */}
      <g>
        <rect x="118" y="196" width="164" height="118" rx="14" fill="#FFAD87" />
        <rect x="118" y="196" width="164" height="16" rx="8" fill="#F59A72" />
        <path d="M104 204 200 140l96 64z" fill="#FFD966" stroke="#F5C84A" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="200" cy="180" r="15" fill="#fff" />
        <path d="M200 170.5l2.8 5.6 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9z" fill="#FFAD87" />
        {/* окна */}
        {[136, 238].map((x) => (
          <g key={x}>
            <rect x={x} y="222" width="28" height="28" rx="8" fill="#E5F5FE" stroke="#fff" strokeWidth="4" />
            <path d={`M${x + 14} 224v24M${x + 2} 236h24`} stroke="#fff" strokeWidth="3" />
          </g>
        ))}
        {/* дверь */}
        <path d="M180 314v-46a20 20 0 0 1 40 0v46z" fill="#72C9F8" />
        <circle cx="211" cy="292" r="3" fill="#fff" />
        {/* буквы на фасаде */}
        <g fontFamily="var(--font-nunito), sans-serif" fontWeight="900" fontSize="16" textAnchor="middle">
          <rect x="136" y="270" width="26" height="26" rx="7" fill="#FFD966" />
          <text x="149" y="289" fill="#253654">Ә</text>
          <rect x="238" y="270" width="26" height="26" rx="7" fill="#A9E5C1" />
          <text x="251" y="289" fill="#253654">Қ</text>
        </g>
      </g>
      {/* дерево */}
      <rect x="326" y="252" width="10" height="54" rx="5" fill="#C98A5E" />
      <circle cx="331" cy="240" r="30" fill="#7ED3A2" />
      <circle cx="318" cy="232" r="6" fill="#FFAD87" />
      <circle cx="342" cy="248" r="6" fill="#FFAD87" />
      {/* воздушный шарик */}
      <path d="M72 262c0 18-6 30-6 46" fill="none" stroke="#253654" strokeWidth="2" opacity=".5" />
      <ellipse cx="72" cy="240" rx="18" ry="22" fill="#72C9F8" />
      <ellipse cx="66" cy="232" rx="5" ry="7" fill="#fff" opacity=".6" />
      {/* цветы */}
      {[
        [40, 344, "#FFAD87"],
        [96, 356, "#FFD966"],
        [300, 350, "#fff"],
        [360, 340, "#FFAD87"],
      ].map(([x, y, c]) => (
        <g key={`${x}`}>
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx={x as number} cy={(y as number) - 6} rx="4" ry="6" fill={c as string} transform={`rotate(${r} ${x} ${y})`} />
          ))}
          <circle cx={x as number} cy={y as number} r="3.5" fill="#FFD966" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------ Питание */

export function Porridge({ className }: P) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <path d="M30 30c-4-6 4-10 0-16M48 28c-4-6 4-10 0-16M66 30c-4-6 4-10 0-16" fill="none" stroke="#FFAD87" strokeWidth="3.5" strokeLinecap="round" opacity=".7" />
      <ellipse cx="48" cy="50" rx="34" ry="9" fill="#FFF4CC" />
      <circle cx="38" cy="47" r="4" fill="#FF7B6B" />
      <circle cx="50" cy="45" r="3.5" fill="#5B8DEF" />
      <circle cx="59" cy="49" r="4" fill="#FF7B6B" />
      <path d="M14 50h68c0 20-15 33-34 33S14 70 14 50z" fill="#72C9F8" />
      <path d="M22 60c6 8 15 12 26 12s20-4 26-12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function FruitPair({ className }: P) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      {/* банан */}
      <path d="M58 22c14 10 20 30 10 48-6 10-18 16-30 14 14-6 22-18 22-32 0-12-4-22-8-28z" fill="#FFD966" />
      <path d="M57 19l5 4" stroke="#8A6A2B" strokeWidth="4" strokeLinecap="round" />
      {/* яблоко */}
      <path d="M38 40c-6-4-20-3-23 10-3 14 6 30 14 31 4 1 6-2 9-2s5 3 9 2c8-1 16-15 14-28-2-12-16-17-23-13z" fill="#FF7B6B" />
      <path d="M38 40c0-6 2-10 6-12" fill="none" stroke="#8A5A3B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M41 32c4-6 11-6 14-3-5 4-10 5-14 3z" fill="#7ED3A2" />
      <ellipse cx="26" cy="54" rx="4" ry="7" fill="#fff" opacity=".45" />
    </svg>
  );
}

export function Soup({ className }: P) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <path d="M36 26c-4-6 4-10 0-16M54 26c-4-6 4-10 0-16" fill="none" stroke="#72C9F8" strokeWidth="3.5" strokeLinecap="round" opacity=".7" />
      <path d="M70 46 86 18" stroke="#C98A5E" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="48" cy="46" rx="36" ry="9" fill="#FFC56B" />
      <rect x="30" y="41" width="9" height="6" rx="2" fill="#FF9F5A" />
      <circle cx="52" cy="44" r="3.5" fill="#7ED3A2" />
      <rect x="58" y="45" width="8" height="5" rx="2" fill="#FF9F5A" />
      <path d="M12 46h72c0 21-16 36-36 36S12 67 12 46z" fill="#FFAD87" />
      <path d="M24 58h48" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" />
    </svg>
  );
}

export function MilkCookie({ className }: P) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <path d="M22 20h30l-4 62a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6z" fill="#E5F5FE" stroke="#72C9F8" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 40h26l-2 40a5 5 0 0 1-5 5H31a5 5 0 0 1-5-5z" fill="#fff" />
      <circle cx="66" cy="64" r="20" fill="#E8B27A" />
      <circle cx="58" cy="58" r="3" fill="#7A4B2A" />
      <circle cx="70" cy="56" r="2.6" fill="#7A4B2A" />
      <circle cx="73" cy="69" r="3" fill="#7A4B2A" />
      <circle cx="61" cy="71" r="2.6" fill="#7A4B2A" />
    </svg>
  );
}

export function VeggiePlate({ className }: P) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="48" cy="56" rx="40" ry="28" fill="#fff" stroke="#A9E5C1" strokeWidth="5" />
      {/* брокколи */}
      <rect x="27" y="50" width="7" height="16" rx="3" fill="#7ED3A2" />
      <circle cx="25" cy="46" r="8" fill="#3FB079" />
      <circle cx="35" cy="44" r="8" fill="#4CC088" />
      <circle cx="30" cy="38" r="7" fill="#3FB079" />
      {/* морковь */}
      <path d="M50 70 66 40c3-5 10-2 8 3L56 72c-2 3-7 2-6-2z" fill="#FF9F5A" />
      <path d="M70 40c0-6 4-8 8-9-1 4-3 7-8 9zm0 0c-4-4-3-8-1-11 2 4 2 8 1 11z" fill="#4CC088" />
      {/* помидорка */}
      <circle cx="44" cy="62" r="7" fill="#FF7B6B" />
      <path d="M41 56l3 2 3-2" fill="none" stroke="#3FB079" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Apple({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M24 13c-4-3-15-3-17 8-2 11 5 22 11 23 3 0 4-1 6-1s3 1 6 1c6-1 13-12 11-22-2-10-13-12-17-9z" fill="#FF7B6B" />
      <path d="M24 13c0-4 1-7 4-9" fill="none" stroke="#8A5A3B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 8c3-4 8-4 10-2-4 3-7 4-10 2z" fill="#7ED3A2" />
    </svg>
  );
}

export function Carrot({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M8 44 30 16c3-4 10 0 7 5L13 46c-2 2-6 1-5-2z" fill="#FF9F5A" />
      <path d="M18 34l4 3M24 26l4 3" stroke="#E07B35" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 16c0-7 5-10 10-10-1 5-4 9-10 10zm0 0c-6-3-6-9-3-13 3 4 4 9 3 13z" fill="#4CC088" />
    </svg>
  );
}

export function Strawberry({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M24 44C12 36 6 26 9 18c3-6 12-6 15-3 3-3 12-3 15 3 3 8-3 18-15 26z" fill="#FF6F7D" />
      <path d="M14 14c4 0 7 2 10 4 3-2 6-4 10-4-2-4-6-6-10-4-4-2-8 0-10 4z" fill="#4CC088" />
      {[[17, 24], [24, 26], [31, 24], [20, 32], [28, 32], [24, 38]].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.2" ry="1.8" fill="#FFF4CC" />
      ))}
    </svg>
  );
}

export function Pear({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M24 10c-5 0-7 5-7 10 0 4-7 8-7 15 0 7 6 11 14 11s14-4 14-11c0-7-7-11-7-15 0-5-2-10-7-10z" fill="#B9E36B" />
      <path d="M24 10c0-3 1-5 3-7" fill="none" stroke="#8A5A3B" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="18" cy="34" rx="3" ry="5" fill="#fff" opacity=".4" />
    </svg>
  );
}

/* ------------------------------------------------------------ Кружки */

export function AbcArt({ className }: P) {
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true" focusable="false">
      {/* книга */}
      <path d="M20 128c22-8 44-8 66 0V64c-22-8-44-8-66 0z" fill="#fff" stroke="#72C9F8" strokeWidth="4" strokeLinejoin="round" />
      <path d="M86 128c22-8 44-8 66 0V64c-22-8-44-8-66 0z" fill="#fff" stroke="#72C9F8" strokeWidth="4" strokeLinejoin="round" />
      <path d="M32 82c12-4 30-4 42 0M32 96c12-4 30-4 42 0M98 82c12-4 30-4 42 0M98 96c12-4 30-4 42 0" stroke="#A9E5C1" strokeWidth="4" strokeLinecap="round" />
      {/* кубики */}
      <g fontFamily="var(--font-nunito), sans-serif" fontWeight="900" fontSize="30" textAnchor="middle">
        <g transform="rotate(-8 140 112)">
          <rect x="120" y="92" width="44" height="44" rx="10" fill="#FFAD87" />
          <text x="142" y="125" fill="#fff">A</text>
        </g>
        <g transform="rotate(6 186 120)">
          <rect x="166" y="98" width="44" height="44" rx="10" fill="#FFD966" />
          <text x="188" y="131" fill="#253654">B</text>
        </g>
        <g transform="rotate(-4 170 70)">
          <rect x="148" y="48" width="44" height="44" rx="10" fill="#72C9F8" />
          <text x="170" y="81" fill="#fff">C</text>
        </g>
      </g>
      {/* буквы в воздухе */}
      <g fontFamily="var(--font-nunito), sans-serif" fontWeight="900" fill="#253654" opacity=".22">
        <text x="30" y="40" fontSize="22">a</text>
        <text x="70" y="26" fontSize="18">b</text>
        <text x="110" y="40" fontSize="20">c</text>
      </g>
    </svg>
  );
}

export function DanceArt({ className }: P) {
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true" focusable="false">
      {/* ноты */}
      <g fill="#253654" opacity=".75">
        <path d="M34 34v40a10 8 0 1 1-4-6V40l26-6v34a10 8 0 1 1-4-6V24z" />
        <path d="M180 30v32a9 7 0 1 1-4-5V30z M180 30c8 4 12 8 12 16-4-5-8-7-12-7z" />
      </g>
      {/* ребёнок 1 */}
      <g>
        <circle cx="90" cy="54" r="13" fill="#FFD9C2" />
        <path d="M77 52c0-10 6-16 13-16s13 6 13 15c-5-6-14-8-26 1z" fill="#5A3E2B" />
        <path d="M90 67 74 46M90 72l18-20" stroke="#FFD9C2" strokeWidth="6" strokeLinecap="round" />
        <path d="M78 104 90 66l12 38z" fill="#FFAD87" />
        <path d="M84 104l-6 22M96 104l8 20" stroke="#FFD9C2" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* ребёнок 2 */}
      <g>
        <circle cx="140" cy="60" r="13" fill="#F2C3A1" />
        <path d="M127 58c0-9 6-15 13-15s13 6 13 14c-3-4-8-6-13-6s-9 3-13 7z" fill="#2E2B3B" />
        <path d="M140 74 122 86M140 74l20-16" stroke="#F2C3A1" strokeWidth="6" strokeLinecap="round" />
        <rect x="130" y="72" width="20" height="32" rx="8" fill="#72C9F8" />
        <path d="M134 104l-8 20M146 104l4 22" stroke="#F2C3A1" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* звёзды */}
      {[
        [50, 118, 1, "#FFD966"],
        [186, 104, 0.8, "#A9E5C1"],
        [118, 22, 0.7, "#FFAD87"],
      ].map(([x, y, s, c]) => (
        <path
          key={`${x}`}
          transform={`translate(${x} ${y}) scale(${s})`}
          d="M0-14l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z"
          fill={c as string}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------ Группы */

export function GroupBadge({ variant, className }: P & { variant: 0 | 1 | 2 }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false">
        <circle cx="60" cy="50" r="26" fill="#FFF4CC" />
        <circle cx="45" cy="56" r="4" fill="#FFAD87" opacity=".8" />
        <circle cx="75" cy="56" r="4" fill="#FFAD87" opacity=".8" />
        <g stroke="#fff" strokeWidth="6" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="60" y1="10" x2="60" y2="16" transform={`rotate(${i * 45} 60 50)`} />
          ))}
        </g>
        <circle cx="51" cy="47" r="3" fill="#253654" />
        <circle cx="69" cy="47" r="3" fill="#253654" />
        <path d="M50 57c6 6 14 6 20 0" fill="none" stroke="#253654" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false">
        <path d="M24 74h66a20 20 0 0 0 2-40 28 28 0 0 0-50-2 21 21 0 0 0-18 42z" fill="#fff" />
        <circle cx="50" cy="56" r="3" fill="#253654" />
        <circle cx="68" cy="56" r="3" fill="#253654" />
        <path d="M52 64c4 4 10 4 14 0" fill="none" stroke="#253654" strokeWidth="3" strokeLinecap="round" />
        <path d="M96 18l2.6 5.4 6 .9-4.3 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.3-4.2 6-.9z" fill="#FFD966" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeWidth="9">
        <path d="M18 80a42 42 0 0 1 84 0" stroke="#FFAD87" />
        <path d="M30 80a30 30 0 0 1 60 0" stroke="#FFD966" />
        <path d="M42 80a18 18 0 0 1 36 0" stroke="#72C9F8" />
      </g>
      <path d="M10 82h22a8 8 0 0 0 0-16 11 11 0 0 0-20 2 7 7 0 0 0-2 14z" fill="#fff" />
      <path d="M88 82h22a8 8 0 0 0 0-16 11 11 0 0 0-20 2 7 7 0 0 0-2 14z" fill="#fff" />
    </svg>
  );
}

/** Папка с документами — для пустого состояния. */
export function FolderArt({ className }: P) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <path d="M12 28a8 8 0 0 1 8-8h26l10 10h44a8 8 0 0 1 8 8v46a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8z" fill="#FFD966" />
      <rect x="28" y="12" width="50" height="62" rx="6" fill="#fff" stroke="#E5F5FE" strokeWidth="3" transform="rotate(-6 53 43)" />
      <path d="M36 30h28M36 40h34M36 50h22" stroke="#A9E5C1" strokeWidth="4" strokeLinecap="round" transform="rotate(-6 53 43)" />
      <path d="M8 46a8 8 0 0 1 8-8h88a8 8 0 0 1 8 8l-4 38a8 8 0 0 1-8 7H20a8 8 0 0 1-8-7z" fill="#FFC94A" />
      <path d="M50 64h20" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Фотоаппарат — для пустой галереи. */
export function CameraArt({ className }: P) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <rect x="14" y="28" width="92" height="62" rx="16" fill="#72C9F8" />
      <path d="M42 28l6-12h24l6 12z" fill="#5DB7EA" />
      <circle cx="60" cy="58" r="21" fill="#fff" />
      <circle cx="60" cy="58" r="13" fill="#253654" />
      <circle cx="55" cy="53" r="4" fill="#fff" opacity=".8" />
      <rect x="84" y="38" width="12" height="7" rx="3.5" fill="#FFD966" />
      <path d="M100 14l2 4.4 4.8.7-3.5 3.4.8 4.8-4.1-2.2-4.3 2.2.8-4.8-3.5-3.4 4.8-.7z" fill="#FFAD87" />
    </svg>
  );
}
