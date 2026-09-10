import type { ElementType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Face3Icon from '@mui/icons-material/Face3';
import FaceIcon from '@mui/icons-material/Face';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GavelIcon from '@mui/icons-material/Gavel';

export type IconComponent = ElementType<SvgIconProps>;

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
}

export interface GalleryItem {
    src: string;
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
    {
        Icon: GavelIcon,
        title: 'ACTA PRIMERA SESIÓN ORDINARIA DEL COMITÉ DE ÉTICA Y PREVENCIÓN DE CONFLICTOS DE INTERÉS (CEPCI)',
        description: 'Acta de la primera sesión ordinaria del CEPCI SOAPAP 2026.',
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

export const galleryItems: GalleryItem[] = [
    {
        src: '/eticaGalery/sesion_1_foto1.webp',
        alt: 'Persona utilizando agua en un lavabo',
    },
    {
        src: '/eticaGalery/sesion_1_foto2.webp',
        alt: 'Personas directivas reunidas en una mesa de trabajo',
    },
    {
        src: '/eticaGalery/sesion_1_foto3.webp',
        alt: 'Personas servidoras públicas durante una reunión institucional',
    },
    {
        src: '/eticaGalery/sesion_1_foto4.webp',
        alt: 'Imagen institucional del SOAPAP',
    },
    {
        src: '/eticaGalery/sesion_1_foto5.webp',
        alt: 'Imagen institucional del SOAPAP',
    },
    {
        src: '/eticaGalery/sesion_1_foto6.webp',
        alt: 'Imagen institucional del SOAPAP',
    },
];
