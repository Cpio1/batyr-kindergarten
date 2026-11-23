import type { NextConfig } from "next";

/**
 * Статическая сборка (папка `out/`, без Node.js-сервера) — подходит и для GitHub Pages, и для Vercel.
 *
 * BASE_PATH — подпуть, по которому открывается сайт:
 *   • https://USERNAME.github.io/REPOSITORY/  → "/REPOSITORY";
 *   • Vercel или собственный домен           → "" (пустая строка).
 * В GitHub Actions значения берутся из настроек Pages (actions/configure-pages).
 * Локально и на Vercel используется корень "".
 */
const normalizeBasePath = (value: string) => {
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed && !trimmed.startsWith("/") ? `/${trimmed}` : trimmed;
};

function repoBasePath() {
  if (process.env.VERCEL) return "";
  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (!owner || !repo) return "";
  return repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repo}`;
}

const basePath = normalizeBasePath(process.env.BASE_PATH ?? repoBasePath());
const owner = (process.env.GITHUB_REPOSITORY ?? "").split("/")[0];
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (owner ? `https://${owner.toLowerCase()}.github.io${basePath}` : `http://localhost:3000${basePath}`)
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  poweredByHeader: false,
  images: {
    // У статической сборки нет сервера оптимизации — файлы отдаются из public/ как есть
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
