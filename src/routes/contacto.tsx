import { Container, Box, Typography, Card } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Contacto() {
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
              width: "15%",
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
            height: "100dvw",
            marginTop: { xs: "40px", md: "80px" },
          }}
        >
          {/*formulario */}
          <Card
            variant="outlined"
            sx={{ width: { xs: "100%", md: "62%" }, height: "70vh" }}
          ></Card>
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
            <Card variant="outstanding" component='a' sx={{ height: "10%" }} href=""> 
              <Box sx={{ display: "flex", padding:'10px'}}>
                <LocationOnIcon fontSize="large"  color="primary" sx={{ display: "flex" }} />
                <Box>
                  <Typography component="h1" variant="body1">
                    Oficinas de atención
                  </Typography>
                  <Typography variant="body1">
                    Av. Río Grijalva No. 5313 Col. San Manuel Puebla, Pue. C.P.
                    72570
                  </Typography>
                </Box>
              </Box>
            </Card>
            {/* Telefono */}
            <Card variant="outstanding" sx={{ height: "10%" }}></Card>
            {/* Correo electronico */}
            <Card variant="outstanding" sx={{ height: "10%" }}></Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}
