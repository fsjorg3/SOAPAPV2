import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PeopleIcon from "@mui/icons-material/People";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArticleIcon from "@mui/icons-material/Article";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { NavLink } from "react-router";
import { useLocation, useNavigate } from 'react-router';

import dropMinimalist from "../../assets/drop-minimalist.svg";

// URL final confirmada para el CTA de pago; el botón permanece oculto (display: none)
// hasta que se confirme si es requerido mostrarlo en el navbar.
const CTA_PAGAR_HREF = "https://pagofacil.aguapuebla.mx/";

interface NavSubItem {
  texto: string;
  ruta: string;
  Icono?: React.ElementType;
}

type NavItem =
  | { texto: string; ruta: string; subItems?: undefined }
  | { texto: string; ruta?: undefined; subItems: NavSubItem[] };

export const navbarItems: NavItem[] = [
  { texto: "Inicio", ruta: "/" },
  {
    texto: "La institución",
    subItems: [
      { texto: "Quienes somos", ruta: "/quienes-somos", Icono: InfoOutlinedIcon },
      { texto: "Directorio", ruta: "/directorio", Icono: PeopleIcon },
      { texto: "Normatividad", ruta: "/normatividad", Icono: GavelIcon },
      { texto: "Información Financiera", ruta: "/informacion-financiera", Icono: AccountBalanceIcon },
      { texto: "Convocatorias", ruta: "/convocatorias", Icono: ArticleIcon },
      // Pendiente de autorización para publicar — reactivar cuando se autorice (ver ruta comentada en routes.tsx).
      // { texto: "Comité de ética", ruta: "/comite_de_etica" },
    ]
  },
  {
    texto: "Programas y campañas",
    subItems: [
      { texto: "Regularízate 2026", ruta: "/regularizate_2026", Icono: WaterDropIcon },
      { texto: "Regularización doméstica", ruta: "/regularizacion_domestica", Icono: HomeIcon },
      { texto: "Regularización 2026", ruta: "/regularizacion_2026", Icono: EngineeringIcon },
    ]
  },
  { texto: "Contacto", ruta: "/contacto" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setOpenMobileGroups({});
    }
    setMobileOpen(!mobileOpen);
  };

  const handleToggleMobileGroup = (groupTexto: string) => {
    setOpenMobileGroups((prev) => ({ ...prev, [groupTexto]: !prev[groupTexto] }));
  };

  const handleOpenGroupMenu = (groupTexto: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenGroupKey(groupTexto);
  };

  const handleCloseGroupMenu = () => {
    setAnchorEl(null);
    setOpenGroupKey(null);
  };

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
          onClick={handleDrawerToggle}
          sx={{ color: 'primary.contrastText' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 2, py: 0 }}>
        {navbarItems.map((item) => {
          if (item.subItems) {
            const isGroupActive = item.subItems.some(sub => sub.ruta === location.pathname);
            const isGroupOpen = Boolean(openMobileGroups[item.texto]);
            return (
              <Box key={item.texto + "DrawerGroup"}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleToggleMobileGroup(item.texto)}
                    sx={{
                      justifyContent: 'space-between',
                      px: 0,
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      color: isGroupActive ? 'primary.main' : 'text.primary',
                    }}
                  >
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: isGroupActive ? 600 : 400 }}>{item.texto}</Typography>}
                    />
                    {isGroupOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => {
                      const esSubRutaActiva = location.pathname === subItem.ruta;
                      const Icono = subItem.Icono;
                      return (
                        <ListItem key={subItem.ruta + "DrawerSub"} disablePadding>
                          <ListItemButton
                            onClick={() => {
                               navigate(subItem.ruta);
                               setMobileOpen(false);
                               setOpenMobileGroups({});
                            }}
                            sx={{
                              justifyContent: 'flex-start',
                              gap: 1,
                              pl: 3,
                              pr: 0,
                              py: 1.25,
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                              color: esSubRutaActiva ? 'primary.main' : 'text.secondary',
                            }}
                          >
                            {Icono && <Icono fontSize="small" />}
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
            <ListItem key={(item.ruta || item.texto) + "Drawer"} disablePadding>
              <ListItemButton
                onClick={() => {
                   navigate(item.ruta!);
                   setMobileOpen(false);
                   setOpenMobileGroups({});
                }}
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
              const isGroupActive = item.subItems.some(sub => sub.ruta === location.pathname);
              const isGroupOpen = openGroupKey === item.texto && Boolean(anchorEl);
              return (
                <Box key={item.texto}>
                  <Button
                    onClick={handleOpenGroupMenu(item.texto)}
                    sx={{
                      color: isGroupActive ? "secondary.light" : "primary.contrastText",
                      whiteSpace: "nowrap",
                      fontSize: { md: "0.8rem", lg: "0.875rem" },
                      px: { md: 1, lg: 2 },
                      py: 1,
                      minWidth: "auto",
                      flexShrink: 1,
                      borderBottom: isGroupActive ? "2px solid" : "2px solid transparent",
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
                    anchorEl={isGroupOpen ? anchorEl : null}
                    open={isGroupOpen}
                    onClose={handleCloseGroupMenu}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'basic-button',
                      }
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.95),
                        backdropFilter: "blur(10px)",
                        color: "primary.contrastText",
                        mt: 1,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      }
                    }}
                  >
                    {item.subItems.map((subItem) => {
                      const Icono = subItem.Icono;
                      return (
                        <MenuItem
                          key={subItem.texto}
                          onClick={() => {
                            handleCloseGroupMenu();
                            navigate(subItem.ruta);
                          }}
                          sx={{
                            gap: 1,
                            color: location.pathname === subItem.ruta ? "secondary.light" : "primary.contrastText",
                            fontWeight: location.pathname === subItem.ruta ? 600 : 400,
                            ":hover": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "secondary.light",
                            }
                          }}
                        >
                          {Icono && <Icono fontSize="small" />}
                          {subItem.texto}
                        </MenuItem>
                      );
                    })}
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

          <Button
            component="a"
            href={CTA_PAGAR_HREF}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="secondary"
            startIcon={<PaymentsOutlinedIcon />}
            sx={{ display: "none", ml: 1, whiteSpace: "nowrap" }}
          >
            Pagar mi recibo
          </Button>
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
    </AppBar>
  );
}

export default Navbar;
