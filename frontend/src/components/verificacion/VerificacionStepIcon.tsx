import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface VerificacionStepIconProps {
  icon: ReactNode;
  Icono: React.ElementType;
}

export default function VerificacionStepIcon({ icon, Icono }: VerificacionStepIconProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
        }}
      >
        {icon}
      </Box>
      <Icono sx={{ color: "primary.main", fontSize: 72 }} />
    </Box>
  );
}
