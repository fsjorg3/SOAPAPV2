import Box from "@mui/material/Box";
import { Card, Divider, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import Carrusel, { type SlideData } from "../components/carrusel";
import puebla from "../assets/logos/nuevo_gobierno-estado.webp";
import soapap from "../assets/logos/soapap.webp";
import amor from "../assets/logos/amor_puebla.webp";
import regulariza from "../assets/banners/regulariza16-9.png";
import regularizaMobile from "../assets/banners/regulariza9-16.png";
import regulariza2 from "../assets/banners/regulariza216-9.png";
import regulariza2Mobile from "../assets/banners/regulariza29-16.png";
import WatterCultureOptions from "../components/watter-culture/watter-culture-options";

import aneas from '../assets/sitios/aneas.png'
import conagua from '../assets/sitios/conagua.webp'
import agua_puebla from '../assets/sitios/agua_puebla.png'

export default function Inicio() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));


  const institutionalLogos = [
  { src: aneas, alt: "Logotipo ANEAS" },
  { src: conagua, alt: "Logotipo CONAGUA" },
  { src: agua_puebla, alt: "Logotipo Agua de Puebla" },
];


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
      url: "https://soapap.gob.mx/programas-ayudas/regularizate_2026/index.html",
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
      url: "https://soapap.gob.mx/programas-ayudas/regularizate_2026/index.html",
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "400dvh",
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
            <Box sx={{ width:'15%', height:'5px', backgroundColor:'secondary.main'}}/>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: { xs: "20px", md: "40px" },
            }}
          >
            <Carrusel
              slides={isDesktop ? carouselData : carouselDataMobile}
              width={{ xs: "100%", md: "70%" }}
            ></Carrusel>
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
          <Box sx={{ width:'15%', height:'5px', backgroundColor:'secondary.main'}}/>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {xs:'column', md:'row'},
            justifyContent: "center",
            alignItems: "center",
            marginTop: { xs: "20px", md: "40px" },
            gap:'20px',
            minHeight:'50dvh'
          }}
        >
          <WatterCultureOptions></WatterCultureOptions>

        </Box>

        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: { xs: 5, md: 10 }, // Simplificado usando el espaciado del tema de MUI (5 = 40px, 10 = 80px aprox)
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000, // Previene que la caja se estire infinitamente en monitores ultrawide
          border: "1px solid",
          borderColor: "divider", // Usa el color de borde sutil predeterminado de tu tema
          borderRadius: 2,
          bgcolor: "background.paper", // Asegura contraste si el fondo global es grisáceo
          p: { xs: 3, md: 4 }, // Padding dinámico
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: { xs: 4, sm: 6, md: 8 }, // Control absoluto del espacio en lugar de space-around
        }}
      >
        {institutionalLogos.map((logo, index) => (
          <Box
            key={index}
            component="img"
            src={logo.src}
            alt={logo.alt} // Crítico para accesibilidad y validaciones HTML
            sx={{
              // La altura la dicta la imagen, no el contenedor padre
              height: { xs: 45, sm: 55, md: 70 }, 
              width: "auto",
              objectFit: "contain",
              // Efecto institucional: Grises en reposo, color original al pasar el cursor
              filter: "grayscale(100%) opacity(70%)",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer", // Indica que son interactivos (opcional, si los harás enlaces luego)
              "&:hover": {
                filter: "grayscale(0%) opacity(100%)",
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
        
      </Box>
    </>
  );
}
