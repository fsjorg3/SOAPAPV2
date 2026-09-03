import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export type VerificationStatus = "idle" | "loading" | "success" | "error";

interface VerificacionResultadoProps {
  status: VerificationStatus;
  resultFolio: string;
}

export default function VerificacionResultado({ status, resultFolio }: VerificacionResultadoProps) {
  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (status === "success") {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        {/* Resultado de ejemplo: el contenido exacto cambiará cuando exista el contrato real del backend. */}
        Constancia válida. Folio: {resultFolio}.
      </Alert>
    );
  }

  if (status === "error") {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        No pudimos verificar la constancia en este momento. Intenta más tarde o contáctanos.
      </Alert>
    );
  }

  return null;
}
