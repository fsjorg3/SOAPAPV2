import { Box, IconButton } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCarruselAutoplay } from '../hooks/useCarruselAutoplay';

import aneas from '../assets/sitios/aneas.png';
import conagua from '../assets/sitios/conagua.png';
import agua_puebla from '../assets/sitios/agua_puebla.png';

export default function InterestSlider() {
    const institutionalLogos = [
        { src: aneas, alt: "Logotipo ANEAS", url: "https://aneas.com.mx/" },
        { src: conagua, alt: "Logotipo CONAGUA", url: "https://www.gob.mx/conagua" },
        { src: agua_puebla, alt: "Logotipo Agua de Puebla", url: "https://www.aguapuebla.mx/" },
    ];

    // Carrusel en bucle con autoplay. Se detiene al pasar el ratón, arrastrar o enfocar un logo
    // (stopOnInteraction por defecto) y se reanuda con el botón Pausar/Reanudar.
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 3000, stopOnMouseEnter: true })
    ]);
    const { reproduciendo, disponible, alternar } = useCarruselAutoplay(emblaApi);

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
                    position: "relative",
                }}
            >
                {disponible && (
                    <IconButton
                        size="small"
                        onClick={alternar}
                        aria-label={reproduciendo ? "Pausar carrusel de sitios de interés" : "Reanudar carrusel de sitios de interés"}
                        sx={{ position: "absolute", top: 4, right: 4 }}
                    >
                        {reproduciendo ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                    </IconButton>
                )}
                {/* Contenedor Viewport del carrusel */}
                <Box
                    ref={emblaRef}
                    role="region"
                    aria-roledescription="carrusel"
                    aria-label="Sitios de interés"
                    sx={{ overflow: 'hidden' }}
                >
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
                                {/* Enlace real (no onClick en <img>) para que sea alcanzable con teclado */}
                                <Box
                                    component="a"
                                    href={logo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${logo.alt} (abre en una pestaña nueva)`}
                                    sx={{ display: "block", borderRadius: 1 }}
                                >
                                    <Box
                                        component="img"
                                        src={logo.src}
                                        alt=""
                                        sx={{
                                            display: "block",
                                            height: { xs: 45, sm: 55, md: 70 },
                                            width: "auto",
                                            objectFit: "contain",
                                            // Efecto institucional con hover
                                            filter: "grayscale(100%) opacity(70%)",
                                            transition: "all 0.3s ease-in-out",
                                            "&:hover": {
                                                filter: "grayscale(0%) opacity(100%)",
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}