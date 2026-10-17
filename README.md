# AC Art Tattoo Studio

Landing page for AC Art Tattoo Studio (Nonthaburi), built with Next.js and
deployed as a static export to GitHub Pages:
https://po2k.github.io/ac.art_tattoo_studio/

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

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and
publishes `out/` to GitHub Pages.

## Design reference

`design-reference/` holds the original mockup exported from the design tool
(`Main.dc.html` plus its runtime). It is a reference, not production code.
