/** Плавная прокрутка к разделу с учётом высоты закреплённой шапки. */
export function scrollToSection(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    window.history.replaceState(window.history.state, "", window.location.pathname);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
  const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - header));
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  window.history.replaceState(window.history.state, "", `#${id}`);
}

/** Обработчик клика по ссылке-якорю: сохраняет открытие в новой вкладке (Ctrl/⌘ + клик). */
export function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string, before?: () => void) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  before?.();
  // Ждём кадр, чтобы закрытое меню успело снять блокировку прокрутки
  if (before) requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  else scrollToSection(id);
}
