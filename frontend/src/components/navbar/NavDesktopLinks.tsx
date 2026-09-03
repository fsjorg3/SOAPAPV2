import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { NavLink, useLocation } from "react-router";

import { CTA_PAGAR_HREF, navbarItems } from "./navItems";

interface NavDesktopLinksProps {
  openGroupKey: string | null;
  onToggleGroup: (texto: string) => void;
}

export default function NavDesktopLinks({ openGroupKey, onToggleGroup }: NavDesktopLinksProps) {
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
          const isGroupActive = item.columnas.some((columna) =>
            columna.items.some((leafItem) => leafItem.ruta === location.pathname)
          );
          return (
            <ButtonBase
              key={item.texto}
              onClick={() => onToggleGroup(item.texto)}
              disableRipple
              aria-expanded={isGroupOpen}
              aria-haspopup="true"
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

        return (
          <Button
            key={item.texto}
            component={NavLink}
            to={item.ruta!}
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

      <Button
        component="a"
        href={CTA_PAGAR_HREF}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="secondary"
        startIcon={<PaymentsOutlinedIcon />}
        sx={{ 
          display: "none", 
          ml: 1, 
          whiteSpace: "nowrap" }}
      >
        Pagar mi recibo
      </Button>
    </Box>
  );
}
