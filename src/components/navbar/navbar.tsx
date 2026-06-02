import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { NavLink } from "react-router";
import { useLocation, useNavigate } from 'react-router';

import dropMinimalist from "../../assets/drop-minimalist.svg";

const drawerWidth = 250;

export const navbarItems = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Contacto", ruta: "/contacto" },
  { texto: "Directorio", ruta: "/directorio" },
  { texto: "Quienes somos", ruta: "/quienes-somos" },
  { texto: "Normatividad", ruta: "/normatividad" },
  { texto: "Información Financiera", ruta: "/informacion-financiera" }
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // 1. Extraemos la locación actual del navegador
  const location = useLocation();
  // Hook opcional para navegar programáticamente al hacer click
  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          py: 4,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
        }}
      >
        <Box component="img" src={dropMinimalist} sx={{ display: "block", height: 48, filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 1.2 }}>
          SOAPAP
        </Typography>
      </Box>

      <Box sx={{ px: 3 }}>
        <Box sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', mb: 2 }} />
      </Box>

      <List sx={{ px: 2 }}>
        {navbarItems.map((item) => {
          const esRutaActiva = location.pathname === item.ruta;
          return (
            <ListItem key={item.ruta + "Drawer"} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.ruta)}
                sx={{
                  textAlign: "center",
                  borderRadius: '12px',
                  color: esRutaActiva ? 'secondary.light' : 'primary.contrastText',
                  backgroundColor: esRutaActiva ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "secondary.light",
                    transform: "translateX(6px)",
                  },
                }}
              >
                <ListItemText
                  primary={item.texto}
                  primaryTypographyProps={{ fontWeight: esRutaActiva ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{ backgroundColor: "primary.light", color: "primary.contrastText", width: { xs: "90%", md: "70%" } }}
    >
      <Toolbar>
        {/*Hamburger button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/*Hamburger button */}

        {/*IMAGOTIPO*/}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: { xs: "center", md: "start" },
            color: "primary.contrastText",
            // Compensamos el IconButton de menú a la izquierda en móvil para centrar geométricamente
            mr: { xs: "40px", md: 0 },
          }}
        >
          <Box component="img" src={dropMinimalist} sx={{ display: "block" }} />

          <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
            SOAPAP
          </Typography>
        </Box>
        {/*IMAGOTIPO*/}

        {/*LINKS*/}

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            gap: { md: 0.5, lg: 1.5 },
          }}
        >
          {navbarItems.map((item) => (
            <Button
              key={item.texto}
              component={NavLink} // Transformamos el Button de MUI en un NavLink de React Router
              to={item.ruta}
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                whiteSpace: "nowrap",
                fontSize: { md: "0.8rem", lg: "0.875rem" },
                px: { md: 1, lg: 2 },
                py: 1,
                minWidth: "auto",
                flexShrink: 1,
                "&.active": {
                  color: "secondary.light", // Clase interna que NavLink inyecta automáticamente
                  borderBottom: "2px solid",
                  borderRadius: 0,
                },
                ":hover": {
                  color: "secondary.light",
                  borderBottom: "2px solid",
                },
              }}
            >
              {item.texto}
            </Button>
          ))}
        </Box>

        {/*LINKS*/}
      </Toolbar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderTopRightRadius: '24px',
              borderBottomRightRadius: '24px',
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(0,0,0,0.15))',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)',
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
    </AppBar>
  );
}

export default Navbar;
