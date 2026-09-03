import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import VerificacionResultado, { type VerificationStatus } from "./VerificacionResultado";

export default function VerificacionForm() {
  const [folio, setFolio] = useState("");
  const [codigo, setCodigo] = useState("");
  const [folioError, setFolioError] = useState("");
  const [codigoError, setCodigoError] = useState("");
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [resultFolio, setResultFolio] = useState("");

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;
    if (!folio.trim()) {
      setFolioError("El folio es requerido");
      hasError = true;
    } else {
      setFolioError("");
    }
    if (!codigo.trim()) {
      setCodigoError("El código de verificación es requerido");
      hasError = true;
    } else {
      setCodigoError("");
    }
    if (hasError) return;

    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}soapapv2/api/verification/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folio: folio.trim(), codigo: codigo.trim() }),
      });
      if (!res.ok) throw new Error("Respuesta no válida del servidor");
      // Contrato de respuesta aún no definido por el backend; se ajustará cuando exista.
      await res.json().catch(() => null);
      setResultFolio(folio.trim());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Box id="formulario-verificacion" sx={{ py: { xs: 4, md: 6 } }}>
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
            Verifica tu constancia
          </Typography>

          <Box component="form" onSubmit={handleVerify} noValidate>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Folio"
                  fullWidth
                  value={folio}
                  onChange={(e) => setFolio(e.target.value)}
                  error={!!folioError}
                  helperText={folioError}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Código de verificación"
                  fullWidth
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  error={!!codigoError}
                  helperText={codigoError}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={status === "loading"}
              startIcon={status === "loading" ? <CircularProgress size={18} color="inherit" /> : undefined}
              sx={{ mt: 3 }}
            >
              Verificar
            </Button>
          </Box>

          <VerificacionResultado status={status} resultFolio={resultFolio} />
        </CardContent>
      </Card>
    </Box>
  );
}
