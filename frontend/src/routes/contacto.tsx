import { Container, Box, Paper, Typography, Card, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import { useTheme, useMediaQuery } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import EmailIcon from "@mui/icons-material/Email";
import ListItemText from "@mui/material/ListItemText";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";

// 1. Definición estricta de la interfaz de datos
interface IFormInput {
  name: string;
  nis: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}


export default function Contacto() {
  useDocumentMeta(seoMetadata.contacto);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Container maxWidth="lg">
        {/* Title */}
        <Box
          sx={{
            width: "100%",
            //height: "400dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            //marginTop: { xs: "40px", md: "80px" },
          }}
        >
          <Typography
            sx={{
              //margin: "80px 80px 0px 80px",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "900",
              color: "primary.main",
              borderBottom: "2px solid secondary.main",
            }}
          >
            Contacto
          </Typography>
          <Box
            sx={{
              width: { xs: "25%", md: "15%" },
              height: "5px",
              backgroundColor: "secondary.main",
            }}
          />
        </Box>
        {/*Sub Title */}
        <Typography sx={{ color: "#161a22" }}>
          Estamos para servirte. Completa el formulario o utiliza nuestros
          canales de atención.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: "start",
            gap: "20px",
            width: "100%",
            //height: "100dvw",
            marginTop: { xs: "40px", md: "80px" },
          }}
        >
          {/*formulario */}
          <Card variant="outlined" sx={{ width: { xs: "100%", md: "70%" } }}>
            <EmailContact></EmailContact>
          </Card>

          {/*canales de contacto */}
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "30%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
            }}
          >
            {/* Maps */}
            <Card variant="outstanding">
              <Box sx={{ display: "flex", padding: "10px" }}>
                <LocationOnIcon
                  fontSize="large"
                  color="primary"
                  sx={{ display: "flex", marginTop: "10px" }}
                />
                <Box>
                  <Typography component="h3" variant="caption">
                    OFICINAS DE ATENCIÓN CIUDADANA
                  </Typography>
                  <Typography
                    component="a"
                    variant="caption"
                    href="https://www.google.com/maps/place/SOAPAP+San+Manuel/@19.0131139,-98.1962042,1031m/data=!3m3!1e3!4b1!5s0x85cfc09be47fcf45:0x5c790ff7f653902d!4m6!3m5!1s0x85cfc09bfcb5340f:0x1cb2d0a0fa972fb6!8m2!3d19.0131139!4d-98.1936293!16s%2Fg%2F11cmdmcf3j?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                    rel="noopener noreferrer"
                    target="_blank"
                    sx={{ letterSpacing: 1 }}
                  >
                    Av. Río Grijalva No. 5313 Col. San Manuel Puebla, Pue. C.P.
                    72570
                  </Typography>
                  <Typography variant="caption" sx={{ letterSpacing: 1 }}>
                    <br />
                    Horarios de servicio:
                    <br />
                    Lunes a Viernes de 08:00 - 17:00
                  </Typography>
                </Box>
              </Box>
            </Card>
            {/* Telefono */}
            <Card variant="outstanding" sx={{}}>
              <Box sx={{ display: "flex", padding: "10px" }}>
                <CallIcon
                  fontSize="large"
                  color="primary"
                  sx={{ display: "flex", marginTop: "10px" }}
                />
                <Box>
                  <Typography component="h3" variant="caption">
                    ATENCIÓN TELEFÓNICA
                  </Typography>

                  <List>
                    {isDesktop ? (
                      <>
                        <ListItem>
                          <ListItemText primary="22 22 46 17 03" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="22 22 46 02 15" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="22 22 46 82 97" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="22 22 42 25 64" />
                        </ListItem>
                      </>
                    ) : (
                      <>
                        <ListItem>
                          <ListItemButton
                            component="a"
                            href="tel:2222460215"
                            sx={{ color: "primary.main", fontStyle: "italic" }}
                          >
                            <ListItemText primary="22 22 46 17 03" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton
                            component="a"
                            href="tel:2222461703"
                            sx={{ color: "primary.main", fontStyle: "italic" }}
                          >
                            <ListItemText primary="22 22 46 02 15" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton
                            component="a"
                            href="tel:2222468297"
                            sx={{ color: "primary.main", fontStyle: "italic" }}
                          >
                            <ListItemText primary="22 22 46 82 97" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton
                            component="a"
                            href="tel:2229584597"
                            sx={{ color: "primary.main", fontStyle: "italic" }}
                          >
                            <ListItemText
                              primary="22 22 42 25 64"
                            />
                          </ListItemButton>
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Box>
            </Card>

            {/* Correo electronico */}
            <Card variant="outstanding" sx={{}}>
              <Box sx={{ display: "flex", padding: "10px" }}>
                <EmailIcon
                  fontSize="large"
                  color="primary"
                  sx={{ display: "flex", marginTop: "10px" }}
                />
                <Box>
                  <Typography component="h3" variant="caption">
                    CORREO ELECTRONICO
                  </Typography>
                  <Typography
                    component="a"
                    variant="caption"
                    href="mailto:transparencia@soapap.gob.mx"
                    rel="noopener noreferrer"
                    target="_blank"
                    sx={{ letterSpacing: 1 }}
                  >
                    transparencia@soapap.gob.mx
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            marginTop: { xs: "40px", md: "80px" },
          }}
        ></Box>
        <InteractiveOSMMap></InteractiveOSMMap>


      </Container>
    </>
  );
}

export function EmailContact() {
  // 2. Inicialización limpia del formulario con tipos
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      nis: "",
      phone: "",
      email: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Datos del contacto validados:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", width: "100%", p: 2 }}
    >
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          color: "secondary.main",
          fontWeight: "900",
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Formulario de Contacto
      </Typography>

      {/* Uso de Grid para eliminar Boxes repetitivos y mejorar performance visual */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ marginBottom: "30px" }}>
        {/* ------------- Nombre ------------- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Tu nombre es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.name}
                id="input_nombre"
                label="Nombre completo*"
                placeholder="Juan Pérez"
                helperText={errors.name?.message || ""}
              />
            )}
          />
        </Grid>

        {/* ------------- Nis ------------- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="nis"
            control={control}
            rules={{
              required: "El Número de identificación de servicio es requerido",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.nis}
                id="input_nis"
                label="NIS*"
                placeholder="935839246"
                helperText={errors.nis?.message || ""}
              />
            )}
          />
        </Grid>

        {/* ------------- Telefono ------------- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Tu teléfono es requerido",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "El teléfono debe contener 10 dígitos numéricos",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.phone}
                id="input_phone"
                label="Teléfono de contacto*"
                placeholder="2221457327"
                helperText={errors.phone?.message || ""}
              />
            )}
          />
        </Grid>

        {/* ------------- Correo electronico ------------- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "El correo electrónico es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingresa un correo electrónico válido",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.email}
                id="input_email"
                label="Correo electrónico*"
                placeholder="correo@correo.com"
                helperText={errors.email?.message || ""}
              />
            )}
          />
        </Grid>

        {/* ------------- Direccion ------------- */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Tu dirección es requerida" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.address}
                id="input_address"
                label="Dirección*"
                placeholder="Av. Río Grijalva No. 5313 Col. San Manuel Puebla, Pue. C.P. 72570"
                helperText={errors.address?.message || ""}
              />
            )}
          />
        </Grid>

        {/* ------------- Comentario (Corregido el Bug del Name) ------------- */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="comment"
            control={control}
            rules={{ required: "El comentario es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                error={!!errors.comment}
                id="input_comment"
                label="Comentarios*"
                placeholder="Deja tus comentarios"
                helperText={errors.comment?.message || ""}
              />
            )}
          />
        </Grid>
      </Grid>

      {/* ------------- Botón de Envío ------------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            fontWeight: "bold",
          }}
        >
          Enviar mensaje
        </Button>
      </Box>
    </Box>
  );
}
export function InteractiveOSMMap() {
  // 1. Configuración de Coordenadas (Modificables)
  // Ejemplo: Coordenadas de Puebla, Centro
  const latitude = 19.013102;
  const longitude = -98.193766;

  // 2. Cálculo del Bounding Box (Margen visual para encuadrar el mapa en OpenStreetMap)
  // Restamos y sumamos un delta (0.01) para crear la caja de visualización alrededor del punto
  const delta = 0.001;
  const minLng = longitude - delta;
  const minLat = latitude - delta;
  const maxLng = longitude + delta;
  const maxLat = latitude + delta;

  // 3. Template Literals para las URLs dinámicas
  // URL de incrustación interactiva para el iframe de OpenStreetMap
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  // URL universal de redirección para Google Maps (Funciona en Web y App Móvil)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        //maxWidth: 700, 
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        backgroundColor: 'background.paper'
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary' }}>
          Ubicación Geográfica
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Puedes interactuar con el mapa (zoom y arrastre). Usa el botón inferior para calcular tu ruta.
        </Typography>
      </Box>

      {/* Contenedor del Mapa Interactivo (Sin bloqueos de clic) */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '300px', md: '450px' },
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: (theme) => theme.shadows[1],
          backgroundColor: '#f4f3f0' // Color placeholder de carga
        }}
      >
        <iframe
          title="Visor Geográfico OpenStreetMap"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={osmEmbedUrl}
          loading="lazy"
        />
      </Box>

      {/* Botón de Acción Exclusivo para Redirección */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<MapIcon />}
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            px: 4,
            py: 1.2,
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          Abrir en Google Maps
        </Button>
      </Box>
    </Paper>
  );
}