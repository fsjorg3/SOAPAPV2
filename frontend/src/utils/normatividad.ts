import type { SeccionNormativa } from '../types/normatividad';

export function filtrarSecciones(secciones: SeccionNormativa[], buscar: string): SeccionNormativa[] {
  if (!buscar) return secciones;
  const buscarLower = buscar.toLowerCase();

  return secciones
    .map((seccion) => ({
      ...seccion,
      documentos: seccion.documentos.filter((documento) => documento.titulo.toLowerCase().includes(buscarLower)),
    }))
    .filter((seccion) => seccion.documentos.length > 0);
}
