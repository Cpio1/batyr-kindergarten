import type { Viewport } from "next";
import { Comfortaa, Nunito } from "next/font/google";
import { BASE_PATH } from "@/lib/site";
import "./globals.css";

// cyrillic-ext обязателен для казахских букв Ә Ғ Қ Ң Ө Ұ Ү Һ І
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#FFF9ED",
};

/**
 * До загрузки React: включаем анимации появления (класс .js)
 * и выставляем <html lang="ru"> для русской страницы /ru/.
 */
const bootstrap = `(function(){var d=document.documentElement;d.classList.add('js');if(/^\\/ru\\/?$/.test(location.pathname.replace(${JSON.stringify(BASE_PATH)},'')))d.lang='ru';})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      translate="no"
      className={`${nunito.variable} ${comfortaa.variable} notranslate antialiased`}
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="only light" />
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
