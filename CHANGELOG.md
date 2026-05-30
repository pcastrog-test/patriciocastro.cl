# CHANGELOG · patriciocastro.cl

Registro de cambios por sesión de trabajo. Formato: `[Sesión N] YYYY-MM-DD — Descripción`.
Actualizar SIEMPRE antes del commit en GitHub Desktop.

---

## [Pendiente — próximas sesiones]

Ver `plan-sesiones-seo-geo.md` para el detalle completo.

---

## [Sesión 5] 2026-05-30 — Blog: artículo métricas de marketing para gerentes

### Rama Git
`feat/blog-metricas-marketing-gerentes`

### Objetivo
Publicar artículo orientado a directivos y gerentes sobre las 10 métricas de marketing esenciales en 2026, con tabla completa, dashboard recomendado, sección de métricas de IA y FAQ estructurado.

### Archivos creados / modificados
- `blog/metricas-marketing-gerentes.html` — nuevo: artículo completo (~2.000 palabras)
- `blog/index.html` — card del nuevo artículo añadida en primera posición
- `sitemap.xml` — añadida URL del nuevo artículo

### Cambios realizados
- **blog/metricas-marketing-gerentes.html** — estructura completa: hero h1, apertura GEO con listado de 10 métricas en grid 2 columnas, TOC con anclas, 5 secciones de contenido, FAQ accordion (4 preguntas) + Schema FAQPage en `<head>`, Schema Article JSON-LD, author box, CTA "Taller de Métricas para equipos directivos", sidebar sticky, barra de progreso de lectura
- Secciones de contenido: por qué los gerentes necesitan métricas (stat CMO Survey 61%), tabla HTML completa de 10 métricas (ROAS/CPA/CAC/LTV/NPS/CTR/Tasa conversión/SoV/MQLs/Churn) con fórmulas y benchmarks, dashboard de métricas en 3 paneles (semanal/mensual/trimestral), error actividad vs resultado con comparación visual bad/good, 4 métricas de IA (Content Velocity, DDA, Lift personalización, AI Search Visibility)
- Keywords principales: "métricas de marketing gerentes", "KPIs marketing 2026", "ROAS CAC LTV"
- Stat destacada: LTV/CAC ≥ 3× como ratio clave para directivos
- **blog/index.html** — card nueva en primera posición (orden cronológico inverso)
- **sitemap.xml** — añadida entrada con lastmod 2026-05-30 y priority 0.9

### Pendiente / notas
- Actualizar sitemap en Google Search Console tras el deploy
- Validar Schema Article y FAQPage en Rich Results Test
- Próximo artículo sugerido: "Cómo hacer un plan de marketing digital con presupuesto limitado"

### Commit message
`feat(blog): add artículo métricas de marketing para gerentes 2026`

---

## [Sesión 4] 2026-05-29 — Blog: artículo CMO Survey Chile 2025

### Rama Git
`feat/blog-cmo-survey-2025`

### Objetivo
Publicar artículo de investigación sobre los resultados del CMO Survey Chile 2025, con autoridad de primera mano como investigador UAI + Deloitte Digital.

### Archivos creados / modificados
- `blog/cmo-survey-chile-2025.html` — nuevo: artículo completo basado en datos reales del estudio
- `blog/index.html` — card del CMO Survey añadida como primer post (más reciente)
- `sitemap.xml` — añadida URL del nuevo artículo

### Cambios realizados
- **blog/cmo-survey-chile-2025.html** — estructura completa: hero h1, apertura GEO con contexto UAI+Deloitte, tabla historia editorial 2020–2025, datos metodológicos (n=141, fechas, perfil de encuestados), secciones con datos del PDF (liderazgo, presupuesto, IA, KPIs, desafíos), 4 stat-cards con cifras clave, tablas de datos comparativos 2024 vs 2025, highlight boxes con interpretación estratégica, FAQ accordion (4 preguntas) + Schema FAQPage en `<head>`, Schema Article JSON-LD, author box con mención explícita de rol investigador CMO Survey + Deloitte, CTA charla/taller
- Datos reales del estudio incluidos: 141 encuestados, 61.8% vs 51.5% influencia estratégica, 59% aumento inversión IA, 71.5% uso GenAI creatividad, 51.2% eficiencia como beneficio IA, 76.4% analítica descriptiva, distribución presupuesto corto/largo plazo, KPIs principales, cambios en hábitos del consumidor (17.9%), presión CEO 73.17%
- **blog/index.html** — card CMO Survey añadida en primera posición (orden cronológico inverso)
- **sitemap.xml** — añadida entrada con lastmod 2026-05-29 y priority 0.9

### Pendiente / notas
- Actualizar sitemap en Google Search Console tras el deploy
- Validar Schema Article y FAQPage en Rich Results Test
- Considerar añadir og:image específica para el artículo CMO Survey

### Commit message
`feat(blog): add CMO Survey Chile 2025 research article`

---

## [Sesión 3] 2026-05-28 — Blog: segundo artículo IA aplicada al marketing

### Rama Git
`feat/blog-ia-aplicada-al-marketing`

### Objetivo
Publicar el segundo artículo del blog sobre IA aplicada al marketing, con estructura GEO, roadmap en 90 días, FAQ schema y casos de uso en empresas chilenas.

### Archivos creados / modificados
- `blog/ia-aplicada-al-marketing.html` — nuevo: artículo completo (~1.500 palabras reales)
- `blog/index.html` — card "Próximamente" de IA convertida en link activo al nuevo artículo
- `sitemap.xml` — añadida URL del nuevo artículo

### Cambios realizados
- **blog/ia-aplicada-al-marketing.html** — estructura idéntica al artículo anterior: hero h1, GEO opener (≤60 palabras), TOC con anclas, 6 secciones de contenido, FAQ accordion + Schema FAQPage en `<head>`, Schema Article JSON-LD, author box con foto y credenciales, CTA "Taller de IA para equipos de marketing", sidebar sticky, barra de progreso de lectura
- Secciones de contenido: 5 aplicaciones concretas de IA (cards 2×3), automatización de contenido con herramientas y advertencias, análisis predictivo y segmentación (mención del Marketing AI-Voice Lab UAI), IA para medición de campañas, 3 casos de uso empresas chilenas, roadmap en 90 días (3 fases visuales)
- Keywords principales: "inteligencia artificial marketing Chile" e "IA aplicada al marketing"
- Herramientas cubiertas: ChatGPT, Claude, Gemini, Midjourney, Adobe Firefly, Klaviyo AI, HubSpot Breeze, Meta Advantage+, Google Performance Max, GA4 data-driven attribution, Meta Meridian, Prophet
- Casos de uso: retail personalización e-commerce (+34% apertura), banca predicción churn (-15-20%), medios GEO y generación asistida
- Mención del Marketing AI-Voice Lab de la UAI en sección de segmentación predictiva
- **blog/index.html** — reemplazada card "próximamente" de IA generativa por link activo con extracto actualizado
- **sitemap.xml** — añadida entrada `blog/ia-aplicada-al-marketing.html` con priority 0.85

### Pendiente / notas
- Actualizar sitemap en Google Search Console tras el deploy
- Validar Schema Article y FAQPage en Rich Results Test
- Próximo artículo sugerido: "RFM en la práctica: cómo segmentar tus clientes con datos reales"

### Commit message
`feat(blog): agregar artículo IA aplicada al marketing`

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
