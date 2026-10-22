import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import type { PreferenciaBooleana, TamanoTexto } from "./preferencias";
import { useAccesibilidad } from "./useAccesibilidad";

interface AccesibilidadDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Opciones de tipo interruptor; cada una corresponde a una preferencia booleana del contexto.
const OPCIONES_INTERRUPTOR: { clave: PreferenciaBooleana; texto: string }[] = [
  { clave: "altoContraste", texto: "Alto contraste" },
  { clave: "subrayarEnlaces", texto: "Subrayar enlaces" },
  { clave: "escalaGrises", texto: "Escala de grises" },
  { clave: "invertirColores", texto: "Invertir colores" },
];

// Panel de opciones de accesibilidad que abre el botón de la navbar.
// En móvil sale desde abajo; en escritorio, desde la derecha.
// El Drawer temporal (modal) atrapa el foco, cierra con Esc y lo devuelve al botón que lo abrió.
export default function AccesibilidadDrawer({ open, onClose }: AccesibilidadDrawerProps) {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down("sm"));
  const { preferencias, actualizar, restablecer, vedaElectoral } = useAccesibilidad();

  return (
    <Drawer
      variant="temporary"
      anchor={esMovil ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          id: "panel-accesibilidad",
          role: "dialog",
          "aria-modal": true,
          "aria-labelledby": "titulo-accesibilidad",
        },
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: { xs: "100%", sm: 360 },
          maxHeight: { xs: "85vh", sm: "100%" },
          borderTopLeftRadius: { xs: 16, sm: 0 },
          borderTopRightRadius: { xs: 16, sm: 0 },
          backgroundColor: "background.paper",
        },
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Encabezado: mismo patrón visual que el drawer de navegación móvil */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: 2,
            py: 1.5,
            backgroundColor: "primary.main",
          }}
        >
          <Typography
            id="titulo-accesibilidad"
            component="h2"
            variant="h6"
            sx={{ fontWeight: 600, color: "primary.contrastText" }}
          >
            Accesibilidad
          </Typography>
          <IconButton
            aria-label="Cerrar panel de accesibilidad"
            onClick={onClose}
            sx={{ color: "primary.contrastText" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, py: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Typography id="titulo-tamano-texto" component="h3" variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Tamaño del texto
              </Typography>
              <ToggleButtonGroup
                value={preferencias.tamanoTexto}
                onChange={(_, valor: TamanoTexto | null) => valor && actualizar("tamanoTexto", valor)}
                exclusive
                fullWidth
                size="small"
                aria-labelledby="titulo-tamano-texto"
              >
                <ToggleButton value="pequeno" aria-label="Texto más pequeño">A-</ToggleButton>
                <ToggleButton value="normal" aria-label="Texto normal">A</ToggleButton>
                <ToggleButton value="grande" aria-label="Texto más grande">A+</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Divider />

            <Stack spacing={0.5}>
              {OPCIONES_INTERRUPTOR.map(({ clave, texto }) => {
                // Durante la veda electoral la escala de grises es obligatoria: activada y bloqueada.
                const bloqueadaPorVeda = clave === "escalaGrises" && vedaElectoral;
                return (
                  <FormControlLabel
                    key={clave}
                    control={
                      <Switch
                        checked={bloqueadaPorVeda || preferencias[clave]}
                        onChange={(_, activo) => actualizar(clave, activo)}
                        disabled={bloqueadaPorVeda}
                        slotProps={{ input: bloqueadaPorVeda ? { "aria-describedby": "nota-veda" } : {} }}
                      />
                    }
                    label={
                      <Box>
                        {texto}
                        {bloqueadaPorVeda && (
                          <Typography id="nota-veda" component="span" variant="body2" sx={{ display: "block", color: "text.secondary" }}>
                            Activada durante el periodo de veda electoral
                          </Typography>
                        )}
                      </Box>
                    }
                    labelPlacement="start"
                    sx={{ mx: 0, justifyContent: "space-between" }}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Button variant="outlined" fullWidth onClick={restablecer}>
            Restablecer
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
