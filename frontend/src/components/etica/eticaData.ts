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
        name: 'Miguel Ánge Dattoli Mora',
        position: 'Gerencia de Supervisión Técnica de los Servicios',
        function: 'Vocal Titular del CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'Dulce Beatríz Rodríguez Palacios ',
        position: 'Gerencia de Asuntos Legales',
        function: 'Vocal suplente del CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'Cecilia Regino Munguía ',
        position: 'Depto. de Personal y Recursos Materiales',
        function: 'Vocal Titular del CEPCI.',
    },
    {
        Icon: Face3Icon,
        name: 'Mónica Alejandra García Casiano ',
        position: 'Depto. de Comunicación Social y Vinculación',
        function: 'Vocal suplente del CEPCI.',
    },
    {
        Icon: FaceIcon,
        name: 'Jorge Delfino Rodríguez Sánchez',
        position: 'Analista',
        function: 'Vocal Titular del CEPCI.',
    },
    {
        Icon: FaceIcon,
        name: 'Edgar Gonzáles Morales',
        position: 'Analista',
        function: 'Vocal suplente del CEPCI.',
    },
];

export const normativeDocuments: NormativeDocument[] = [
    {
        Icon: GavelIcon,
        title: 'Acta de la primera sesión ordinaria del CEPCI',
        description: 'Tarjeta de ejemplo para documento',
        pdfUrl: '/eticaPDF/ejemplo.pdf',
    },
    {
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
    },
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
