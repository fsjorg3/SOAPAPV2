import Box from "@mui/material/Box";

import VerificacionCard from "./VerificacionCard";
import { verificacionCards } from "./verificacionData";

export default function VerificacionCards() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 3,
        py: { xs: 2, md: 4 },
      }}
    >
      {verificacionCards.map((card) => (
        <Box key={card.titulo} sx={{ width: { xs: "100%", sm: 340 } }}>
          <VerificacionCard Icono={card.Icono} titulo={card.titulo} descripcion={card.descripcion} />
        </Box>
      ))}
    </Box>
  );
}
