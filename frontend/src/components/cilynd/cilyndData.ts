import type { ElementType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';

export type IconComponent = ElementType<SvgIconProps>;

// Correo de contacto del comité. Vacío = oculta la sección de contacto; al tenerlo, basta con ponerlo aquí.
export const CILYND_CORREO = '';

export type RolIntegrante = 'Presidenta' | 'Coordinadora' | 'Ombudsperson' | 'Vocal';

export interface Integrante {
    foto: string;
    nombre: string;
    cargo: string;
    rol: RolIntegrante;
}

export interface CilyndDocument {
    Icon: IconComponent;
    title: string;
    description: string;
    pdfUrl: string;
}

const fotoUrl = (archivo: string) => `/cilyndImg/organigrama/${archivo}.webp`;

// Organigrama: Presidenta → Coordinadora → integrantes (Ombudsperson y vocales).
export const presidencia: Integrante = {
    foto: fotoUrl('presidenta'),
    nombre: 'Josefina Morales Guerrero',
    cargo: 'Directora General del SOAPAP',
    rol: 'Presidenta',
};

export const coordinacion: Integrante = {
    foto: fotoUrl('coordinadora'),
    nombre: 'Guillermina Canseco Carrera',
    cargo: 'Jefa de Departamento de Tesorería y Contabilidad',
    rol: 'Coordinadora',
};

export const integrantes: Integrante[] = [
    {
        foto: fotoUrl('ombudsperson'),
        nombre: 'Julián Corona Cabañas',
        cargo: 'Gerente Transitorio',
        rol: 'Ombudsperson',
    },
    {
        foto: fotoUrl('vocal-abril'),
        nombre: 'Abril Coyotl Flores',
        cargo: 'Analista adscrita a la Gerencia de Asuntos Legales',
        rol: 'Vocal',
    },
    {
        foto: fotoUrl('vocal-rocio'),
        nombre: 'Rocío Carbajal González',
        cargo: 'Analista adscrita a la Gerencia de Proyectos Técnica de los Servicios',
        rol: 'Vocal',
    },
    {
        foto: fotoUrl('vocal-francisco'),
        nombre: 'Francisco Javier Mendoza Colotl',
        cargo: 'Analista adscrito a la Gerencia de Proyectos y Supervisión de Obras e Infraestructura',
        rol: 'Vocal',
    },
    {
        foto: fotoUrl('vocal-josue'),
        nombre: 'Josué Francisco Luna Rivera',
        cargo: 'Jefe de Departamento adscrito a la Gerencia de Saneamiento y Medio Ambiente',
        rol: 'Vocal',
    },
    {
        foto: fotoUrl('vocal-edmundo'),
        nombre: 'Edmundo Pérez Santamaría',
        cargo: 'Jefe de Departamento adscrito a la Gerencia de Administración y Finanzas',
        rol: 'Vocal',
    },
];

export const cilyndDocuments: CilyndDocument[] = [
    {
        Icon: GavelIcon,
        title: 'POLÍTICA DE IGUALDAD LABORAL Y NO DISCRIMINACIÓN',
        description: 'Principios, definiciones y compromisos del SOAPAP para promover la igualdad y prevenir la discriminación entre las personas servidoras públicas.',
        pdfUrl: '/cilyndPDF/politica_igualdad_laboral_no_discriminacion.pdf',
    },
    {
        Icon: DescriptionIcon,
        title: 'PRONUNCIAMIENTO DE CERO TOLERANCIA AL HOSTIGAMIENTO SEXUAL Y ACOSO SEXUAL',
        description: 'Pronunciamiento institucional emitido el 2 de octubre de 2026 para prevenir y atender el hostigamiento sexual y el acoso sexual.',
        pdfUrl: '/cilyndPDF/pronunciamiento_cero_tolerancia.pdf',
    },
];
