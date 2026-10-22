import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LoginIcon from "@mui/icons-material/Login";
import { NavLink, useLocation } from "react-router";

import { VENTANILLA_DIGITAL_HREF, esGrupoActivo, megaMenuPanelId, navbarItems } from "./navItems";
import { MEGA_MENU_TRIGGER_ATTR } from "./useNavbarMenus";

interface NavDesktopLinksProps {
  openGroupKey: string | null;
  onToggleGroup: (texto: string) => void;
  onCloseMenu: () => void;
}

export default function NavDesktopLinks({ openGroupKey, onToggleGroup, onCloseMenu }: NavDesktopLinksProps) {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: { md: 0.5, lg: 1.5 },
      }}
    >
      {navbarItems.map((item) => {
        if (item.columnas) {
          const isGroupOpen = openGroupKey === item.texto;
          const isGroupActive = esGrupoActivo(item, location.pathname);
          return (
            <ButtonBase
              key={item.texto}
              onClick={() => onToggleGroup(item.texto)}
              disableRipple
              aria-expanded={isGroupOpen}
              aria-haspopup="true"
              aria-controls={megaMenuPanelId(item.texto)}
              {...{ [MEGA_MENU_TRIGGER_ATTR]: item.texto }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontFamily: "inherit",
                color: isGroupActive || isGroupOpen ? "secondary.light" : "primary.contrastText",
                whiteSpace: "nowrap",
                fontSize: { md: "0.8rem", lg: "0.875rem" },
                fontWeight: isGroupActive || isGroupOpen ? 700 : 600,
                px: { md: 1, lg: 2 },
                py: 1,
                minWidth: "auto",
                flexShrink: 1,
                //dibuja borde inferior para ambos grupos, aun sin que este activado o este abierto 
                //borderBottom: isGroupActive || isGroupOpen ? "2px solid" : "2px solid transparent",
                borderColor: "secondary.light",
                borderRadius: 0,
                transition: "all 0.2s ease",
                ":hover": {
                  color: "secondary.light",
                  borderBottom: "2px solid",
                  borderColor: "secondary.light",
                },
              }}
            >
              {item.texto}
              {isGroupOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </ButtonBase>
          );
        }

        if (item.soloMovil) return null;

        return (
          <Button
            key={item.texto}
            component={NavLink}
            to={item.ruta!}
            // Cierra también cuando el link apunta a la ruta actual (ahí no hay cambio de pathname).
            onClick={onCloseMenu}
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
              whiteSpace: "nowrap",
              fontSize: { md: "0.8rem", lg: "0.875rem" },
              px: { md: 1, lg: 2 },
              py: 1,
              minWidth: "auto",
              flexShrink: 1,
              borderBottom: "2px solid transparent",
              transition: "all 0.2s ease",
              "&.active": {
                color: "secondary.light",
                borderBottom: "2px solid",
                borderColor: "secondary.light",
                borderRadius: 0,
              },
              ":hover": {
                color: "secondary.light",
                borderBottom: "2px solid",
                borderColor: "secondary.light",
              },
            }}
          >
            {item.texto}
          </Button>
        );
      })}

      {/* Botón destacado: solo existe cuando la Ventanilla digital tiene URL publicada. */}
      {VENTANILLA_DIGITAL_HREF && (
        <Button
          component="a"
          href={VENTANILLA_DIGITAL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="secondary"
          startIcon={<LoginIcon />}
          onClick={onCloseMenu}
          sx={{ ml: 1, whiteSpace: "nowrap" }}
        >
          Ventanilla digital
        </Button>
      )}
    </Box>
  );
}
