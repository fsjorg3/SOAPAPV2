import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PeopleIcon from "@mui/icons-material/People";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArticleIcon from "@mui/icons-material/Article";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VerifiedIcon from "@mui/icons-material/Verified";

// URL final confirmada para el CTA de pago; el botón permanece oculto (display: none)
// hasta que se confirme si es requerido mostrarlo en el navbar.
export const CTA_PAGAR_HREF = "https://pagofacil.aguapuebla.mx/";

export interface NavLeafItem {
  texto: string;
  // Ausente = placeholder deshabilitado (todavía no existe la ruta real).
  ruta?: string;
  Icono?: React.ElementType;
}

export interface NavMenuColumn {
  titulo: string;
  items: NavLeafItem[];
}

export type NavItem =
  | { texto: string; ruta: string; columnas?: undefined }
  | { texto: string; ruta?: undefined; columnas: NavMenuColumn[] };

export const navbarItems: NavItem[] = [
  { texto: "Inicio", ruta: "/" },
  {
    texto: "Para ti",
    columnas: [
      {
        titulo: "Servicios",
        items: [
          { texto: "Facturación", Icono: ReceiptLongIcon },
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
        titulo: "Convocatorias",
        items: [
          { texto: "Licitaciones", ruta: "/convocatorias", Icono: ArticleIcon },
        ],
      },
    ],
  },
  {
    texto: "La institución",
    columnas: [
      {
        titulo: "Quiénes somos",
        items: [
          { texto: "Quiénes somos", ruta: "/quienes-somos", Icono: InfoOutlinedIcon },
        ],
      },
      {
        titulo: "Transparencia",
        items: [
          { texto: "Normatividad", ruta: "/normatividad", Icono: GavelIcon },
          { texto: "Información Financiera", ruta: "/informacion-financiera", Icono: AccountBalanceIcon },
          { texto: "Directorio", ruta: "/directorio", Icono: PeopleIcon },
          { texto: "Comité de ética", ruta: "/comite_de_etica", Icono: GroupsIcon },
        ],
      },
      {
        titulo: "Verificación",
        items: [
          { texto: "Validar documento", ruta: "/verificar-constancia", Icono: VerifiedIcon },
        ],
      },
    ],
  },
  { texto: "Contacto", ruta: "/contacto" },
];
