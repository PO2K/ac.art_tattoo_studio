# AC Art Tattoo Studio

Landing page for AC Art Tattoo Studio (Nonthaburi), built with Next.js as a
static export.

- Production: https://acarttattoo.com (Cloudflare Pages, root path)
- Mirror: https://po2k.github.io/ac.art_tattoo_studio/ (GitHub Pages)

## Deploy targets

The base path and canonical site URL are build-time environment variables
(see `.env.example`):

| Target           | `NEXT_PUBLIC_BASE_PATH`  | `NEXT_PUBLIC_SITE_URL`                           |
| ---------------- | ------------------------ | ------------------------------------------------ |
| Cloudflare Pages | *(empty)*                | `https://acarttattoo.com`                        |
| GitHub Pages     | `/ac.art_tattoo_studio`  | `https://po2k.github.io/ac.art_tattoo_studio`    |

Cloudflare Pages settings: framework preset "Next.js (Static HTML Export)",
build command `npm run build`, output directory `out`, `NODE_VERSION=22`.

## Languages and SEO

- `/` is English, `/th/` is Thai. Each is a fully prerendered page with its
  own `<html lang>`, title, description, canonical URL and hreflang links.
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt`.
- The page embeds schema.org `TattooParlor` structured data.
- All copy lives in `lib/i18n.ts`; add or edit text there.

## Development

```
npm install
npm run dev      # http://localhost:3000/ac.art_tattoo_studio/
npm run build    # static export to out/
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with the
GitHub Pages variables and publishes `out/` there. Cloudflare Pages builds
from the same branch with its own variables.

## Design reference

`design-reference/` holds the original mockup exported from the design tool
(`Main.dc.html` plus its runtime). It is a reference, not production code.
