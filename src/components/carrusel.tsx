import SliderComponent from "react-slick";
import regulariza from "../assets/banners/regulariza.png";
import { Box } from '@mui/material';

// Forzamos la compatibilidad de módulos: si viene empaquetado como objeto,
// extraemos .default, de lo contrario usamos la función directa.
const Slider = (SliderComponent as any).default || SliderComponent;

export default function Carrusel() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };

  return (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <Slider {...settings}>
      <Box sx={{ width: '100%' }}>
        <Box 
          component="img" 
          src={regulariza} 
          alt="banner regularizate 2026" 
          sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: 3 }} 
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box 
          component="img" 
          src={regulariza} 
          alt="banner regularizate 2026" 
          sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: 3, filter:'grayscale(10%)'  }} 
        />
      </Box>
    </Slider>
  </Box>
);
}