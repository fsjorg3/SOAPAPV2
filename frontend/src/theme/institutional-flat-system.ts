// theme.ts
import { createTheme,alpha } from "@mui/material/styles";
import type { CSSObject, Theme, ThemeOptions } from "@mui/material/styles";
import { ESCALA_TEXTO, PREFERENCIAS_DEFECTO } from "../components/accesibilidad/preferencias";
import type { PreferenciasAccesibilidad } from "../components/accesibilidad/preferencias";

// 0. Extendemos el tema con la geometría del sitio (ancho máximo y márgenes laterales)
declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      // Ancho máximo del sitio en px (navbar, contenido y footer).
      anchoMaximo: number;
      // Margen lateral en px por breakpoint, entre el borde de la ventana (o del ancho máximo) y el contenido.
      margenLateral: { xs: number; sm: number; md: number };
    };
  }
  interface ThemeOptions {
    layout?: Partial<Theme['layout']>;
  }
}

// 1. Extendemos Paper porque es el padre mecánico de la propiedad variant
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    standard: true;
    outstanding:true;
  }
}

// 2. Extendemos Card para asegurar la consistencia del componente final
declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    standard: true;
    outstanding:true;
  }
}


// Tema base (sin opciones de accesibilidad). crearTemaInstitucional le aplica encima las preferencias.
const opcionesBase: ThemeOptions = {
  palette: {
    mode: "light",

    primary: {
      main: "#3D0017",
      light: "#5B132B",
      dark: "#2B000F",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#B8822A",
      light: "#D89A2E",
      dark: "#9F7122",
      contrastText: "#FFFFFF",
    },

    error: {
      main: "#BA1A1A",
      light: "#FFEBEE",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#C58A00",
      light: "#FFF7E0",
      contrastText: "#191C1E",
    },

    success: {
      main: "#2E7D32",
      light: "#E8F5E9",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#1565C0",
      light: "#EAF2FD",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F8F9FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#191C1E",
      secondary: "#544245",
      disabled: "#A7ADB3",
    },

    divider: "#E9ECEF",

    grey: {
      50: "#F8F9FB",
      100: "#F2F4F6",
      200: "#E6E8EA",
      300: "#E0E3E5",
      400: "#D8DADC",
      500: "#A7ADB3",
      900: "#191C1E",
    },
  },

  // Tamaños en rem (base 16px) para que escalen con el font-size del <html> (opción "Tamaño de texto").
  typography: {
    fontFamily: `"Montserrat", sans-serif`,

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },

    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.25,
    },

    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },

    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },

    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.02em",
    },

    caption: {
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: 8,

  // Fuente única del ancho del sitio: la consumen LayoutPublico, la navbar y el footer
  // (ver contenedorSitioSx y anchoContenidoSx al final del archivo). Las rutas no definen su propio ancho.
  layout: {
    anchoMaximo: 1440,
    margenLateral: { xs: 16, sm: 24, md: 32 },
  },

  shadows: [
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F8F9FB",
          color: "#191C1E",
          fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },

        "*": {
          boxSizing: "border-box",
        },

        "::selection": {
          backgroundColor: "#5B132B",
          color: "#FFFFFF",
        },

        // Foco visible al navegar con teclado (enlaces y elementos nativos). Dorado secundario:
        // contrasta con el guinda de la navbar y con fondos claros.
        ":focus-visible": {
          outline: "3px solid #B8822A",
          outlineOffset: "2px",
        },
      },
    },

    // ButtonBase (base de Button, IconButton, Tab, ToggleButton…) pone outline: 0;
    // se restaura el mismo contorno cuando el foco viene del teclado.
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            outline: "3px solid #B8822A",
            outlineOffset: "2px",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid #E9ECEF",
          boxShadow: "none",
        },
      },
    },






    MuiCard: {
      styleOverrides: {
        root: {
          
          backgroundImage: "none",
          border: "1px solid #E9ECEF",
          boxShadow: "none",
          borderRadius: 8,
          padding: 8,
        },
      },variants: [
        {
          props: {
            variant: "standard",
          },
          style: {
            borderLeft: '10px solid #5B132B',
            "&:hover": {
              borderLeft: '10px solid #9F7122',
              backgroundColor:'#F8F9FB',
              //400: "#D8DADC", 500: "#A7ADB3",
            },
            "&:active": {
              borderLeft: '10px solid #9F7122',
              backgroundColor:'#F8F9FB',
            },
          },
        },
        {
          props: {
            variant: "outstanding",
          },
          style: {
            borderLeft: '10px solid #B8822A',
            "&:hover": {
              borderLeft: '10px solid #9F7122',
              backgroundColor:'#F2F4F6',
            },
            "&:active": {
              borderLeft: '10px solid #9F7122',
              backgroundColor:'#F2F4F6',
            },
          },
        },
      ],
    },









    MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: 4,
      boxShadow: "none",
      padding: "10px 18px",
      transition: "all 180ms ease-out",

      "&:hover": {
        boxShadow: "none",
      },
    },
  },

  variants: [
    {
      props: {
        variant: "contained",
        color: "primary",
      },

      style: {
        backgroundColor: "#3D0017",
        color: "#FFFFFF",

        "&:hover": {
          backgroundColor: "#5B132B",
        },

        "&:active": {
          backgroundColor: "#2B000F",
        },
      },
    },

    {
      props: {
        variant: "contained",
        color: "secondary",
      },

      style: {
        backgroundColor: "#B8822A",
        color: "#FFFFFF",

        "&:hover": {
          backgroundColor: "#D89A2E",
        },

        "&:active": {
          backgroundColor: "#9F7122",
        },
      },
    },

    {
      props: {
        variant: "outlined",
      },

      style: {
        border: "1px solid #5B132B",
        color: "#5B132B",

        "&:hover": {
          backgroundColor: "#F8F1F3",
          border: "1px solid #5B132B",
        },
      },
    },

    {
      props: {
        variant: "text",
      },

      style: {
        color: "#5B132B",

        "&:hover": {
          backgroundColor: "transparent",
          color: "#7A203D",
        },
      },
    },
  ],
},

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 4,

          "& fieldset": {
            borderColor: "#D8DADC",
          },

          "&:hover fieldset": {
            borderColor: "#5B132B",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#5B132B",
            borderWidth: "1px",
          },

          "&.Mui-disabled": {
            backgroundColor: "#F1F3F5",
          },
        },

        input: {
          padding: "12px 14px",
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid #E9ECEF",
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          borderBottom: "1px solid #E9ECEF",
          fontWeight: 700,
          color: "#191C1E",
        },

        body: {
          borderBottom: "1px solid #F2F4F6",
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(even)": {
            backgroundColor: "#F8F9FB",
          },

          "&:hover": {
            backgroundColor: "#F2F4F6",
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#B8822A",
          height: 2,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minHeight: 48,
          fontWeight: 600,
          color: "#544245",

          "&.Mui-selected": {
            color: "#191C1E",
          },
        },
      },
    },

    MuiAlert: {
  styleOverrides: {
    root: {
      borderRadius: 8,
      border: "1px solid",
      boxShadow: "none",
    },
  },

  variants: [
    {
      props: {
        severity: "success",
      },

      style: {
        backgroundColor: "#E8F5E9",
        borderColor: "#C8E6C9",
        color: "#2E7D32",
      },
    },

    {
      props: {
        severity: "warning",
      },

      style: {
        backgroundColor: "#FFF7E0",
        borderColor: "#F0D89A",
        color: "#C58A00",
      },
    },

    {
      props: {
        severity: "error",
      },

      style: {
        backgroundColor: "#FFEBEE",
        borderColor: "#F5C2C7",
        color: "#BA1A1A",
      },
    },

    {
      props: {
        severity: "info",
      },

      style: {
        backgroundColor: "#EAF2FD",
        borderColor: "#C9DDF8",
        color: "#1565C0",
      },
    },
  ],
},

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E9ECEF",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#5B132B",
          textDecoration: "none",
          fontWeight: 600,

          "&:hover": {
            color: "#7A203D",
            textDecoration: "underline",
          },

          "&:visited": {
            color: "#8B5A6B",
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E9ECEF",
          boxShadow: "none",
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        // Establece el comportamiento base para evitar repetirlo en el componente
        elevation: 0, 
        position: 'sticky',
        color: 'inherit', 
        
      },
      styleOverrides: {

        root: ({ theme }) => ({
          // CORRECCIÓN: Una sola declaración de backgroundColor utilizando 'alpha'
          // Inyectamos un 90% de opacidad al color base del tema
          // 1. Efecto Isla Flotante
          //width: {xs:'100%',md:'50%'},
          marginInline: 'auto',
          marginTop: '20px', // Lo separa físicamente del techo al inicio
          top: '20px',       // Mantiene esa separación de 20px al hacer scroll
          
          // 2. Estética de la Isla
          borderRadius: '12px', // Curvatura más pronunciada para el efecto flotante
          border: `1px solid ${theme.palette.divider}`, // Borde en los 4 lados


          // Efecto Cristal (Glassmorphism)
          backgroundColor: alpha(theme.palette.primary.light, 0.95), 
          color: "primary.contrastText",
          
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['background-color', 'border-color'], {
            duration: theme.transitions.duration.standard,
          }),
        }),

      }
    },
    

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#191C1E",
          borderRadius: 4,
          fontSize: "0.75rem",
        },
      },
    },

  },
};

// Contenedor del sitio: ocupa hasta layout.anchoMaximo y deja layout.margenLateral a cada lado.
// Lo usan el <main> de LayoutPublico y el contenido del footer.
export const contenedorSitioSx = (theme: Theme): CSSObject => {
  const { anchoMaximo, margenLateral } = theme.layout;
  return {
    width: '100%',
    maxWidth: `${anchoMaximo}px`,
    marginInline: 'auto',
    // En sx, un número en padding se multiplica por theme.spacing: se pasan px explícitos.
    paddingInline: `${margenLateral.xs}px`,
    [theme.breakpoints.up('sm')]: { paddingInline: `${margenLateral.sm}px` },
    [theme.breakpoints.up('md')]: { paddingInline: `${margenLateral.md}px` },
  };
};

// Ancho exacto del contenido útil (contenedor sin sus márgenes laterales), para elementos que no viven
// dentro del contenedor pero deben alinear sus bordes con él, como la isla de la navbar.
export const anchoContenidoSx = (theme: Theme): CSSObject => {
  const { anchoMaximo, margenLateral } = theme.layout;
  const ancho = (margen: number) => ({ width: `calc(100% - ${2 * margen}px)`, maxWidth: `${anchoMaximo - 2 * margen}px` });
  return {
    ...ancho(margenLateral.xs),
    [theme.breakpoints.up('sm')]: ancho(margenLateral.sm),
    [theme.breakpoints.up('md')]: ancho(margenLateral.md),
  };
};

export type OpcionesTema = PreferenciasAccesibilidad;

const FILTRO_INVERTIR = "invert(1) hue-rotate(180deg)";
const GRIS_CONTRASTE = "#4A4A4A";

// Capa de accesibilidad que se fusiona (deep merge) sobre el tema base.
function opcionesAccesibilidad({
  tamanoTexto,
  altoContraste,
  subrayarEnlaces,
  escalaGrises,
  invertirColores,
}: OpcionesTema): ThemeOptions {
  const filtros = [escalaGrises && "grayscale(1)", invertirColores && FILTRO_INVERTIR].filter(Boolean).join(" ");

  return {
    ...(altoContraste && {
      palette: {
        // El dorado base (#B8822A) no llega a 4.5:1 sobre blanco; se oscurece.
        secondary: { main: "#7A5310", light: "#8F6418", dark: "#5E3F0A", contrastText: "#FFFFFF" },
        background: { default: "#FFFFFF", paper: "#FFFFFF" },
        text: { primary: "#000000", secondary: "#1A1A1A", disabled: "#5C5C5C" },
        divider: GRIS_CONTRASTE,
      },
    }),
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: ESCALA_TEXTO[tamanoTexto],
            // En el elemento raíz el filtro no crea bloque contenedor: no afecta a elementos position: fixed.
            ...(filtros && { filter: filtros }),
          },
          // Con colores invertidos, fotos, videos y el visor PDF se re-invierten para verse normales.
          ...(invertirColores && {
            "img, video, canvas, picture": { filter: FILTRO_INVERTIR },
          }),
          ...(altoContraste && {
            body: { backgroundColor: "#FFFFFF", color: "#000000" },
          }),
          // Excluye ButtonBase: botones con forma de enlace y ítems de la navbar no se subrayan.
          ...(subrayarEnlaces && {
            "a:not(.MuiButtonBase-root)": { textDecoration: "underline" },
          }),
        },
      },
      ...(subrayarEnlaces && {
        MuiLink: { styleOverrides: { root: { textDecoration: "underline" } } },
      }),
      ...(altoContraste && {
        MuiPaper: { styleOverrides: { root: { border: `1px solid ${GRIS_CONTRASTE}` } } },
        MuiCard: { styleOverrides: { root: { border: `1px solid ${GRIS_CONTRASTE}` } } },
        MuiDivider: { styleOverrides: { root: { borderColor: GRIS_CONTRASTE } } },
        MuiTab: { styleOverrides: { root: { color: "#1A1A1A", "&.Mui-selected": { color: "#000000" } } } },
        MuiOutlinedInput: { styleOverrides: { root: { "& fieldset": { borderColor: GRIS_CONTRASTE } } } },
      }),
    },
  };
}

// Tema del sitio con las preferencias de accesibilidad aplicadas (App.tsx lo recrea cuando cambian).
export function crearTemaInstitucional(opciones: OpcionesTema = PREFERENCIAS_DEFECTO) {
  // createTheme fusiona en profundidad los argumentos extra sobre el tema ya creado.
  return createTheme(opcionesBase, opcionesAccesibilidad(opciones));
}

const InstitutionalFlatSystem = crearTemaInstitucional();

export default InstitutionalFlatSystem;