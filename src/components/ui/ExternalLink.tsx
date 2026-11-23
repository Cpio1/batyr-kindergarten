"use client";

import { useT } from "@/lib/i18n";

/** Внешняя ссылка: новая вкладка, безопасный rel и подсказка для экранных дикторов. */
export function ExternalLink({
  href,
  children,
  className,
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const t = useT();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label ? `${label} ${t.newTab}` : undefined}>
      {children}
    </a>
  );
}
