import type { ElementType } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BadgeIcon from '@mui/icons-material/Badge';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { IconoTramite } from '../../config/tramites/tipos';

// Traduce las claves de icono del config a iconos MUI.
export const ICONOS_TRAMITE: Record<IconoTramite, ElementType> = {
  recibo: ReceiptLongIcon,
  identificacion: BadgeIcon,
  cuentaActiva: TaskAltIcon,
  ticket: PaymentsIcon,
  documento: DescriptionIcon,
  propiedad: HomeWorkIcon,
  ubicacion: LocationOnIcon,
};
