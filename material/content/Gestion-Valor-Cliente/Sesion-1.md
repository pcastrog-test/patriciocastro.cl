---
title: "Sesión 1 · Del dato a la decisión: el cliente como activo"
---

# Sesión 1 · Del dato a la decisión: el cliente como activo

Primera sesión del curso. Dos ideas centrales: **el cliente es un activo que vale más que su primera compra**, y **medir supera a adivinar**.

> Pregunta orientadora del curso: ¿Cuántas de mis decisiones de marketing del último mes fueron por datos y cuántas por intuición?

## Recursos descargables

- [Dataset de ejemplo (Excel, 8 clientes)](Gestion-Valor-Cliente/recursos/Dataset_ejemplo_CLV_Sesion1.xlsx)
- [Guía de lectura previa (Word)](Gestion-Valor-Cliente/recursos/Guia-lectura-sesion1.docx)
- [Entregable E1 · instrucciones (Word)](Gestion-Valor-Cliente/recursos/Entregable-E1.docx)

---

## Antes de la sesión · Guía de lectura previa

**Tiempo estimado:** 10–15 minutos.

**Objetivo:** llegar con una intuición clara de dos ideas: (1) el cliente es un activo que vale más que su primera compra, y (2) medir supera a adivinar.

### Qué leer / ver antes de la sesión

1. **Artículo (5 min).** Amy Gallo, *"The Value of Keeping the Right Customers"*, Harvard Business Review, octubre 2014. Lee con foco en dos cifras: cuánto más caro es adquirir que retener, y cuánto suben las utilidades al mejorar la retención un 5%.
2. **Video (3 min).** *"What is Customer Lifetime Value in 3 minutes"*. Quédate con la idea general de CLV; no te preocupes por las fórmulas todavía.
3. **Reflexión personal (10 min).** Sin buscar nada, anota en una hoja las 3 decisiones de marketing más importantes que tomaste (o viste tomar) el último mes en tu empresa, y marca cada una como "por datos" o "por intuición". Trae esa hoja a clase.

### Preguntas orientadoras (para pensar, no para entregar)

1. Cuando tu empresa gana un cliente nuevo, ¿sabe cuánto costó traerlo? ¿Y cuánto dejará ese cliente en total?
2. De tus 3 decisiones anotadas, ¿cuántas fueron por datos y cuántas por intuición? ¿Te sorprende el resultado?
3. Piensa en un negocio pequeño que conozcas (un almacén, una peluquería). ¿Cómo "conoce" a sus clientes sin usar datos digitales?
4. ¿Qué diferencia habría si tu empresa tratara a cada cliente según lo que vale a largo plazo, en vez de tratarlos a todos igual?
5. ¿Qué te gustaría poder medir de tus clientes y hoy no mides?

---

## En clase · Talleres

Dos talleres: **(A) laboratorio** sobre el dataset del curso y **(B) proyecto**, sobre la empresa de cada alumno. No se requiere Python ni herramientas de visualización: se trabaja en papel/planilla y con una IA conversacional (ChatGPT o Claude).

### Taller A — Laboratorio: "El primer CLV de tu vida" (≈25 min)

**Material:** [Dataset de ejemplo](Gestion-Valor-Cliente/recursos/Dataset_ejemplo_CLV_Sesion1.xlsx) (8 clientes).
**Meta:** calcular a mano un CLV simple y compararlo con el CAC.

**Fórmula introductoria (sin tasa de descuento, a propósito):**

> **CLV simple = Ticket promedio × Compras por año × Años de relación × Margen %**

**Pasos:**

1. Abre la planilla y elige **un** cliente (por ejemplo, María).
2. Multiplica sus cuatro valores según la fórmula. Para María: 9.000 × 40 × 6 × 30% = **\$648.000**.
3. Compara ese CLV con su **CAC** (lo que costó traerla). María: 648.000 ÷ 8.000 = razón **81:1**.
4. Repite con un cliente "caro y poco frecuente" (Pedro o Diego). Observa que su razón CLV:CAC baja cerca de **1:1**.
5. En grupos de 3, respondan: ¿a qué cliente le conviene invertir más la empresa? ¿Por qué el número de compras y los años pesan tanto?

**Cierre del lab (facilitador):** proyectar la columna `CLV_simple` ya calculada y mostrar que dos clientes con ticket muy distinto (Rosa \$18.000 y María \$9.000) pueden tener el **mismo CLV** porque compran seguido. Idea clave: *la frecuencia y la permanencia valen tanto o más que el ticket.*

> Regla sana de referencia: una razón **CLV:CAC ≈ 3:1** se considera saludable (WordStream, 2019; benchmark ampliamente usado en SaaS/e-commerce). Menos de 1:1 = se pierde dinero por cliente.

#### Dataset del laboratorio

| Cliente | Ticket promedio | Compras/año | Años relación | Margen % | CAC | CLV simple |
|---------|----------------:|------------:|--------------:|---------:|------:|-----------:|
| Rosa    | 18.000 | 24 | 5 | 30% | 12.000 | 648.000 |
| Carlos  | 45.000 |  6 | 3 | 30% | 25.000 | 243.000 |
| María   |  9.000 | 40 | 6 | 30% |  8.000 | 648.000 |
| Juan    | 30.000 | 12 | 2 | 30% | 20.000 | 216.000 |
| Ana     | 22.000 |  8 | 4 | 30% | 15.000 | 211.200 |
| Pedro   | 60.000 |  3 | 1 | 30% | 40.000 |  54.000 |
| Sofía   | 15.000 | 18 | 5 | 30% | 10.000 | 405.000 |
| Diego   | 27.000 |  4 | 1 | 30% | 30.000 |  32.400 |

*CLV simple = Ticket × Compras/año × Años × Margen%. Valores en CLP.*

### Taller B — Proyecto: "El negocio de cada uno en una frase" + hipótesis de CLV/CAC (≈30 min)

Este taller produce el **entregable E1** (individual, sobre la empresa del alumno).

**Paso 1 — Una frase (5 min).** Completa: *"Mi empresa ayuda a ___ a lograr ___ cobrando por ___."* Debe caber en una sola línea.

**Paso 2 — Ficha del negocio (10 min).** Anota: ¿quién es el cliente típico?; ¿cada cuánto compra y por cuánto (ticket aproximado)?; ¿cuánto tiempo suele quedarse como cliente?; ¿cómo llega ese cliente (canal principal)?; ¿cuánto cuesta traerlo (CAC aproximado)? Si no lo sabes, estímalo.

**Paso 3 — Primera hipótesis de CLV/CAC (10 min).** Con la fórmula simple del Taller A, calcula un **CLV estimado** para tu cliente típico y compáralo con tu CAC estimado. Escribe la razón CLV:CAC y una frase interpretándola.

**Paso 4 — Uso de IA como copiloto (5 min).** Pega tu ficha en ChatGPT/Claude para que la IA cuestione tus supuestos y proponga qué dato deberías medir. **La IA no da la respuesta: la interroga.**

**Entrega:** una página (media carta) con la frase, la ficha y la hipótesis CLV/CAC. Sube antes de la próxima sesión.

### Notas para el facilitador

- Ten a mano una calculadora proyectada; muchos alumnos no tienen Python ni fluidez con Excel.
- Enfatiza que los números son **estimaciones honestas**, no verdades: el valor está en empezar a medir.
- Recoge 2–3 "frases del negocio" en voz alta para la reflexión de cierre.
- Si alguien no tiene empresa propia, puede usar la de su empleador o un negocio que admire.

---

## Entregable E1 · Ficha del negocio y primera hipótesis de valor

**Objetivo:** definir tu negocio y hacer tu primera estimación del valor del cliente, como punto de partida del proyecto.

**Qué debes entregar:**

- **Descripción del negocio:** qué vende, a quién y cómo genera ingresos.
- **Cliente principal:** quién es y por qué es el más relevante.
- **Hipótesis de CLV y de CAC**, aunque sean estimaciones aproximadas.
- **La métrica que hoy consideras más importante** para el negocio, y por qué.

**Formato:** documento de 1 página (PDF o planilla).
**Herramientas:** Google Sheets o Excel + un asistente de IA (LLM) para verificar tu cálculo de CLV.
**Consejo:** si no tienes datos exactos, estima con supuestos razonables y explícalos. Lo importante es el razonamiento, no la precisión.

Instrucciones completas: [Entregable E1 (Word)](Gestion-Valor-Cliente/recursos/Entregable-E1.docx).

---

[[Gestion-Valor-Cliente/index|← Volver al curso]]
