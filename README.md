# «Батыр ел» — лендинг детского сада

Next.js (App Router) + TypeScript + Tailwind CSS 4 + Lucide. Статическая сборка (`out/`), двуязычный (KZ по умолчанию на `/`, RU на `/ru/`), только светлая тема.

## Команды

```bash
npm install
npm run dev        # разработка: http://localhost:3000
npm run build      # статическая сборка в out/
npm run preview    # просмотр out/ (PORT=4291 npm run preview, если 4173 занят)
npm run check      # проверка всех локальных ссылок и якорей в out/
npm run typecheck && npm run lint
```

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, WhatsApp, Instagram, часы работы, карта 2GIS | `src/lib/site.ts` |
| Все тексты (KZ / RU) | `src/lib/i18n/kk.ts`, `src/lib/i18n/ru.ts` |
| Документы из Google Drive | `src/lib/documents.ts` → `driveDocuments` |
| Разделы страницы | `src/components/sections/*` |
| Цвета, кнопки, анимации | `src/app/globals.css` |

## Фото и документы (подхватываются автоматически при `dev` / `build`)

- `public/main-page.(png|jpg|webp)` — фото первого экрана (иначе показывается иллюстрация);
- `public/main-page2.(png|jpg|webp)` — фото в разделе «О нас» (иначе — кубики с казахскими буквами);
- `public/images/gallery/*` — галерея (сортировка по имени: 1, 2, 10…). Пусто → сообщение «фото будут добавлены позже»;
- `public/documents/*` — PDF / DOCX / XLSX; название берётся из имени файла.

## Карта

Точные координаты дома «ул. Верненская, 73» не подтверждены, поэтому метка на карте не ставится наугад:
схема-карточка открывает поиск адреса в 2GIS. Когда найдёте организацию в 2GIS, впишите `geo` и `twoGisFirmId`
в `src/lib/site.ts` — появится встроенная карта 2GIS.

## Деплой

- **GitHub Pages:** Settings → Pages → Source: «GitHub Actions». Workflow `.github/workflows/deploy.yml` сам подставит подпуть репозитория.
- **Vercel:** импортируйте репозиторий — настройки по умолчанию (статический экспорт, подпуть не нужен).
