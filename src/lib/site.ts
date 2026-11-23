/**
 * Единый источник контактных данных и ссылок детского сада «Батыр ел».
 * Меняйте телефон, ссылки и адрес здесь — они обновятся во всех разделах сайта.
 */

/** Полный адрес сайта (без завершающего «/»). Задаётся при сборке в next.config.ts. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** Подпуть сайта: "/REPOSITORY" на GitHub Pages, "" на Vercel и собственном домене. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Добавляет BASE_PATH к локальному пути из public/ ("/images/a.jpg" → "/REPO/images/a.jpg"). */
export function withBasePath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  if (BASE_PATH && (src === BASE_PATH || src.startsWith(`${BASE_PATH}/`))) return src;
  return `${BASE_PATH}${src}`;
}

export const site = {
  legalName: "ТОО «Батыр ел»",
  brand: "Батыр ел",
  phone: { display: "+7 707 668 02 60", e164: "+77076680260" },
  whatsapp: "https://wa.me/77076680260",
  instagram: { handle: "@batyr_sadik", url: "https://www.instagram.com/batyr_sadik/" },
  hours: "08:00–18:00",
  groups: 3,
  ages: "3–6",
  meals: 5,
  /**
   * Точка на карте. Координаты дома «ул. Верненская, 73» пока не подтверждены
   * (открытые карты находят только улицу, а не здание), поэтому сайт не ставит метку наугад,
   * а открывает в 2GIS поиск по адресу.
   *
   * Когда точка будет проверена в 2GIS, заполните:
   *   geo: { lat: 43.xxxxxx, lon: 76.xxxxxx }
   *   twoGisFirmId: "70000001xxxxxxxxx"   ← из ссылки вида 2gis.kz/almaty/firm/<ID>
   * — и в разделе «Контакты» появится встроенная карта 2GIS с меткой.
   */
  geo: null as null | { lat: number; lon: number },
  twoGisFirmId: null as null | string,
} as const;

/** Адрес для поиска в картах (на русском — так его лучше находит 2GIS). */
const ADDRESS_QUERY = "Алматы, улица Верненская, 73";

export const telHref = `tel:${site.phone.e164}`;

export function waHref(text?: string) {
  return `${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function twoGisHref() {
  if (site.twoGisFirmId) return `https://2gis.kz/almaty/firm/${site.twoGisFirmId}`;
  const g = site.geo;
  if (g) return `https://2gis.kz/almaty/geo/${g.lon},${g.lat}?m=${g.lon},${g.lat}/17`;
  return `https://2gis.kz/almaty/search/${encodeURIComponent(ADDRESS_QUERY)}`;
}

export function googleMapsHref() {
  const g = site.geo;
  const q = g ? `${g.lat},${g.lon}` : ADDRESS_QUERY;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Встраиваемая карта 2GIS — только когда известны проверенные координаты и карточка организации. */
export function twoGisEmbed() {
  const g = site.geo;
  if (!g || !site.twoGisFirmId) return null;
  const options = { pos: { lat: g.lat, lon: g.lon, zoom: 16 }, opt: { city: "almaty" }, org: site.twoGisFirmId };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}
