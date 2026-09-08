import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

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
