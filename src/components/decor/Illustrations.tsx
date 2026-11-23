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
