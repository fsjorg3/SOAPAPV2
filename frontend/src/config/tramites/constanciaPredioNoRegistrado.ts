// Contenido de la página /tramites/constancia-predio-no-registrado.
// El costo es COSTO_CONSTANCIAS (comunes.ts), compartido con la otra constancia.
import { formatearMonto } from '../../utils/tramites.ts';
import {
  AVISO_LEGAL_CONSTANCIAS,
  COSTO_CONSTANCIAS,
  CUENTA_SOAPAP_BBVA,
  FACTURA_CONSTANCIAS,
  NOTA_ATENCION_CONSTANCIAS,
  NOTA_COSTO_CONSTANCIAS,
  NOTA_COTEJO_CONSTANCIAS,
  OFICINA_SAN_MANUEL,
  VENTANILLA_CONSTANCIAS,
} from './comunes.ts';
import { ANCLA_DOCUMENTOS } from './tipos.ts';
import type { TramiteConfig } from './tipos.ts';

const VIGENCIA_DIAS = 30;
const monto = formatearMonto(COSTO_CONSTANCIAS);

const ACLARACION_FINADO =
  'Los documentos de propiedad y ubicación deben estar a nombre de la persona finada. La constancia no lleva nombre de ninguna persona.';

export const CONSTANCIA_PREDIO_NO_REGISTRADO: TramiteConfig = {
  slug: 'constancia-predio-no-registrado',
  nombre: 'Constancia de Predio No Registrado',
  nombreLineas: ['Constancia de', 'Predio No Registrado'],
  subtitulo: 'Trámite presencial · Acredita que el inmueble no cuenta con registro ante SOAPAP',
  imagenTarjeta: '/assets/constancias/No_Registro.webp',
  resumen: 'Acredita que tu inmueble no cuenta con registro ante SOAPAP.',
  tipoServicio: 'Constancia de predio no registrado ante el organismo operador de agua potable',
  ilustracion: {
    src: '/assets/constancias/constancia.webp',
    alt: 'Persona sonriente mostrando una constancia con una gota de agua y una palomita de aprobado',
  },
  costo: COSTO_CONSTANCIAS,
  ivaIncluido: true,
  notaCosto: NOTA_COSTO_CONSTANCIAS,
  vigenciaDias: VIGENCIA_DIAS,
  notaVigencia: 'Tramítala cerca de la fecha en que la vas a usar.',
  notaAtencion: NOTA_ATENCION_CONSTANCIAS,
  notaCotejo: NOTA_COTEJO_CONSTANCIAS,

  requisitos: [
    {
      titulo: '**Documento de propiedad** (uno):',
      detalle:
        'Escritura pública notariada o contrato de compraventa notariado, con datos de inscripción visibles y a nombre del propietario.',
      icono: 'propiedad',
    },
    {
      titulo: '**Documento de ubicación** (al menos uno):',
      detalle:
        'Boleta predial con antigüedad no mayor a 2 años, o alineamiento y número oficial. Puedes presentar ambos.',
      icono: 'ubicacion',
    },
    {
      titulo: '**Identificación y documentos** según quién realiza el trámite.',
      icono: 'identificacion',
      enlace: { texto: 'Consulta la lista abajo ↓', ancla: ANCLA_DOCUMENTOS },
    },
    {
      titulo: '**Copia del ticket de pago.**',
      detalle: 'De la transferencia o de la terminal en ventanilla.',
      icono: 'ticket',
    },
  ],

  perfiles: [
    {
      id: 'propietario',
      etiqueta: 'Propietario',
      titulo: 'Persona física: acude el propietario',
      documentos: ['INE del propietario.'],
      aclaracion: 'La escritura o el contrato deben estar a tu nombre.',
    },
    {
      id: 'representante',
      etiqueta: 'Representante',
      titulo: 'Persona física: acude un representante',
      documentos: [
        'Carta poder simple dirigida al SOAPAP, con firmas legibles.',
        'INE de quien otorga el poder (propietario).',
        'INE de quien recibe el poder (quien acude).',
      ],
      aclaracion: 'La escritura o el contrato deben estar a nombre de quien otorga el poder.',
    },
    {
      id: 'persona-moral',
      etiqueta: 'Persona moral',
      titulo: 'Persona moral, a través de su apoderado legal',
      documentos: [
        'Acta constitutiva.',
        'Poder notarial con facultades de actos de dominio y de administración.',
        'INE del apoderado legal.',
      ],
      aclaracion: 'La escritura o el contrato deben estar a nombre de la persona moral.',
    },
    {
      id: 'albacea',
      etiqueta: 'Albacea',
      titulo: 'Albacea: el propietario falleció y existe una sucesión',
      documentos: [
        'Resolución del juicio sucesorio.',
        'Documento judicial o notarial que acredite el cargo de albacea.',
        'INE del albacea.',
      ],
      aclaracion: ACLARACION_FINADO,
    },
    {
      id: 'heredero',
      etiqueta: 'Heredero',
      titulo: 'Heredero: el propietario falleció',
      documentos: [
        'Acta de defunción del propietario.',
        'Documento judicial o notarial que acredite la calidad de heredero.',
        'INE del heredero.',
      ],
      aclaracion: ACLARACION_FINADO,
    },
  ],

  recuadroInformativo: {
    titulo: '¿La dirección de tu escritura ya no es la actual?',
    bloques: [
      {
        texto:
          'La constancia se emite con la **dirección que aparece en la escritura o el contrato**. Si el nombre de la calle o la colonia cambió, puedes pedir que se agregue la leyenda:',
      },
      { texto: '"Actualmente conocido como [dirección actual]"', leyenda: true },
      {
        texto:
          'Para ello, presenta la **boleta predial** o el **alineamiento y número oficial** con la dirección actual. El personal de SOAPAP verificará que coincida.',
      },
    ],
  },

  verificacionPrevia:
    '**Antes de pagar:** la constancia no lleva nombre de persona, solo la **dirección del inmueble**. Verifica que coincida con lo que te pide el trámite para el que la necesitas.',

  transferencia: {
    cuenta: CUENTA_SOAPAP_BBVA,
    concepto: 'Pago de constancia de predio no registrado',
    nota: `Monto: **${monto}** (IVA incluido). Entrega una **copia del ticket** de la transferencia o del depósito en la oficina.`,
  },

  ventanilla: VENTANILLA_CONSTANCIAS,

  factura: { ...FACTURA_CONSTANCIAS, asuntoCorreo: 'Solicitud de factura - Constancia de predio no registrado' },

  pasos: [
    { actor: 'tu', texto: 'Acude a las oficinas de San Manuel y solicita tu constancia.' },
    { actor: 'soapap', texto: 'Te pide los documentos de propiedad, ubicación e identidad.' },
    { actor: 'soapap', texto: 'Revisa tus documentos y verifica que el inmueble no cuente con registro.' },
    { actor: 'tu', texto: `Paga ${monto} (IVA incluido) por transferencia, en el banco o con tarjeta de crédito o débito en la oficina.` },
    {
      actor: 'tu',
      texto: `Recibe tu constancia, vigente por ${VIGENCIA_DIAS} días. Si requieres factura, solicítala por correo.`,
    },
  ],

  avisoLegal: AVISO_LEGAL_CONSTANCIAS,
  oficina: OFICINA_SAN_MANUEL,
};
