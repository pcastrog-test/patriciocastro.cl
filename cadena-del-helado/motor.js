/*
 * La Cadena del Helado · motor de simulación
 * Versión en español del Beer Distribution Game (MIT, Sterman).
 * Sin interfaz: lo usan la página del juego, la del facilitador y las pruebas.
 *
 * Puestos: 0 minorista · 1 mayorista · 2 distribuidor · 3 fábrica
 * Cada semana:
 *   1. Llega el producto que venía en camino.
 *   2. Llega el pedido del cliente de ese puesto.
 *   3. Se despacha lo posible; lo que falta queda como deuda.
 *   4. Se cobra el costo de inventario y de deuda.
 *   5. El puesto decide cuánto pedir (única decisión del jugador).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Motor = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var PUESTOS = ['minorista', 'mayorista', 'distribuidor', 'fabrica'];
  var PEDIDO_MAXIMO = 999;

  // Versión para una clase de 70 minutos: retrasos cortos y dos rondas.
  var CONFIG_CLASE = {
    modo: 'clase',
    inventarioInicial: 12,
    flujoInicial: 4,
    costoInventario: 500,
    costoDeuda: 1000,
    retrasoPedido: 1,
    retrasoDespacho: 1,
    retrasoProduccion: 2,
    segundosTurno: 15,
    segundosTurnoInicial: 30,
    semanasLentas: 2,
    rondas: [
      { nombre: 'Ronda 1', semanas: 16, semanasAnunciadas: 20, demandaBase: 4, demandaNueva: 8, semanaSalto: 5, demandaVisible: false },
      { nombre: 'Ronda 2', semanas: 8, semanasAnunciadas: 10, demandaBase: 4, demandaNueva: 8, semanaSalto: 3, demandaVisible: true }
    ]
  };

  // Reglas del tablero original: retrasos de 2 + 2 semanas, 3 en la fábrica, 36 semanas.
  var CONFIG_ORIGINAL = {
    modo: 'original',
    inventarioInicial: 12,
    flujoInicial: 4,
    costoInventario: 500,
    costoDeuda: 1000,
    retrasoPedido: 2,
    retrasoDespacho: 2,
    retrasoProduccion: 3,
    segundosTurno: 20,
    segundosTurnoInicial: 30,
    semanasLentas: 4,
    rondas: [
      { nombre: 'Partida', semanas: 36, semanasAnunciadas: 50, demandaBase: 4, demandaNueva: 8, semanaSalto: 5, demandaVisible: false }
    ]
  };

  function copiar(x) { return JSON.parse(JSON.stringify(x)); }

  function lleno(largo, valor) {
    var a = [];
    for (var i = 0; i < largo; i++) a.push(valor);
    return a;
  }

  function demanda(ronda, semana) {
    return semana < ronda.semanaSalto ? ronda.demandaBase : ronda.demandaNueva;
  }

  function crearRonda(config, indiceRonda) {
    var puestos = [];
    for (var i = 0; i < 4; i++) {
      puestos.push({
        inventario: config.inventarioInicial,
        deuda: 0,
        costo: 0,
        // Producto en camino hacia este puesto (en la fábrica: producción en curso).
        enCamino: lleno(i === 3 ? config.retrasoProduccion : config.retrasoDespacho, config.flujoInicial),
        // Pedidos del puesto anterior que aún no llegan (el minorista recibe al cliente sin retraso).
        pedidosEntrantes: i === 0 ? [] : lleno(config.retrasoPedido, config.flujoInicial),
        ultimoPedido: config.flujoInicial,
        historial: []
      });
    }
    return {
      ronda: indiceRonda,
      semana: 0,
      fase: 'espera',
      terminada: false,
      puestos: puestos,
      vendidas: 0,
      producidas: 0,
      semanaActual: null,
      pedidosSemana: [null, null, null, null],
      demandas: []
    };
  }

  // Pasos 1 a 4 para los cuatro puestos. Deja el estado listo para recibir pedidos.
  function iniciarSemana(config, estado) {
    if (estado.terminada) throw new Error('La ronda ya terminó');
    if (estado.fase === 'pedidos') throw new Error('Faltan pedidos de la semana en curso');
    var ronda = config.rondas[estado.ronda];
    estado.semana += 1;
    var d = demanda(ronda, estado.semana);
    estado.demandas.push(d);
    var resumen = [];
    // Orden ascendente: cada puesto ya recibió lo suyo antes de que su proveedor le despache.
    for (var i = 0; i < 4; i++) {
      var p = estado.puestos[i];
      var recibido = p.enCamino.shift();
      p.inventario += recibido;
      var pedido = i === 0 ? d : p.pedidosEntrantes.shift();
      var porEntregar = p.deuda + pedido;
      var despachado = Math.min(p.inventario, porEntregar);
      p.inventario -= despachado;
      p.deuda = porEntregar - despachado;
      if (i === 0) estado.vendidas += despachado;
      else estado.puestos[i - 1].enCamino.push(despachado);
      var costoSemana = p.inventario * config.costoInventario + p.deuda * config.costoDeuda;
      p.costo += costoSemana;
      resumen.push({
        recibido: recibido,
        pedido: pedido,
        despachado: despachado,
        inventario: p.inventario,
        deuda: p.deuda,
        costoSemana: costoSemana
      });
    }
    estado.semanaActual = resumen;
    estado.pedidosSemana = [null, null, null, null];
    estado.fase = 'pedidos';
    return estado;
  }

  function pedidoValido(cantidad) {
    return typeof cantidad === 'number' && isFinite(cantidad) &&
      Math.floor(cantidad) === cantidad && cantidad >= 0 && cantidad <= PEDIDO_MAXIMO;
  }

  // Paso 5 de un puesto.
  function registrarPedido(estado, indicePuesto, cantidad) {
    if (estado.fase !== 'pedidos') throw new Error('No se están recibiendo pedidos');
    if (!pedidoValido(cantidad)) throw new Error('El pedido debe ser un entero entre 0 y ' + PEDIDO_MAXIMO);
    estado.pedidosSemana[indicePuesto] = cantidad;
    return estado;
  }

  function faltanPedidos(estado) {
    var faltan = [];
    for (var i = 0; i < 4; i++) if (estado.pedidosSemana[i] === null) faltan.push(i);
    return faltan;
  }

  // Envía los pedidos de la semana y guarda el historial.
  function cerrarSemana(config, estado) {
    if (estado.fase !== 'pedidos') throw new Error('No hay semana abierta');
    if (faltanPedidos(estado).length) throw new Error('Faltan pedidos por registrar');
    var ronda = config.rondas[estado.ronda];
    for (var i = 0; i < 4; i++) {
      var p = estado.puestos[i];
      var cantidad = estado.pedidosSemana[i];
      if (i === 3) {
        p.enCamino.push(cantidad);
        estado.producidas += cantidad;
      } else {
        estado.puestos[i + 1].pedidosEntrantes.push(cantidad);
      }
      p.ultimoPedido = cantidad;
      var s = estado.semanaActual[i];
      p.historial.push({
        semana: estado.semana,
        recibido: s.recibido,
        pedido: s.pedido,
        despachado: s.despachado,
        inventario: s.inventario,
        deuda: s.deuda,
        pedidoHecho: cantidad,
        costoSemana: s.costoSemana
      });
    }
    estado.fase = 'espera';
    if (estado.semana >= ronda.semanas) estado.terminada = true;
    return estado;
  }

  function costoTotal(estado) {
    var total = 0;
    for (var i = 0; i < 4; i++) total += estado.puestos[i].costo;
    return total;
  }

  function productoEnSistema(estado) {
    var total = 0;
    for (var i = 0; i < 4; i++) {
      total += estado.puestos[i].inventario;
      for (var k = 0; k < estado.puestos[i].enCamino.length; k++) total += estado.puestos[i].enCamino[k];
    }
    return total;
  }

  // Políticas de pedido para pruebas y para la referencia de resultados.
  var POLITICAS = {
    // Pide exactamente lo que le pidieron.
    espejo: function (vista) { return vista.pedido; },
    // Siempre pide el flujo inicial.
    fija: function (vista) { return vista.flujoInicial; },
    // Reacciona al inventario sin mirar lo que ya viene en camino: amplifica.
    reactiva: function (vista) {
      var brecha = vista.inventarioInicial - (vista.inventario - vista.deuda);
      return Math.max(0, Math.round(vista.pedido + brecha / 2));
    }
  };

  // Juega una ronda completa con una política (una función o una por puesto).
  function simular(config, indiceRonda, politica) {
    var estado = crearRonda(config, indiceRonda);
    while (!estado.terminada) {
      iniciarSemana(config, estado);
      for (var i = 0; i < 4; i++) {
        var f = typeof politica === 'function' ? politica : politica[i];
        var s = estado.semanaActual[i];
        var cantidad = f({
          puesto: i,
          semana: estado.semana,
          pedido: s.pedido,
          inventario: s.inventario,
          deuda: s.deuda,
          recibido: s.recibido,
          enCamino: estado.puestos[i].enCamino.slice(),
          ultimoPedido: estado.puestos[i].ultimoPedido,
          inventarioInicial: config.inventarioInicial,
          flujoInicial: config.flujoInicial
        });
        registrarPedido(estado, i, Math.min(PEDIDO_MAXIMO, Math.max(0, Math.round(cantidad))));
      }
      cerrarSemana(config, estado);
    }
    return estado;
  }

  function costoReferencia(config, indiceRonda) {
    return costoTotal(simular(config, indiceRonda, POLITICAS.espejo));
  }

  // ---------- Código de resultado (8 caracteres, con verificación) ----------
  // 5 bits cadena · 16 bits costo ronda 1 · 14 bits costo ronda 2, en unidades de $500.
  var ALFABETO = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  var UNIDAD = 500;
  var TOPE_1 = 65535;
  var TOPE_2 = 16383;

  function verificador(grupos) {
    var suma = 0;
    for (var k = 0; k < grupos.length; k++) suma += (k + 1) * grupos[k];
    return suma % 31;
  }

  function codificar(datos) {
    var cadena = Math.max(1, Math.min(31, Math.round(datos.cadena)));
    var c1 = Math.max(0, Math.min(TOPE_1, Math.round(datos.costo1 / UNIDAD)));
    var c2 = Math.max(0, Math.min(TOPE_2, Math.round((datos.costo2 || 0) / UNIDAD)));
    var valor = cadena * 1073741824 + c1 * 16384 + c2; // 2^30 y 2^14
    var grupos = [];
    for (var k = 6; k >= 0; k--) grupos.push(Math.floor(valor / Math.pow(32, k)) % 32);
    grupos.push(verificador(grupos));
    var texto = '';
    for (var j = 0; j < grupos.length; j++) texto += ALFABETO.charAt(grupos[j]);
    return texto.slice(0, 4) + '-' + texto.slice(4);
  }

  function decodificar(texto) {
    var limpio = String(texto || '').toUpperCase().replace(/[^0-9A-Z]/g, '')
      .replace(/O/g, '0').replace(/[IL]/g, '1').replace(/U/g, 'V');
    if (limpio.length !== 8) return { ok: false, error: 'El código tiene 8 caracteres' };
    var grupos = [];
    for (var i = 0; i < 8; i++) {
      var v = ALFABETO.indexOf(limpio.charAt(i));
      if (v < 0) return { ok: false, error: 'Carácter no válido' };
      grupos.push(v);
    }
    if (verificador(grupos.slice(0, 7)) !== grupos[7]) return { ok: false, error: 'El código no coincide; revisa lo digitado' };
    var valor = 0;
    for (var k = 0; k < 7; k++) valor = valor * 32 + grupos[k];
    var cadena = Math.floor(valor / 1073741824);
    var resto = valor - cadena * 1073741824;
    var c1 = Math.floor(resto / 16384);
    var c2 = resto - c1 * 16384;
    if (cadena < 1) return { ok: false, error: 'Código no válido' };
    return { ok: true, cadena: cadena, costo1: c1 * UNIDAD, costo2: c2 * UNIDAD, codigo: limpio.slice(0, 4) + '-' + limpio.slice(4) };
  }

  function pesos(n) {
    var entero = Math.round(n);
    var signo = entero < 0 ? '-' : '';
    var s = String(Math.abs(entero));
    var salida = '';
    while (s.length > 3) {
      salida = '.' + s.slice(-3) + salida;
      s = s.slice(0, -3);
    }
    return signo + '$' + s + salida;
  }

  return {
    PUESTOS: PUESTOS,
    PEDIDO_MAXIMO: PEDIDO_MAXIMO,
    CONFIG_CLASE: CONFIG_CLASE,
    CONFIG_ORIGINAL: CONFIG_ORIGINAL,
    POLITICAS: POLITICAS,
    copiar: copiar,
    demanda: demanda,
    crearRonda: crearRonda,
    iniciarSemana: iniciarSemana,
    pedidoValido: pedidoValido,
    registrarPedido: registrarPedido,
    faltanPedidos: faltanPedidos,
    cerrarSemana: cerrarSemana,
    costoTotal: costoTotal,
    productoEnSistema: productoEnSistema,
    simular: simular,
    costoReferencia: costoReferencia,
    codificar: codificar,
    decodificar: decodificar,
    pesos: pesos
  };
});
