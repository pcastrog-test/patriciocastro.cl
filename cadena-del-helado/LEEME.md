# La Cadena del Helado

Versión en español, para sala de clases, del Beer Distribution Game (MIT). Cada cadena de 4 puestos
(heladería, mayorista, distribuidor y fábrica) juega en un solo celular que pasa de mano en mano.
No usa servidor ni cuentas y no guarda datos personales.

## Direcciones una vez publicado

- Juego (alumnos): `https://patriciocastro.cl/cadena-del-helado/`
- Facilitador (proyector): `https://patriciocastro.cl/cadena-del-helado/facilitador.html`

El sitio se publica solo al hacer push a `main` (workflow `.github/workflows/quartz.yml`).
Ambas páginas llevan `noindex`, así que no aparecen en buscadores ni en el sitemap.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | Página del juego: número de cadena, reglas, traspaso, turno con temporizador, dos rondas, resultados y código |
| `facilitador.html` | Página del proyector: QR, reglas, cuenta regresiva por bloque, ranking por códigos y preguntas de cierre |
| `motor.js` | Motor de simulación y código de resultado. Sin interfaz; lo usan ambas páginas y las pruebas |
| `qr.js` | Generador de códigos QR de Kazuhiko Arase (licencia MIT, encabezado incluido) |
| `pruebas/motor.test.js` | Pruebas del motor |

## Reglas de la versión para la clase (70 minutos)

- 12 cajas iniciales por puesto y flujo inicial de 4 cajas por semana.
- $500 por caja guardada y $1.000 por caja adeudada, por semana.
- Retrasos: 1 semana de pedido, 1 de despacho y 2 de producción.
- Ronda 1: 16 semanas (se anuncian 20), a ciegas y en silencio. Los clientes compran 4 cajas y 8 desde la semana 5.
- Ronda 2: 8 semanas (se anuncian 10), con las ventas visibles para toda la cadena. El salto ocurre en la semana 3.
- Turnos de 15 segundos (30 en las dos primeras semanas). Si se acaba el tiempo, vale lo escrito o se repite el último pedido.
- Gana la cadena con menor costo total entre las dos rondas.

Los valores están en `CONFIG_CLASE`, al inicio de `motor.js`.

## Opciones por dirección

- `?modo=original`: reglas del tablero original (retrasos de 2 + 2 semanas, 3 en la fábrica, 36 semanas, una ronda).
  Sirve en el juego y en el facilitador; el QR del facilitador conserva el modo.
- `?turno=N`: segundos por turno. `?turno=0` quita el temporizador.

## Pruebas

```
node --test cadena-del-helado/pruebas/motor.test.js
```

Cubren equilibrio, conservación del producto, retrasos, deuda, amplificación, demanda, duración de las rondas,
validación de pedidos y el código de resultado.

## Fuentes de las reglas

- John Sterman, MIT Sloan, "The Beer Game": https://web.mit.edu/jsterman/www/SDG/beergame.html
- iSixSigma, "The Beer Distribution Game": https://www.isixsigma.com/training-materials-aids/the-beer-distribution-game/
- Eren, Hancer, Samur y Tunakan (2005), "A Computerized Beer Game and Decision Making Experiments":
  https://archives.albany.edu/description/catalog/ua435aspace_e7d55b2663bed5f8a685e2c802c86fb4
