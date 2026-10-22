import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import {
  normalizarTitulo,
  transformarLegado,
  type EntradaCanonicaSeccion,
  type ModeladoLegado,
} from './migrar-informacion-financiera';

const RUTA_SCHEMA = path.resolve(__dirname, '..', 'documentacion', 'modelado_financiero.schema.json');

function compilarValidador() {
  const schema = JSON.parse(fs.readFileSync(RUTA_SCHEMA, 'utf-8'));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  return ajv.compile(schema);
}

function fixtureValido() {
  return {
    año: 2099,
    secciones: [
      {
        id: 'seccion_prueba',
        titulo: 'Sección de prueba',
        orden: 1,
        documentos: [
          {
            id: 'documento_prueba',
            titulo: 'Documento de prueba',
            periodicidad: 'anual',
            orden: 1,
            periodos: [{ clave: 'ANUAL', nombre: 'Ejercicio fiscal 2099', link: 'documento.pdf', estado: 'publicado' }],
          },
        ],
      },
    ],
  };
}

// Caso obligatorio 10 del plan: el script de migración, sobre un fixture pequeño, produce (o
// rechaza) una salida que valida contra modelado_financiero.schema.json — se ejercita aquí la
// misma combinación Ajv2020 + schema que usa el script real.
test('un fixture bien formado valida contra modelado_financiero.schema.json', () => {
  const validar = compilarValidador();
  const valido = validar(fixtureValido());
  assert.strictEqual(valido, true, JSON.stringify(validar.errors));
});

test('un periodo publicado sin link no valida (regla condicional estado<->link)', () => {
  const validar = compilarValidador();
  const fixture = fixtureValido();
  fixture.secciones[0].documentos[0].periodos[0].link = null as unknown as string;
  const valido = validar(fixture);
  assert.strictEqual(valido, false);
});

test('un id de sección con mayúsculas no valida (patrón Identificador)', () => {
  const validar = compilarValidador();
  const fixture = fixtureValido();
  fixture.secciones[0].id = 'SeccionPrueba';
  const valido = validar(fixture);
  assert.strictEqual(valido, false);
});

// --- Cobertura del pivote legado -> modelado (subcomando `transformar`) ---

const MAPA_CANONICO_VACIO: Map<string, EntradaCanonicaSeccion> = new Map();

test('transformarLegado pivota sección->periodo->documentos a sección->documento->periodos (trimestral)', () => {
  const legado: ModeladoLegado = {
    año: 2099,
    secciones: [
      {
        titulo: 'Sección de prueba',
        periodos: [
          { periodo: 'Primer trimestre', documentos: [{ titulo: 'Documento A', link: 'q1.pdf' }] },
          { periodo: 'Segundo trimestre', documentos: [{ titulo: 'Documento A', link: 'q2.pdf' }] },
          { periodo: 'Tercer trimestre', documentos: [{ titulo: 'Documento A', link: '' }] },
          { periodo: 'Cuarto trimestre', documentos: [{ titulo: 'Documento A', link: '' }] },
        ],
      },
    ],
  };

  const { data, pendientes } = transformarLegado(legado, 2099, MAPA_CANONICO_VACIO);

  assert.strictEqual(data.secciones.length, 1);
  const documento = data.secciones[0].documentos[0];
  assert.strictEqual(documento.periodicidad, 'trimestral');
  assert.strictEqual(documento.periodos.length, 4);
  assert.deepStrictEqual(
    documento.periodos.map((p) => [p.clave, p.estado, p.link]),
    [
      ['Q1', 'publicado', 'q1.pdf'],
      ['Q2', 'publicado', 'q2.pdf'],
      ['Q3', 'pendiente', null],
      ['Q4', 'pendiente', null],
    ]
  );
  assert.strictEqual(pendientes.length, 0);

  const validar = compilarValidador();
  assert.strictEqual(validar(data), true, JSON.stringify(validar.errors));
});

test('normalizarTitulo une títulos con una palabra duplicada al inicio ("Estado Estado X" y "Estado X")', () => {
  assert.strictEqual(normalizarTitulo('Estado Estado Analítico de la Deuda'), normalizarTitulo('Estado Analítico de la Deuda'));
});

test('transformarLegado no parte en dos documentos un título con la palabra duplicada en algunos trimestres', () => {
  const legado: ModeladoLegado = {
    año: 2099,
    secciones: [
      {
        titulo: 'Sección de prueba',
        periodos: [
          { periodo: 'Primer trimestre', documentos: [{ titulo: 'Estado Analítico de la Deuda', link: 'q1.pdf' }] },
          { periodo: 'Segundo trimestre', documentos: [{ titulo: 'Estado Estado Analítico de la Deuda', link: 'q2.pdf' }] },
          { periodo: 'Tercer trimestre', documentos: [{ titulo: 'Estado Estado Analítico de la Deuda', link: '' }] },
          { periodo: 'Cuarto trimestre', documentos: [{ titulo: 'Estado Estado Analítico de la Deuda', link: '' }] },
        ],
      },
    ],
  };

  const { data } = transformarLegado(legado, 2099, MAPA_CANONICO_VACIO);

  assert.strictEqual(data.secciones[0].documentos.length, 1);
  assert.strictEqual(data.secciones[0].documentos[0].titulo, 'Estado Analítico de la Deuda');
  assert.strictEqual(data.secciones[0].documentos[0].periodos.length, 4);
});

test('transformarLegado descarta el documento placeholder (título igual al de la sección) cuando hay otros documentos reales', () => {
  const legado: ModeladoLegado = {
    año: 2099,
    secciones: [
      {
        titulo: 'Información de prueba',
        periodos: [
          {
            periodo: 'Información de prueba',
            documentos: [
              { titulo: 'Información de prueba', link: '' },
              { titulo: 'Programa Anual de Evaluación 2099', link: 'programa.pdf' },
            ],
          },
        ],
      },
    ],
  };

  const { data } = transformarLegado(legado, 2099, MAPA_CANONICO_VACIO);

  const seccion = data.secciones[0];
  assert.strictEqual(seccion.documentos.length, 1);
  assert.strictEqual(seccion.documentos[0].titulo, 'Programa Anual de Evaluación');
  assert.strictEqual(seccion.documentos[0].periodicidad, 'anual');
  assert.strictEqual(seccion.documentos[0].periodos[0].clave, 'ANUAL');

  const validar = compilarValidador();
  assert.strictEqual(validar(data), true, JSON.stringify(validar.errors));
});
