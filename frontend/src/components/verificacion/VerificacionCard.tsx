import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface VerificacionCardProps {
  Icono: React.ElementType;
  titulo: string;
  descripcion: string;
}

export default function VerificacionCard({ Icono, titulo, descripcion }: VerificacionCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3, textAlign: "center" }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <Icono />
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
}
