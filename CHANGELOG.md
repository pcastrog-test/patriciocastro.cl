# CHANGELOG · patriciocastro.cl

Registro de cambios por sesión de trabajo. Formato: `[Sesión N] YYYY-MM-DD — Descripción`.
Actualizar SIEMPRE antes del commit en GitHub Desktop.

---

## [Pendiente — próximas sesiones]

Ver `plan-sesiones-seo-geo.md` para el detalle completo.

---

## [Sesión 2] 2026-05-28 — Sección Blog: índice + primer artículo

### Rama Git
`feat/blog-marketing-analytics`

### Objetivo
Crear la sección de blog del sitio con diseño coherente al index principal, y publicar el primer artículo SEO/GEO sobre marketing analytics.

### Archivos creados / modificados
- `blog/index.html` — nuevo: página de listado de artículos con paleta oscura/dorada, nav, filter bar y CTA
- `blog/que-es-marketing-analytics.html` — nuevo: artículo completo (~1.500 palabras reales)
- `index.html` — añadido link "Blog" en nav principal y footer-links
- `sitemap.xml` — añadidas 2 URLs del blog (índice + artículo)

### Cambios realizados
- **blog/index.html** — listado de artículos con cards (título, fecha, extracto 2 líneas, link), filter bar de temas, CTA "Taller de Marketing Analytics", breadcrumb, Schema Blog JSON-LD
- **blog/que-es-marketing-analytics.html** — estructura completa: hero h1, párrafo GEO (≤60 palabras), TOC con anclas, 4 secciones de contenido (definición + dato CMO Survey / métricas clave / casos Chile / herramientas), FAQ accordion con 4 preguntas + Schema FAQPage, author box con foto y credenciales, CTA final taller, sidebar sticky con TOC + mini autor, barra de progreso de lectura, Schema Article JSON-LD
- Keywords principales: "marketing analytics Chile" y "qué es marketing analytics"
- Métricas cubiertas: RFM, CLV, Forecasting, Marketing Mix Modeling
- Herramientas cubiertas: Google Analytics 4, Python (pandas + scikit-learn), Power BI
- 3 casos de uso para empresas chilenas: retail RFM, servicios financieros CLV, e-commerce forecasting

### Pendiente / notas
- Actualizar sitemap en Google Search Console tras el deploy
- Validar Schema Article y FAQPage en Rich Results Test
- Añadir artículos pendientes: "RFM en la práctica" y "IA generativa para marketing"
- Considerar agregar og:image específica por artículo en el futuro

### Commit message
`feat(blog): add blog index + first article "qué es marketing analytics"`

---

## [Sesión 1] 2026-05-28 — Schema JSON-LD extendido + robots.txt + sitemap.xml

### Rama Git
`feat/schema-robots-sitemap`

### Objetivo
Ampliar la cobertura de structured data para SEO semántico y GEO (Generative Engine Optimization), y añadir los archivos técnicos de rastreo que faltaban.

### Archivos modificados
- `index.html` — tres bloques de schema JSON-LD añadidos/ampliados en el `<head>`
- `robots.txt` — archivo nuevo creado en la raíz
- `sitemap.xml` — archivo nuevo creado en la raíz

### Cambios realizados
- **Person schema** — `knowsAbout` ampliado de 7 a 8 items (añadida "Estrategia de Contenidos")
- **FAQPage schema** — nuevo bloque JSON-LD con 5 preguntas y respuestas (~60 palabras c/u) orientadas a búsquedas informacionales y consultas de IA
- **Course schema** — nuevo bloque JSON-LD para MKT299 Marketing Analytics UAI, con `teaches`, `instructor`, `hasCourseInstance` y `educationalLevel`
- **robots.txt** — Allow explícito para Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot; regla wildcard Allow /; línea Sitemap
- **sitemap.xml** — 8 URLs (raíz + 7 anclas internas) con `lastmod`, `changefreq` y `priority` diferenciados por tipo de sección

### Pendiente / notas
- Validar los schemas en [Google Rich Results Test](https://search.google.com/test/rich-results) tras el deploy
- Registrar sitemap en Google Search Console y Bing Webmaster Tools
- Considerar agregar `WebPage` o `ProfilePage` schema en próxima sesión

### Commit message
`feat(seo): add FAQPage + Course schemas, robots.txt, sitemap.xml`

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
