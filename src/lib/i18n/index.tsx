"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BASE_PATH } from "../site";
import { langPath, type Lang } from "./config";
import { kk } from "./kk";
import { ru, type Dict } from "./ru";

export type { Dict, Lang };

/** Централизованные переводы: src/lib/i18n/kk.ts и src/lib/i18n/ru.ts */
export const dictionaries: Record<Lang, Dict> = { kk, ru };

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "kk", setLang: () => {} });

/** Меняет адрес страницы (/ ↔ /ru/) без перезагрузки, сохраняя якорь раздела. */
function syncUrl(lang: Lang) {
  const target = `${BASE_PATH}${langPath(lang)}`;
  if (window.location.pathname === target) return;
  window.history.replaceState(window.history.state, "", `${target}${window.location.hash}`);
}

/**
 * Статический сайт: казахская версия собирается в «/», русская — в «/ru/».
 * Язык меняется ТОЛЬКО по нажатию KZ / RU: адрес страницы обновляется (/ ↔ /ru/),
 * поэтому выбор сохраняется при обновлении страницы и переходах по разделам.
 * Язык браузера, системы или геолокация не учитываются, автоматического переключения нет.
 */
export function LangProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    syncUrl(next);
  }, []);

  useEffect(() => {
    const d = dictionaries[lang];
    document.documentElement.lang = lang;
    document.title = d.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", d.meta.description);
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const { lang, setLang } = useContext(LangContext);
  return [lang, setLang];
}

export function useT(): Dict {
  return dictionaries[useContext(LangContext).lang];
}
