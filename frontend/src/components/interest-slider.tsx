import { Box } from "@mui/material";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import aneas from '../assets/sitios/aneas.png';
import conagua from '../assets/sitios/conagua.png';
import agua_puebla from '../assets/sitios/agua_puebla.png';

export default function InterestSlider() {
    const institutionalLogos = [
        { src: aneas, alt: "Logotipo ANEAS", url: "https://aneas.com.mx/" },
        { src: conagua, alt: "Logotipo CONAGUA", url: "https://www.gob.mx/conagua" },
        { src: agua_puebla, alt: "Logotipo Agua de Puebla", url: "https://www.aguapuebla.mx/" },
    ];

    // Se configura el carrusel para auto-deslizarse en bucle sin detenerse por completo
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const handleLogoClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: 5, md: 10 },
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    p: { xs: 3, md: 4 },
                }}
            >
                {/* Contenedor Viewport del carrusel */}
                <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
                    {/* Contenedor de las diapositivas (slides) */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {institutionalLogos.map((logo, index) => (
                            <Box
                                key={index}
                                sx={{
                                    // 1 elemento en pantallas extra pequeñas, 2 en pequeñas y 3 a partir de medianas
                                    flex: { xs: '0 0 100%', sm: '0 0 50%', md: '0 0 33.333%' },
                                    minWidth: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={logo.src}
                                    alt={logo.alt}
                                    onClick={() => handleLogoClick(logo.url)}
                                    sx={{
                                        height: { xs: 45, sm: 55, md: 70 },
                                        width: "auto",
                                        objectFit: "contain",
                                        // Efecto institucional con hover
                                        filter: "grayscale(100%) opacity(70%)",
                                        transition: "all 0.3s ease-in-out",
                                        cursor: "pointer",
                                        "&:hover": {
                                            filter: "grayscale(0%) opacity(100%)",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}