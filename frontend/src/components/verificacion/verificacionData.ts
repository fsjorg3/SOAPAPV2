import FindInPageIcon from "@mui/icons-material/FindInPage";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export interface VerificacionStep {
  numero: number;
  Icono: React.ElementType;
  titulo: string;
  descripcion: string;
}

export interface VerificacionCard {
  Icono: React.ElementType;
  titulo: string;
  descripcion: string;
}

export const verificacionSteps: VerificacionStep[] = [
  {
    numero: 1,
    Icono: FindInPageIcon,
    titulo: "Ubica tu folio",
    descripcion: "Localiza el folio impreso en tu constancia.",
  },
  {
    numero: 2,
    Icono: QrCode2Icon,
    titulo: "Ingresa el código",
    descripcion: "Copia el código de verificación que aparece bajo el QR.",
  },
  {
    numero: 3,
    Icono: FactCheckIcon,
    titulo: "Consulta el resultado",
    descripcion: "Obtén al instante la información de tu constancia.",
  },
];

export const verificacionCards: VerificacionCard[] = [
  {
    Icono: VerifiedUserIcon,
    titulo: "Qué puedes verificar",
    descripcion: "Constancias de No Registro y No Adeudo emitidas por el SOAPAP.",
  },
  {
    Icono: LockIcon,
    titulo: "Validez pública",
    descripcion: "Las constancias verificadas adminstrativa ante SOAPAP",
  },
  //{
  //  Icono: SupportAgentIcon,
  //  titulo: "Ayuda y soporte",
  //  descripcion: "Estamos para apoyarte ante cualquier duda o aclaración.",
  //},
];
