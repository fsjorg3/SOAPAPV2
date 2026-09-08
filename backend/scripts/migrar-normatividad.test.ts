import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { normalizarTitulo, slugify, transformarNormatividad, transformarTitulo } from './migrar-normatividad';

const RUTA_SCHEMA_NORMATIVIDAD = path.resolve(__dirname, '..', 'documentacion', 'modelado_normatividad.schema.json');
const RUTA_SCHEMA_TITULO = path.resolve(__dirname, '..', 'documentacion', 'modelado_titulo_concesion.schema.json');

function compilarValidador(rutaSchema: string) {
  const schema = JSON.parse(fs.readFileSync(rutaSchema, 'utf-8'));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  return ajv.compile(schema);
}

// Fixture que reproduce, con nombres genéricos, la misma forma que normatividad.json real: 15
// documentos repartidos en las 4 secciones confirmadas con el usuario (4/5/3/3), incluyendo el
// caso "Programa Anual de Desarrollo Archivístico 2026" que se reclasifica a PADA y pierde el año.
function fixtureOrigenNormatividad() {
  return [
    { titulo: 'DECRETO DE CREACIÓN', filename: 'decreto_creacion_soapap.pdf' },
    { titulo: 'LEY DEL AGUA PARA EL ESTADO DE PUEBLA', filename: 'ley_del_agua_puebla.pdf' },
    { titulo: 'REGLAMENTO INTERNO', filename: 'reglamento_interior_soapap.pdf' },
    { titulo: 'REFORMAS AL REGLAMENTO INTERNO', filename: 'reformas_reglamento_interior_soapap.pdf' },
    { titulo: 'CÓDIGO DE CONDUCTA', filename: 'codigo_conducta_soapap.pdf' },
    { titulo: 'CÓDIGO DE ÉTICA', filename: 'codigo_etica_soapap.pdf' },
    { titulo: 'ACUERDO GENERAL', filename: 'acuerdo_general.pdf' },
    { titulo: 'DISPOSICIONES PARA EL ARCHIVO CONTABLE GUBERNAMENTAL', filename: 'disposiciones_para_archivo_contable_gubernamental.pdf' },
    { titulo: 'DECRETO HONORABLE CONGRESO DEL ESTADO', filename: 'decreto_honorable_congreso_estado.pdf' },
    { titulo: 'LINEAMIENTOS DE APOYOS SOCIALES', filename: 'lineamientos_apoyos_sociales.pdf' },
    { titulo: 'PADRÓN DE PERMISOS DE DESCARGAS', filename: 'padron_permisos_descargas.pdf' },
    { titulo: 'REGISTRO Y VALUACIÓN DE PATRIMONIO', filename: 'registro_valuacion_patrimonio.pdf' },
    { titulo: 'PADA 2024', filename: 'pada2024.pdf' },
    { titulo: 'PADA 2025', filename: 'pada2025.pdf' },
    { titulo: 'PROGRAMA ANUAL DE DESARROLLO ARCHIVÍSTICO 2026', filename: 'programa_anual_desarrollo_archivistico_2026.pdf' },
  ];
}

test('transformarNormatividad produce 4 secciones y 15 documentos con la agrupación confirmada', () => {
  const { data, pendientes } = transformarNormatividad(fixtureOrigenNormatividad());

  assert.strictEqual(pendientes.length, 0);
  assert.strictEqual(data.secciones.length, 4);

  const totalDocumentos = data.secciones.reduce((acc, s) => acc + s.documentos.length, 0);
  assert.strictEqual(totalDocumentos, 15);

  const porTitulo = new Map(data.secciones.map((s) => [s.titulo, s]));
  assert.strictEqual(porTitulo.get('Marco jurídico institucional')?.documentos.length, 4);
  assert.strictEqual(porTitulo.get('Normatividad institucional')?.documentos.length, 5);
  assert.strictEqual(porTitulo.get('Lineamientos y disposiciones')?.documentos.length, 3);
  assert.strictEqual(porTitulo.get('Programas anuales (PADA)')?.documentos.length, 3);
});

test('transformarNormatividad reclasifica "Programa Anual de Desarrollo Archivístico 2026" a PADA y quita el año del título', () => {
  const { data } = transformarNormatividad(fixtureOrigenNormatividad());
  const pada = data.secciones.find((s) => s.titulo === 'Programas anuales (PADA)');
  const documento = pada?.documentos.find((d) => d.link === 'programa_anual_desarrollo_archivistico_2026.pdf');

  assert.ok(documento, 'el documento debe estar en el grupo PADA');
  assert.strictEqual(documento?.titulo, 'Programa Anual de Desarrollo Archivístico');

  const lineamientos = data.secciones.find((s) => s.titulo === 'Lineamientos y disposiciones');
  assert.strictEqual(
    lineamientos?.documentos.some((d) => d.link === 'programa_anual_desarrollo_archivistico_2026.pdf'),
    false
  );
});

test('transformarNormatividad reporta como pendiente un documento de origen no reclamado por ninguna sección', () => {
  const origen = [...fixtureOrigenNormatividad(), { titulo: 'DOCUMENTO SUELTO SIN GRUPO', filename: 'suelto.pdf' }];
  const { data, pendientes } = transformarNormatividad(origen);

  const totalDocumentos = data.secciones.reduce((acc, s) => acc + s.documentos.length, 0);
  assert.strictEqual(totalDocumentos, 15, 'el documento sin grupo no debe colarse en el catálogo');
  assert.strictEqual(pendientes.some((p) => p.tipo === 'documento_no_agrupado' && p.referencia === 'DOCUMENTO SUELTO SIN GRUPO'), true);
});

test('transformarNormatividad reporta como pendiente una entrada de la tabla de agrupación sin origen real', () => {
  const origenIncompleto = fixtureOrigenNormatividad().filter((d) => d.titulo !== 'PADA 2025');
  const { data, pendientes } = transformarNormatividad(origenIncompleto);

  const pada = data.secciones.find((s) => s.titulo === 'Programas anuales (PADA)');
  assert.strictEqual(pada?.documentos.length, 2, 'PADA 2025 no debe aparecer si no está en el origen');
  assert.strictEqual(
    pendientes.some((p) => p.tipo === 'entrada_agrupacion_sin_origen' && p.referencia.includes('PADA 2025')),
    true
  );
});

test('un fixture de normatividad bien formado valida contra modelado_normatividad.schema.json', () => {
  const { data } = transformarNormatividad(fixtureOrigenNormatividad());
  const validar = compilarValidador(RUTA_SCHEMA_NORMATIVIDAD);
  assert.strictEqual(validar(data), true, JSON.stringify(validar.errors));
});

// --- Título de concesión ---

function fixtureOrigenTitulo() {
  return [
    {
      titulo: 'TÍTULO DE CONCESIÓN',
      documentos: [
        { titulo: 'TÍTULO DE CONCESIÓN', link: 't1.pdf' },
        { titulo: 'ANEXO 1', link: 't1_anexo-1.pdf' },
        { titulo: 'ANEXO 11', link: 't1_anexo11.pdf' },
        { titulo: 'ANEXO 2', link: 't1_anexo-2.pdf' },
      ],
    },
    {
      titulo: 'MODIFICACIÓN AL TÍTULO DE CONCESIÓN',
      documentos: [{ titulo: 'MODIFICACIÓN AL TÍTULO DE CONCESIÓN', link: 't1-1.pdf' }],
    },
  ];
}

test('transformarTitulo separa el primer documento como principal y el resto como anexos', () => {
  const { data } = transformarTitulo(fixtureOrigenTitulo());

  assert.strictEqual(data.grupos.length, 2);
  assert.strictEqual(data.grupos[0].documentoPrincipal.link, 't1.pdf');
  assert.strictEqual(data.grupos[0].anexos.length, 3);
  assert.strictEqual(data.grupos[1].documentoPrincipal.link, 't1-1.pdf');
  assert.strictEqual(data.grupos[1].anexos.length, 0);
});

test('transformarTitulo obtiene el orden del anexo "ANEXO 11" desde el texto del título, no de su posición en el array', () => {
  const { data } = transformarTitulo(fixtureOrigenTitulo());
  const anexo11 = data.grupos[0].anexos.find((a) => a.link === 't1_anexo11.pdf');

  assert.ok(anexo11);
  assert.strictEqual(anexo11?.id, 'anexo_11');
  assert.strictEqual(anexo11?.orden, 11);
});

test('un fixture de título de concesión bien formado valida contra modelado_titulo_concesion.schema.json', () => {
  const { data } = transformarTitulo(fixtureOrigenTitulo());
  const validar = compilarValidador(RUTA_SCHEMA_TITULO);
  assert.strictEqual(validar(data), true, JSON.stringify(validar.errors));
});

test('normalizarTitulo/slugify ignoran acentos y mayúsculas', () => {
  assert.strictEqual(normalizarTitulo('CÓDIGO DE ÉTICA'), normalizarTitulo('codigo de etica'));
  assert.strictEqual(slugify('Código de Ética'), 'codigo_de_etica');
});
