import type { RefObject } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useLocation } from "react-router";

import { columnasVisibles, itemsVisibles, megaMenuPanelId, type MegaMenuAnchor, type NavGroupItem, type NavLeafItem } from "./navItems";

interface NavDesktopMegaMenuProps {
  item: NavGroupItem;
  open: boolean;
  anchor: MegaMenuAnchor;
  panelRef?: RefObject<HTMLDivElement | null>;
  // Cierra el menú; también cubre el clic sobre el item de la ruta actual (ahí no cambia el pathname).
  onItemClick: () => void;
}

const ANCHO_COLUMNA = 240;
const ESPACIO_COLUMNAS = 32;
const PADDING_PANEL = 32;
const MARGEN_VENTANA = 16;

const leafItemSx = (active: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.25,
  fontWeight: active ? 700 : 500,
  fontSize: "0.875rem",
  color: active ? "primary.main" : "text.primary",
  textDecoration: "none",
  ":hover": {
    color: "primary.main",
  },
});

function MegaMenuLeafItem({ item, active, onItemClick }: { item: NavLeafItem; active: boolean; onItemClick: () => void }) {
  const Icono = item.Icono;

  // Sistema externo: se abre en otra pestaña, con indicador de enlace externo (y candado si pide sesión).
  if (item.href) {
    return (
      <Box
        component="a"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onItemClick}
        sx={leafItemSx(false)}
      >
        {Icono && <Icono fontSize="small" />}
        {item.texto}
        {item.requiereAcceso && <LockOutlinedIcon sx={{ fontSize: "0.9rem", color: "text.secondary" }} aria-label="requiere iniciar sesión" />}
        <OpenInNewIcon sx={{ fontSize: "0.9rem", color: "text.secondary" }} aria-label="se abre en otra pestaña" />
      </Box>
    );
  }

  return (
    <Box component={Link} to={item.ruta!} onClick={onItemClick} sx={leafItemSx(active)}>
      {Icono && <Icono fontSize="small" />}
      {item.texto}
    </Box>
  );
}

export default function NavDesktopMegaMenu({ item, open, anchor, panelRef, onItemClick }: NavDesktopMegaMenuProps) {
  const location = useLocation();
  const columnas = columnasVisibles(item);

  // Ancho determinista (columnas fijas) para poder posicionar sin medir el panel: empieza bajo el
  // borde izquierdo de su botón y solo se corre a la izquierda si rebasaría la isla.
  const anchoPanel =
    columnas.length * ANCHO_COLUMNA + (columnas.length - 1) * ESPACIO_COLUMNAS + 2 * PADDING_PANEL + 2;
  const botonIzquierda = anchor.botones[item.texto] ?? anchor.islaDerecha - anchoPanel;
  const izquierdaPanel = Math.max(MARGEN_VENTANA, Math.min(botonIzquierda, anchor.islaDerecha - anchoPanel));

  return (
    <Collapse
      in={open}
      sx={{
        position: "fixed",
        top: anchor.top,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        // El contenedor ocupa todo el ancho de la ventana: no debe capturar clics en las franjas
        // laterales transparentes; solo el panel visible los recibe.
        pointerEvents: "none",
      }}
    >
      <Box
        ref={panelRef}
        id={megaMenuPanelId(item.texto)}
        sx={{
          pointerEvents: open ? "auto" : "none",
          width: anchoPanel,
          maxWidth: `calc(100vw - ${2 * MARGEN_VENTANA}px)`,
          ml: `${izquierdaPanel}px`,
          mt: 1.5,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.18)",
          p: `${PADDING_PANEL}px`,
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: `repeat(${columnas.length}, ${ANCHO_COLUMNA}px)`,
          gap: `${ESPACIO_COLUMNAS}px`,
        }}
      >
        {columnas.map((columna) => (
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
              {itemsVisibles(columna).map((leafItem) => (
                <MegaMenuLeafItem
                  key={leafItem.texto}
                  item={leafItem}
                  active={location.pathname === leafItem.ruta}
                  onItemClick={onItemClick}
                />
              ))}
            </Box>
            {columna.verTodo && (
              <Box
                component={Link}
                to={columna.verTodo.ruta}
                onClick={onItemClick}
                sx={{
                  display: "inline-block",
                  mt: 2,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "secondary.dark",
                  textDecoration: "none",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                {columna.verTodo.texto} →
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Collapse>
  );
}
