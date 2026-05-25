import Box from '@mui/material/Box';


import regulariza from '../assets/banners/regulariza.png'
import regulariza2 from '../assets/banners/regulariza2.webp'


import SliderComponent from "react-slick";
const Slider = (SliderComponent as any).default || SliderComponent;



function Carrusel() {
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
    <Box className="slider-container" sx={{width:'100%', height:'auto'}}>
      <Slider {...settings}>

        <Box>
          <Box component='img' src={regulariza}  sx={{width:'50%', aspectRatio:'16/9', display:'block'}} />
        </Box>
        <Box>
          <Box component='img' src={regulariza2} sx={{width:'45%',display:'block'}}/>
        </Box>
 
      </Slider>
    </Box>
  );
}

export default Carrusel;



