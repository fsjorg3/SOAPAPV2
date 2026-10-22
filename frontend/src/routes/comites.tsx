import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router";

import { comitesPublicados } from "../config/comites";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";

// Página índice de comités: se alimenta de config/comites.ts, la misma fuente que el menú.
export default function Comites() {
  useDocumentMeta(seoMetadata.comites);

  return (
    <Box>
      <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 900, color: "primary.main" }}>
        Comités
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mt: 1, mb: 4, maxWidth: 720 }}>
        Órganos colegiados del SOAPAP que promueven la integridad, la ética y las buenas prácticas en el servicio público.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {comitesPublicados.map(({ id, nombre, ruta, descripcion, Icono }) => (
          <Card key={id} sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 3, flexGrow: 1 }}>
              <Icono sx={{ fontSize: 40, color: "secondary.main", mb: 1.5 }} />
              <Typography variant="h6" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 1 }}>
                {nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                {descripcion}
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 3, pb: 3 }}>
              <Button component={Link} to={ruta} endIcon={<ArrowForwardIcon />} color="primary">
                Conocer más
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
