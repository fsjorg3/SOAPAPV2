import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PeopleIcon from "@mui/icons-material/People";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArticleIcon from "@mui/icons-material/Article";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ComputerIcon from "@mui/icons-material/Computer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { comites } from "../../config/comites";

// URL de la Ventanilla digital (sistema externo con inicio de sesión, en desarrollo).
// Vacía = oculta: no se muestran ni el botón destacado de la barra ni su item en el menú.
// Al publicarse, basta con poner aquí la URL.
export const VENTANILLA_DIGITAL_HREF = "";

export const PLATAFORMA_NACIONAL_TRANSPARENCIA_HREF =
  "https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml?idEntidad=MjE=&idSujetoObligado=NDIzNg==#inicio";

// id del panel de un mega-menú; lo comparten el panel y el aria-controls de su botón.
export const megaMenuPanelId = (grupoTexto: string) =>
  `mega-menu-${grupoTexto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, "-")}`;

// Geometría de la barra (coordenadas de la ventana) para posicionar los paneles del mega-menú.
export interface MegaMenuAnchor {
  // Borde inferior de la isla: los paneles cuelgan de aquí.
  top: number;
  // Borde derecho de la isla: ningún panel lo rebasa.
  islaDerecha: number;
  // Borde izquierdo de cada botón de grupo, por texto del grupo.
  botones: Record<string, number>;
}

export interface NavLeafItem {
  texto: string;
  // Ruta interna del sitio o, para sistemas externos, href (se abre en otra pestaña).
  ruta?: string;
  href?: string;
  // Muestra un candado: el destino pide iniciar sesión.
  requiereAcceso?: boolean;
  // Declarado pero todavía no disponible: no se muestra en menús ni en el footer.
  oculto?: boolean;
  Icono?: React.ElementType;
}

export interface NavMenuColumn {
  titulo: string;
  items: NavLeafItem[];
  // Link al pie de la columna hacia la página índice de la sección.
  verTodo?: { texto: string; ruta: string };
}

export type NavGroupItem = { texto: string; ruta?: undefined; columnas: NavMenuColumn[] };

export type NavItem =
  // soloMovil: se muestra en el drawer y el footer, pero no en la barra de escritorio.
  | { texto: string; ruta: string; columnas?: undefined; soloMovil?: boolean }
  | NavGroupItem;

export const navbarItems: NavItem[] = [
  // En escritorio, el logo es el link a Inicio.
  { texto: "Inicio", ruta: "/", soloMovil: true },
  {
    texto: "Servicios",
    columnas: [
      {
        titulo: "En línea",
        items: [
          {
            texto: "Ventanilla digital",
            href: VENTANILLA_DIGITAL_HREF,
            requiereAcceso: true,
            oculto: !VENTANILLA_DIGITAL_HREF,
            Icono: ComputerIcon,
          },
        ],
      },
      {
        titulo: "Programas",
        items: [
          { texto: "Regularízate 2026", ruta: "/regularizate_2026", Icono: WaterDropIcon },
          { texto: "Regularización doméstica", ruta: "/regularizacion_domestica", Icono: HomeIcon },
          { texto: "Regularización 2026", ruta: "/regularizacion_2026", Icono: EngineeringIcon },
        ],
      },
      {
        titulo: "Trámites",
        items: [
          { texto: "Facturación", oculto: true, Icono: ReceiptLongIcon },
        ],
      },
    ],
  },
  {
    texto: "Transparencia",
    columnas: [
      {
        titulo: "Información pública",
        items: [
          { texto: "Normatividad", ruta: "/normatividad", Icono: GavelIcon },
          { texto: "Información financiera", ruta: "/informacion-financiera", Icono: AccountBalanceIcon },
          { texto: "Convocatorias", ruta: "/convocatorias", Icono: ArticleIcon },
          {
            texto: "Plataforma Nacional de Transparencia",
            href: PLATAFORMA_NACIONAL_TRANSPARENCIA_HREF,
            Icono: TravelExploreIcon,
          },
        ],
      },
    ],
  },
  {
    texto: "Institución",
    columnas: [
      {
        titulo: "Conócenos",
        items: [
          { texto: "Quiénes somos", ruta: "/quienes-somos", Icono: InfoOutlinedIcon },
          { texto: "Directorio", ruta: "/directorio", Icono: PeopleIcon },
        ],
      },
      {
        titulo: "Comités",
        items: comites.map((comite) => ({
          texto: comite.nombre,
          ruta: comite.ruta,
          oculto: !comite.publicado,
          Icono: comite.Icono,
        })),
        verTodo: { texto: "Ver todos los comités", ruta: "/comites" },
      },
    ],
  },
  { texto: "Contacto", ruta: "/contacto" },
];

export const itemsVisibles = (columna: NavMenuColumn) => columna.items.filter((item) => !item.oculto);

// Descarta columnas que quedan vacías al ocultar sus items (p. ej. "En línea" sin Ventanilla).
export const columnasVisibles = (grupo: NavGroupItem) =>
  grupo.columnas.filter((columna) => itemsVisibles(columna).length > 0);

const coincideRuta = (pathname: string, ruta: string) => pathname === ruta || pathname.startsWith(`${ruta}/`);

// Un grupo está activo si la ruta actual es (o está debajo de) alguno de sus items o páginas índice.
export const esGrupoActivo = (grupo: NavGroupItem, pathname: string) =>
  grupo.columnas.some(
    (columna) =>
      itemsVisibles(columna).some((item) => item.ruta && coincideRuta(pathname, item.ruta)) ||
      (columna.verTodo !== undefined && coincideRuta(pathname, columna.verTodo.ruta))
  );
