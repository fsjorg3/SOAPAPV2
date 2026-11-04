import test from 'node:test';
import assert from 'node:assert/strict';
import { TIPOS_ESTABLECIMIENTO, GRUPOS_COMUNES, DOCUMENTO_BOLETAS } from '../../src/config/permisoDescarga.ts';
import {
  armarCalendario,
  armarGruposDocumentos,
  armarTiraCalendario,
  contarDocumentos,
  resumenPeriodicidad,
} from '../../src/utils/permisoDescarga.ts';

const tipo = (id) => TIPOS_ESTABLECIMIENTO.find((t) => t.id === id);
const giro = (tipoId, giroId) => tipo(tipoId).giros.find((g) => g.id === giroId);
const comunes = contarDocumentos(GRUPOS_COMUNES);

test('catálogo: 6 tipos y 24 giros con ids únicos', () => {
  assert.equal(TIPOS_ESTABLECIMIENTO.length, 6);
  const ids = TIPOS_ESTABLECIMIENTO.flatMap((t) => t.giros.map((g) => g.id));
  assert.equal(ids.length, 24);
  assert.equal(new Set(ids).size, ids.length);
});

test('todo giro produce al menos un grupo de documentos', () => {
  for (const t of TIPOS_ESTABLECIMIENTO) {
    for (const g of t.giros) assert.ok(contarDocumentos(armarGruposDocumentos(t, g)) > 0, `${t.id}/${g.id}`);
  }
});

test('alimentos: comunes + recibo, sin grupo propio', () => {
  const grupos = armarGruposDocumentos(tipo('alimentos'), giro('alimentos', 'restaurantes'));
  assert.equal(grupos.length, 4);
  assert.equal(grupos.at(-1).titulo, 'Al final');
  assert.equal(contarDocumentos(grupos), comunes + 1);
});

test('transporte: solo documentos del vehículo, sin comunes ni recibo', () => {
  const grupos = armarGruposDocumentos(tipo('transporte'), giro('transporte', 'pipas'));
  assert.deepEqual(grupos.map((g) => g.titulo), ['Del vehículo y del transportista']);
  assert.equal(contarDocumentos(grupos), 10);
});

test('PD 5 a PD 7: boletas solo en los giros que las piden', () => {
  const conBoletas = armarGruposDocumentos(tipo('automotriz'), giro('automotriz', 'gasolineras'));
  const sinBoletas = armarGruposDocumentos(tipo('automotriz'), giro('automotriz', 'agencias'));
  assert.ok(conBoletas[3].documentos.includes(DOCUMENTO_BOLETAS));
  assert.ok(!sinBoletas[3].documentos.includes(DOCUMENTO_BOLETAS));
  assert.equal(contarDocumentos(conBoletas), comunes + 5 + 1 + 1);
  assert.equal(contarDocumentos(sinBoletas), comunes + 5 + 1);
});

test('plazas: administración y local tienen grupos distintos', () => {
  const admin = armarGruposDocumentos(tipo('plazas'), giro('plazas', 'plaza-admin'));
  const local = armarGruposDocumentos(tipo('plazas'), giro('plazas', 'plaza-local'));
  assert.equal(admin[3].titulo, 'Como administración de la plaza');
  assert.equal(local[3].titulo, 'Como local dentro de la plaza');
  assert.equal(contarDocumentos(admin), comunes + 2 + 1);
  assert.equal(contarDocumentos(local), comunes + 6 + 1);
});

test('calendario: restaurante con dos tiras (cada 3 meses y cada 4 al renovar)', () => {
  const tiras = armarCalendario(giro('alimentos', 'restaurantes'));
  assert.deepEqual(tiras.map((t) => t.etiqueta), ['Permiso nuevo', 'Renovación']);
  assert.deepEqual(tiras[0].meses.filter((m) => m.entrega).map((m) => m.numero), [1, 4, 7, 10]);
  assert.deepEqual(tiras[1].meses.filter((m) => m.entrega).map((m) => m.numero), [1, 5, 9]);
  assert.equal(resumenPeriodicidad(giro('alimentos', 'restaurantes')), 'Cada 3 meses al inicio; cada 4 meses al renovar');
});

test('calendario: una tira por periodicidad simple, con entregas al año correctas', () => {
  for (const [clave, entregas] of [['m', 12], ['t', 4], ['c', 3], ['s', 2]]) {
    const tira = armarTiraCalendario('Periodicidad', clave);
    assert.equal(tira.meses.length, 12);
    assert.equal(tira.meses.filter((m) => m.entrega).length, entregas);
    assert.equal(tira.entregasAlAnio, entregas);
  }
});

test('giros sin periodicidad: sin calendario ni resumen', () => {
  for (const g of [giro('plazas', 'plaza-admin'), giro('plazas', 'plaza-local'), giro('transporte', 'pipas')]) {
    assert.deepEqual(armarCalendario(g), []);
    assert.equal(resumenPeriodicidad(g), null);
  }
});
