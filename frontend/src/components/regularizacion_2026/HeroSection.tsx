import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import heroDesktop from "../../assets/banners/regularizacion_2026_16-9.webp";
import heroMobile from "../../assets/banners/regularizacion_2026_9-16.webp";

export default function HeroSection() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: { xs: '9/16', md: '16/9' },
                backgroundImage: { xs: `url(${heroMobile})`, md: `url(${heroDesktop})` },
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Button
                variant="contained"
                LinkComponent='a'
                href="https://regularizate.aguapuebla.mx/"
                target="_blank" 
                rel="noopener noreferrer"
                sx={{
                    position: 'absolute',
                    bottom: { xs: 24, md: 40 },
                    left: { xs: '50%', md: 40 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    padding:{md:'20px'},
                    backgroundColor:'secondary.main',
                    '&:hover': {
                        backgroundColor: 'secondary.dark',
                    },
                    fontSize:{xs:'0.8rem',md:'1.2rem'},
                    justifyContent:'center'
                }}
            >
                
                Inicia tu regularización
                <ArrowRightAltIcon sx={{ml:{md:2,xs:4}, fontWeight:900, fontSize:'2rem'}}/>
            </Button>
        </Box>
    );
}
