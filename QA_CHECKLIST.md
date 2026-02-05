# QA checklist

## Accessibility
- [ ] Keyboardnavigera alla interaktiva element (meny, filter, cards, modal, formulär).
- [ ] Säkerställ att fokus alltid är synligt och inte klipps av.
- [ ] Bekräfta att inga funktioner kräver hover för att fungera.
- [ ] Kontrollera kontrast på text, badges och knappar mot bakgrund.

## Performance
- [ ] Verifiera att bilder har `loading="lazy"` där det är rimligt.
- [ ] Sätt `width`/`height` på bilder för att minska layout shift.
- [ ] Säkerställ att CSS/JS inte gör onödigt mycket arbete vid filter/sortering.

## Motion
- [ ] Microinteractions känns mjuka utan att störa.
- [ ] `prefers-reduced-motion` respekteras i CSS och JS.
