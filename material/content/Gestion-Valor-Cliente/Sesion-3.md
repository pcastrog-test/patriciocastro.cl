---
title: "Sesión 3 · CLV y Segmentación RFM"
---

# Sesión 3 · El valor del cliente: CLV y segmentación RFM

180 minutos · Unidad III.

> Pregunta de la sesión: ¿Cuánto vale cada cliente de mi empresa y en quién debo concentrar mis esfuerzos?

## Recursos descargables

- [Presentación de la sesión (PDF)](Gestion-Valor-Cliente/recursos/Presentacion-Sesion3.pdf)
- [Dataset del curso · Raíz (Excel, 150 clientes)](Gestion-Valor-Cliente/recursos/Dataset_Raiz_alimentacion.xlsx)

## Objetivos de aprendizaje

Al terminar la sesión podrás:

- Calcular el CLV de una cartera de clientes.
- Construir un scoring RFM y segmentar en 4 cajas (VIP / Core / Growth / Low-Touch).
- Recomendar una acción por segmento, con criterio y evidencia.

---

## Bloque 1 · El cliente que ya tienes

**Gancho.** Si tuvieras \$1.000 para retener clientes, ¿en quién los pondrías? La intuición suele decir "todo a los VIP"; con datos la respuesta es "depende del valor y del potencial de cada grupo".

**El negocio del laboratorio: Raíz.** Marca chilena D2C de snacks y despensa saludable. Trabajaremos su cartera: 150 clientes, ticket promedio ≈ \$20.133, ingresos ≈ \$13,6 M.

## Bloque 2 · Customer Lifetime Value

**Tres métricas, tres horizontes:** el **CAC** mide el costo de captar; el **ROAS**, el retorno de una campaña; el **CLV**, el valor de toda la relación.

**CLV en una frase:** el valor que un cliente aporta a lo largo de toda su relación con la empresa.

**La fórmula, sin miedo (cuatro números):**

> **CLV ≈ Valor promedio × Frecuencia × Duración × Margen**

Donde: *valor promedio* = cuánto gasta por compra; *frecuencia* = cuántas veces al año compra; *duración* = cuántos años se queda; *margen* = qué proporción es utilidad.

**La evidencia (Caso 1).** Retener un 5% más de clientes puede subir las utilidades de forma relevante, porque adquirir cuesta 5–25× más que retener (HBR, 2014).

**Ojo con un supuesto.** La fórmula base asume que el cliente compra "para siempre". En la realidad, unos siguen activos y otros ya se fueron sin avisar. Modelos como **BG/NBD** (Fader, Hardie & Lee, 2005) predicen cuántas compras hará, y **Gamma-Gamma** cuánto gastará por compra; juntos estiman el CLV futuro esperado. Idea clave: el CLV futuro es una predicción con incertidumbre, no un número fijo. Por eso lo combinamos con una segmentación simple y accionable: **RFM**.

## Bloque 3 · RFM: tres señales para segmentar

El análisis **RFM** (Recency, Frequency, Monetary) identifica a los clientes más valiosos según tres dimensiones:

- **R · Recency** — días desde la última compra. Quien compró ayer está más "caliente" que quien lo hizo hace 6 meses. Es la mejor señal de si volverá pronto.
- **F · Frequency** — número de compras en el período. Mide el hábito: ¿ocasional o recurrente?
- **M · Monetary** — total gastado en el período. Prioriza a quien deja más ingresos.

**Cómo se puntúa.** Ordena a los clientes por cada variable y córtalos en 5 grupos iguales (quintiles): el mejor grupo recibe 5; el peor, 1.

**El error más común: la Recency se invierte.** En F y M, más es mejor (más compras / más gasto → 5). En R, **menos días es mejor** (más reciente → 5).

**El resultado.** Cada cliente queda con un código de 3 dígitos: un `555` compró ayer, muy seguido y gasta mucho (tu mejor cliente); un `512` es reciente pero compra poco y bajo monto (nuevo con potencial).

## Bloque 4 · Tu cartera en 4 cajas

| Segmento | Perfil RFM | % clientes | % ingresos | Estrategia |
|---|---|---:|---:|---|
| **VIP** | R5 · F5 · M5 (alto en todo) | 19% | 52% | Atención personal, exclusividad |
| **Core** | R4–5 · F3–4 · M3–4 | 15% | 20% | Mantener y reconocer |
| **Growth** | R4–5 · F1–2 · M2–3 | 23% | 6% | Nurturing para subir frecuencia |
| **Low-Touch** | R2–3 · F1–2 · M1–2 | 43% | 22% | Automatizar, bajo costo |

**Principio de Pareto.** El 20% de los clientes de Raíz concentra cerca del 60% de los ingresos. No es que el resto no importe: es que el mismo esfuerzo rinde distinto según dónde lo pongas. **Segmentar es decidir dónde.**

**Caso 2.** Tres clientes representativos (un VIP, un Growth y un Low-Touch) y \$1.000 para invertir: el de mayor CLV **hoy** no siempre es el de mayor CLV **potencial**.

**Paleta RFM del curso:** VIP `#00AFD8` · Core `#339FB6` · Growth `#25C7B4` · Low-Touch `#5D5B90`.

---

## Taller · Manos al dato (Google Sheets + LLM + Looker Studio, sin programar)

**Dataset:** hoja **Datos** de [Dataset_Raiz_alimentacion.xlsx](Gestion-Valor-Cliente/recursos/Dataset_Raiz_alimentacion.xlsx) — 150 clientes, una fila por cliente. **Fecha de referencia: 2026-07-01.** Los datos ya vienen por cliente (no hay que agregar transacciones).

### Parte A — Laboratorio guiado (≈40 min)

**Paso 0 · Conocer los datos (5 min).** Revisa la hoja **Diccionario** y luego **Datos**. Ya trae, por cliente, las señales de RFM: `Recencia_dias`, `Frecuencia_compras`, `Monto_total_CLP` (más `Antiguedad_meses`, `Categoria_preferida`, `Canal_adquisicion`, `Email_abierto_pct`, `Ciudad`).

**Paso 1 · Calcular el CLV (10 min).** CLV ≈ valor promedio × frecuencia anual × duración.

- `Valor promedio` = `Monto_total_CLP` / `Frecuencia_compras`
- `Frecuencia anual` = `Frecuencia_compras` / (`Antiguedad_meses` / 12)
- `Duración` = supuesto declarado (p. ej. 1–4 años según segmento). *Refinamiento opcional: restar costo de servir → CLV neto.*

**Paso 2 · Scoring RFM por quintiles (10 min).** Ordena a los 150 clientes por cada variable y córtalos en 5 grupos iguales (1–5). F y M: más alto = mejor. **Recency: se invierte** (menos días = 5). Cada cliente queda con su código RFM y su suma R+F+M (3 a 15).

**Paso 3 · Asignar las 4 cajas (5 min).** Usa la matriz de decisión (tabla del Bloque 4).

**Paso 4 · Primera visualización en Looker Studio (10 min).** Entra a [lookerstudio.google.com](https://lookerstudio.google.com) → *Crear → Informe* → conecta tu Google Sheet. Arma una tabla por segmento (nº de clientes, suma de `Monto_total_CLP`, CLV promedio) y un gráfico de barras "% de ingresos por segmento". Aplica la paleta RFM del curso.

**Contraste (referencia).** Bien hecho, deberías aproximarte a: VIP ~19% de clientes y ~52% de ingresos; Low-Touch ~43% de clientes; top 20% ≈ 60% de los ingresos. Los datos no vienen pre-calculados a propósito: el cálculo **es** el ejercicio.

### Parte B — Taller del proyecto → borrador de E3 (≈35 min)

- **Si trajiste datos de tu empresa:** repite los Pasos 1–4 con tu base (mínimo: id, recencia/fecha, frecuencia, monto). Con pocos datos, usa 3 grupos (alto/medio/bajo) en vez de quintiles.
- **Si no trajiste datos:** trabaja con Raíz como si fuera tu empresa y anota qué datos pedirás a tu área comercial.
- Completa el template E3: tabla de 4 segmentos + **una acción por segmento** con su lógica + reparto de los \$1.000.
- **Declara el uso de IA:** qué le pediste al LLM y cómo verificaste el resultado (se evalúa).

## Entregable E3 · CLV y segmentos de mi empresa

Dos partes: **(A) CLV** — valor promedio × frecuencia × duración, declarando supuestos; **(B) RFM en 4 cajas** — tabla con tamaño, % de ingresos y CLV por segmento, más una acción por segmento. Formato PDF o planilla. Se entrega al cierre de la sesión y se retroalimenta en la S4.

### Autochequeo (errores frecuentes)

- ¿Invertí la Recency (recientes = 5)?
- ¿Usé la misma fecha de referencia (2026-07-01) para todos?
- ¿No confundí frecuencia (F) con monto (M)?
- ¿Cada acción es ejecutable y coherente con el valor del segmento?
- ¿Declaré cómo usé y verifiqué la IA?

## Cierre · Tu cartera en 4 cajas

En tríos, repartan \$1.000 entre VIP, Core, Growth y Low-Touch (deben sumar 1.000), escriban una acción por caja con su motivo (proteger / activar / hacer eficiente) y defiendan por qué **no** pusieron el máximo en los VIP.

**Tres ideas que no se te pueden olvidar:** (1) un cliente vale su futuro; (2) no todos valen igual; (3) segmentar es decidir dónde pones el esfuerzo.

## Fuentes verificadas

- Reichheld, F. & Sasser, W. E. (1990). *Zero Defections: Quality Comes to Services*. Harvard Business Review.
- Gallo, A. (2014). *The Value of Keeping the Right Customers*. Harvard Business Review.
- Fader, P., Hardie, B. & Lee, K. (2005). *RFM and CLV: Using Iso-Value Curves for Customer Base Analysis*. Journal of Marketing Research, 42(4).
- Litmus (2024). *2024 State of Email / The ROI of Email Marketing*.

---

[[Gestion-Valor-Cliente/index|← Volver al curso]]
