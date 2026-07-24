---
title: "Sesión 5 · Diseño de campañas e introducción a modelos predictivos"
---

# Sesión 5 · Diseño de campañas e introducción a modelos predictivos

De medir el recorrido (S4) a **actuar** sobre él: diseñar una campaña por etapa del journey y entender —sin programar— qué predice un modelo, con qué datos y cómo se lee su resultado.

## Recursos descargables

- [Dataset Suscribe · suscripción / churn (Excel)](Gestion-Valor-Cliente/recursos/Dataset_Suscribe_suscripcion.xlsx)
- [Dataset Viaje · turismo / forecasting (Excel)](Gestion-Valor-Cliente/recursos/Dataset_Viaje_turismo.xlsx)
- [Rúbrica del entregable E5 (texto)](Gestion-Valor-Cliente/recursos/Rubrica-E5.txt)

**Herramientas:** LLM (ChatGPT / Claude / Gemini) + Google Sheets + demo de Python/Colab (solo el profesor).

## Objetivos de aprendizaje

Al terminar la sesión podrás:

- Identificar la **variable objetivo** de un caso de churn y las señales que la anticipan.
- Entender, en palabras simples, qué son **precisión, recall y AUC**.
- Diseñar una **campaña digital** para una etapa del journey, con su medición y un A/B test.
- Redactar un **brief predictivo** (qué predecir, qué decisión cambia, qué datos, cómo validar).

---

## Parte A · Taller de laboratorio (≈45 min)

Sobre el dataset del curso. El objetivo es entender, sin programar, qué predice un modelo, qué datos usa y cómo se lee su resultado. Trabajamos el caso de **churn de Suscribe** y observamos la **demo de forecasting de Viaje**.

### A.1 · Explorar el dataset Suscribe (10 min)

Abre [Dataset_Suscribe_suscripcion.xlsx](Gestion-Valor-Cliente/recursos/Dataset_Suscribe_suscripcion.xlsx) y lee las hojas **Contexto** y **Diccionario**. En la hoja **Datos**, ubica la columna `Churn` (1 = se dio de baja, 0 = activo): esa es la **variable objetivo**, lo que un modelo intentaría predecir.

Con una tabla dinámica (o filtros), calcula el **% de churn por plan**. Deberías ver algo cercano a: Básico ~43% · Estándar ~30% · Premium ~12%. *Lectura:* a menor plan, más fuga. Ya tienes una primera "predicción" hecha a mano.

### A.2 · Buscar señales que anticipan la fuga (12 min)

Compara, entre quienes se fueron (`Churn`=1) y quienes siguen (`Churn`=0):

- `Uso_mensual_hrs` — referencia: ~8,2 h vs. ~11,7 h.
- `Email_abierto_pct` — referencia: ~0,30 vs. ~0,60.

Anota qué 2–3 columnas parecen "avisar" que alguien va a irse. Eso es lo que un modelo de churn aprende a combinar.

### A.3 · Del dato a la decisión (8 min)

Define una regla simple de negocio, por ejemplo: *"marcar en riesgo a todo suscriptor Básico con uso < 8 h y apertura de email < 40%"*. Cuenta cuántos caen en la regla. Si cada retención cuesta un mes de descuento, ¿a cuántos conviene intervenir? Aquí aparece la idea de **valor esperado**: probabilidad × valor de la acción.

### A.4 · ¿Cómo se sabe si un modelo sirve? (5 min, guiado)

Con el resultado de tu regla, arma la **matriz de confusión** a mano:

| | El modelo dice "se irá" | El modelo dice "se queda" |
|---|---|---|
| **Realmente se fue** | Acierto (verdadero positivo) | Se nos escapó (falso negativo) |
| **Realmente se quedó** | Falsa alarma (falso positivo) | Acierto (verdadero negativo) |

- **Precisión (precision):** de los que marqué como "se irá", ¿qué % realmente se fue? (evita gastar en falsas alarmas).
- **Sensibilidad (recall):** de todos los que se fueron, ¿a qué % logré detectar? (evita que se escapen).
- **AUC:** un número entre 0,5 y 1,0 que resume qué tan bien el modelo ordena a los clientes por riesgo. **0,5 = moneda al aire; 0,7–0,8 = útil; >0,9 = sospechosamente bueno (revisar).**

### A.5 · Demo de forecasting con Viaje (10 min, observacional)

Con la hoja `Demanda_mensual` de [Dataset_Viaje_turismo.xlsx](Gestion-Valor-Cliente/recursos/Dataset_Viaje_turismo.xlsx) (30 meses de reservas) se ve la **estacionalidad**: alta en dic–feb, repunte en jul–ago, valle en abr–jun, con leve tendencia al alza. *Forecasting* = proyectar esa serie hacia adelante. Un LLM o una planilla dan una aproximación; Python permite modelos serios. La decisión sigue siendo tuya: ¿cuánto stock/pauta pongo para la próxima temporada?

### A.6 · Demo de Python/Colab (10 min, observacional — no evaluado)

El profesor entrena en vivo un modelo de propensión/churn en Colab. No se evalúa ni se replica el código: es una muestra motivacional de lo que se podrá hacer al dominar Python en el resto del diplomado.

---

## Parte B · Taller del proyecto → Entregable E5 (≈50 min)

E5 tiene dos piezas: (1) el **diseño de una campaña** para una etapa del journey y (2) un **brief predictivo**. Usa el LLM como copiloto, pero **valida y ajusta** todo lo que produzca (se evalúa el criterio, no el copy-paste).

### B.1 · Diseña una campaña por etapa del journey (25 min)

Elige una etapa del journey de tu negocio (la que trabajaste en E4: conversión, retención o reactivación) y completa la ficha de campaña:

- **Objetivo (SMART)** y **público** (segmento RFM o persona).
- **Mensaje** y **oferta** principal.
- **Canal(es)** y por qué, priorizando canales de **datos propios** (email, CRM, comunidad).
- **Cómo la vas a medir** en un mundo con pérdida de señal (qué evento propio registras).
- **Un A/B test:** hipótesis, qué cambias (A vs. B) y qué métrica decide al ganador.

### B.2 · Redacta tu brief predictivo (25 min) — actividad "El brief predictivo"

Elige una pregunta predictiva de tu negocio —propensión (¿quién comprará / hará upsell?), churn (¿quién se irá?) o forecasting (¿cuánta demanda tendré?)— y redacta el brief respondiendo **cuatro preguntas**:

1. **¿Qué quiero predecir?** (define la variable objetivo en una frase).
2. **¿Qué decisión cambiaría** si lo supiera? (si la respuesta es "ninguna", elige otra pregunta).
3. **¿Qué datos necesitaría** y cuáles tengo hoy? (lista de columnas, y cuáles faltan).
4. **¿Cómo sabría si el modelo sirve?** (qué métrica miro y qué pasa si se equivoca: costo del falso positivo vs. falso negativo).

**Valida el output del LLM:** marca al menos una cosa que el LLM propuso y que tú **corregiste o descartaste**, y explica por qué. Esto es parte de la nota (uso crítico de IA).

---

## Formativo (no calificado) · "El brief predictivo"

El profesor comenta en voz alta 2–3 briefs antes de cerrar. Es el ensayo del criterio antes de la entrega.

## Entregable E5 · Campaña + caso predictivo

**Qué se entrega:** (1) diseño de una campaña digital para una etapa del journey y (2) un brief predictivo. Formato: 1 página de campaña + 1 página de brief. Sube a la plataforma en PDF o documento **antes de la Sesión 6**.

**Contenido mínimo para aprobar (4,0):** una campaña ligada a una etapa del journey (objetivo SMART, público, mensaje/oferta, canal y una forma de medirla); un A/B test definido; un brief predictivo que responde las cuatro preguntas; y mención explícita de cómo se usó y verificó el LLM.

### Rúbrica de evaluación (escala 1,0–7,0 · 4 criterios de igual peso, 25% c/u)

| Criterio | Insuficiente (1,0–3,9) | Suficiente (4,0–5,4) | Bueno (5,5–6,4) | Excelente (6,5–7,0) |
|---|---|---|---|---|
| **1. Aplicación del concepto** (campaña por etapa + lógica predictiva) | La campaña no se ancla a una etapa del journey o confunde propensión/churn/forecasting | Campaña conectada a una etapa; distingue el tipo de predicción | Campaña coherente con journey y segmento; la pregunta predictiva es pertinente | Integra campaña y predicción con precisión; la predicción habilita la campaña |
| **2. Uso de datos / herramienta** (medición sin cookies + datos del brief) | No define cómo medir, o el brief no lista datos | Medición básica y lista de datos necesarios | Prioriza datos propios (*first-party*); distingue lo que tiene de lo que falta | Medición robusta ante pérdida de señal; mapa de datos realista y accionable |
| **3. Decisión y justificación** (qué decisión cambia + A/B test) | No hay decisión asociada, o no se justifica | Indica qué decisión cambia y propone un A/B test simple | Decisión priorizada y justificada; A/B test con hipótesis y métrica clara | Decisión con *trade-offs* explícitos (costo de falso positivo vs. negativo); experimento bien diseñado |
| **4. Claridad y uso crítico de la IA** | Copia el output del LLM sin ajustarlo ni entenderlo | Usa el LLM y obtiene un resultado válido; entrega ordenada | Ajusta el output y explica el criterio; entrega clara y profesional | Valida críticamente al LLM (muestra qué corrigió y por qué); entrega lista para presentar |

**Nota E5** = promedio simple de los cuatro criterios. Se retroalimenta en la Sesión 6.

### Señales de excelencia

La predicción y la campaña **conversan** (p. ej.: "predigo churn de mi segmento Growth → activo una campaña de retención por email → mido reactivación → pruebo A vs. B en el asunto"). El alumno reconoce el **costo del error** (falsa alarma vs. cliente que se escapa), prioriza **datos propios** y una medición que sobreviva a la pérdida de cookies de terceros, y documenta una corrección concreta al output del LLM.

---

[[Gestion-Valor-Cliente/index|← Volver al curso]]
