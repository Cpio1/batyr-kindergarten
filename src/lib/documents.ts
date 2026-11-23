import type { Lang } from "./i18n/config";
import { documentFiles } from "./media";

/**
 * Документы детского сада.
 *
 * 1) Файлы: положите PDF (или DOCX/XLSX/JPG) в public/documents — они появятся автоматически.
 *    Название берётся из имени файла: «Устав_2024.pdf» → «Устав 2024».
 * 2) Google Drive: добавьте ссылку в список ниже. Пример:
 *    { title: { kk: "Жарғы", ru: "Устав" }, href: "https://drive.google.com/file/d/ID/view", kind: "drive" },
 *    (в Google Drive включите доступ «Все, у кого есть ссылка»).
 *
 * Публикуйте только настоящие документы детского сада.
 */
export type DocKind = "pdf" | "doc" | "sheet" | "image" | "drive";

export type DocEntry = {
  title: Record<Lang, string>;
  href: string;
  kind: DocKind;
  /** Размер файла в байтах (для файлов из public/documents). */
  size?: number;
  /** true — локальный файл: показываем кнопку «Скачать». */
  local?: boolean;
};

export const driveDocuments: DocEntry[] = [];

function kindOf(name: string): DocKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (ext === "doc" || ext === "docx") return "doc";
  if (ext === "xls" || ext === "xlsx") return "sheet";
  return "image";
}

function prettyName(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const documents: DocEntry[] = [
  ...documentFiles.map((f) => {
    const title = prettyName(f.name);
    return { title: { kk: title, ru: title }, href: f.src, kind: kindOf(f.name), size: f.size, local: true };
  }),
  ...driveDocuments,
];
