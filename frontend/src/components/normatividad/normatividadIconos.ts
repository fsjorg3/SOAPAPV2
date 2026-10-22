import type { ElementType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';

export type IconComponent = ElementType<SvgIconProps>;

const ICONOS_POR_SECCION: Record<string, IconComponent> = {
  marco_juridico_institucional: GavelIcon,
  normatividad_institucional: AccountBalanceIcon,
  lineamientos_y_disposiciones: DescriptionIcon,
  programas_anuales_pada: CalendarMonthIcon,
};

const ICONO_RESPALDO: IconComponent = ArticleIcon;

export function iconoDeSeccion(seccionId: string): IconComponent {
  return ICONOS_POR_SECCION[seccionId] ?? ICONO_RESPALDO;
}

export const ICONO_TITULO_CONCESION: IconComponent = ArticleIcon;
