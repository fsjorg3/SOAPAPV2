import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ModeladoConvocatorias } from '../types/modeladoConvocatorias.types';

let indiceArchivosConvocatorias: typeof import('./indiceArchivosConvocatorias.service');

before(async () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'soapap-indice-convocatorias-'));
  const dirConvocatorias = path.join(tmpRoot, 'convocatorias');
  fs.mkdirSync(dirConvocatorias, { recursive: true });
  fs.writeFileSync(path.join(dirConvocatorias, 'convocatoria.pdf'), Buffer.from('contenido de prueba'));

  // PDF_STORAGE_PATH debe fijarse ANTES de importar el módulo, ya que pdfPath se resuelve una
  // sola vez al cargar indiceArchivos.service (del que este módulo reutiliza estaContenidaEnPdfPath).
  process.env.PDF_STORAGE_PATH = tmpRoot;
  indiceArchivosConvocatorias = await import('./indiceArchivosConvocatorias.service');
});

function catalogoDePrueba(
  link: string | null,
  estado: 'publicado' | 'pendiente' | 'retirado' = 'publicado'
): ModeladoConvocatorias {
  return {
    convocatorias: [
      {
        id: 'convocatoria_prueba',
        expediente: 'Convocatoria de prueba',
        anio: 2026,
        categoria: 'obra_publica',
        descripcion: 'Descripción de prueba.',
        orden: 1,
        link,
        estado,
      },
    ],
  };
}

test('determinismo: la misma ruta produce el mismo archivoId en dos construcciones del índice', () => {
  const catalogo = catalogoDePrueba('convocatoria.pdf');

  indiceArchivosConvocatorias.construirIndice(catalogo);
  const archivo1 = indiceArchivosConvocatorias.resolverArchivoPublico('convocatoria.pdf');

  indiceArchivosConvocatorias.construirIndice(catalogo);
  const archivo2 = indiceArchivosConvocatorias.resolverArchivoPublico('convocatoria.pdf');

  assert.ok(archivo1 && archivo2);
  assert.strictEqual(archivo1.id, archivo2.id);
});

test('un link con intento de escape de directorio se descarta sin lanzar excepción', () => {
  const linkFueraDeRango = '../../../fuera-de-rango.pdf';
  const catalogo = catalogoDePrueba(linkFueraDeRango);

  assert.doesNotThrow(() => indiceArchivosConvocatorias.construirIndice(catalogo));
  assert.strictEqual(indiceArchivosConvocatorias.resolverArchivoPublico(linkFueraDeRango), null);
});

test('una convocatoria retirada se indexa pero queda marcada como retirada', () => {
  const catalogo = catalogoDePrueba('convocatoria.pdf', 'retirado');
  indiceArchivosConvocatorias.construirIndice(catalogo);

  const archivo = indiceArchivosConvocatorias.resolverArchivoPublico('convocatoria.pdf');
  assert.ok(archivo);

  const entrada = indiceArchivosConvocatorias.resolverPorArchivoId(archivo!.id);
  assert.strictEqual(entrada?.estado, 'retirado');
});

test('un archivoId inexistente no resuelve a ninguna entrada', () => {
  indiceArchivosConvocatorias.construirIndice(catalogoDePrueba('convocatoria.pdf'));
  assert.strictEqual(indiceArchivosConvocatorias.resolverPorArchivoId('archivo_000000000000'), undefined);
});

test('una convocatoria pendiente (sin link) nunca genera entrada en el índice', () => {
  const catalogo = catalogoDePrueba(null, 'pendiente');
  indiceArchivosConvocatorias.construirIndice(catalogo);
  assert.strictEqual(indiceArchivosConvocatorias.resolverArchivoPublico('convocatoria.pdf'), null);
});
