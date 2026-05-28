# CHANGELOG · patriciocastro.cl

Registro de cambios por sesión de trabajo. Formato: `[Sesión N] YYYY-MM-DD — Descripción`.
Actualizar SIEMPRE antes del commit en GitHub Desktop.

---

## [Pendiente — próximas sesiones]

Ver `plan-sesiones-seo-geo.md` para el detalle completo.

---

## [Base] 2026-05-28 — Estado inicial documentado

### Archivos existentes
- `index.html` — 614 líneas, sitio de una sola página
- `CNAME` — apunta a `patriciocastro.cl`
- `foto-perfil.jpg`, `foto-docencia.jpg`, `foto-investigacion.jpg` — imágenes del sitio

### Lo que ya está implementado
- Schema JSON-LD Person básico (nombre, afiliación UAI, sameAs LinkedIn/Medium/UAI)
- Meta tags Open Graph completos (og:title, og:description, og:image, og:locale es_CL)
- Twitter Card
- Meta robots: index, follow
- Canonical URL
- Navegación sticky con anclas internas

### Brechas identificadas (ver auditoría)
- Sin Schema FAQ ni Course
- Sin robots.txt ni sitemap.xml
- Sin sección de blog propia (artículos en Medium)
- Sin landings transaccionales (talleres, charlas, consultoría)
- Sin testimonios ni señales E-E-A-T explícitas
- Meta description no incluye términos transaccionales

---

<!-- PLANTILLA para nuevas entradas — copiar y pegar al inicio de cada sesión -->
<!--
## [Sesión N] YYYY-MM-DD — Título breve del cambio

### Rama Git
`feat/nombre-de-la-rama`

### Objetivo
Una frase describiendo qué se logró.

### Archivos modificados
- `ruta/archivo.html` — descripción del cambio

### Cambios realizados
- Ítem 1
- Ítem 2

### Pendiente / notas
- Algo que quedó por hacer o a tener en cuenta en próxima sesión

### Commit message
`tipo(scope): descripción en imperativo`
-->
