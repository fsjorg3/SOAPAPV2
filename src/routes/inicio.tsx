import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import PromotionalSlider, { type SlideData } from "../components/promotional-slider";
import puebla from "../assets/logos/nuevo_gobierno-estado.webp";
import soapap from "../assets/logos/soapap.webp";
import amor from "../assets/logos/amor_puebla.webp";
import regulariza from "../assets/banners/regulariza16-9.png";
import regularizaMobile from "../assets/banners/regulariza9-16.png";
import regulariza2 from "../assets/banners/regulariza216-9.png";
import regulariza2Mobile from "../assets/banners/regulariza29-16.png";
import WatterCultureOptions from "../components/watter-culture/watter-culture-options";
import InterestSlider from "../components/interest-slider";


export default function Inicio() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));


  const carouselData: SlideData[] = [
    {
      src: regulariza,
      alt: "regulariza",
      url: "/contacto",
    },
    {
      src: regulariza2,
      alt: "regulariza2",
      url: "/directorio",
    },
    {
      src: regulariza,
      alt: "regulariza",
      url: "/regularizate_2026",
    },
  ];

  const carouselDataMobile: SlideData[] = [
    {
      src: regularizaMobile,
      alt: "regulariza",
      url: "/contacto",
    },
    {
      src: regulariza2Mobile,
      alt: "regulariza2",
      url: "/directorio",
    },
    {
      src: regularizaMobile,
      alt: "regulariza",
      url: "/regularizate_2026",
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          //height: "400dvh",
          marginTop: { xs: "40px", md: "80px" },
        }}
      >
        {/* Hero logos */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={puebla}
            sx={{ width: { xs: "40%", md: "25%" }, height: "auto" }}
          />
          <Divider
            component="div"
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: { xs: "2", md: "4" }, // El grosor que configuramos antes
              borderColor: "primary.main", // Color opcional para resaltar
              transform: "rotate(7deg)", // La magia de la inclinación
              mx: 2, // Margen horizontal en el eje X (esencial para evitar choques)
              height: { xs: "20px", md: "80px" }, // Reducir un poco la altura evita que las esquinas desborden el contenedor
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
          <Box
            component="img"
            src={soapap}
            sx={{ width: { xs: "40%", md: "25%" }, height: "90%" }}
          />
          <Divider
            component="div"
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: { xs: "2", md: "4" }, // El grosor que configuramos antes
              borderColor: "primary.main", // Color opcional para resaltar
              transform: "rotate(7deg)", // La magia de la inclinación
              mx: 2, // Margen horizontal en el eje X (esencial para evitar choques)
              height: "80px", // Reducir un poco la altura evita que las esquinas desborden el contenedor
              marginTop: "auto",
              marginBottom: "auto",
              display: { xs: "none", md: "block" },
            }}
          />
          <Box
            component="img"
            src={amor}
            sx={{ width: "16%", display: { xs: "none", md: "block" } }}
          />
        </Box>

        {/* Hero noticias */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              margin: "80px 80px 0px 80px",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "900",
              color: "primary.main",
              borderBottom: "2px solid secondary.main",
            }}
          >
            Bienvenido
          </Typography>
          <Box sx={{ width: '15%', height: '5px', backgroundColor: 'secondary.main' }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: { xs: "20px", md: "40px" },
            }}
          >
            <PromotionalSlider
              slides={isDesktop ? carouselData : carouselDataMobile}
              width={{ xs: "100%", md: "70%" }}
            />
          </Box>
        </Box>

        {/*Cultura del agua */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*Titulo*/}
          <Typography
            sx={{
              margin: "80px 80px 0px 80px",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "900",
              color: "primary.main",
              borderBottom: "2px solid secondary.main",
            }}
          >
            Cultura del Agua
          </Typography>
          <Box sx={{ width: '15%', height: '5px', backgroundColor: 'secondary.main' }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: "center",
            alignItems: "center",
            marginTop: { xs: "20px", md: "40px" },
            gap: '20px',
            minHeight: '50dvh'
          }}
        >
          <WatterCultureOptions></WatterCultureOptions>

        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: { xs: "40px", md: "80px" },
          }}
        >
          <InterestSlider></InterestSlider>
        </Box>






      </Box>
    </>
  );
}
