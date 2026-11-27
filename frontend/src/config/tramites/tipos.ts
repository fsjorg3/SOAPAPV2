// Tipos compartidos por las páginas de trámites (/tramites/*).
// Cada trámite es un objeto TramiteConfig; los componentes de components/tramites/ solo lo pintan.
// En los textos, **así** marca una palabra en negritas (lo interpreta TextoEnriquecido).

// id de la sección de documentos por solicitante; los requisitos pueden enlazar a ella.
export const ANCLA_DOCUMENTOS = 'documentos-solicitante';

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Telefono {
  // Como se muestra: "222 246 0215".
  texto: string;
  // Formato E.164 para tel: y JSON-LD: "+522222460215".
  e164: string;
}

export interface OficinaAtencion {
  nombre: string;
  // Partes de la dirección; se usan para mostrarla y para el JSON-LD.
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  horario: string;
  // Versión breve para etiquetas: "Lun a vie, 08:00 a 17:00 h".
  horarioCorto: string;
  // Horario en formato schema.org (openingHours), p. ej. "Mo-Fr 08:00-17:00".
  horarioSchema: string;
  coordenadas: Coordenadas;
  telefonos: Telefono[];
}

export interface CuentaBancaria {
  banco: string;
  beneficiario: string;
  // Con guiones para leerla; el botón Copiar los quita.
  cuenta: string;
  clabe: string;
}

// Claves de icono; components/tramites/iconos.ts las traduce a iconos MUI.
export type IconoTramite =
  | 'recibo'
  | 'identificacion'
  | 'cuentaActiva'
  | 'ticket'
  | 'documento'
  | 'propiedad'
  | 'ubicacion';

export interface Requisito {
  // Admite **negritas** (el flyer resalta la parte principal).
  titulo: string;
  detalle?: string;
  icono: IconoTramite;
  // Enlace interno (ancla) para ampliar la información.
  enlace?: { texto: string; ancla: string };
}

export interface PerfilSolicitante {
  id: string;
  // Texto de la pestaña.
  etiqueta: string;
  titulo: string;
  documentos: string[];
  aclaracion?: string;
}

// Tarjeta crema con información adicional bajo los documentos (.direccion del flyer de Predio No Registrado).
// Cada bloque es un párrafo; con leyenda: true se pinta como texto a citar en un recuadro punteado.
export interface RecuadroInformativo {
  titulo: string;
  bloques: { texto: string; leyenda?: boolean }[];
}

export interface PasoTramite {
  actor: 'tu' | 'soapap';
  texto: string;
}

export interface PagoTransferencia {
  cuenta: CuentaBancaria;
  concepto: string;
  nota: string;
}

export interface PagoVentanilla {
  descripcion: string;
  nota: string;
}

export interface SolicitudFactura {
  correo: string;
  asuntoCorreo: string;
  plazo: string;
  datos: string[];
}

export interface TramiteConfig {
  // Segmento de la URL: /tramites/<slug>.
  slug: string;
  nombre: string;
  // Cómo se parte el título en la hoja del encabezado (flyer). Si falta, se usa nombre en una línea.
  nombreLineas?: string[];
  subtitulo: string;
  // Una línea para la tarjeta del trámite en inicio.
  resumen: string;
  // Imagen 16:9 de la tarjeta de inicio (la proporciona Comunicación Social).
  // Mientras no exista, la tarjeta muestra la ilustración del trámite.
  imagenTarjeta?: string;
  // Tipo de servicio para schema.org (serviceType).
  tipoServicio: string;
  ilustracion: { src: string; alt: string };
  // Costo en pesos (MXN). Es la única fuente: lo usan la página, la meta description y el JSON-LD.
  costo: number;
  // true si el costo ya incluye IVA: muestra la leyenda "IVA incluido" y se declara en el JSON-LD.
  ivaIncluido: boolean;
  // Leyenda del costo (fundamento).
  notaCosto: string;
  vigenciaDias: number;
  notaVigencia: string;
  notaAtencion: string;
  notaCotejo: string;
  requisitos: Requisito[];
  perfiles: PerfilSolicitante[];
  // Recuadro "Antes de pagar" bajo los documentos.
  verificacionPrevia?: string;
  // Recuadro entre las pestañas de documentos y "Antes de pagar".
  recuadroInformativo?: RecuadroInformativo;
  transferencia?: PagoTransferencia;
  ventanilla?: PagoVentanilla;
  factura?: SolicitudFactura;
  pasos: PasoTramite[];
  avisoLegal: string;
  oficina: OficinaAtencion;
}
