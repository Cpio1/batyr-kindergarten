// Сканирует папки с фото и документами и записывает список файлов (с размерами изображений)
// в src/generated/media.json. Запускается автоматически перед `npm run dev` и `npm run build`.
//
// • Фото первого экрана:  main-page.(png|jpg|jpeg|webp)  — в public/ или public/images/
// • Фото раздела «О нас»: main-page2.(png|jpg|jpeg|webp) — там же
// • Галерея:   любые PNG / JPG / WebP из public/images/gallery (сортировка по имени: 1, 2, 10…)
// • Документы: PDF / DOCX / XLSX / изображения из public/documents
// Если файла нет — сайт показывает иллюстрацию или аккуратное сообщение, а не битую ссылку.
import { readdir, readFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const IMAGE = /\.(jpe?g|png|webp)$/i;
const DOC = /\.(pdf|docx?|xlsx?|jpe?g|png|webp)$/i;

/** Размеры JPEG / PNG / WebP без сторонних зависимостей (с учётом EXIF-поворота). */
function imageSize(buf) {
  if (buf.length < 30) return null;
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    let rotated = false;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      const len = buf.readUInt16BE(offset + 2);
      if (marker === 0xe1 && buf.toString("ascii", offset + 4, offset + 8) === "Exif") rotated = exifRotated(buf, offset + 10);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        return rotated ? { width: height, height: width } : { width, height };
      }
      offset += 2 + len;
    }
  }
  return null;
}

function exifRotated(buf, tiff) {
  try {
    const le = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let i = 0; i < count; i++) {
      const entry = ifd + 2 + i * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8) >= 5;
    }
  } catch {
    /* повреждённый EXIF — считаем, что поворота нет */
  }
  return false;
}

const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });

async function names(dir) {
  try {
    return (await readdir(path.join(root, "public", dir))).filter((f) => !f.startsWith("."));
  } catch {
    return [];
  }
}

async function images(dir, filter = IMAGE) {
  const items = [];
  for (const name of (await names(dir)).filter((f) => filter.test(f))) {
    const file = path.join(root, "public", dir, name);
    const size = imageSize(await readFile(file));
    if (!size || !size.width || !size.height) {
      console.warn(`[media] пропущен повреждённый файл: public/${dir ? `${dir}/` : ""}${name}`);
      continue;
    }
    const src = `${dir ? `/${dir}` : ""}/${name.split("/").map(encodeURIComponent).join("/")}`;
    items.push({ name, src, ...size });
  }
  return items.sort(byName);
}

const pick = async (re) => (await images("", re))[0] ?? (await images("images", re))[0] ?? null;
const hero = await pick(/^main-page\.(jpe?g|png|webp)$/i);
const about = await pick(/^main-page2\.(jpe?g|png|webp)$/i);
const gallery = await images("images/gallery");

const documents = [];
for (const name of (await names("documents")).filter((f) => DOC.test(f))) {
  const { size } = await stat(path.join(root, "public", "documents", name));
  documents.push({ name, src: `/documents/${encodeURIComponent(name)}`, size });
}
documents.sort(byName);

await mkdir(path.join(root, "src", "generated"), { recursive: true });
await writeFile(
  path.join(root, "src", "generated", "media.json"),
  JSON.stringify({ hero, about, gallery, documents }, null, 2) + "\n",
);

console.log(
  `[media] hero: ${hero?.src ?? "—"}, about: ${about?.src ?? "—"}, gallery: ${gallery.length} фото, documents: ${documents.length}`,
);
