// Datos que comparten los trámites de constancias (No Adeudo y Predio No Registrado).
import type { CuentaBancaria, OficinaAtencion, PagoVentanilla, SolicitudFactura } from './tipos.ts';

export const OFICINA_SAN_MANUEL: OficinaAtencion = {
  nombre: 'Oficinas SOAPAP San Manuel',
  calle: 'Calle Río Grijalva, número 5312, interior 1',
  colonia: 'Jardines de San Manuel',
  ciudad: 'Puebla',
  estado: 'Puebla',
  codigoPostal: '72570',
  horario: 'lunes a viernes, de 09:00 a 17:00 horas.',
  horarioCorto: 'Lun a vie, 09:00 a 17:00 h',
  horarioSchema: 'Mo-Fr 09:00-17:00',
  // Mismas coordenadas que el mapa de la página de Contacto.
  coordenadas: { lat: 19.013102, lng: -98.193766 },
  telefonos: [
    { texto: '222 246 0215', e164: '+522222460215' },
    { texto: '222 242 2564', e164: '+522222422564' },
  ],
};

export const CUENTA_SOAPAP_BBVA: CuentaBancaria = {
  banco: 'BBVA',
  beneficiario:
    'Sistema Operador de los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla (SOAPAP)',
  cuenta: '012-496-9375',
  clabe: '012-650-001-249-693-754',
};

// Costo vigente de ambas constancias conforme a la Estructura Tarifaria (MXN, IVA incluido).
// Se refleja en la página, la tarjeta de inicio, la meta description y el JSON-LD.
export const COSTO_CONSTANCIAS = 509;

// Textos idénticos en los flyers de No Adeudo y Predio No Registrado.
export const NOTA_COSTO_CONSTANCIAS = 'Costo del trámite conforme a la Estructura Tarifaria Vigente.';
export const NOTA_ATENCION_CONSTANCIAS = '**Atención** e información en oficinas de San Manuel.';
export const NOTA_COTEJO_CONSTANCIAS =
  'Todos los documentos se entregan **en copia**. Presenta los **originales para cotejo**.';

export const VENTANILLA_CONSTANCIAS: PagoVentanilla = {
  descripcion:
    'Paga con **tarjeta de crédito o débito** en la terminal dentro de las instalaciones de SOAPAP, al momento de tu trámite.',
  nota: `Se deja una **copia del ticket de la terminal** con tu solicitud.\nOficinas de San Manuel · ${OFICINA_SAN_MANUEL.horarioCorto}.`,
};

// Cada trámite agrega su asuntoCorreo.
export const FACTURA_CONSTANCIAS: Omit<SolicitudFactura, 'asuntoCorreo'> = {
  correo: 'cfdi.constancias@soapap.gob.mx',
  plazo:
    'Durante el **mismo mes en que realizaste el pago**, y como máximo dentro de las **primeras 24 horas del mes siguiente**. Después de ese plazo ya no es posible facturar.',
  datos: [
    'Ticket o comprobante del pago.',
    'RFC y nombre o razón social.',
    'Código postal del domicilio fiscal.',
    'Régimen fiscal y uso del CFDI.',
  ],
};

export const AVISO_LEGAL_CONSTANCIAS =
  'La presente constancia no exime al interesado de responsabilidad alguna respecto a las obligaciones que pudiera tener con este Sistema Operador, derivado de una visita de inspección o verificación que podrá ser sujeto el predio en cuestión, a partir de la emisión del presente documento.';
