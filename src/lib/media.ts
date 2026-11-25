import media from "@/generated/media.json";

/** Файлы из public/ — список создаётся автоматически скриптом scripts/media-manifest.mjs. */
export type Photo = { name: string; src: string; width: number; height: number };
export type Video = { name: string; src: string; type: string };
export type DocFile = { name: string; src: string; size: number };

type Manifest = { hero: Photo | null; heroVideo: Video | null; about: Photo | null; gallery: Photo[]; documents: DocFile[] };
const data = media as Manifest;

export const heroPhoto = data.hero;
export const heroVideo = data.heroVideo;
export const aboutPhoto = data.about;
export const galleryPhotos = data.gallery;
export const documentFiles = data.documents;
