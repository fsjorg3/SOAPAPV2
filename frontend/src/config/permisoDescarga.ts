// Contenido de la guía del permiso de descarga de aguas residuales (Gerencia de Saneamiento y Medio Ambiente).
// Versión de demostración: solo incluye lo que el borrador afirma. Los datos pendientes de validación
// (montos, domicilios, horarios, plazos) se agregan cuando la Gerencia los confirme.

// Periodicidad de entrega de análisis: m mensual, t trimestral, c cuatrimestral, s semestral.
export type ClavePeriodicidad = 'm' | 't' | 'c' | 's';

export interface Periodicidad {
  // Meses entre una entrega y la siguiente.
  paso: number;
  etiqueta: string;
  entregasAlAnio: number;
}

export const PERIODICIDADES: Record<ClavePeriodicidad, Periodicidad> = {
  m: { paso: 1, etiqueta: 'Cada mes', entregasAlAnio: 12 },
  t: { paso: 3, etiqueta: 'Cada 3 meses', entregasAlAnio: 4 },
  c: { paso: 4, etiqueta: 'Cada 4 meses', entregasAlAnio: 3 },
  s: { paso: 6, etiqueta: 'Cada 6 meses', entregasAlAnio: 2 },
};

export interface Giro {
  id: string;
  nombre: string;
  // Periodicidad del permiso nuevo; sin valor, la guía no muestra calendario.
  periodicidad?: ClavePeriodicidad;
  // Periodicidad distinta al renovar.
  periodicidadRenovacion?: ClavePeriodicidad;
  // Pide además las tres últimas boletas del servicio de agua.
  boletas?: boolean;
}

// Determina qué documentos propios del tipo se suman a la lista.
export type ClaseTipo = 'general' | 'plaza' | 'pd567' | 'transporte';

export interface TipoEstablecimiento {
  id: string;
  nombre: string;
  cuestionario: string;
  ejemplos: string;
  clase: ClaseTipo;
  giros: Giro[];
}

export interface GrupoDocumentos {
  titulo: string;
  documentos: string[];
}

export const GRUPOS_COMUNES: GrupoDocumentos[] = [
  {
    titulo: 'Identidad y representación',
    documentos: [
      'Acta constitutiva y poder notarial del representante (persona moral), o identificación oficial (persona física).',
      'Registro Federal de Contribuyentes (RFC).',
      'Carta poder y copia de la identificación de quien realiza el trámite, si no es el titular o representante.',
    ],
  },
  {
    titulo: 'Del predio y sus licencias',
    documentos: [
      'Factibilidad de los servicios de agua potable y drenaje (Concesiones Integrales o Agua de Puebla para Todos).',
      'Licencia de funcionamiento.',
      'Constancia de alineamiento y número oficial.',
      'Licencia de sustancias susceptibles de inhalación y efectos tóxicos.',
      'Aviso de funcionamiento o licencia sanitaria.',
      'Constancia de medidas preventivas expedida por Bomberos.',
      'Constancia de medidas básicas de seguridad expedida por Protección Civil.',
      'Boleta de predial.',
    ],
  },
  {
    titulo: 'De tu operación',
    documentos: [
      'Planos hidrosanitarios (mínimo doble carta) con drenaje de proceso, sanitario y pluvial en colores distintos.',
      'Lista de materias primas y productos de limpieza, con su uso y fichas técnicas.',
      'Diagrama de flujo del proceso, indicando dónde y cuánta agua se usa.',
      'Georreferencia del predio: coordenadas, calles colindantes y registro a pie de banqueta.',
      'Promedio mensual de agua residual que generas (m³ al mes).',
      'Si tienes pretratamiento (por ejemplo, trampa de grasas): operación, capacidad, marca, fecha de instalación, residuos y bitácoras de limpieza.',
      'Manifiestos de recolección, transporte y disposición final de residuos del pretratamiento, con sus autorizaciones (SCT, SEMARNAT, SDRSOT o SOAPAP).',
    ],
  },
];

export const GRUPO_FINAL: GrupoDocumentos = {
  titulo: 'Al final',
  documentos: ['Recibo de pago del permiso, una vez que el SOAPAP valida tu cuestionario.'],
};

export const DOCUMENTOS_PD567 = [
  'Balance hídrico: cuánta agua entra, se usa y se descarga.',
  'Plano o distribución de las instalaciones (lay out).',
  'Plan preventivo de derrames o contingencias.',
  'Información del almacén de químicos y del manejo de residuos peligrosos.',
  'Manifiestos de residuos de proceso.',
];

export const DOCUMENTO_BOLETAS = 'Las tres últimas boletas del servicio de agua (o facturas de pipas).';

export const DOCUMENTOS_PLAZA_ADMIN = ['Documentos del inmueble.', 'Lista de todos los locales de la plaza.'];

export const DOCUMENTOS_PLAZA_LOCAL = [
  'Licencia de funcionamiento del local.',
  'Aviso sanitario.',
  'Constancia de Bomberos.',
  'Lista de materias primas.',
  'Diagrama de proceso.',
  'Si aplica, datos de tu trampa de grasas.',
];

export const DOCUMENTOS_TRANSPORTE = [
  'Tarjeta de circulación.',
  'Fotografías del vehículo y de su caja, con medidas y placas.',
  'Póliza de seguro vigente.',
  'Autorización de la SCT.',
  'Licencia de conducir del operador.',
  'Datos del GPS.',
  'Contrato con la planta de tratamiento donde descargas.',
  'Plan de derrames.',
  'Medidas de seguridad y equipo de protección del personal.',
  'Lista de las empresas a las que das servicio.',
];

// Documentos que solo se entregan en ciertos casos (no aplican al transporte).
export const DOCUMENTOS_CONDICIONALES = [
  { caso: 'Te abasteces de un pozo propio', documento: 'Copia del título de concesión del pozo.' },
  { caso: 'Te abasteces con pipas', documento: 'Notas de remisión o facturas de las pipas.' },
  { caso: 'Tienes registro para aforo y muestreo', documento: 'Fotografías del registro.' },
  { caso: 'Tienes medidor de descarga', documento: 'Fotografía donde se vean marca, modelo, serie y volumen.' },
  { caso: 'Usas químicos en tu pretratamiento', documento: 'Hojas de seguridad, especificaciones y dosis de cada producto.' },
  { caso: 'Ya hiciste análisis de tu descarga', documento: 'Copia de los tres últimos resultados de laboratorio.' },
  { caso: 'Ocupas un predio arrendado', documento: 'Datos del propietario y del arrendatario.' },
];

export const TIPOS_ESTABLECIMIENTO: TipoEstablecimiento[] = [
  {
    id: 'alimentos',
    nombre: 'Comercios de alimentos, hospedaje y esparcimiento',
    cuestionario: 'PD 4',
    ejemplos: 'Restaurantes, hoteles, panaderías, tortillerías, clubes deportivos, museos y autoservicios con carnes y pescados.',
    clase: 'general',
    giros: [
      { id: 'restaurantes', nombre: 'Restaurantes', periodicidad: 't', periodicidadRenovacion: 'c' },
      { id: 'hoteles', nombre: 'Hoteles', periodicidad: 't', periodicidadRenovacion: 'c' },
      { id: 'esparcimiento', nombre: 'Centros de entretenimiento, clubes deportivos y museos', periodicidad: 't', periodicidadRenovacion: 'c' },
      { id: 'autoservicio', nombre: 'Autoservicio con venta de carnes, pescados y mariscos', periodicidad: 'c' },
      { id: 'panaderias', nombre: 'Panaderías', periodicidad: 'c' },
      { id: 'tortillerias', nombre: 'Tortillerías', periodicidad: 'c' },
      { id: 'fuentes-sodas', nombre: 'Fuentes de sodas', periodicidad: 'c' },
    ],
  },
  {
    id: 'plazas',
    nombre: 'Plazas comerciales',
    cuestionario: 'PD 4 plazas',
    ejemplos: 'La plaza y sus locales que usan agua: comida, estéticas, spas y lavanderías.',
    clase: 'plaza',
    giros: [
      { id: 'plaza-admin', nombre: 'Administración de la plaza' },
      { id: 'plaza-local', nombre: 'Local que usa agua dentro de la plaza' },
    ],
  },
  {
    id: 'automotriz',
    nombre: 'Servicios automotrices y de combustibles',
    cuestionario: 'PD 5',
    ejemplos: 'Gasolineras, agencias de autos, talleres mecánicos y centrales de autobuses.',
    clase: 'pd567',
    giros: [
      { id: 'gasolineras', nombre: 'Gasolineras', periodicidad: 't', boletas: true },
      { id: 'agencias', nombre: 'Agencias de autos', periodicidad: 'c' },
      { id: 'talleres', nombre: 'Talleres mecánicos', periodicidad: 'c', boletas: true },
      { id: 'centrales', nombre: 'Centrales de autobuses', periodicidad: 'c' },
    ],
  },
  {
    id: 'salud',
    nombre: 'Servicios de salud, laboratorios y funerarias',
    cuestionario: 'PD 6',
    ejemplos: 'Hospitales y sanatorios, clínicas, laboratorios de análisis clínicos y de agua, y funerarias.',
    clase: 'pd567',
    giros: [
      { id: 'hospitales', nombre: 'Hospitales y sanatorios (con o sin laboratorio)', periodicidad: 't' },
      { id: 'clinicas', nombre: 'Clínicas', periodicidad: 't' },
      { id: 'lab-clinicos', nombre: 'Laboratorios de análisis clínicos', periodicidad: 'm' },
      { id: 'lab-agua', nombre: 'Laboratorios de análisis de agua', periodicidad: 't' },
      { id: 'funerarias', nombre: 'Funerarias', periodicidad: 'c' },
    ],
  },
  {
    id: 'industrias',
    nombre: 'Industrias',
    cuestionario: 'PD 7',
    ejemplos: 'Empresas con solo sanitarios o comedor, textileras con teñido, fabricantes de autopartes y de medicamentos.',
    clase: 'pd567',
    giros: [
      { id: 'solo-sanitarios', nombre: 'Solo sanitarios, sin agua en el proceso', periodicidad: 's', boletas: true },
      { id: 'comedor', nombre: 'Con comedor industrial', periodicidad: 'c', boletas: true },
      { id: 'textilera', nombre: 'Textilera con teñido', periodicidad: 't', boletas: true },
      { id: 'autopartes', nombre: 'Fabricante de autopartes', periodicidad: 'c', boletas: true },
      { id: 'medicamentos', nombre: 'Fabricante de medicamentos', periodicidad: 't', boletas: true },
    ],
  },
  {
    id: 'transporte',
    nombre: 'Transporte de aguas residuales',
    cuestionario: 'PD 8',
    ejemplos: 'Vehículos que recolectan y transportan agua residual, como limpieza de trampas de grasa y fosas sépticas.',
    clase: 'transporte',
    giros: [{ id: 'pipas', nombre: 'Empresa que recolecta y transporta aguas residuales' }],
  },
];

export interface Tramite {
  titulo: string;
  descripcion: string;
  // Sin valor: el costo todavía no se publica y no se muestra etiqueta.
  costo?: 'Tiene costo' | 'Sin costo';
}

export const TRAMITES: Tramite[] = [
  {
    titulo: 'Permiso nuevo',
    descripcion: 'Si no tienes permiso, o si necesitas cambiarlo después de los primeros 3 meses. Al emitirse el nuevo, el anterior se cancela.',
    costo: 'Tiene costo',
  },
  {
    titulo: 'Renovación',
    descripcion: 'Al terminar el año de vigencia. Para renovar debes haber cumplido las obligaciones de tu permiso.',
    costo: 'Tiene costo',
  },
  {
    titulo: 'Modificación',
    descripcion: 'Solo dentro de los 3 meses siguientes a la fecha de expedición. Hoy se pide por escrito en la Oficialía de Partes.',
    costo: 'Sin costo',
  },
  {
    titulo: 'Aviso de venta, traspaso o cambio de giro',
    descripcion: 'Cuando vendes o traspasas el establecimiento o cambia su giro (en transporte, cuando vendes o cambias un vehículo). Si no avisas, sigues siendo responsable de las descargas.',
  },
];

export interface Paso {
  titulo: string;
  descripcion: string;
  etiqueta: string;
}

export const PASOS: Paso[] = [
  { etiqueta: 'Obtener el cuestionario', titulo: 'Obtén el cuestionario de tu giro.', descripcion: 'Cada tipo de establecimiento tiene el suyo (PD 4 a PD 8).' },
  { etiqueta: 'Llenar y reunir documentos', titulo: 'Llénalo y reúne las copias de tus documentos.', descripcion: 'Firma y sella el cuestionario. Todos los documentos se entregan en copia. Al final de esta página armas tu lista exacta.' },
  { etiqueta: 'Entregar en Oficialía de Partes', titulo: 'Entrega en la Oficialía de Partes del SOAPAP.', descripcion: 'La Oficialía turna tu solicitud a la Gerencia de Saneamiento y Medio Ambiente.' },
  { etiqueta: 'Revisión con la Gerencia', titulo: 'Revisión con el personal de la Gerencia.', descripcion: 'Revisan tu cuestionario y tus documentos con una lista de verificación. Hoy se hace en citas presenciales.' },
  { etiqueta: 'Atender observaciones', titulo: 'Atiende las observaciones.', descripcion: 'Si falta información o algo no coincide, por ejemplo los planos con los puntos de descarga, te lo indican para que lo completes.' },
  { etiqueta: 'Pagar el permiso', titulo: 'Paga, una vez validado tu cuestionario.', descripcion: 'Entregas el recibo de pago del permiso.' },
  { etiqueta: 'Recibir tu permiso', titulo: 'Recibe tu permiso.', descripcion: 'El SOAPAP fija tus condiciones (volumen autorizado, planta de tratamiento, límites según tu giro y periodicidad de análisis) y lo emite con firma de la Dirección General. Tu representante legal también lo firma.' },
];

export const CONTENIDO_PERMISO = [
  { titulo: 'Datos del establecimiento.', texto: 'Razón social, RFC, domicilio, giro y número de servicio (NIS).' },
  { titulo: 'Datos de la descarga.', texto: 'Número y tipo de descargas, volumen autorizado, gasto máximo y planta de tratamiento.' },
  { titulo: 'Tratamiento y puntos de descarga.', texto: 'Pretratamiento, manejo de residuos, ubicación de cada punto y croquis del predio.' },
  { titulo: 'Condiciones particulares de descarga.', texto: 'Los contaminantes que se te analizan y sus límites máximos. Los límites son iguales para todos; según el giro cambia qué parámetros aplican.' },
  { titulo: 'Obligaciones del titular.', texto: 'Causas de infracción, vigencia y, en su caso, condicionantes.' },
];

export const ETAPAS_RECORRIDO = [
  { titulo: 'Tu establecimiento', texto: 'genera el agua residual.' },
  { titulo: 'Registro a pie de banqueta:', texto: 'el punto donde tu predio se conecta al drenaje municipal. Debes mantenerlo en buen estado.' },
  { titulo: 'El drenaje municipal', texto: 'recibe y conduce tu descarga. El permiso fija el volumen autorizado y el gasto máximo.' },
  { titulo: 'La planta de tratamiento', texto: 'recibe el agua. Tu permiso indica a cuál llega y qué contaminantes no debes rebasar.' },
];

export const HITOS_PRIMER_ANIO = [
  { mes: 0, titulo: 'Día 0', texto: 'Recibes tu permiso.' },
  { mes: 1, titulo: '30 días naturales', texto: 'Entregas tu primer análisis de laboratorio acreditado ante la EMA.' },
  { mes: 3, titulo: '3 meses', texto: 'Termina el plazo para modificar tu permiso sin costo.' },
  { mes: 12, titulo: 'Mes 12', texto: 'Termina la vigencia: renuevas si cumpliste tus obligaciones.' },
];

export const OBLIGACIONES = [
  { titulo: 'Entrega tus análisis', texto: 'Con la periodicidad de tu permiso. El primero en 30 días naturales; los siguientes, en los primeros 15 días del mes posterior al muestreo.' },
  { titulo: 'No rebases los límites', texto: 'Ni de contaminantes ni de volumen autorizado.' },
  { titulo: 'Avisa cambios', texto: 'Venta, traspaso o cambio de giro.' },
  { titulo: 'Reporta accidentes de inmediato', texto: 'Causa, volumen, duración y medidas que tomaste.' },
  { titulo: 'Mantén tus instalaciones', texto: 'El registro a pie de banqueta y, en su caso, tu pretratamiento.' },
  { titulo: 'Renueva cada año', texto: 'La renovación depende de haber cumplido todo lo anterior.' },
];

export const PREGUNTAS_FRECUENTES = [
  { pregunta: '¿Mi negocio necesita permiso de descarga?', respuesta: 'Si tu negocio, empresa o institución descarga agua residual al drenaje municipal, o si tu empresa transporta aguas residuales en vehículos, debes contar con permiso de descarga del SOAPAP.' },
  { pregunta: '¿Cuánto dura el permiso?', respuesta: 'Un año. Al terminar, debes renovarlo.' },
  { pregunta: '¿Puedo corregir mi permiso después de recibirlo?', respuesta: 'Sí, sin costo, dentro de los 3 meses siguientes a su expedición, con un escrito en la Oficialía de Partes. Después debes solicitar un permiso nuevo.' },
  { pregunta: '¿Puede hacer el trámite otra persona?', respuesta: 'Sí, con una carta poder y copia de su identificación.' },
  { pregunta: '¿Qué pasa si me falta un documento?', respuesta: 'La omisión de información puede ser causa de que se niegue el permiso o su renovación. Si el documento depende de otra autoridad y está en trámite, consulta con la Gerencia de Saneamiento y Medio Ambiente.' },
  { pregunta: '¿Qué pasa si vendo o traspaso mi negocio?', respuesta: 'Debes avisar al SOAPAP. Si no lo haces, sigues siendo responsable de las descargas del establecimiento.' },
  { pregunta: '¿Dónde hago los análisis de laboratorio?', respuesta: 'En un laboratorio acreditado ante la EMA. Tu permiso indica qué contaminantes se analizan y cada cuánto.' },
];

export const FUNDAMENTO_LEGAL =
  'Fundamento citado en los cuestionarios: artículos 119 bis y 121 de la Ley General del Equilibrio Ecológico y la Protección al Ambiente, artículo 69 de la Ley del Agua para el Estado de Puebla y las Normas Oficiales Mexicanas aplicables.';
