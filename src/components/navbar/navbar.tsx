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

const navbarItems = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Contacto", ruta: "/contacto" },
  { texto: "Directorio", ruta: "/directorio" },
  { texto: "Quienes somos", ruta: "/quienes-somos" },
  { texto: "Recursos", ruta: "/recursos" },
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ justifyContent: "center", gap: "8px" }}>
        <Box
          component="img"
          src={dropMinimalist}
          sx={{ display: "block" }}
        ></Box>
        <Typography variant="h6" sx={{ my: 2 }}>
          SOAPAP {/* CAMBIAR POR LOGO*/}
        </Typography>
      </Box>

      <List>
        {navbarItems.map((item) =>{
          const esRutaActiva = location.pathname === item.ruta;
          return (
          <ListItem key={item.ruta+"Drawer"} disablePadding>
            <ListItemButton
              onClick={()=> navigate(item.ruta)}
              sx={{
                textAlign: "center",
                color:esRutaActiva?'secondary.light':'primary.contrastText',
                borderBottom:esRutaActiva?'2px solid':'none',
                ":hover": {
                  color: "secondary.light",
                  borderBottom: "2px solid",
                },
              }}
            >
              <ListItemText primary={item.texto} />
            </ListItemButton>
          </ListItem>
          )
          }
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{ backgroundColor: "primary.light", color: "primary.contrastText", width:{xs:"100%",md:"70%" } }}
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
            display: {
              xs: "none",
              md: "flex",
              gap: "8px",
              justifyContent: "start",
              color: "primary.contrastText",
            },
          }}
        >
          <Box component="img" src={dropMinimalist} sx={{ display: "block" }} />

          <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
            SOAPAP
          </Typography>
        </Box>
        {/*IMAGOTIPO*/}

        {/*LINKS*/}

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {navbarItems.map((item) => (
            <Button
              key={item.texto}
              component={NavLink} // Transformamos el Button de MUI en un NavLink de React Router
              to={item.ruta}
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
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
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </nav>
    </AppBar>
  );
}

export default Navbar;
