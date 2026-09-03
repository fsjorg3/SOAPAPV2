import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import constanciaValidada from "../../assets/validador/constancia.png";

export default function VerificacionHero() {
  const handleVerificarAhora = () => {
    document.getElementById("formulario-verificacion")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 4,
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: "32px", md: "40px" },
            fontWeight: 900,
            color: "primary.main",
            mb: 2,
          }}
        >
          Verificación pública de constancias
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Valida la autenticidad y vigencia de las constancias emitidas por el Sistema Operador de
          los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla.
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleVerificarAhora}>
          Verificar ahora
        </Button>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Box
          component="img"
          src={constanciaValidada}
          alt="Constancia del SOAPAP validada"
          sx={{ display: "block", width: "100%", maxWidth: 320 }}
        />
      </Box>
    </Box>
  );
}
