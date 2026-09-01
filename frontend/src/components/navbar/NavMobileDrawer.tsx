import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router";

import dropMinimalist from "../../assets/drop-minimalist.svg";
import NavMobileGroupItem from "./NavMobileGroupItem";
import { CTA_PAGAR_HREF, navbarItems } from "./navItems";

interface NavMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  openMobileGroups: Record<string, boolean>;
  onToggleGroup: (texto: string) => void;
  onNavigate: (ruta: string) => void;
}

export default function NavMobileDrawer({ open, onClose, openMobileGroups, onToggleGroup, onNavigate }: NavMobileDrawerProps) {
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'background.paper' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          px: 2,
          py: 1.5,
          backgroundColor: 'primary.main',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src={dropMinimalist} sx={{ display: "block", height: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.contrastText' }}>
            SOAPAP
          </Typography>
        </Box>
        <IconButton
          aria-label="cerrar menú"
          onClick={onClose}
          sx={{ color: 'primary.contrastText' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 2, py: 0 }}>
        {navbarItems.map((item) => {
          if (item.columnas) {
            return (
              <NavMobileGroupItem
                key={item.texto + "DrawerGroup"}
                item={item}
                isOpen={Boolean(openMobileGroups[item.texto])}
                onToggle={() => onToggleGroup(item.texto)}
                onNavigate={onNavigate}
              />
            );
          }

          const esRutaActiva = location.pathname === item.ruta;
          return (
            <ListItem key={(item.ruta || item.texto) + "Drawer"} disablePadding>
              <ListItemButton
                onClick={() => onNavigate(item.ruta!)}
                sx={{
                  justifyContent: 'flex-start',
                  px: 0,
                  py: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  color: esRutaActiva ? 'primary.main' : 'text.primary',
                }}
              >
                <ListItemText
                  primary={<Typography sx={{ fontWeight: esRutaActiva ? 600 : 400 }}>{item.texto}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Button
          component="a"
          href={CTA_PAGAR_HREF}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<PaymentsOutlinedIcon />}
          sx={{ display: "none" }}
        >
          Pagar mi recibo
        </Button>
      </Box>
    </Box>
  );

  return (
    <nav>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            backgroundColor: "background.paper",
          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.4)"
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </nav>
  );
}
