export type Lang = "kk" | "ru";

export const LANGS: Lang[] = ["kk", "ru"];
/** Язык по умолчанию — казахский: открывается по адресу «/», русская версия — «/ru/». */
export const DEFAULT_LANG: Lang = "kk";

export const langPath = (lang: Lang) => (lang === "ru" ? "/ru/" : "/");
