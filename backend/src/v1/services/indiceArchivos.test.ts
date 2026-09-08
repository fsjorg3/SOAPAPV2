import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ModeladoAnio } from '../types/modelado.types';

let indiceArchivos: typeof import('./indiceArchivos.service');

before(async () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'soapap-indice-'));
  const dirAnio = path.join(tmpRoot, 'informacion_financiera', '2026', 'Q1');
  fs.mkdirSync(dirAnio, { recursive: true });
  fs.writeFileSync(path.join(dirAnio, 'documento.pdf'), Buffer.from('contenido de prueba'));

  // PDF_STORAGE_PATH debe fijarse ANTES de importar el módulo, ya que pdfPath se resuelve una
  // sola vez al cargar indiceArchivos.service.
  process.env.PDF_STORAGE_PATH = tmpRoot;
  indiceArchivos = await import('./indiceArchivos.service');
});

function catalogoDePrueba(link: string | null, estado: 'publicado' | 'pendiente' | 'retirado' = 'publicado'): Map<number, ModeladoAnio> {
  return new Map([
    [
      2026,
      {
        año: 2026,
        secciones: [
          {
            id: 'seccion_prueba',
            titulo: 'Sección de prueba',
            orden: 1,
            documentos: [
              {
                id: 'documento_prueba',
                titulo: 'Documento de prueba',
                periodicidad: 'trimestral',
                orden: 1,
                periodos: [
                  { clave: 'Q1', nombre: 'Primer trimestre', link, estado },
                  { clave: 'Q2', nombre: 'Segundo trimestre', link: null, estado: 'pendiente' },
                  { clave: 'Q3', nombre: 'Tercer trimestre', link: null, estado: 'pendiente' },
                  { clave: 'Q4', nombre: 'Cuarto trimestre', link: null, estado: 'pendiente' },
                ],
              },
            ],
          },
        ],
      },
    ],
  ]);
}

test('determinismo: la misma ruta produce el mismo archivoId en dos construcciones del índice', () => {
  const catalogo = catalogoDePrueba('Q1/documento.pdf');

  indiceArchivos.construirIndice(catalogo);
  const archivo1 = indiceArchivos.resolverArchivoPublico(2026, 'Q1/documento.pdf');

  indiceArchivos.construirIndice(catalogo);
  const archivo2 = indiceArchivos.resolverArchivoPublico(2026, 'Q1/documento.pdf');

  assert.ok(archivo1 && archivo2);
  assert.strictEqual(archivo1.id, archivo2.id);
});

test('un link con intento de escape de directorio se descarta sin lanzar excepción', () => {
  // informacion_financiera/{año}/<link> está 2 niveles bajo pdfPath (la raíz de /assets); se
  // necesitan 3 "../" para escapar realmente de esa raíz, no solo de la carpeta del año.
  const linkFueraDeRango = '../../../fuera-de-rango.pdf';
  const catalogo = catalogoDePrueba(linkFueraDeRango);

  assert.doesNotThrow(() => indiceArchivos.construirIndice(catalogo));
  assert.strictEqual(indiceArchivos.resolverArchivoPublico(2026, linkFueraDeRango), null);
});

test('un periodo retirado se indexa pero queda marcado como retirado', () => {
  const catalogo = catalogoDePrueba('Q1/documento.pdf', 'retirado');
  indiceArchivos.construirIndice(catalogo);

  const archivo = indiceArchivos.resolverArchivoPublico(2026, 'Q1/documento.pdf');
  assert.ok(archivo);

  const entrada = indiceArchivos.resolverPorArchivoId(archivo!.id);
  assert.strictEqual(entrada?.estado, 'retirado');
});

test('un archivoId inexistente no resuelve a ninguna entrada', () => {
  indiceArchivos.construirIndice(catalogoDePrueba('Q1/documento.pdf'));
  assert.strictEqual(indiceArchivos.resolverPorArchivoId('archivo_000000000000'), undefined);
});

test('un periodo pendiente (sin link) nunca genera entrada en el índice', () => {
  const catalogo = catalogoDePrueba(null, 'pendiente');
  indiceArchivos.construirIndice(catalogo);
  assert.strictEqual(indiceArchivos.resolverArchivoPublico(2026, 'Q1/documento.pdf'), null);
});
