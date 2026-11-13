// Pruebas del motor. Ejecutar con: node --test cadena-del-helado/pruebas/
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const Motor = require('../motor.js');

const CLASE = Motor.CONFIG_CLASE;
const ORIGINAL = Motor.CONFIG_ORIGINAL;

function sinSalto(config) {
  const c = Motor.copiar(config);
  c.rondas.forEach((r) => { r.demandaNueva = r.demandaBase; });
  return c;
}

for (const [nombre, config] of [['clase', CLASE], ['original', ORIGINAL]]) {
  test(`equilibrio (${nombre}): con demanda 4 y pedidos de 4 nada cambia`, () => {
    const c = sinSalto(config);
    const estado = Motor.simular(c, 0, Motor.POLITICAS.fija);
    for (const p of estado.puestos) {
      assert.equal(p.inventario, 12);
      assert.equal(p.deuda, 0);
      for (const h of p.historial) {
        assert.equal(h.inventario, 12);
        assert.equal(h.costoSemana, 12 * c.costoInventario);
      }
    }
    // 4 puestos x 12 cajas x $500 = $24.000 por semana
    assert.equal(Motor.costoTotal(estado), 24000 * c.rondas[0].semanas);
  });

  test(`conservación (${nombre}): no aparece ni desaparece producto`, () => {
    for (const politica of Object.values(Motor.POLITICAS)) {
      const estado = Motor.crearRonda(config, 0);
      const inicial = Motor.productoEnSistema(estado);
      while (!estado.terminada) {
        Motor.iniciarSemana(config, estado);
        for (let i = 0; i < 4; i++) {
          const s = estado.semanaActual[i];
          const q = politica({
            pedido: s.pedido, inventario: s.inventario, deuda: s.deuda,
            inventarioInicial: config.inventarioInicial, flujoInicial: config.flujoInicial
          });
          Motor.registrarPedido(estado, i, Math.max(0, Math.round(q)));
        }
        Motor.cerrarSemana(config, estado);
        assert.equal(Motor.productoEnSistema(estado) + estado.vendidas, inicial + estado.producidas);
      }
    }
  });

  test(`retrasos (${nombre}): un pedido vuelve como producto en el plazo configurado`, () => {
    const c = sinSalto(config);
    const estado = Motor.crearRonda(c, 0);
    const extra = 7;
    const llegadas = [[], [], [], []];
    for (let semana = 1; semana <= 12; semana++) {
      Motor.iniciarSemana(c, estado);
      for (let i = 0; i < 4; i++) {
        llegadas[i].push(estado.semanaActual[i].recibido);
        // En la semana 1 cada puesto pide 7 cajas extra, una sola vez.
        Motor.registrarPedido(estado, i, semana === 1 ? 4 + extra : 4);
      }
      Motor.cerrarSemana(c, estado);
    }
    // La fábrica recibe su producción tras retrasoProduccion semanas.
    assert.equal(llegadas[3][c.retrasoProduccion], 4 + extra);
    // Un puesto con proveedor abastecido recibe tras retrasoPedido + retrasoDespacho.
    const plazo = c.retrasoPedido + c.retrasoDespacho;
    assert.equal(llegadas[0][plazo], 4 + extra);
    assert.equal(llegadas[0][plazo - 1], 4);
  });
}

test('deuda: sin inventario se acumula, cuesta $1.000 por caja y se paga al recibir producto', () => {
  const c = Motor.copiar(CLASE);
  const estado = Motor.crearRonda(c, 0);
  // El minorista deja de pedir: se queda sin inventario y acumula deuda.
  let vioDeuda = false;
  for (let semana = 1; semana <= 8; semana++) {
    Motor.iniciarSemana(c, estado);
    const s = estado.semanaActual[0];
    if (s.deuda > 0) {
      vioDeuda = true;
      assert.equal(s.inventario, 0);
      assert.equal(s.costoSemana, s.deuda * 1000);
    }
    Motor.registrarPedido(estado, 0, 0);
    for (let i = 1; i < 4; i++) Motor.registrarPedido(estado, i, 4);
    Motor.cerrarSemana(c, estado);
  }
  assert.ok(vioDeuda);
  const deudaAntes = estado.puestos[0].deuda;
  assert.ok(deudaAntes > 0);
  // Ahora pide lo suficiente: cuando llega el producto, la deuda se despacha primero.
  for (let semana = 9; semana <= 14; semana++) {
    Motor.iniciarSemana(c, estado);
    Motor.registrarPedido(estado, 0, semana === 9 ? 60 : 8);
    for (let i = 1; i < 4; i++) Motor.registrarPedido(estado, i, 30);
    Motor.cerrarSemana(c, estado);
  }
  assert.ok(estado.puestos[0].deuda < deudaAntes);
});

test('amplificación: con una política reactiva la fábrica pide más que el minorista', () => {
  for (const config of [CLASE, ORIGINAL]) {
    const estado = Motor.simular(config, 0, Motor.POLITICAS.reactiva);
    const maximo = (i) => Math.max(...estado.puestos[i].historial.map((h) => h.pedidoHecho));
    assert.ok(maximo(3) > maximo(0), `fábrica ${maximo(3)} vs minorista ${maximo(0)}`);
    assert.ok(maximo(0) >= 8);
  }
});

test('demanda: salta de 4 a 8 en la semana configurada', () => {
  const r1 = CLASE.rondas[0];
  assert.equal(Motor.demanda(r1, 4), 4);
  assert.equal(Motor.demanda(r1, 5), 8);
  const r2 = CLASE.rondas[1];
  assert.equal(Motor.demanda(r2, 2), 4);
  assert.equal(Motor.demanda(r2, 3), 8);
});

test('rondas: duran lo configurado y no aceptan más semanas', () => {
  const estado = Motor.simular(CLASE, 1, Motor.POLITICAS.espejo);
  assert.equal(estado.semana, 8);
  assert.ok(estado.terminada);
  assert.throws(() => Motor.iniciarSemana(CLASE, estado));
});

test('pedidos: solo enteros entre 0 y el tope', () => {
  const estado = Motor.crearRonda(CLASE, 0);
  Motor.iniciarSemana(CLASE, estado);
  for (const malo of [-1, 1.5, 1000, NaN, '4', null]) {
    assert.throws(() => Motor.registrarPedido(estado, 0, malo));
  }
  Motor.registrarPedido(estado, 0, 0);
  Motor.registrarPedido(estado, 1, 999);
  assert.throws(() => Motor.cerrarSemana(CLASE, estado));
  assert.deepEqual(Motor.faltanPedidos(estado), [2, 3]);
});

test('código de resultado: ida y vuelta, y detecta errores de digitación', () => {
  const casos = [
    { cadena: 1, costo1: 384000, costo2: 192000 },
    { cadena: 8, costo1: 2547500, costo2: 310000 },
    { cadena: 31, costo1: 0, costo2: 0 },
    { cadena: 12, costo1: 32767500, costo2: 8191500 }
  ];
  for (const caso of casos) {
    const codigo = Motor.codificar(caso);
    assert.match(codigo, /^[0-9A-Z]{4}-[0-9A-Z]{4}$/);
    const d = Motor.decodificar(codigo);
    assert.equal(d.ok, true);
    assert.equal(d.cadena, caso.cadena);
    assert.equal(d.costo1, caso.costo1);
    assert.equal(d.costo2, caso.costo2);
    // Minúsculas, espacios y sin guion también sirven.
    assert.equal(Motor.decodificar(' ' + codigo.toLowerCase().replace('-', ' ')).ok, true);
  }
  // Cambiar un carácter cualquiera invalida el código (salvo el par 0/Z, que el verificador no distingue).
  const codigo = Motor.codificar(casos[1]).replace('-', '');
  const alfabeto = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let detectados = 0;
  let probados = 0;
  for (let pos = 0; pos < 8; pos++) {
    for (const ch of alfabeto) {
      if (ch === codigo[pos]) continue;
      probados++;
      const alterado = codigo.slice(0, pos) + ch + codigo.slice(pos + 1);
      if (!Motor.decodificar(alterado).ok) detectados++;
    }
  }
  assert.ok(detectados / probados > 0.95, `${detectados} de ${probados}`);
  assert.equal(Motor.decodificar('ABC').ok, false);
});

test('pesos: separador de miles con punto', () => {
  assert.equal(Motor.pesos(0), '$0');
  assert.equal(Motor.pesos(500), '$500');
  assert.equal(Motor.pesos(24000), '$24.000');
  assert.equal(Motor.pesos(2547500), '$2.547.500');
});

test('referencia: la política espejo da un costo estable y reproducible', () => {
  const a = Motor.costoReferencia(CLASE, 0);
  const b = Motor.costoReferencia(CLASE, 0);
  assert.equal(a, b);
  assert.ok(a > 0);
});
