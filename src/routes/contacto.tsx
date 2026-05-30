import { Container, Box, Typography, Card } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from '@mui/icons-material/Call';
import { useTheme, useMediaQuery } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import EmailIcon from '@mui/icons-material/Email';
import ListItemText from '@mui/material/ListItemText';
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import TextField from '@mui/material/TextField';

interface IFormInput {
  name: string;
  nis: string;
  phone: number;
  email: string;
  comment: string;
}

export default function Contacto() {

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
              width: { xs: '25%', md: "15%" },
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
          <Card
            variant="outlined"
            sx={{ width: { xs: "100%", md: "62%" }, height: "70vh" }}
          >
            <Box component='form' noValidate autoComplete="off">
              <TextField
                error
                id="input_nombre"
                label="NOMBRE"
                defaultValue="Hello World"
                helperText="coloca tu nombre completo"
              />
            </Box>
          </Card>

          {/*canales de contacto */}
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "27%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              },
            }}
          >
            {/* Maps */}
            <Card variant="outstanding" >
              <Box sx={{ display: "flex", padding: '10px' }}>
                <LocationOnIcon fontSize="large" color="primary" sx={{ display: "flex", marginTop: '10px' }} />
                <Box>
                  <Typography
                    component="h3"
                    variant="caption"
                  >
                    OFICINAS DE ATENCIÓN CIUDADANA
                  </Typography>
                  <Typography
                    component='a'
                    variant="caption"
                    href="https://www.google.com/maps/place/SOAPAP+San+Manuel/@19.0131139,-98.1962042,1031m/data=!3m3!1e3!4b1!5s0x85cfc09be47fcf45:0x5c790ff7f653902d!4m6!3m5!1s0x85cfc09bfcb5340f:0x1cb2d0a0fa972fb6!8m2!3d19.0131139!4d-98.1936293!16s%2Fg%2F11cmdmcf3j?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                    rel="noopener noreferrer"
                    target="_blank"
                    sx={{ letterSpacing: 1 }}>
                    Av. Río Grijalva No. 5313 Col. San Manuel Puebla, Pue. C.P.
                    72570
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ letterSpacing: 1 }}>
                    <br />Horarios de servicio:<br />
                    Lunes a Viernes de 08:00 - 17:00
                  </Typography>
                </Box>
              </Box>
            </Card>
            {/* Telefono */}
            <Card variant="outstanding" sx={{}}>

              <Box sx={{ display: "flex", padding: '10px' }}>
                <CallIcon fontSize="large" color="primary" sx={{ display: "flex", marginTop: '10px' }} />
                <Box>
                  <Typography
                    component="h3"
                    variant="caption"
                  >
                    ATENCIÓN TELEFÓNICA
                  </Typography>

                  <List>
                    {isDesktop ?
                      <>
                        <ListItem >
                          <ListItemText primary="222 246 0215" />
                        </ListItem>
                        <ListItem >
                          <ListItemText primary="222 246 1703" />
                        </ListItem>
                        <ListItem >
                          <ListItemText primary="222 246 0215" />
                        </ListItem>
                        <ListItem >
                          <ListItemText primary="222 246 0215" />
                        </ListItem>
                      </> :
                      <>
                        <ListItem  >
                          <ListItemButton component="a" href="tel:2222460215" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                            <ListItemText primary="222 246 0215" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem  >
                          <ListItemButton component="a" href="tel:2222461703" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                            <ListItemText primary="222 246 1703" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem  >
                          <ListItemButton component="a" href="tel:2222468297" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                            <ListItemText primary="222 246 8297" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem  >
                          <ListItemButton component="a" href="tel:2229584597" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                            <ListItemText primary="222 958 4597
" />
                          </ListItemButton>
                        </ListItem>

                      </>
                    }
                  </List>

                </Box>
              </Box>

            </Card>

            {/* Correo electronico */}
            <Card variant="outstanding" sx={{}}>
              <Box sx={{ display: "flex", padding: '10px' }}>
                <EmailIcon fontSize="large" color="primary" sx={{ display: "flex", marginTop: '10px' }} />
                <Box>
                  <Typography
                    component="h3"
                    variant="caption"
                  >
                    CORREO ELECTRONICO
                  </Typography>
                  <Typography
                    component='a'
                    variant="caption"
                    href="mailto:transparencia@soapap.gob.mx"
                    rel="noopener noreferrer"
                    target="_blank"
                    sx={{ letterSpacing: 1 }}>
                    transparencia@soapap.gob.mx
                  </Typography>
                </Box>
              </Box>


            </Card>

          </Box>
        </Box>
      </Container>
    </>
  );
}


function EmailContact() {

  const { control, handleSubmit,  } = useForm({
    defaultValues: {
      name: "",
      nis: "",
      phone: 0,
      email: "",
      comment: ""
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) =>
            <TextField
              error
              id="input_nombre"
              label="NOMBRE"
              defaultValue=""
              helperText="coloca tu nombre completo"
              {...field}
            />
          }
        />
        <input type="submit" />
      </form>
    </>
  )



}