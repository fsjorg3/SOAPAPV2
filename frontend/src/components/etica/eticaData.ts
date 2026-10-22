import type { ElementType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
//import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Face3Icon from '@mui/icons-material/Face3';
import FaceIcon from '@mui/icons-material/Face';
//import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GavelIcon from '@mui/icons-material/Gavel';

export type IconComponent = ElementType<SvgIconProps>;

// Sesiones del CEPCI, de la más reciente a la más antigua. Agrupan documentos (etiqueta) y fotos (pestañas).
export type SesionId = 'sesion-2' | 'sesion-1';

export interface Sesion {
    id: SesionId;
    etiqueta: string;
}

export const sesiones: Sesion[] = [
    { id: 'sesion-2', etiqueta: '2ª Sesión Ordinaria' },
    { id: 'sesion-1', etiqueta: '1ª Sesión Ordinaria' },
];

export interface CommitteeMember {
    Icon: IconComponent;
    name: string;
    position: string;
    function: string;
}

export interface NormativeDocument {
    Icon: IconComponent;
    title: string;
    description: string;
    pdfUrl: string;
    // Sesión que generó el documento; sin sesión es normativa externa (p. ej. el Código estatal).
    sesion?: SesionId;
    // true: la tarjeta descarga el archivo en lugar de abrirlo en el visor PDF (p. ej. formatos para llenar).
    descargable?: boolean;
}

export interface GalleryItem {
    src: string;
    alt: string;
    sesion: SesionId;
}

export interface ResourceItem {
    image: string;
    label: string;
    title: string;
    description: string;
    alt: string;
}

export const committeeMembers: CommitteeMember[] = [
    {
        Icon: FaceIcon,
        name: 'Luis Fernando Pérez Perucho',
        position: 'Gerente de Administración y Finanzas',
        function: 'Presidente del CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'Nadezhda Casiano Contreras',
        position: 'Personal adscrito a la Dirección General',
        function: 'Presidenta Suplente del CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'Cinthya Jiménez Ortega',
        position: 'Analista adscrita a la Gerencia de Asuntos Legales',
        function: 'Secretaria Ejecutiva del CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'Adriana Linares Toledo',
        position: 'Jefa del Departamento de Regulaciones y Litigios',
        function: 'Secretaria Ejecutiva Suplente del CEPCI.',
    },
    {
        Icon: FaceIcon,
        name: 'Eduardo Mestizo Ruíz',
        position: 'Titular del Órgano Interno de Control en el SOAPAP',
        function: 'Representación del OIC en el CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'María Andrea Gómez Jiménez',
        position: 'Órgano Interno de Control en el SOAPAP',
        function: 'Representación Suplente del OIC en el CEPCI.',
    },
    {
        Icon: FaceIcon,
        name: 'Miguel Ángel Dattoli Mora',
        position: 'Gerente de Supervisión Técnica de los Servicios',
        function: 'Vocal Titular Nivel Jerárquico Gerencia.',
    },
    {
        Icon: Face3Icon,
        name: 'Dulce Beatriz Rodríguez Palacios',
        position: 'Gerente de Asuntos Legales',
        function: 'Vocal Suplente Nivel Jerárquico Gerencia.',
    },
    {
        Icon: Face3Icon,
        name: 'Cecilia Regino Munguía',
        position: 'Jefa del Departamento de Personal y Recursos Materiales',
        function: 'Vocal Titular Nivel Jerárquico Jefatura de Departamento.',
    },
    {
        Icon: Face3Icon,
        name: 'Mónica Alejandra García Casiano',
        position: 'Jefa del Departamento de Comunicación Social y Vinculación',
        function: 'Vocal Suplente Nivel Jerárquico Jefatura de Departamento.',
    },
    {
        Icon: FaceIcon,
        name: 'Jorge Delfino Rodríguez Sánchez',
        position: 'Analista adscrito a la Gerencia de Administración',
        function: 'Vocal Titular Nivel Jerárquico Analista.',
    },
    {
        Icon: FaceIcon,
        name: 'Edgar González Morales',
        position: 'Analista adscrito a la Gerencia de Saneamiento y Medio Ambiente',
        function: 'Vocal Suplente Nivel Jerárquico Analista.',
    },
];

export const normativeDocuments: NormativeDocument[] = [
    // Orden: documentos de la sesión más reciente primero; la normativa externa al final.
    {
        Icon: GavelIcon,
        title: 'ACTA SEGUNDA SESIÓN ORDINARIA DEL COMITÉ DE ÉTICA Y PREVENCIÓN DE CONFLICTOS DE INTERÉS (CEPCI)',
        description: 'Acta de la segunda sesión ordinaria del CEPCI SOAPAP 2026, celebrada el 22 de septiembre.',
        sesion: 'sesion-2',
        pdfUrl: '/eticaPDF/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_acta.pdf',
    },
    {
        Icon: DescriptionIcon,
        title: 'PROTOCOLO PARA LA RECEPCIÓN Y ATENCIÓN DE DENUNCIAS',
        description: 'Procedimiento para recibir y atender las denuncias presentadas ante el CEPCI del SOAPAP.',
        sesion: 'sesion-2',
        pdfUrl: '/eticaPDF/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_protocolo_recepcion_atencion_denuncias.pdf',
    },
    {
        Icon: DescriptionIcon,
        title: 'ANEXO 1. RUTA PARA PRESENTAR UNA DENUNCIA',
        description: 'Infografía del protocolo: canales de presentación (físico, electrónico y verbal) y actuación del Comité.',
        sesion: 'sesion-2',
        pdfUrl: '/eticaPDF/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_anexo_1.pdf',
    },
    {
        Icon: AssignmentIcon,
        title: 'FORMATO DE PRESENTACIÓN DE DENUNCIA O QUEJA',
        description: 'Descarga el formato, llénalo con los datos que conozcas y preséntalo ante el CEPCI.',
        sesion: 'sesion-2',
        pdfUrl: '/eticaPDF/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_formato_denuncia_queja.pdf',
        descargable: true,
    },
    {
        Icon: GavelIcon,
        title: 'ACTA PRIMERA SESIÓN ORDINARIA DEL COMITÉ DE ÉTICA Y PREVENCIÓN DE CONFLICTOS DE INTERÉS (CEPCI)',
        description: 'Acta de la primera sesión ordinaria del CEPCI SOAPAP 2026.',
        sesion: 'sesion-1',
        pdfUrl: '/eticaPDF/acta_primera_sesion_CEPCI.pdf',
    },
    {
        Icon: GavelIcon,
        title: 'CÓDIGO DE ÉTICA E INTEGRIDAD PARA UN  BUEN GOBIERNO EN LA ADMINISTRACIÓN PÚBLICA ESTATAL',
        description: 'Código estatal sobre ética, integridad y conducta del servicio público.',
        pdfUrl: '/eticaPDF/codigo_estatal_etica_integridad_conducta.pdf',
    },
    /*{
        Icon: CalendarMonthIcon,
        title: 'Calendario de sesiones ordinarias del CEPCI',
        description: 'Tarjeta de ejemplo para documento',
        pdfUrl: '/eticaPDF/ejemplo.pdf',
    },
    {
        Icon: FormatListNumberedIcon,
        title: 'Programa Anual de Trabajo (PAT) 2026',
        description: 'Tarjeta de ejemplo para documento',
        pdfUrl: '/eticaPDF/ejemplo.pdf',
    },*/
];

export const resourceItems: ResourceItem[] = [
    /*{
        image: '/eticaGalery/PEAPUEBLA.webp',
        label: 'MATERIAL INFORMATIVO',
        title: 'Política Estatal Anticorrupción',
        description: 'Conoce cómo desde la PEAPUEBLA se coordinan esfuerzos para prevenir y frenar la corrupción en Puebla.',
        alt: 'Infografía: Política Estatal Anticorrupción',
    },*/
    /// Ejemplo de llenado
];

// Las fotos más recientes van primero: 2ª sesión ordinaria (22-sep-2026) y después la 1ª sesión.
export const galleryItems: GalleryItem[] = [
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto01.webp',
        alt: 'Integrante del Comité da lectura a un documento durante la segunda sesión ordinaria',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto02.webp',
        alt: 'Secretaria Ejecutiva toma notas durante la sesión del Comité de Ética',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto03.webp',
        alt: 'Integrantes del Comité de Ética revisan la presentación proyectada en la sala de juntas',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto04.webp',
        alt: 'Integrantes del Comité de Ética atienden la exposición durante la sesión',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto05.webp',
        alt: 'Integrantes del Comité de Ética votan a mano alzada frente a la presentación de la segunda sesión ordinaria',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto06.webp',
        alt: 'Integrantes del Comité de Ética reunidos en la mesa de trabajo de la segunda sesión ordinaria',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto07.webp',
        alt: 'Vista general de la mesa de trabajo durante la segunda sesión ordinaria del Comité',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto08.webp',
        alt: 'Integrantes del Comité de Ética siguen el orden del día de la segunda sesión ordinaria',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto09.webp',
        alt: 'Integrante del Comité vota a mano alzada durante la segunda sesión ordinaria',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto10.webp',
        alt: 'Integrantes del Comité de Ética toman notas durante la segunda sesión ordinaria',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/Segunda_Sesion/2026-09-22_comite_etica_sesion_2_foto11.webp',
        alt: 'Integrantes del Comité de Ética aprueban un acuerdo a mano alzada',
        sesion: 'sesion-2',
    },
    {
        src: '/eticaGalery/sesion_1_foto1.webp',
        alt: 'Persona utilizando agua en un lavabo',
        sesion: 'sesion-1',
    },
    {
        src: '/eticaGalery/sesion_1_foto2.webp',
        alt: 'Personas directivas reunidas en una mesa de trabajo',
        sesion: 'sesion-1',
    },
    {
        src: '/eticaGalery/sesion_1_foto3.webp',
        alt: 'Personas servidoras públicas durante una reunión institucional',
        sesion: 'sesion-1',
    },
    {
        src: '/eticaGalery/sesion_1_foto4.webp',
        alt: 'Imagen institucional del SOAPAP',
        sesion: 'sesion-1',
    },
    {
        src: '/eticaGalery/sesion_1_foto5.webp',
        alt: 'Imagen institucional del SOAPAP',
        sesion: 'sesion-1',
    },
    {
        src: '/eticaGalery/sesion_1_foto6.webp',
        alt: 'Imagen institucional del SOAPAP',
        sesion: 'sesion-1',
    },
];
