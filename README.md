# Landing page — design reference

This is a design mockup created in a visual design tool, exported as a
standalone page. Treat it as a REFERENCE MOCKUP, not production code:
the markup and inline styles carry the design's precise values — colors,
font sizes, spacing, radii, shadows, layout — which an implementation
should replicate faithfully in its own components and styling system
rather than copy wholesale.

## Production page

`index.html` is the page deployed to GitHub Pages at
https://po2k.github.io/ac.art_tattoo_studio/. It is a plain static
implementation of the mockup (no runtime) with a Thai/English switch:
all copy lives in the `I18N` dictionary at the bottom of the file, and
elements carry `data-i18n` keys. Language is chosen from `?lang=th|en`,
then the visitor's saved choice, then the browser language.

## Design reference contents

- `Main.dc.html` — the artboard (a Design Component: an `<x-dc>`
  template + a small logic class). The values to replicate live in its
  inline `style="…"` attributes and the `<helmet><style>` block.
- `assets/` — files uploaded to the design (images, fonts, media)
- `support.js`, `vendor/react*.js` — the runtime that renders the
  component in a browser; not part of the design.

## Uploaded files

Images, fonts and media uploaded to the design are written once each under
`assets/` — 9 in this export — and the exported files refer to them there. A
reference a script puts together while the page runs (for example
`"/_blob/" + id`) is not rewritten and does not load from this folder.

## Viewing

Serve the folder (e.g. `python3 -m http.server`) and open `Main.dc.html`;
some browsers block the scripts over file://.
# ac.art_tattoo_studio
# ac.art_tattoo_studio
