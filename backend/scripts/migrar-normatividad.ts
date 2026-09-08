import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import type { ModeladoNormatividad, ModeladoTitulo, DocumentoArchivo, SeccionNormativa, GrupoConcesion } from '../src/v1/types/modeladoNormatividad.types';

const RAIZ_BACKEND = path.resolve(__dirname, '..');
const RUTA_SCHEMA_NORMATIVIDAD = path.join(RAIZ_BACKEND, 'documentacion', 'modelado_normatividad.schema.json');
const RUTA_SCHEMA_TITULO = path.join(RAIZ_BACKEND, 'documentacion', 'modelado_titulo_concesion.schema.json');
const RUTA_TAREAS_PENDIENTES = path.join(RAIZ_BACKEND, 'documentacion', 'tareas-pendientes-normatividad.md');

const DIR_NORMATIVIDAD = path.join(RAIZ_BACKEND, 'assets', 'normatividad');
const DIR_TITULO = path.join(RAIZ_BACKEND, 'assets', 'titulo');
const RUTA_ORIGEN_NORMATIVIDAD = path.join(DIR_NORMATIVIDAD, 'normatividad.json');
const RUTA_ORIGEN_TITULO = path.join(DIR_TITULO, 'titulo.json');
const RUTA_DESTINO_NORMATIVIDAD = path.join(DIR_NORMATIVIDAD, 'normatividad.modelado.json');
const RUTA_DESTINO_TITULO = path.join(DIR_TITULO, 'titulo.modelado.json');

function cargarJSON(ruta: string): any {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

/** minúsculas, sin acentos, sin puntuación (mismo criterio que migrar-informacion-financiera.ts, copiado localmente para no acoplar ambos scripts) */
const RANGO_DIACRITICOS = new RegExp('[\\u0300-\\u036f]', 'g');

export function normalizarTitulo(titulo: string): string {
  return titulo
    .normalize('NFD')
    .replace(RANGO_DIACRITICOS, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(texto: string): string {
  return normalizarTitulo(texto).replace(/\s+/g, '_');
}

function validarContraSchema(rutaSchema: string, data: unknown, etiqueta: string): void {
  const schema = cargarJSON(rutaSchema);
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validar = ajv.compile(schema);
  const valido = validar(data);
  if (!valido) {
    console.error(`Errores de validación (${etiqueta}):`);
    for (const err of validar.errors ?? []) {
      console.error(`  ${err.instancePath || '(raíz)'} ${err.message}`);
    }
    throw new Error(`El JSON de ${etiqueta} no cumple su schema.`);
  }
}

function verificarArchivosFisicosNormatividad(data: ModeladoNormatividad): PendienteNormatividad[] {
  const pendientes: PendienteNormatividad[] = [];
  for (const seccion of data.secciones) {
    for (const documento of seccion.documentos) {
      if (!documento.link) continue;
      const rutaFisica = path.join(DIR_NORMATIVIDAD, documento.link);
      if (!fs.existsSync(rutaFisica)) {
        console.warn(`ADVERTENCIA: no existe el archivo físico para ${seccion.id}/${documento.id}: ${rutaFisica}`);
        pendientes.push({
          tipo: 'archivo_faltante',
          catalogo: 'normatividad',
          referencia: `${seccion.titulo} / ${documento.titulo}`,
          detalle: `No existe el archivo físico ${rutaFisica}.`,
        });
      }
    }
  }
  return pendientes;
}

function verificarArchivosFisicosTitulo(data: ModeladoTitulo): PendienteNormatividad[] {
  const pendientes: PendienteNormatividad[] = [];
  const documentos = data.grupos.flatMap((g) => [g.documentoPrincipal, ...g.anexos]);
  for (const documento of documentos) {
    if (!documento.link) continue;
    const rutaFisica = path.join(DIR_TITULO, documento.link);
    if (!fs.existsSync(rutaFisica)) {
      console.warn(`ADVERTENCIA: no existe el archivo físico para ${documento.id}: ${rutaFisica}`);
      pendientes.push({
        tipo: 'archivo_faltante',
        catalogo: 'titulo_concesion',
        referencia: documento.titulo,
        detalle: `No existe el archivo físico ${rutaFisica}.`,
      });
    }
  }
  return pendientes;
}

// ---------------------------------------------------------------------------
// Normatividad: tabla de agrupación curada a mano (confirmada con el usuario).
// "Programa Anual de Desarrollo Archivístico 2026" se reclasifica a "Programas
// anuales (PADA)" y su título migrado deja caer el año, igual que el reshape
// de información financiera normaliza títulos entre ejercicios.
// ---------------------------------------------------------------------------

interface EntradaGrupoNormatividad {
  tituloOrigen: string;
  tituloMigrado?: string;
}

interface GrupoNormatividadDef {
  titulo: string;
  descripcion: string;
  documentos: EntradaGrupoNormatividad[];
}

const GRUPOS_NORMATIVIDAD: GrupoNormatividadDef[] = [
  {
    titulo: 'Marco jurídico institucional',
    descripcion: 'Documentos base que establecen la creación, operación y regulación del Organismo.',
    documentos: [
      { tituloOrigen: 'DECRETO DE CREACIÓN' },
      { tituloOrigen: 'LEY DEL AGUA PARA EL ESTADO DE PUEBLA' },
      { tituloOrigen: 'REGLAMENTO INTERNO' },
      { tituloOrigen: 'REFORMAS AL REGLAMENTO INTERNO' },
    ],
  },
  {
    titulo: 'Normatividad institucional',
    descripcion: 'Normas, códigos y acuerdos que rigen la conducta y administración del Organismo.',
    documentos: [
      { tituloOrigen: 'CÓDIGO DE CONDUCTA' },
      { tituloOrigen: 'CÓDIGO DE ÉTICA' },
      { tituloOrigen: 'ACUERDO GENERAL' },
      { tituloOrigen: 'DISPOSICIONES PARA EL ARCHIVO CONTABLE GUBERNAMENTAL' },
      { tituloOrigen: 'DECRETO HONORABLE CONGRESO DEL ESTADO' },
    ],
  },
  {
    titulo: 'Lineamientos y disposiciones',
    descripcion: 'Lineamientos, manuales y disposiciones emitidas por el Organismo.',
    documentos: [
      { tituloOrigen: 'LINEAMIENTOS DE APOYOS SOCIALES' },
      { tituloOrigen: 'PADRÓN DE PERMISOS DE DESCARGAS' },
      { tituloOrigen: 'REGISTRO Y VALUACIÓN DE PATRIMONIO' },
    ],
  },
  {
    titulo: 'Programas anuales (PADA)',
    descripcion: 'Programas Anuales de Desarrollo Archivístico del SOAPAP.',
    documentos: [
      { tituloOrigen: 'PADA 2024', tituloMigrado: 'PADA 2024' },
      { tituloOrigen: 'PADA 2025', tituloMigrado: 'PADA 2025' },
      { tituloOrigen: 'PROGRAMA ANUAL DE DESARROLLO ARCHIVÍSTICO 2026', tituloMigrado: 'Programa Anual de Desarrollo Archivístico' },
    ],
  },
];

interface DocumentoLegadoNormatividad {
  titulo: string;
  filename: string;
}

type TipoPendienteNormatividad = 'documento_no_agrupado' | 'entrada_agrupacion_sin_origen' | 'archivo_faltante';

interface PendienteNormatividad {
  tipo: TipoPendienteNormatividad;
  catalogo: 'normatividad' | 'titulo_concesion';
  referencia: string;
  detalle: string;
}

/**
 * Puro: no toca el filesystem. La existencia física de los archivos se verifica aparte
 * (verificarArchivosFisicosNormatividad), igual que migrar-informacion-financiera.ts separa
 * `transformarLegado` de `verificarArchivosFisicos`.
 */
export function transformarNormatividad(
  origen: DocumentoLegadoNormatividad[]
): { data: ModeladoNormatividad; pendientes: PendienteNormatividad[] } {
  const pendientes: PendienteNormatividad[] = [];
  const porTituloOrigen = new Map(origen.map((d) => [normalizarTitulo(d.titulo), d]));
  const reclamados = new Set<string>();

  const secciones: SeccionNormativa[] = GRUPOS_NORMATIVIDAD.map((grupoDef, indiceSeccion) => {
    const documentos: DocumentoArchivo[] = [];

    grupoDef.documentos.forEach((entrada, indiceDoc) => {
      const claveOrigen = normalizarTitulo(entrada.tituloOrigen);
      const fuente = porTituloOrigen.get(claveOrigen);
      if (!fuente) {
        pendientes.push({
          tipo: 'entrada_agrupacion_sin_origen',
          catalogo: 'normatividad',
          referencia: `${grupoDef.titulo} / ${entrada.tituloOrigen}`,
          detalle: `La tabla de agrupación referencia "${entrada.tituloOrigen}" pero no existe en normatividad.json.`,
        });
        return;
      }
      reclamados.add(claveOrigen);

      const tituloMigrado = entrada.tituloMigrado ?? tituloCase(fuente.titulo);
      documentos.push({
        id: slugify(tituloMigrado),
        titulo: tituloMigrado,
        orden: indiceDoc + 1,
        link: fuente.filename,
        estado: 'publicado',
      });
    });

    return {
      id: slugify(grupoDef.titulo),
      titulo: grupoDef.titulo,
      descripcion: grupoDef.descripcion,
      orden: indiceSeccion + 1,
      documentos,
    };
  }).filter((seccion) => seccion.documentos.length > 0);

  for (const fuente of origen) {
    const clave = normalizarTitulo(fuente.titulo);
    if (!reclamados.has(clave)) {
      pendientes.push({
        tipo: 'documento_no_agrupado',
        catalogo: 'normatividad',
        referencia: fuente.titulo,
        detalle: `"${fuente.titulo}" (${fuente.filename}) está en normatividad.json pero ninguna sección de la tabla de agrupación lo reclama; se excluyó del catálogo.`,
      });
    }
  }

  return { data: { secciones }, pendientes };
}

/** Convierte un título en mayúsculas fijas (legado) a Title Case simple en español. */
function tituloCase(titulo: string): string {
  const MINUSCULAS = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'para', 'en', 'a', 'al']);
  return titulo
    .toLowerCase()
    .split(' ')
    .map((palabra, i) => (i > 0 && MINUSCULAS.has(palabra) ? palabra : palabra.charAt(0).toUpperCase() + palabra.slice(1)))
    .join(' ');
}

// ---------------------------------------------------------------------------
// Título de concesión: reshape directo del titulo.json ya curado a mano — sin
// inferencia por regex de nombres de archivo.
// ---------------------------------------------------------------------------

interface DocumentoLegadoTitulo {
  titulo: string;
  link: string;
}

interface GrupoLegadoTitulo {
  titulo: string;
  documentos: DocumentoLegadoTitulo[];
}

/** Puro: no toca el filesystem — la existencia física se verifica aparte (verificarArchivosFisicosTitulo). */
export function transformarTitulo(origen: GrupoLegadoTitulo[]): { data: ModeladoTitulo } {
  const grupos: GrupoConcesion[] = origen.map((grupoLegado, indiceGrupo) => {
    const [principal, ...anexosLegado] = grupoLegado.documentos;

    const documentoPrincipal: DocumentoArchivo = {
      id: 'documento_principal',
      titulo: principal.titulo,
      orden: 1,
      link: principal.link,
      estado: 'publicado',
    };

    const anexos: DocumentoArchivo[] = anexosLegado.map((anexoLegado, indiceAnexo) => {
      const match = anexoLegado.titulo.match(/ANEXO\s+(\d+)/i);
      const n = match ? parseInt(match[1], 10) : indiceAnexo + 1;
      return {
        id: `anexo_${n}`,
        titulo: anexoLegado.titulo,
        orden: n,
        link: anexoLegado.link,
        estado: 'publicado' as const,
      };
    });

    return {
      id: slugify(grupoLegado.titulo),
      titulo: grupoLegado.titulo,
      orden: indiceGrupo + 1,
      documentoPrincipal,
      anexos,
    };
  });

  return { data: { grupos } };
}

function escribirTareasPendientes(pendientes: PendienteNormatividad[]): void {
  const filaTabla = (p: PendienteNormatividad) => `| ${p.catalogo} | ${p.tipo} | ${p.referencia} | ${p.detalle} |`;

  const contenido = [
    '# Tareas pendientes — Normatividad',
    '',
    'Generado automáticamente por `npm run migrar:normatividad`. No editar a mano la tabla; si hay contexto adicional, agrégalo en una sección aparte al final del archivo.',
    '',
    '## Hallazgos de la migración',
    '',
    '| Catálogo | Tipo | Referencia | Detalle |',
    '| --- | --- | --- | --- |',
    ...pendientes.map(filaTabla),
    '',
  ].join('\n');

  fs.writeFileSync(RUTA_TAREAS_PENDIENTES, contenido, 'utf-8');
  console.log(`\n✓ Tareas pendientes registradas en ${RUTA_TAREAS_PENDIENTES}`);
}

function migrar(): void {
  console.log(`Leyendo ${RUTA_ORIGEN_NORMATIVIDAD}...`);
  const origenNormatividad = cargarJSON(RUTA_ORIGEN_NORMATIVIDAD) as DocumentoLegadoNormatividad[];
  const { data: dataNormatividad, pendientes: pendientesNormatividad } = transformarNormatividad(origenNormatividad);

  console.log('Validando normatividad contra modelado_normatividad.schema.json...');
  validarContraSchema(RUTA_SCHEMA_NORMATIVIDAD, dataNormatividad, 'normatividad');
  console.log('✓ Válido.');
  const pendientesArchivosNormatividad = verificarArchivosFisicosNormatividad(dataNormatividad);
  fs.writeFileSync(RUTA_DESTINO_NORMATIVIDAD, JSON.stringify(dataNormatividad, null, 2) + '\n', 'utf-8');
  console.log(`✓ Escrito ${RUTA_DESTINO_NORMATIVIDAD}`);

  console.log(`\nLeyendo ${RUTA_ORIGEN_TITULO}...`);
  const origenTitulo = cargarJSON(RUTA_ORIGEN_TITULO) as GrupoLegadoTitulo[];
  const { data: dataTitulo } = transformarTitulo(origenTitulo);

  console.log('Validando título de concesión contra modelado_titulo_concesion.schema.json...');
  validarContraSchema(RUTA_SCHEMA_TITULO, dataTitulo, 'título de concesión');
  console.log('✓ Válido.');
  const pendientesArchivosTitulo = verificarArchivosFisicosTitulo(dataTitulo);
  fs.writeFileSync(RUTA_DESTINO_TITULO, JSON.stringify(dataTitulo, null, 2) + '\n', 'utf-8');
  console.log(`✓ Escrito ${RUTA_DESTINO_TITULO}`);

  const todasPendientes = [...pendientesNormatividad, ...pendientesArchivosNormatividad, ...pendientesArchivosTitulo];
  if (todasPendientes.length > 0) {
    escribirTareasPendientes(todasPendientes);
  } else {
    console.log('\n✓ Sin hallazgos pendientes.');
  }
}

if (require.main === module) {
  migrar();
}
