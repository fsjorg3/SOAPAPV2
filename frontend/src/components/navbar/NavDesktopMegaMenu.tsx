import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { useLocation } from "react-router";

import type { NavItem, NavLeafItem, NavMenuColumn } from "./navItems";

interface NavDesktopMegaMenuProps {
  item: Extract<NavItem, { columnas: NavMenuColumn[] }>;
  open: boolean;
  topOffset: number;
  onNavigate: (ruta: string) => void;
}

function MegaMenuLeafItem({ item, active, onNavigate }: { item: NavLeafItem; active: boolean; onNavigate: (ruta: string) => void }) {
  const Icono = item.Icono;

  if (!item.ruta) {
    return (
      <Box
        aria-disabled="true"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          fontWeight: 500,
          fontSize: "0.875rem",
          color: "text.disabled",
          cursor: "not-allowed",
        }}
      >
        {Icono && <Icono fontSize="small" />}
        {item.texto}
      </Box>
    );
  }

  return (
    <Box
      component="button"
      type="button"
      onClick={() => onNavigate(item.ruta!)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        fontFamily: "inherit",
        fontWeight: active ? 700 : 500,
        fontSize: "0.875rem",
        color: active ? "primary.main" : "text.primary",
        background: "none",
        border: "none",
        p: 0,
        textAlign: "left",
        cursor: "pointer",
        ":hover": {
          color: "primary.main",
        },
      }}
    >
      {Icono && <Icono fontSize="small" />}
      {item.texto}
    </Box>
  );
}

export default function NavDesktopMegaMenu({ item, open, topOffset, onNavigate }: NavDesktopMegaMenuProps) {
  const location = useLocation();
  const columnCount = Math.min(item.columnas.length, 4);

  return (
    <Collapse
      in={open}
      sx={{
        position: "fixed",
        top: topOffset,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          mt: 1.5,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.18)",
          p: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: `repeat(${columnCount}, 1fr)` },
          gap: 3,
        }}
      >
        {item.columnas.map((columna) => (
          <Box key={columna.titulo}>
            <Box
              sx={{
                fontWeight: 700,
                fontSize: "0.6875rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "text.disabled",
                mb: 1.75,
              }}
            >
              {columna.titulo}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {columna.items.map((leafItem) => (
                <MegaMenuLeafItem
                  key={leafItem.texto}
                  item={leafItem}
                  active={location.pathname === leafItem.ruta}
                  onNavigate={onNavigate}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Collapse>
  );
}
