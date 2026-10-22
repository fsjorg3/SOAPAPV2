import { useLayoutEffect, useRef, useState } from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

import dropMinimalist from "../../assets/drop-minimalist.svg";
import AccesibilidadDrawer from "../accesibilidad/AccesibilidadDrawer";
import { anchoContenidoSx } from "../../theme/institutional-flat-system";
import NavDesktopLinks from "./NavDesktopLinks";
import NavDesktopMegaMenus from "./NavDesktopMegaMenus";
import NavMobileDrawer from "./NavMobileDrawer";
import type { MegaMenuAnchor } from "./navItems";
import { MEGA_MENU_TRIGGER_ATTR, useNavbarMenus } from "./useNavbarMenus";

function Navbar() {
  const {
    mobileOpen,
    toggleDrawer,
    closeMobileDrawer,
    openMobileGroups,
    toggleMobileGroup,
    openGroupKey,
    toggleGroupMenu,
    closeGroupMenu,
    panelRef,
  } = useNavbarMenus();

  const [accesibilidadOpen, setAccesibilidadOpen] = useState(false);
  const appBarRef = useRef<HTMLDivElement>(null);
  const [menuAnchor, setMenuAnchor] = useState<MegaMenuAnchor>({ top: 0, islaDerecha: 0, botones: {} });

  useLayoutEffect(() => {
    const appBarEl = appBarRef.current;
    if (!appBarEl) return;

    const updateOffset = () => {
      const rect = appBarEl.getBoundingClientRect();
      const botones: Record<string, number> = {};
      appBarEl.querySelectorAll<HTMLElement>(`[${MEGA_MENU_TRIGGER_ATTR}]`).forEach((boton) => {
        botones[boton.getAttribute(MEGA_MENU_TRIGGER_ATTR)!] = boton.getBoundingClientRect().left;
      });
      setMenuAnchor({ top: rect.bottom, islaDerecha: rect.right, botones });
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    // El AppBar es sticky: su borde inferior cambia al hacer scroll hasta que queda pegado arriba.
    window.addEventListener("scroll", updateOffset, { passive: true });
    const resizeObserver = new ResizeObserver(updateOffset);
    resizeObserver.observe(appBarEl);

    return () => {
      window.removeEventListener("resize", updateOffset);
      window.removeEventListener("scroll", updateOffset);
      resizeObserver.disconnect();
    };
  }, []);

  // Fragmento (sin contenedor): el AppBar debe ser hijo directo del layout para que su
  // position: sticky tenga recorrido. El cierre por clic fuera vive en useNavbarMenus.
  return (
    <>
      <AppBar
        ref={appBarRef}
        component="nav"
        elevation={0}
        // Bordes de la isla = bordes del contenido útil del sitio (ancho y márgenes definidos en el tema).
        sx={(theme) => ({ ...anchoContenidoSx(theme), backgroundColor: "primary.light", color: "primary.contrastText" })}
      >
        <Toolbar>
          {/*Hamburger button */}
          <IconButton
            color="inherit"
            aria-label="Abrir menú de navegación"
            edge="start"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/*Hamburger button */}

          {/*IMAGOTIPO: es el link a Inicio (en escritorio "Inicio" no aparece en la barra)*/}
          {/* En móvil queda centrado entre el botón de menú (izquierda) y el de accesibilidad (derecha) */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: { xs: "center", md: "start" } }}>
            <Box
              component={Link}
              to="/"
              onClick={closeGroupMenu}
              aria-label="SOAPAP, ir al inicio"
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                color: "primary.contrastText",
                textDecoration: "none",
              }}
            >
              <Box component="img" src={dropMinimalist} alt="" sx={{ display: "block" }} />

              <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
                SOAPAP
              </Typography>
            </Box>
          </Box>
          {/*IMAGOTIPO*/}

          {/*LINKS*/}
          <NavDesktopLinks
            openGroupKey={openGroupKey}
            onToggleGroup={toggleGroupMenu}
            onCloseMenu={closeGroupMenu}
          />
          {/*LINKS*/}

          {/*ACCESIBILIDAD: visible en todos los tamaños*/}
          <IconButton
            color="inherit"
            edge="end"
            aria-label="Opciones de accesibilidad"
            aria-haspopup="dialog"
            aria-expanded={accesibilidadOpen}
            aria-controls="panel-accesibilidad"
            onClick={() => {
              closeGroupMenu();
              setAccesibilidadOpen(true);
            }}
            sx={{ ml: { md: 1 } }}
          >
            <AccessibilityNewIcon />
          </IconButton>
          {/*ACCESIBILIDAD*/}
        </Toolbar>

        <NavMobileDrawer
          open={mobileOpen}
          onClose={toggleDrawer}
          openMobileGroups={openMobileGroups}
          onToggleGroup={toggleMobileGroup}
          onItemClick={closeMobileDrawer}
        />

        <AccesibilidadDrawer open={accesibilidadOpen} onClose={() => setAccesibilidadOpen(false)} />
      </AppBar>

      <NavDesktopMegaMenus
        openGroupKey={openGroupKey}
        anchor={menuAnchor}
        panelRef={panelRef}
        onItemClick={closeGroupMenu}
      />
    </>
  );
}

export default Navbar;
