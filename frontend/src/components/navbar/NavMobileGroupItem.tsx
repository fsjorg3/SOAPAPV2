import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router";

import type { NavItem, NavLeafItem, NavMenuColumn } from "./navItems";

interface NavMobileGroupItemProps {
  item: Extract<NavItem, { columnas: NavMenuColumn[] }>;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (ruta: string) => void;
}

function NavMobileLeafItem({ leafItem, active, onNavigate }: { leafItem: NavLeafItem; active: boolean; onNavigate: (ruta: string) => void }) {
  const Icono = leafItem.Icono;

  if (!leafItem.ruta) {
    return (
      <ListItem disablePadding>
        <Box
          aria-disabled="true"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: '100%',
            pl: 3,
            pr: 0,
            py: 1.25,
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.disabled',
            cursor: 'not-allowed',
          }}
        >
          {Icono && <Icono fontSize="small" />}
          <Typography sx={{ fontSize: '0.9rem' }}>{leafItem.texto}</Typography>
        </Box>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onNavigate(leafItem.ruta!)}
        sx={{
          justifyContent: 'flex-start',
          gap: 1,
          pl: 3,
          pr: 0,
          py: 1.25,
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: active ? 'primary.main' : 'text.secondary',
        }}
      >
        {Icono && <Icono fontSize="small" />}
        <ListItemText
          primary={<Typography sx={{ fontWeight: active ? 600 : 400, fontSize: '0.9rem' }}>{leafItem.texto}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function NavMobileGroupItem({ item, isOpen, onToggle, onNavigate }: NavMobileGroupItemProps) {
  const location = useLocation();
  const isGroupActive = item.columnas.some((columna) =>
    columna.items.some((leafItem) => leafItem.ruta === location.pathname)
  );

  return (
    <Box key={item.texto + "DrawerGroup"}>
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
        {item.columnas.map((columna) => (
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
              {columna.items.map((leafItem) => (
                <NavMobileLeafItem
                  key={leafItem.texto}
                  leafItem={leafItem}
                  active={location.pathname === leafItem.ruta}
                  onNavigate={onNavigate}
                />
              ))}
            </List>
          </Box>
        ))}
      </Collapse>
    </Box>
  );
}
