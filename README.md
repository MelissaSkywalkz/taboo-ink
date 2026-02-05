# Taboo Ink Stockholm

Statisk hemsida för Taboo Ink Stockholm byggd i HTML/CSS/JS utan build-step. Anpassad för GitHub Pages.

## Byta bilder

1. Lägg dina egna bilder i `assets/img/`.
2. Skapa filerna:
   - `assets/img/hero.png`
   - `assets/img/logo.png`
   - `assets/img/lukas.jpg`
   - `assets/img/og.jpg`
   - `assets/img/portfolio/01.jpg` till `09.jpg`
   - Favicon-filer: `assets/img/favicon-32.png`, `assets/img/favicon-16.png`, `assets/img/apple-touch-icon.png`

> Viktigt: Använd inte direkta Instagram-länkar i `<img>`-taggar. Ladda ner bilder och lägg dem lokalt i `assets/img/portfolio/`.

## Uppdatera text, adress och kontaktuppgifter

- Ändra rubriker, texter och sektioner i `index.html` och `portfolio.html`.
- Uppdatera telefon, e-post, adress och öppettider i footer samt i Schema.org JSON-LD (i `<head>` på `index.html`).
- Ändra metadata (title, description, OG-tags) i `index.html`.

## Deploy via GitHub Pages

1. Commit och pusha allt till `main` (eller vald branch).
2. Gå till **Settings → Pages**.
3. Välj branch och mapp (root) och spara.
4. Vänta på att sidan publiceras.

## TODO

- Lägg till riktiga bilder och faviconer.
- Uppdatera canonical/og:url till korrekt domän.

## SEO-checklista (on-page)

- Kontrollera att varje sida har unik `<title>` och `meta name="description"`.
- Säkerställ H1 samt logisk H2/H3-struktur per sida.
- Lägg in interna länkar i brödtext (inte bara i navigation).
- Verifiera Open Graph/Twitter-meta och canonical.
- Om relevant, lägg till JSON-LD för Organization + WebSite (undvik Product om priser/lager saknas).
