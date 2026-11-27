// Diseño de las páginas de trámites autorizado por Comunicación Social y Vinculación
// (flyer "Constancia de No Adeudo"). Paleta y medidas tomadas literalmente de ese diseño;
// no se mezclan con el tema institucional para no alterar el resto del sitio.
// Tamaños de letra en rem/clamp(rem): escalan con la opción "Tamaño de texto" de accesibilidad.
import type { SxProps, Theme } from '@mui/material/styles';

export const FLYER = {
  guinda: '#6B1A33',
  guindaOsc: '#521226',
  guindaTexto: '#7A1E3B',
  guindaPin: '#8E2140',
  durazno: '#F8C6AC',
  duraznoSuave: '#FBDCCB',
  crema: '#FDF4EE',
  papel: '#fafafa',
  blanco: '#FFFFFF',
  texto: '#3A1420',
  gris: '#5E4A50',
  verde: '#5BAA3C',
  fondo: '#F3ECE8',
  lineaPunteada: '#E7D3CA',
  radio: '18px',
  sombra: '0 10px 30px rgba(82,18,38,.18)',
  // Ancho máximo del flyer.
  anchoMaximo: 880,
} as const;

export const FUENTE_RALEWAY = '"Raleway", "Montserrat", sans-serif';

// Margen lateral de los paneles guinda (efecto de hojas encimadas sobre la banda y el título).
const margenPanel = '0 clamp(0rem, 4vw, 3.5rem)';

// Hoja de papel del título.
export const hojaSx = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: FLYER.papel,
  borderTop: `3px solid ${FLYER.guinda}`,
  px: 3,
  pt: 'clamp(1.2rem, 3vw, 2rem)',
  pb: 'clamp(1rem, 2.5vw, 1.6rem)',
  textAlign: 'center',
  boxShadow: FLYER.sombra,
  '@media print': { boxShadow: 'none' },
} satisfies SxProps<Theme>;

// Panel guinda principal.
export const panelSx = {
  backgroundColor: FLYER.guinda,
  color: FLYER.blanco,
  m: margenPanel,
  px: 'clamp(1rem, 4vw, 2.5rem)',
  pt: 'clamp(1.5rem, 4vw, 2.5rem)',
  pb: 'clamp(1.8rem, 4vw, 2.5rem)',
  boxShadow: FLYER.sombra,
  '@media print': { boxShadow: 'none' },
} satisfies SxProps<Theme>;

// Banda crema a todo el ancho del flyer.
export const bandaSx = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: FLYER.crema,
  color: FLYER.texto,
  px: 'clamp(1rem, 4vw, 3rem)',
  py: 'clamp(1.2rem, 3vw, 1.8rem)',
  boxShadow: FLYER.sombra,
  '@media print': { boxShadow: 'none' },
} satisfies SxProps<Theme>;

// Subtítulo durazno dentro de los paneles (.subt).
export const subtituloSx = {
  m: 0,
  mt: 4,
  fontFamily: FUENTE_RALEWAY,
  fontSize: '1.25rem',
  fontWeight: 700,
  lineHeight: 1.3,
  color: FLYER.durazno,
} satisfies SxProps<Theme>;

// Pastilla durazno ("Requisitos").
export const pastillaSx = {
  display: 'inline-block',
  m: 0,
  mb: 1,
  px: '1.6rem',
  py: '.35rem',
  borderRadius: '14px',
  backgroundColor: FLYER.durazno,
  color: FLYER.guinda,
  fontFamily: FUENTE_RALEWAY,
  fontWeight: 700,
  fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
  lineHeight: 1.2,
} satisfies SxProps<Theme>;

// Tarjeta blanca dentro de los paneles (.tarjeta).
export const tarjetaSx = {
  backgroundColor: FLYER.blanco,
  color: FLYER.texto,
  borderRadius: FLYER.radio,
  px: '1.3rem',
  py: '1.2rem',
} satisfies SxProps<Theme>;

// Encabezado h3 de tarjeta (.tarjeta h3).
export const encabezadoTarjetaSx = {
  m: 0,
  mb: '.7rem',
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  color: FLYER.guindaTexto,
  fontSize: '1.1rem',
  fontWeight: 800,
  lineHeight: 1.3,
  '& .MuiSvgIcon-root': { fontSize: '1.5rem' },
} satisfies SxProps<Theme>;

// Nota crema al pie de tarjeta (.nota).
export const notaSx = {
  mt: '.8rem',
  px: '.75rem',
  py: '.55rem',
  borderRadius: '10px',
  backgroundColor: FLYER.crema,
  color: FLYER.gris,
  fontSize: '.82rem',
  lineHeight: 1.5,
} satisfies SxProps<Theme>;

// Botón píldora (.boton) y su variante con contorno (.boton.sec).
export const botonSx = (secundario = false) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.45rem',
  px: '1.1rem',
  py: '.6rem',
  borderRadius: '999px',
  border: `2px solid ${FLYER.guinda}`,
  backgroundColor: secundario ? 'transparent' : FLYER.guinda,
  color: secundario ? FLYER.guinda : FLYER.blanco,
  fontWeight: 700,
  fontSize: '.95rem',
  lineHeight: 1.5,
  letterSpacing: 0,
  textTransform: 'none',
  transition: 'transform .15s ease, background-color .15s ease',
  '&:hover': {
    backgroundColor: secundario ? FLYER.duraznoSuave : FLYER.guindaOsc,
    border: `2px solid ${FLYER.guinda}`,
    color: secundario ? FLYER.guinda : FLYER.blanco,
    transform: 'translateY(-1px)',
  },
  '& .MuiButton-startIcon': { mr: 0, ml: 0 },
  '& .MuiSvgIcon-root': { fontSize: '1.15rem' },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
  '@media print': { display: 'none' },
}) satisfies SxProps<Theme>;
