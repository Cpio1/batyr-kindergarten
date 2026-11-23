/**
 * Иллюстративные стоковые фото (НЕ фотографии детского сада «Батыр ел»).
 * Источник — Pexels, лицензия: https://www.pexels.com/license/
 * (бесплатно, разрешено коммерческое использование, атрибуция не обязательна).
 * Файлы лежат в public/images/stock — уже кадрированы и сжаты в WebP.
 * Чтобы заменить фото: положите новый .webp с тем же именем (те же пропорции) или поменяйте путь здесь.
 */
export type StockImage = { src: string; width: number; height: number; source: string };

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const stock = {
  food: [
    { src: "/images/stock/food-breakfast.webp", width: 480, height: 480, source: pexels(5604832) },
    { src: "/images/stock/food-fruits.webp", width: 480, height: 480, source: pexels(775031) },
    { src: "/images/stock/food-soup.webp", width: 480, height: 480, source: pexels(15201566) },
    { src: "/images/stock/food-snack.webp", width: 480, height: 480, source: pexels(5379481) },
    { src: "/images/stock/food-dinner.webp", width: 480, height: 480, source: pexels(8996122) },
  ],
  groups: [
    { src: "/images/stock/group-toys.webp", width: 960, height: 600, source: pexels(8923982) },
    { src: "/images/stock/group-drawing.webp", width: 960, height: 600, source: pexels(33590129) },
    { src: "/images/stock/group-clay.webp", width: 960, height: 600, source: pexels(8422160) },
  ],
  clubs: {
    english: { src: "/images/stock/club-english.webp", width: 1000, height: 750, source: pexels(7335412) },
    dance: { src: "/images/stock/club-dance.webp", width: 1000, height: 750, source: pexels(6715556) },
  },
} satisfies {
  food: StockImage[];
  groups: StockImage[];
  clubs: Record<"english" | "dance", StockImage>;
};
