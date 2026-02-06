# Copilot instructions for taboo-ink

- This is a static site (HTML/CSS/JS) with no build step; pages live at repo root (e.g., index.html, mini-rebel.html).
- Styling is split across assets/css/styles.css (global) and page-specific files like assets/css/mini-rebel.css and assets/css/mini-rebel-wow.css.
- Interactive behavior is plain JS under assets/js; Mini Rebel interactions (modal, filters, interest form) are in assets/js/mini-rebel.js and rely on data-* attributes in mini-rebel.html.
- Product modal content is driven by the `productDetails` map in assets/js/mini-rebel.js; keep keys in sync with `data-product` values in mini-rebel.html.
- Product cards in mini-rebel.html live in the “Popular” row and the main grid; images should be local under assets/img/mini-rebel/products/.
- Image fallbacks for Mini Rebel should use assets/img/mini-rebel/products/5.png (see assets/js/mini-rebel.js).
- Site copy is Swedish; keep text edits in Swedish unless explicitly requested.
- Relative paths are used throughout (e.g., assets/img/…, assets/js/…); avoid introducing absolute URLs for local assets.
- Deployment is via GitHub Pages from the repository root; there are no tests or build commands.

## Key files to reference
- mini-rebel.html (Mini Rebel layout, product cards, modal)
- assets/js/mini-rebel.js (modal logic, product data, filters)
- assets/css/mini-rebel.css and assets/css/mini-rebel-wow.css (Mini Rebel visuals)
- README.md (site overview and deployment notes)
