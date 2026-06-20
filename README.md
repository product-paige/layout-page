# layout.page

Reusable website **section layouts** with swappable **Design Systems** — skins that
change only color, type, radius, and hover states, never the underlying structure.
Preview any section in a Design System and Mode, then copy clean HTML or a Claude prompt.

## Stack

Static site — no build step.

- HTML + CSS + vanilla JS
- [Tailwind](https://tailwindcss.com) via CDN
- Google Fonts (Funnel Sans, Geist, Geist Mono, Newsreader) + local GeistPixel
- [Lucide](https://lucide.dev) icons via CDN

## Structure

```
index.html              Home
section-library.html    Browse all sections
section.html            Section detail + live preview
style-systems.html      Design Systems index
structured-editorial.html / scion ...  Design System pages
styleguide.html         Internal chrome reference
layout-system/
  site.css              Product shell (chrome) — single source of truth
  system.css            Design System tokens + .sx-* section primitives
  nav.js                Injects sidebar / topbar / footer / mobile bar
  sections-data.js      Section catalog
  style-systems-data.js Design System catalog
```

## Develop

Serve the folder with any static server and open `index.html`, e.g.

```
npx serve .
```

## Deploy

Deployed as a static site on [Vercel](https://vercel.com) — no build command, output is the repo root.
