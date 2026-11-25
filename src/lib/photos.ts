import type { Lang } from "./i18n/config";
import { galleryPhotos, type Photo } from "./media";

/**
 * Какие реальные фото детского сада стоят в разделах сайта.
 * Файлы берутся из public/images/gallery (список — src/generated/media.json).
 * Если файл удалить или переименовать, раздел сам вернётся к прежнему изображению — битых картинок не будет.
 *
 * focus — какая часть кадра остаётся видна при обрезке (CSS object-position), чтобы не срезать лица.
 */
export type SitePhoto = Photo & { focus: string; alt: Record<Lang, string> };

type Meta = { focus: string; alt: Record<Lang, string> };

/** Описания фото (alt) на двух языках и точка фокуса. */
const META: Record<string, Meta> = {
  "image1.jpeg": { focus: "50% 60%", alt: { kk: "Балабақшаның жарық дәлізі мен шешінетін бөлмесі", ru: "Светлый коридор и раздевалка детского сада" } },
  "image2.jpeg": { focus: "35% 55%", alt: { kk: "Ойыншықтары мен үстелдері бар топ бөлмесі", ru: "Игровая комната группы с игрушками и столиками" } },
  "image3.jpeg": { focus: "50% 30%", alt: { kk: "Балабақшаның салтанатты ашылуы", ru: "Торжественное открытие детского сада" } },
  "image4.jpeg": { focus: "50% 35%", alt: { kk: "Балабақша ашылған күн: суреттер салынған қабырға", ru: "День открытия сада: стена с рисунками" } },
  "image5.jpeg": { focus: "50% 30%", alt: { kk: "Ашылу салтанатындағы қонақтар мен балалар", ru: "Гости и дети на открытии детского сада" } },
  "image6.jpeg": { focus: "50% 45%", alt: { kk: "Балалар кинетикалық құммен ойнап отыр", ru: "Малыши играют с кинетическим песком" } },
  "image7.jpeg": { focus: "50% 55%", alt: { kk: "Сабақта балалар сурет салып отыр", ru: "Дети рисуют на занятии" } },
  "image8.jpeg": { focus: "50% 40%", alt: { kk: "«Алтын күз» мерекесі: қолшатыры бар бала", ru: "Праздник «Золотая осень»: мальчик с зонтиком" } },
  "image9.jpeg": { focus: "40% 60%", alt: { kk: "Құммен шығармашылық сабақ", ru: "Творческое занятие с песком" } },
  "image10.jpeg": { focus: "50% 45%", alt: { kk: "Көгілдір футболкадағы балалар қолымен жүрек жасап тұр", ru: "Дети в голубых футболках показывают сердечки" } },
  "image11.jpeg": { focus: "50% 60%", alt: { kk: "Балалар өз суреттерін көрсетіп тұр", ru: "Дети показывают свои рисунки" } },
  "image12.jpeg": { focus: "45% 40%", alt: { kk: "«Алтын күз» мерекесіндегі қыздар сары көйлекпен", ru: "Девочки в жёлтых платьях на празднике «Золотая осень»" } },
  "image13.jpeg": { focus: "50% 45%", alt: { kk: "Жаңа жыл мерекесі 2026", ru: "Новогодний утренник 2026" } },
  "image14.jpeg": { focus: "50% 45%", alt: { kk: "Түлектер кеші: балалар мадақтамаларымен", ru: "Выпускной: дети с грамотами" } },
};

const byName = new Map(galleryPhotos.map((p) => [p.name.toLowerCase(), p]));

function get(name: string): SitePhoto | null {
  const p = byName.get(name.toLowerCase());
  const m = META[name];
  return p && m ? { ...p, ...m } : null;
}

/** Фото для каждого раздела (null → раздел показывает прежнее изображение). */
export const sitePhotos = {
  /** «О нас»: большое фото + два маленьких */
  about: { main: get("image2.jpeg"), small: [get("image6.jpeg"), get("image1.jpeg")] },
  /** «Группы»: по фото на каждую из трёх карточек */
  groups: [get("image7.jpeg"), get("image11.jpeg"), get("image10.jpeg")],
};

/** Альт-текст и фокус для любого фото галереи (у новых файлов без описания — общий текст). */
export const photoMeta = (name: string): Meta | undefined => META[name];

/**
 * Порядок в галерее: сначала самые яркие кадры (праздники и занятия), затем помещения и история открытия.
 * Вертикальные фото (8, 9, 6) стоят на 2-м, 5-м и 8-м месте — так сетка 4 колонки (и 2 на телефоне)
 * заполняется без пустых клеток. Новые файлы, которых нет в списке, добавляются в конец автоматически.
 */
const GALLERY_ORDER = [
  "image12.jpeg", "image8.jpeg", "image13.jpeg", "image10.jpeg", "image9.jpeg", "image14.jpeg", "image11.jpeg",
  "image6.jpeg", "image7.jpeg", "image2.jpeg", "image1.jpeg", "image5.jpeg", "image3.jpeg", "image4.jpeg",
];
const rank = (p: Photo) => {
  const i = GALLERY_ORDER.indexOf(p.name);
  return i === -1 ? GALLERY_ORDER.length : i;
};
export const orderedGallery: Photo[] = [...galleryPhotos].sort((a, b) => rank(a) - rank(b));
