/** Декоративные фигуры (облака, звёзды, цветы, радуги, волны). Все — aria-hidden. */

type P = { className?: string; style?: React.CSSProperties; color?: string };

export function Cloud({ className, style, color = "#fff" }: P) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M28 60h68a22 22 0 0 0 2-43.9A30 30 0 0 0 45 14 20 20 0 0 0 28 60z"
        fill={color}
        filter="drop-shadow(0 6px 10px rgb(37 54 84 / 0.06))"
      />
    </svg>
  );
}

export function CloudPuffy({ className, style, color = "#fff" }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M22 76c-11 0-18-7-18-16s8-16 18-15c1-14 13-24 27-21 6-14 22-22 38-17 11 3 19 12 21 23 3-1 6-2 10-2 14 0 25 11 25 25s-9 23-21 23z"
        fill={color}
      />
    </svg>
  );
}

export function Star({ className, style, color = "#FFD966" }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M20 3.5c1 0 1.7.6 2.1 1.4l3.6 7.4 8.1 1.2c1.9.3 2.6 2.6 1.3 3.9l-5.9 5.7 1.4 8.1c.3 1.9-1.7 3.3-3.4 2.4L20 29.8l-7.2 3.8c-1.7.9-3.7-.5-3.4-2.4l1.4-8.1-5.9-5.7c-1.3-1.3-.6-3.6 1.3-3.9l8.1-1.2 3.6-7.4c.4-.8 1.1-1.4 2.1-1.4z"
        fill={color}
      />
    </svg>
  );
}

export function Sparkle({ className, style, color = "#72C9F8" }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M16 1c1.2 8.2 6.8 13.8 15 15-8.2 1.2-13.8 6.8-15 15C14.8 22.8 9.2 17.2 1 16 9.2 14.8 14.8 9.2 16 1z" fill={color} />
    </svg>
  );
}

export function Flower({ className, style, color = "#FFAD87", center = "#FFD966" }: P & { center?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="10.5" rx="6.5" ry="8.5" fill={color} transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6" fill={center} />
    </svg>
  );
}

export function Rainbow({ className, style }: P) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M8 60a52 52 0 0 1 104 0" fill="none" stroke="#FFAD87" strokeWidth="9" strokeLinecap="round" />
      <path d="M21 60a39 39 0 0 1 78 0" fill="none" stroke="#FFD966" strokeWidth="9" strokeLinecap="round" />
      <path d="M34 60a26 26 0 0 1 52 0" fill="none" stroke="#A9E5C1" strokeWidth="9" strokeLinecap="round" />
      <path d="M47 60a13 13 0 0 1 26 0" fill="none" stroke="#72C9F8" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

export function Sun({ className, style }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true" focusable="false">
      <g stroke="#FFD966" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1="40" y1="6" x2="40" y2="14" transform={`rotate(${i * 36} 40 40)`} />
        ))}
      </g>
      <circle cx="40" cy="40" r="19" fill="#FFD966" />
      <circle cx="33.5" cy="38" r="2.2" fill="#253654" />
      <circle cx="46.5" cy="38" r="2.2" fill="#253654" />
      <path d="M33 45.5c3.8 3.6 10.2 3.6 14 0" fill="none" stroke="#253654" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="29" cy="44" r="2.6" fill="#FFAD87" opacity=".8" />
      <circle cx="51" cy="44" r="2.6" fill="#FFAD87" opacity=".8" />
    </svg>
  );
}

export function Squiggle({ className, style, color = "#72C9F8" }: P) {
  return (
    <svg viewBox="0 0 120 20" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M3 10c9-9 18-9 27 0s18 9 27 0 18-9 27 0 18 9 27 0" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Волна-разделитель между разделами. `flip` — волна снизу вверх. */
export function Wave({ className, color = "#fff", flip = false }: P & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d="M0 32c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v28H0z" fill={color} />
    </svg>
  );
}

export function Dots({ className, color = "#72C9F8" }: P) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" focusable="false">
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={7.5 + (i % 4) * 15} cy={7.5 + Math.floor(i / 4) * 15} r="3" fill={color} />
      ))}
    </svg>
  );
}

export function Heart({ className, style, color = "#FFAD87" }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M16 28S3 20.5 3 11.5A6.5 6.5 0 0 1 16 8a6.5 6.5 0 0 1 13 3.5C29 20.5 16 28 16 28z" fill={color} />
    </svg>
  );
}
