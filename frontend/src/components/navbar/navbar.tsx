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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
  {
    texto: "Transparencia",
    subItems: [
      { texto: "Normatividad", ruta: "/normatividad" },
      { texto: "Información Financiera", ruta: "/informacion-financiera" },
      { texto: "Convocatorias", ruta: "/convocatorias" }
    ]
  }
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileTransparencia, setOpenMobileTransparencia] = useState(false);
  const [anchorElTransparencia, setAnchorElTransparencia] = useState<null | HTMLElement>(null);
  
  const openTransparencia = Boolean(anchorElTransparencia);

  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setOpenMobileTransparencia(false);
      setAnchorElTransparencia(null);
    }
    setMobileOpen(!mobileOpen);
  };

  const handleToggleMobileTransparencia = () => {
    setOpenMobileTransparencia(!openMobileTransparencia);
  };

  const handleClickTransparencia = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTransparencia(event.currentTarget);
  };
  
  const handleCloseTransparencia = () => {
    setAnchorElTransparencia(null);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          if (item.subItems) {
            const isTransparenciaActive = item.subItems.some(sub => sub.ruta === location.pathname);
            return (
              <Box key={item.texto + "DrawerGroup"}>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={handleToggleMobileTransparencia}
                    sx={{
                      textAlign: "center",
                      borderRadius: '12px',
                      color: isTransparenciaActive ? 'secondary.light' : 'primary.contrastText',
                      backgroundColor: isTransparenciaActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      transition: 'all 0.3s ease',
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "secondary.light",
                        transform: "translateX(6px)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: isTransparenciaActive ? 600 : 400 }}>{item.texto}</Typography>}
                    />
                    {openMobileTransparencia ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMobileTransparencia} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4, pr: 2 }}>
                    {item.subItems.map((subItem) => {
                      const esSubRutaActiva = location.pathname === subItem.ruta;
                      return (
                        <ListItem key={subItem.ruta + "DrawerSub"} disablePadding sx={{ mb: 1 }}>
                          <ListItemButton
                            onClick={() => {
                               navigate(subItem.ruta);
                               setMobileOpen(false);
                               setAnchorElTransparencia(null);
                            }}
                            sx={{
                              textAlign: "center",
                              borderRadius: '12px',
                              color: esSubRutaActiva ? 'secondary.light' : 'primary.contrastText',
                              backgroundColor: esSubRutaActiva ? 'rgba(255,255,255,0.1)' : 'transparent',
                              transition: 'all 0.3s ease',
                              ":hover": {
                                backgroundColor: "rgba(255,255,255,0.15)",
                                color: "secondary.light",
                                transform: "translateX(6px)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={<Typography sx={{ fontWeight: esSubRutaActiva ? 600 : 400, fontSize: '0.9rem' }}>{subItem.texto}</Typography>}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          }

          const esRutaActiva = location.pathname === item.ruta;
          return (
            <ListItem key={(item.ruta || item.texto) + "Drawer"} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                   navigate(item.ruta!);
                   setMobileOpen(false);
                   setAnchorElTransparencia(null);
                   setOpenMobileTransparencia(false);
                }}
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
                  primary={<Typography sx={{ fontWeight: esRutaActiva ? 600 : 400 }}>{item.texto}</Typography>}
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
          {navbarItems.map((item) => {
            if (item.subItems) {
              const isTransparenciaActive = item.subItems.some(sub => sub.ruta === location.pathname);
              return (
                <Box key={item.texto}>
                  <Button
                    onClick={handleClickTransparencia}
                    sx={{
                      color: isTransparenciaActive ? "secondary.light" : "primary.contrastText",
                      whiteSpace: "nowrap",
                      fontSize: { md: "0.8rem", lg: "0.875rem" },
                      px: { md: 1, lg: 2 },
                      py: 1,
                      minWidth: "auto",
                      flexShrink: 1,
                      borderBottom: isTransparenciaActive ? "2px solid" : "2px solid transparent",
                      borderRadius: 0,
                      transition: "all 0.2s ease",
                      ":hover": {
                        color: "secondary.light",
                        borderBottom: "2px solid",
                      },
                    }}
                  >
                    {item.texto}
                  </Button>
                  <Menu
                    anchorEl={anchorElTransparencia}
                    open={openTransparencia}
                    onClose={handleCloseTransparencia}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'basic-button',
                      }
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        mt: 1,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      }
                    }}
                  >
                    {item.subItems.map((subItem) => (
                      <MenuItem 
                        key={subItem.texto}
                        onClick={() => {
                          handleCloseTransparencia();
                          navigate(subItem.ruta);
                        }}
                        sx={{
                          color: location.pathname === subItem.ruta ? "secondary.light" : "primary.contrastText",
                          fontWeight: location.pathname === subItem.ruta ? 600 : 400,
                          ":hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "secondary.light",
                          }
                        }}
                      >
                        {subItem.texto}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
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
