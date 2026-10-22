import fs from 'fs';
import path from 'path';
import { ModeladoConvocatorias } from '../types/modeladoConvocatorias.types';
import { DatosConvocatorias } from '../types/api.types';
import * as indiceArchivosConvocatorias from './indiceArchivosConvocatorias.service';

const pdfPath = path.resolve(process.env.PDF_STORAGE_PATH || './assets');

let catalogoConvocatorias: ModeladoConvocatorias = { convocatorias: [] };

/**
 * Carga en memoria assets/convocatorias/convocatorias.modelado.json (si existe) y dispara la
 * construcción del índice de archivos de convocatorias. Se llama una sola vez desde index.ts
 * antes de app.listen.
 */
export function inicializarCatalogoConvocatorias(): void {
  const rutaModelado = path.join(pdfPath, 'convocatorias', 'convocatorias.modelado.json');

  if (fs.existsSync(rutaModelado)) {
    const contenido = fs.readFileSync(rutaModelado, 'utf-8');
    catalogoConvocatorias = JSON.parse(contenido) as ModeladoConvocatorias;
  } else {
    console.warn(`[v1] No existe ${rutaModelado}; el catálogo de convocatorias quedará vacío.`);
    catalogoConvocatorias = { convocatorias: [] };
  }

  indiceArchivosConvocatorias.construirIndice(catalogoConvocatorias);
}

export function obtenerConvocatorias(): DatosConvocatorias {
  const convocatorias = [...catalogoConvocatorias.convocatorias]
    .sort((a, b) => a.orden - b.orden)
    .map((c) => ({
      id: c.id,
      expediente: c.expediente,
      anio: c.anio,
      categoria: c.categoria,
      descripcion: c.descripcion,
      estado: c.estado,
      archivo: c.estado === 'publicado' && c.link ? indiceArchivosConvocatorias.resolverArchivoPublico(c.link) : null,
    }));

  return { convocatorias };
}
