// Estilos compartidos por las secciones de la guía del permiso de descarga.

// Tono claro de la marca para texto secundario sobre fondo vino (token primary-tint del sistema de diseño).
export const TINTE_CLARO = '#F8F1F3';
// Vino intermedio para trazos y bordes sobre fondo vino.
export const VINO_MEDIO = '#7A203D';
// Etiquetas apagadas sobre fondo vino.
export const VINO_APAGADO = '#B98A99';

// Espacio que ocupa la Navbar sticky; coincide con el scrollMarginTop de LayoutPublico.
export const ALTO_NAVBAR = { xs: 80, md: 96 };

export const panelOscuroSx = {
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  borderRadius: 1,
} as const;

export const panelClaroSx = {
  bgcolor: 'background.paper',
  border: 1,
  borderColor: 'divider',
  borderRadius: 1,
} as const;

export const rellenoPanelSx = { px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 5, md: 8 } } as const;

export const tituloGrandeSx = {
  fontSize: 'clamp(2rem, 4.6vw, 4.25rem)',
  lineHeight: 1.06,
  fontWeight: 800,
  letterSpacing: '-0.03em',
} as const;

export const entradillaSx = {
  fontSize: 'clamp(1.0625rem, 1.4vw, 1.3125rem)',
  lineHeight: 1.6,
} as const;

// Lleva a una sección y le pasa el foco para lectores de pantalla y teclado.
export function irASeccion(id: string, suave: boolean) {
  const destino = document.getElementById(id);
  if (!destino) return;
  destino.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
  destino.focus({ preventScroll: true });
}
