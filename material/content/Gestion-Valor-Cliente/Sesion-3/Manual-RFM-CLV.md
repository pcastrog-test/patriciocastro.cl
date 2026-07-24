---
title: "Manual · Segmentación RFM y CLV (Google Sheets + Looker Studio)"
---

# 📊 Segmentación de clientes con RFM y CLV

### Guía paso a paso para estudiantes · Caso Raíz · Google Sheets + Looker Studio

> 🎯 **Objetivo del taller.** A partir de una base de 150 clientes vas a: (1) calcular el **CLV** (valor de vida del cliente), (2) puntuar a cada cliente con el modelo **RFM**, (3) agruparlos en **4 segmentos** con una estrategia para cada uno, y (4) construir un **dashboard** en Looker Studio.

> ⏱️ **Duración:** ~45 minutos · **Requisitos:** una cuenta de Google y el archivo de datos de Raíz. **No necesitas experiencia previa.**

---

## 🧭 Antes de empezar: conceptos básicos

Si nunca usaste una planilla, lee esto primero. Son 5 ideas y con eso te alcanza.

- **Celda:** cada casillero de la planilla. Tiene una dirección: una **letra** (columna) + un **número** (fila). Ejemplo: `D2` es la columna D, fila 2.
- **Fórmula:** una instrucción que empieza con `=`. En vez de escribir un resultado, le pides a la planilla que lo calcule. Ejemplo: `=2+2` muestra `4`.
- **Referencia:** cuando una fórmula usa otra celda por su dirección. `=D2/E2` significa "el valor de D2 dividido por el de E2".
- **Copiar hacia abajo (rellenar):** escribes la fórmula una vez en la primera fila y la extiendes a las 150 filas. La planilla ajusta las referencias sola (D2 pasa a D3, D4…).
- **Referencia fija con `$`:** si escribes `$B$9`, esa dirección **no** se mueve al copiar hacia abajo. Sirve para apuntar siempre a la misma celda (por ejemplo, un parámetro).

**Las 3 variables del modelo RFM** (ya vienen en la base):

| Letra | Significa | En la base | Idea |
|---|---|---|---|
| **R** | Recency (Recencia) | `Recencia_dias` | ¿Hace cuánto compró por última vez? Menos días = mejor. |
| **F** | Frequency (Frecuencia) | `Frecuencia_compras` | ¿Cuántas veces compró? Más = mejor. |
| **M** | Monetary (Monto) | `Monto_total_CLP` | ¿Cuánto gastó en total? Más = mejor. |

---

## 🟦 Paso 0 · Preparar los datos (5 min)

**Qué vas a lograr:** tener la base de Raíz abierta en Google Sheets.

1. Entra a **[sheets.google.com](https://sheets.google.com)** con tu cuenta Google.
2. Haz clic en el recuadro **`+` (En blanco)** para crear una planilla nueva.
3. En el menú de arriba: **`Archivo` → `Importar`**.
4. Ve a la pestaña **`Subir`** y arrastra (o selecciona) el archivo de datos de Raíz.
5. En la ventana que aparece, elige **`Reemplazar la hoja de cálculo`** y presiona **`Importar datos`**.
6. Deberías ver la tabla con estas columnas: `ID_Cliente`, `Recencia_dias`, `Frecuencia_compras`, `Monto_total_CLP`, `Antiguedad_meses`, y algunas más.

> ⚠️ **Muy importante — ubica tus columnas.** En esta guía suponemos:
> **D** = Recencia · **E** = Frecuencia · **F** = Monto · **G** = Antigüedad.
> Los datos van de la **fila 2 a la 151** (150 clientes; la fila 1 son los títulos).
> Si en tu planilla las columnas están en otras letras, cambia las letras de las fórmulas por las tuyas.

**Truco para ver la letra de una columna:** haz clic en cualquier celda y mira arriba a la izquierda (el "cuadro de nombres") — te dice la dirección, por ejemplo `F2`.

---

## 🟩 Paso 1 · Calcular el CLV (10 min)

**Fórmula del curso:**

> **CLV ≈ Valor promedio × Frecuencia (compras/año) × Duración (años) × Margen**

Vamos a construirla por partes. Primero creamos los dos supuestos, luego tres columnas.

### 1a. Crear la hoja de supuestos

1. Abajo, junto al nombre de la hoja, haz clic en **`+`** para crear una hoja nueva. Haz doble clic en su pestaña y nómbrala **`Supuestos`**.
2. En esa hoja escribe:
   - En **`A9`**: `Duración (años)` — en **`B9`**: `3`
   - En **`A10`**: `Margen (%)` — en **`B10`**: `0,3`
3. Selecciona la celda `B10` y dale formato de porcentaje (botón **`%`** en la barra). Debería mostrar `30%`.

> 💡 Duración y Margen son **supuestos** (no salen de los datos). Los pones en celdas aparte para poder cambiarlos y ver cómo se mueve el CLV. Píntalos de amarillo para recordar que son editables.

### 1b. Volver a la hoja de datos y crear 3 columnas

Ubícate en la primera columna vacía a la derecha de tus datos y crea estos títulos en la fila 1: `Valor_promedio`, `Frecuencia_anual`, `CLV`.

**Columna: Valor promedio (ticket)** — cuánto gasta el cliente por compra.

```
=F2/E2
```

**Columna: Frecuencia anual** — compras por año, ajustadas por el tiempo que lleva el cliente.

```
=E2/(G2/12)
```

> ¿Por qué dividir por `(G2/12)`? `G2` está en meses; al dividir por 12 lo pasamos a años. Así comparamos a todos "por año", sin que un cliente antiguo parezca más frecuente solo por llevar más tiempo.

**Columna: CLV**

```
=(F2/E2)*(E2/(G2/12))*Supuestos!$B$9*Supuestos!$B$10
```

> `Supuestos!$B$9` significa "la celda B9 de la hoja Supuestos". Los `$` la fijan para que no se mueva al copiar hacia abajo.

### 1c. Copiar las fórmulas hacia abajo

1. Haz clic en la celda con la fórmula (por ejemplo la del Valor promedio en la fila 2).
2. Verás un **cuadradito azul** en la esquina inferior derecha de la celda.
3. Haz **doble clic** en ese cuadradito: la fórmula se copia sola hasta la fila 151.
4. Repite con las otras dos columnas.

✅ **Checkpoint:** cada fila debería mostrar un número en las tres columnas (nada de `#ERROR!` ni vacíos).

---

## 🟨 Paso 2 · Scoring RFM por quintiles (10 min)

**La idea:** ordenar a los 150 clientes por cada variable y partirlos en **5 grupos iguales** (quintiles). A cada grupo le das una nota de **1 a 5**.

### 2a. Ver los cortes de los quintiles

Un quintil se define por 4 "cortes": los percentiles 20, 40, 60 y 80. Vamos a calcularlos.

En una zona vacía (por ejemplo la celda `T1`) escribe una fórmula así para Recencia:

```
=PERCENTILE($D$2:$D$151, 0.2)
```

Repite cambiando el último número por `0.4`, `0.6` y `0.8`. Haz lo mismo para Frecuencia (rango `$E$2:$E$151`) y Monto (`$F$2:$F$151`).

Para **este** dataset, los cortes son:

| Variable | 20% | 40% | 60% | 80% |
|---|---|---|---|---|
| Recencia (días) | 25 | 37 | 60 | 195 |
| Frecuencia | 1 | 2 | 3 | 5 |
| Monto (CLP) | 22.740 | 35.820 | 53.040 | 115.460 |

> 🧠 **Idea clave para la clase:** el "5" no es un umbral inventado. Es "estar en el 20% mejor". Eso es un quintil.

### 2b. Columna R_score — Recencia (¡se invierte!)

Menos días desde la última compra = cliente más activo, así que el **5 va a los más recientes**. Crea la columna `R_score` y en la fila 2 escribe:

```
=IF(D2<=25,5,IF(D2<=37,4,IF(D2<=60,3,IF(D2<=195,2,1))))
```

> **Cómo se lee:** "si la recencia es ≤25 → 5; si no, ≤37 → 4; ≤60 → 3; ≤195 → 2; en cualquier otro caso → 1". Cada `IF` es una pregunta sí/no anidada.

### 2c. Columna F_score — Frecuencia (más = mejor)

```
=IF(E2>=5,5,IF(E2>=3,4,IF(E2>=2,3,IF(E2>=1,2,1))))
```

### 2d. Columna M_score — Monto (más = mejor)

```
=IF(F2<=22740,1,IF(F2<=35820,2,IF(F2<=53040,3,IF(F2<=115460,4,5))))
```

### 2e. Código y suma RFM

Crea dos columnas más:

```
RFM_codigo:  =M2&N2&O2        (pega los 3 dígitos, ej. 555)
RFM_suma:    =M2+N2+O2        (un número de 3 a 15)
```

> *(Ajusta las letras `M`, `N`, `O` a las columnas donde pusiste R_score, F_score y M_score.)*

Copia todas estas columnas hacia abajo (doble clic en el cuadradito azul).

> ⚠️ **Dato importante (y esperado):** como la Frecuencia son números enteros con muchos empates (muchos clientes con 1 o 2 compras), sus grupos **no** quedan de 30 clientes exactos y casi nadie cae en score 1. Es normal en datos discretos: obsérvalo y coméntalo con el curso.

✅ **Checkpoint:** los tres scores solo pueden ser 1, 2, 3, 4 o 5. Si ves un 0 o un vacío, revisa que tu rango llegue hasta la fila 151.

---

## 🟪 Paso 3 · Asignar los 4 segmentos y su estrategia (5 min)

### 3a. Columna Segmento

Traducimos los scores a 4 "cajas" con una regla en orden de prioridad. Crea la columna `Segmento`:

```
=IF(AND(M2>=4,N2>=4,O2>=4),"VIP",
  IF(AND(M2>=4,N2<=2),"Growth",
    IF(M2<=2,"Low-Touch","Core")))
```

> **Cómo se lee, en orden:**
> 1. ¿Alto en R, F y M? → **VIP**
> 2. Si no: ¿reciente pero compra poco? → **Growth** (cliente nuevo con potencial)
> 3. Si no: ¿dormido (baja recencia)? → **Low-Touch**
> 4. Todo lo demás → **Core**
>
> *(Puedes escribirla en una sola línea; la partí en tres para que se lea mejor.)*

### 3b. Columna Estrategia

Para asignar la acción de marketing a cada segmento, arma esta mini-tabla en la hoja `Supuestos` (en `A16:B19`):

| Segmento | Estrategia |
|---|---|
| VIP | Atención personal, exclusividad |
| Core | Mantener, reconocer |
| Growth | Nurturing para subir frecuencia |
| Low-Touch | Automatización, bajo costo |

Luego crea la columna `Estrategia` y escribe:

```
=VLOOKUP(R2, Supuestos!$A$16:$B$19, 2, FALSE)
```

> **`VLOOKUP` (BUSCARV)** busca el segmento del cliente (`R2`) en la primera columna de la tabla y trae el texto de la 2ª columna. El `FALSE` exige coincidencia exacta.

### 3c. La matriz de referencia

| Segmento | Perfil RFM | Estrategia |
|---|---|---|
| 🔵 **VIP** | Alto en todo (R5·F5·M5) | Atención personal, exclusividad |
| 🟢 **Core** | R4–5 · F3–4 · M3–4 | Mantener, reconocer |
| 🟩 **Growth** | Reciente, baja frecuencia | Nurturing para subir frecuencia |
| 🟣 **Low-Touch** | Dormido, bajo valor | Automatización, bajo costo |

✅ **Checkpoint (contraste del profesor):** deberías aproximarte a **VIP ~19% de clientes y ~52% de ingresos**, y **Low-Touch ~40%**. Si te da muy distinto, el error casi siempre está en el scoring o en los cortes de quintiles — no en el resto.

---

## 🟥 Paso 4 · Visualizar en Looker Studio (10 min)

**Qué es Looker Studio:** una herramienta gratis de Google para crear dashboards (informes visuales) conectados a tus datos. Antes se llamaba *Data Studio*.

> 📌 **Conceptos que verás:**
> - **Dimensión** (verde) = categoría para agrupar. Ej: `Segmento`.
> - **Métrica** (azul) = número que se suma o promedia. Ej: suma de `Monto_total_CLP`.
> - **Agregación** = cómo se juntan los números: `SUM` (suma), `AVG` (promedio), `Record Count` (cuenta filas).

### 4a. Conectar tus datos

1. Entra a **[lookerstudio.google.com](https://lookerstudio.google.com)**.
2. Haz clic en **`Crear` → `Informe`** (o en la plantilla "Informe en blanco").
3. Se abre el buscador de conectores → elige **`Hojas de cálculo de Google`**.
4. Busca y selecciona tu archivo de Raíz → elige la **hoja** con los datos calculados → **`Agregar`**.
5. Si pregunta por permisos, acepta. Ya tienes los datos dentro de Looker.

### 4b. Revisar los tipos de campo

En el panel derecho verás la lista de campos. Confirma:

- `Monto_total_CLP`, `CLV`, `RFM_suma` → tipo **Número**.
- `Segmento`, `RFM_codigo` → tipo **Texto**.

Si alguno está mal, haz clic en el ícono a su izquierda y cámbialo.

### 4c. Tabla resumen por segmento

1. Menú **`Insertar` → `Tabla`**. Dibújala en el lienzo con el mouse.
2. En **Dimensión** arrastra `Segmento`.
3. En **Métrica** agrega tres:
   - `Record Count` (número de clientes)
   - `Monto_total_CLP` → cambia su agregación a **`SUM`**
   - `CLV` → agregación **`AVG`** (promedio)
4. Verás las 4 filas (VIP, Core, Growth, Low-Touch) con sus totales.

### 4d. Gráfico de "% de ingresos por segmento"

1. **`Insertar` → `Gráfico circular`** (o de barras).
2. **Dimensión:** `Segmento`. **Métrica:** `Monto_total_CLP` con agregación **`SUM`**.
3. El gráfico circular ya muestra el **% de cada segmento** sobre el total. Aquí se ve que VIP concentra ~52% de los ingresos siendo solo ~19% de los clientes: **ese es el mensaje del ejercicio.**

### 4e. Aplicar la paleta del curso

1. Selecciona un gráfico → pestaña **`Estilo`** (a la derecha).
2. Busca la opción de colores y elige **`Colores por dimensión`** (no "por orden").
3. Asigna a mano cada segmento:

| Segmento | Color (hex) |
|---|---|
| VIP | `#00AFD8` |
| Core | `#339FB6` |
| Growth | `#25C7B4` |
| Low-Touch | `#5D5B90` |

> 💡 **Truco:** fija estos colores una sola vez en **`Tema` → `Personalizar` → colores por dimensión** y todos los gráficos del informe los usarán automáticamente.

### 4f. Extras para que parezca un dashboard

- **`Insertar` → `Tarjeta de puntuación` (Scorecard)** para: total de clientes, ingreso total (`SUM` de Monto) y CLV promedio (`AVG` de CLV).
- **`Insertar` → `Control` → `Lista desplegable`** con dimensión `Segmento`: permite filtrar todo el informe por segmento en vivo. Muy útil para presentar.

---

## 🔧 Errores comunes y cómo resolverlos

| Síntoma | Causa probable | Solución |
|---|---|---|
| `#ERROR!` o `#DIV/0!` en CLV | Frecuencia = 0 o celda vacía | Revisa que la fila tenga datos completos. |
| Un score da `0` o vacío | El rango no llega a la fila 151 | Corrige el rango o vuelve a copiar hacia abajo. |
| `#N/A` en Estrategia | El texto del segmento no coincide con la tabla | Verifica que digan exactamente `VIP`, `Core`, `Growth`, `Low-Touch`. |
| Looker no muestra un cambio del Sheet | Aún no refrescó | Botón **`Actualizar datos`** (o espera ~15 min). |
| El menú de Looker no coincide con la guía | Google renombra menús seguido | Consulta [support.google.com/looker-studio](https://support.google.com/looker-studio). |

---

## ✅ Checklist de entrega

- [ ] Las 3 columnas de CLV muestran valores (sin errores).
- [ ] Los scores R, F y M solo tienen valores de 1 a 5.
- [ ] Cada cliente tiene su `Segmento` y su `Estrategia`.
- [ ] La tabla resumen muestra los 4 segmentos con su % de clientes e ingresos.
- [ ] El dashboard usa la paleta del curso.
- [ ] Declaraste tus supuestos de **Duración** y **Margen**.

---

## 📖 Glosario rápido

- **RFM:** modelo que puntúa a cada cliente por Recencia, Frecuencia y Monto.
- **Quintil:** división de los datos ordenados en 5 grupos iguales (20% cada uno).
- **CLV (Customer Lifetime Value):** valor total estimado que un cliente aporta a lo largo de su relación con la marca.
- **Ticket / valor promedio:** gasto promedio por compra.
- **Margen:** porcentaje del ingreso que queda como utilidad después de costos.
- **Dashboard:** panel visual con gráficos y métricas para leer datos de un vistazo.

---

*Guía docente · Escuela de Negocios UAI · Caso Raíz. Ajusta los supuestos de Duración y Margen según tu clase.*

---

[[Gestion-Valor-Cliente/Sesion-3|← Volver a la Sesión 3]]
