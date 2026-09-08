import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ModeladoNormatividad, ModeladoTitulo } from '../types/modeladoNormatividad.types';

let indiceArchivosNormatividad: typeof import('./indiceArchivosNormatividad.service');

before(async () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'soapap-indice-normatividad-'));
  const dirNormatividad = path.join(tmpRoot, 'normatividad');
  fs.mkdirSync(dirNormatividad, { recursive: true });
  fs.writeFileSync(path.join(dirNormatividad, 'documento.pdf'), Buffer.from('contenido de prueba'));

  // PDF_STORAGE_PATH debe fijarse ANTES de importar el módulo, ya que pdfPath se resuelve una
  // sola vez al cargar indiceArchivos.service (del que este módulo reutiliza estaContenidaEnPdfPath).
  process.env.PDF_STORAGE_PATH = tmpRoot;
  indiceArchivosNormatividad = await import('./indiceArchivosNormatividad.service');
});

function catalogoNormatividadDePrueba(
  link: string | null,
  estado: 'publicado' | 'pendiente' | 'retirado' = 'publicado'
): ModeladoNormatividad {
  return {
    secciones: [
      {
        id: 'seccion_prueba',
        titulo: 'Sección de prueba',
        descripcion: null,
        orden: 1,
        documentos: [{ id: 'documento_prueba', titulo: 'Documento de prueba', orden: 1, link, estado }],
      },
    ],
  };
}

const TITULO_VACIO: ModeladoTitulo = { grupos: [] };
const NORMATIVIDAD_VACIA: ModeladoNormatividad = { secciones: [] };

test('determinismo: la misma ruta produce el mismo archivoId en dos construcciones del índice', () => {
  const catalogo = catalogoNormatividadDePrueba('documento.pdf');

  indiceArchivosNormatividad.construirIndice(catalogo, TITULO_VACIO);
  const archivo1 = indiceArchivosNormatividad.resolverArchivoPublico('normatividad', 'documento.pdf');

  indiceArchivosNormatividad.construirIndice(catalogo, TITULO_VACIO);
  const archivo2 = indiceArchivosNormatividad.resolverArchivoPublico('normatividad', 'documento.pdf');

  assert.ok(archivo1 && archivo2);
  assert.strictEqual(archivo1.id, archivo2.id);
});

test('un link con intento de escape de directorio se descarta sin lanzar excepción', () => {
  const linkFueraDeRango = '../../../fuera-de-rango.pdf';
  const catalogo = catalogoNormatividadDePrueba(linkFueraDeRango);

  assert.doesNotThrow(() => indiceArchivosNormatividad.construirIndice(catalogo, TITULO_VACIO));
  assert.strictEqual(indiceArchivosNormatividad.resolverArchivoPublico('normatividad', linkFueraDeRango), null);
});

test('un documento retirado se indexa pero queda marcado como retirado', () => {
  const catalogo = catalogoNormatividadDePrueba('documento.pdf', 'retirado');
  indiceArchivosNormatividad.construirIndice(catalogo, TITULO_VACIO);

  const archivo = indiceArchivosNormatividad.resolverArchivoPublico('normatividad', 'documento.pdf');
  assert.ok(archivo);

  const entrada = indiceArchivosNormatividad.resolverPorArchivoId(archivo!.id);
  assert.strictEqual(entrada?.estado, 'retirado');
});

test('un archivoId inexistente no resuelve a ninguna entrada', () => {
  indiceArchivosNormatividad.construirIndice(catalogoNormatividadDePrueba('documento.pdf'), TITULO_VACIO);
  assert.strictEqual(indiceArchivosNormatividad.resolverPorArchivoId('archivo_000000000000'), undefined);
});

test('un documento pendiente (sin link) nunca genera entrada en el índice', () => {
  const catalogo = catalogoNormatividadDePrueba(null, 'pendiente');
  indiceArchivosNormatividad.construirIndice(catalogo, TITULO_VACIO);
  assert.strictEqual(indiceArchivosNormatividad.resolverArchivoPublico('normatividad', 'documento.pdf'), null);
});

test('título de concesión indexa el documento principal y los anexos bajo el prefijo "titulo"', () => {
  const titulo: ModeladoTitulo = {
    grupos: [
      {
        id: 'titulo_de_concesion',
        titulo: 'Título de concesión',
        orden: 1,
        documentoPrincipal: { id: 'documento_principal', titulo: 'Título de concesión', orden: 1, link: 'documento.pdf', estado: 'publicado' },
        anexos: [],
      },
    ],
  };

  indiceArchivosNormatividad.construirIndice(NORMATIVIDAD_VACIA, titulo);

  const archivoPrincipal = indiceArchivosNormatividad.resolverArchivoPublico('titulo', 'documento.pdf');
  assert.ok(archivoPrincipal);
  // El mismo nombre de archivo bajo un catálogo distinto ('normatividad') no debe resolver aquí.
  assert.strictEqual(indiceArchivosNormatividad.resolverArchivoPublico('normatividad', 'documento.pdf'), null);
});
