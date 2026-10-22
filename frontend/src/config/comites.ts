import GroupsIcon from "@mui/icons-material/Groups";
import DiversityIcon from "@mui/icons-material/Diversity3";

export interface Comite {
  id: string;
  nombre: string;
  ruta: string;
  descripcion: string;
  Icono: React.ElementType;
  // false = declarado pero sin página todavía: no aparece en el menú ni en el índice de comités.
  publicado: boolean;
}

// Fuente única de los comités: la consumen la columna "Comités" del menú y la página /comites.
export const comites: Comite[] = [
  {
    id: "etica",
    nombre: "Comité de ética",
    ruta: "/comites/etica",
    descripcion: "Integrantes, normativa y documentos del Comité de Ética en materia de integridad pública.",
    Icono: GroupsIcon,
    publicado: true,
  },
  {
    id: "igualdad-laboral",
    nombre: "Comité de Igualdad Laboral y No Discriminación",
    ruta: "/comites/igualdad-laboral",
    descripcion: "Acciones y documentos del Comité de Igualdad Laboral y No Discriminación del SOAPAP.",
    Icono: DiversityIcon,
    publicado: false,
  },
];

export const comitesPublicados = comites.filter((comite) => comite.publicado);
