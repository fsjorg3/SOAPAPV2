import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { normalizarTitulo, slugify, transformarConvocatorias } from './migrar-convocatorias';

const RUTA_SCHEMA = path.resolve(__dirname, '..', 'documentacion', 'modelado_convocatorias.schema.json');

function compilarValidador() {
  const schema = JSON.parse(fs.readFileSync(RUTA_SCHEMA, 'utf-8'));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  return ajv.compile(schema);
}

// Fixture que reproduce, con los mismos valores crudos, el problema real de categoría
// inconsistente ("Adquisición" vs "Adquisiciones") encontrado en convocatorias.json.
function fixtureOrigen() {
  return [
    {
      id: 'SOAPAP-GAF-LP-ADQ-2026-002',
      expediente: 'LICITACIÓN PÚBLICA NACIONAL NÚMERO SOAPAP-GAF-ADQ-2026-002',
      year: 2026,
      category: 'Adquisiciones',
      description: 'Servicio de suministro de agua potable en vehículos cisterna.',
      filename: 'SOAPAP-GAF-LP-ADQ-2026-002.pdf',
    },
    {
      id: 'SOAPAP-OP-LPE-2026-001',
      expediente: 'LICITACIÓN PÚBLICA ESTATAL NÚMERO SOAPAP-OP-LPE-2026-001',
      year: 2026,
      category: 'Obra pública',
      description: 'Rehabilitación y mantenimiento de tres pozos.',
      filename: 'SOAPAP-OP-LPE-2026-001.pdf',
    },
    {
      id: 'SOAPAP-GAF-LP-ADQ-2026-001',
      expediente: 'LICITACIÓN PÚBLICA NACIONAL NÚMERO SOAPAP-GAF-LP-ADQ-2026-001',
      year: 2026,
      category: 'Adquisición',
      description: 'Adquisición de vehículos para las diversas áreas del SOAPAP.',
      filename: 'SOAPAP-GAF-LP-ADQ-2026-001(2).pdf',
    },
  ];
}

test('transformarConvocatorias colapsa "Adquisición" y "Adquisiciones" a la misma categoría', () => {
  const { data, pendientes } = transformarConvocatorias(fixtureOrigen());

  assert.strictEqual(pendientes.length, 0);
  assert.strictEqual(data.convocatorias.length, 3);

  const categorias = new Set(data.convocatorias.map((c) => c.categoria));
  assert.deepStrictEqual([...categorias].sort(), ['adquisiciones', 'obra_publica']);
});

test('transformarConvocatorias aplica el renombre conocido al link de la convocatoria con paréntesis', () => {
  const { data } = transformarConvocatorias(fixtureOrigen());
  const convocatoria = data.convocatorias.find((c) => c.id === 'soapap_gaf_lp_adq_2026_001');

  assert.ok(convocatoria);
  assert.strictEqual(convocatoria?.link, 'SOAPAP-GAF-LP-ADQ-2026-001.pdf');
});

test('transformarConvocatorias reporta como pendiente una categoría no reconocida y la excluye del catálogo', () => {
  const origen = [...fixtureOrigen(), {
    id: 'SOAPAP-XX-2026-999',
    expediente: 'CONVOCATORIA DE PRUEBA',
    year: 2026,
    category: 'Categoría inventada',
    description: 'Descripción de prueba.',
    filename: 'prueba.pdf',
  }];

  const { data, pendientes } = transformarConvocatorias(origen);

  assert.strictEqual(data.convocatorias.length, 3, 'la convocatoria con categoría no reconocida no debe colarse en el catálogo');
  assert.strictEqual(
    pendientes.some((p) => p.tipo === 'categoria_no_reconocida' && p.referencia === 'SOAPAP-XX-2026-999'),
    true
  );
});

test('un fixture de convocatorias bien formado valida contra modelado_convocatorias.schema.json (incluye guiones en el nombre de archivo)', () => {
  const { data } = transformarConvocatorias(fixtureOrigen());
  const validar = compilarValidador();
  assert.strictEqual(validar(data), true, JSON.stringify(validar.errors));
});

test('normalizarTitulo/slugify ignoran acentos y mayúsculas', () => {
  assert.strictEqual(normalizarTitulo('SOAPAP-OP-LPE-2026-001'), normalizarTitulo('soapap op lpe 2026 001'));
  assert.strictEqual(slugify('SOAPAP-OP-LPE-2026-001'), 'soapap_op_lpe_2026_001');
});
