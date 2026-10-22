import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useLocation } from "react-router";

import { columnasVisibles, esGrupoActivo, itemsVisibles, type NavGroupItem, type NavLeafItem } from "./navItems";

interface NavMobileGroupItemProps {
  item: NavGroupItem;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}

const leafButtonSx = (active: boolean) => ({
  justifyContent: 'flex-start',
  gap: 1,
  pl: 3,
  pr: 0,
  py: 1.25,
  borderBottom: '1px solid',
  borderColor: 'divider',
  color: active ? 'primary.main' : 'text.secondary',
});

function NavMobileLeafItem({ leafItem, active, onItemClick }: { leafItem: NavLeafItem; active: boolean; onItemClick: () => void }) {
  const Icono = leafItem.Icono;
  const texto = <Typography sx={{ fontWeight: active ? 600 : 400, fontSize: '0.9rem' }}>{leafItem.texto}</Typography>;

  // Sistema externo: se abre en otra pestaña, con indicador de enlace externo (y candado si pide sesión).
  if (leafItem.href) {
    return (
      <ListItem disablePadding>
        <ListItemButton
          component="a"
          href={leafItem.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onItemClick}
          sx={leafButtonSx(false)}
        >
          {Icono && <Icono fontSize="small" />}
          <ListItemText primary={texto} />
          {leafItem.requiereAcceso && <LockOutlinedIcon sx={{ fontSize: '1rem' }} aria-label="requiere iniciar sesión" />}
          <OpenInNewIcon sx={{ fontSize: '1rem', mr: 1 }} aria-label="se abre en otra pestaña" />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={leafItem.ruta!} onClick={onItemClick} sx={leafButtonSx(active)}>
        {Icono && <Icono fontSize="small" />}
        <ListItemText primary={texto} />
      </ListItemButton>
    </ListItem>
  );
}

export default function NavMobileGroupItem({ item, isOpen, onToggle, onItemClick }: NavMobileGroupItemProps) {
  const location = useLocation();
  const isGroupActive = esGrupoActivo(item, location.pathname);

  return (
    <Box>
      <ListItem disablePadding>
        <ListItemButton
          onClick={onToggle}
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
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {columnasVisibles(item).map((columna) => (
          <Box key={columna.titulo}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'text.disabled',
                pl: 3,
                pt: 1.25,
                pb: 0.5,
              }}
            >
              {columna.titulo}
            </Typography>
            <List component="div" disablePadding>
              {itemsVisibles(columna).map((leafItem) => (
                <NavMobileLeafItem
                  key={leafItem.texto}
                  leafItem={leafItem}
                  active={location.pathname === leafItem.ruta}
                  onItemClick={onItemClick}
                />
              ))}
              {columna.verTodo && (
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={columna.verTodo.ruta}
                    onClick={onItemClick}
                    sx={{ ...leafButtonSx(false), color: 'secondary.dark' }}
                  >
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{columna.verTodo.texto} →</Typography>}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        ))}
      </Collapse>
    </Box>
  );
}
