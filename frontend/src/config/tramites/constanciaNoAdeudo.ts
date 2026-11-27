// Contenido de la página /tramites/constancia-no-adeudo.
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

export const CONSTANCIA_NO_ADEUDO: TramiteConfig = {
  slug: 'constancia-no-adeudo',
  nombre: 'Constancia de No Adeudo',
  nombreLineas: ['Constancia', 'de No Adeudo'],
  subtitulo: 'Trámite presencial · Servicios de agua potable y alcantarillado',
  imagenTarjeta: '/assets/constancias/No_Adeudo.webp',
  resumen: 'Acredita que tu cuenta de agua potable y alcantarillado no tiene adeudos.',
  tipoServicio: 'Constancia de no adeudo de servicios de agua potable y alcantarillado',
  ilustracion: {
    src: '/assets/constancias/constancia.webp',
    alt: 'Persona sonriente mostrando una constancia con una gota de agua y una palomita de aprobado',
  },
  costo: COSTO_CONSTANCIAS,
  ivaIncluido: true,
  notaCosto: NOTA_COSTO_CONSTANCIAS,
  vigenciaDias: VIGENCIA_DIAS,
  notaVigencia:
    'Al mes siguiente inicia un nuevo periodo de cobro, por eso tramítala cerca de la fecha en que la vas a usar.',
  notaAtencion: NOTA_ATENCION_CONSTANCIAS,
  notaCotejo: NOTA_COTEJO_CONSTANCIAS,

  requisitos: [
    {
      titulo: '**Número de cuenta (NIS).**',
      detalle: 'Lo encuentras en tu recibo de agua.',
      icono: 'recibo',
    },
    {
      titulo: '**Identificación y documentos** según quién realiza el trámite.',
      icono: 'identificacion',
      enlace: { texto: 'Consulta la lista abajo ↓', ancla: ANCLA_DOCUMENTOS },
    },
    {
      titulo: '**Cuenta activa y sin adeudos.**',
      detalle: 'Si tu cuenta está inactiva o tiene adeudo, no es posible expedir la constancia.',
      icono: 'cuentaActiva',
    },
    {
      titulo: '**Copia del ticket de pago.**',
      detalle: 'De la transferencia o de la terminal en ventanilla.',
      icono: 'ticket',
    },
  ],

  perfiles: [
    {
      id: 'titular',
      etiqueta: 'Titular',
      titulo: 'Persona física: acude el titular de la cuenta',
      documentos: ['INE del titular.'],
    },
    {
      id: 'representante',
      etiqueta: 'Representante',
      titulo: 'Persona física: acude un representante',
      documentos: [
        'Carta poder simple dirigida al SOAPAP, con firmas legibles.',
        'INE de quien otorga el poder (titular).',
        'INE de quien recibe el poder (quien acude).',
      ],
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
    },
    {
      id: 'albacea',
      etiqueta: 'Albacea',
      titulo: 'Albacea: el titular falleció y existe una sucesión',
      documentos: [
        'Resolución del juicio sucesorio.',
        'Documento judicial o notarial que acredite el cargo de albacea.',
        'INE del albacea.',
      ],
      aclaracion: 'La constancia se emite a nombre de la persona finada.',
    },
    {
      id: 'heredero',
      etiqueta: 'Heredero',
      titulo: 'Heredero: el titular falleció',
      documentos: [
        'Acta de defunción del titular.',
        'Documento judicial o notarial que acredite la calidad de heredero.',
        'INE del heredero.',
      ],
      aclaracion: 'La constancia se emite a nombre de la persona finada.',
    },
  ],

  verificacionPrevia:
    '**Antes de pagar:** la constancia lleva el **nombre del titular y el NIS** tal como aparecen en tu cuenta. Verifica que coincidan con lo que te pide el trámite para el que la necesitas.',

  transferencia: {
    cuenta: CUENTA_SOAPAP_BBVA,
    concepto: 'Pago de constancia de no adeudo',
    nota: `Monto: **${monto}** (IVA incluido). Entrega una **copia del ticket** de la transferencia o del depósito en la oficina.`,
  },

  ventanilla: VENTANILLA_CONSTANCIAS,

  factura: { ...FACTURA_CONSTANCIAS, asuntoCorreo: 'Solicitud de factura - Constancia de no adeudo' },

  pasos: [
    { actor: 'tu', texto: 'Acude a las oficinas de San Manuel y solicita tu constancia.' },
    { actor: 'soapap', texto: 'Te pide los requisitos según quién realiza el trámite.' },
    { actor: 'soapap', texto: 'Verifica que tu cuenta no tenga adeudos.' },
    { actor: 'tu', texto: `Paga ${monto} (IVA incluido) por transferencia, en el banco o con tarjeta de crédito o débito en la oficina.` },
    {
      actor: 'tu',
      texto: `Recibe tu constancia, vigente por ${VIGENCIA_DIAS} días. Si requieres factura, solicítala por correo.`,
    },
  ],

  avisoLegal: AVISO_LEGAL_CONSTANCIAS,
  oficina: OFICINA_SAN_MANUEL,
};
