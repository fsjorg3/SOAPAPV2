import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import LaunchIcon from '@mui/icons-material/Launch';


import periodosWebp from "../../assets/regularizacion_2026/periodos_de_adeudo.webp";
import usuarioWebp from "../../assets/regularizacion_2026/usuario_al_corriente.webp";
import condicionesWebp from "../../assets/regularizacion_2026/condiciones_especiales.webp";
import periodosJpeg from "../../assets/regularizacion_2026/cards/periodos_de_adeudo.jpeg";
import usuarioJpeg from "../../assets/regularizacion_2026/cards/usuario_al_corriente.jpeg";
import condicionesJpeg from "../../assets/regularizacion_2026/cards/condiciones_especiales.jpeg";

interface Situacion {
    numero: string;
    label: string;
    imagen: string;
    imagenCompleta: string;
}

const situaciones: Situacion[] = [
    {
        numero: "01",
        label: "7 o más periodos de adeudo",
        imagen: periodosWebp,
        imagenCompleta: periodosJpeg,
    },
    {
        numero: "02",
        label: "Usuario al corriente",
        imagen: usuarioWebp,
        imagenCompleta: usuarioJpeg,
    },
    {
        numero: "03",
        label: "Condiciones especiales",
        imagen: condicionesWebp,
        imagenCompleta: condicionesJpeg,
    },
];

export default function SituacionSection() {
    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 4 },
            }}
        >
            {/* Title */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: { xs: "32px", md: "48px" },
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: { xs: "28px", md: "40px" },
                        fontWeight: "900",
                        color: "primary.main",
                        textTransform: "uppercase",
                    }}
                >
                    ¿Cuál es tu situación?
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                        mt: 1,
                    }}
                />
            </Box>

            <PhotoProvider maskOpacity={0.9}>
                <Grid container spacing={3} sx={{ justifyContent: "center", maxWidth: "1200px", mx: "auto" }}>
                    {situaciones.map((situacion) => (
                        <Grid key={situacion.numero} size={{ xs: 12, md: 4 }}>
                            <PhotoView src={situacion.imagenCompleta}>
                                <Card
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",
                                        height: "100%",
                                        border: "none",
                                        borderRadius: "16px",
                                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-8px) scale(1.02)",
                                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            width: 0,
                                            height: 0,
                                            borderStyle: "solid",
                                            borderWidth: "0 0 22px 22px",
                                            borderColor: "transparent transparent #E6E8EA transparent",
                                            boxShadow: "-2px -2px 4px rgba(0,0,0,0.12)",
                                        },
                                    }}
                                >
                                    <CardActionArea
                                        sx={{
                                            height: "100%",
                                            p: { xs: 2, md: 3 },
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: 'start'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                mb: 1.25,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "primary.contrastText",
                                                    fontWeight: 800,
                                                    width: { xs: 28, md: 34 },
                                                    height: { xs: 28, md: 34 },
                                                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                                                }}
                                            >
                                                {situacion.numero}
                                            </Avatar>
                                            <Box
                                                aria-hidden="true"
                                                sx={{
                                                    backgroundColor: "rgba(255,255,255,0.85)",
                                                    color: "primary.main",
                                                    width: { xs: 28, md: 34 },
                                                    height: { xs: 28, md: 34 },
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <OpenInNewIcon sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} />
                                            </Box>
                                        </Box>

                                        <Typography
                                            sx={{
                                                width: "100%",
                                                textAlign: "left",
                                                color: "primary.main",
                                                fontWeight: 700,
                                                fontSize: { xs: "0.8rem", md: "1rem" },
                                                lineHeight: 1.25,
                                                mb: 1.5,
                                            }}
                                        >
                                            {situacion.label}
                                        </Typography>

                                        <Box
                                            component="img"
                                            src={situacion.imagen}
                                            alt={situacion.label}
                                            sx={{
                                                width: "100%",
                                                maxWidth: { xs: 200, md: 220 },
                                                height: "auto",
                                                objectFit: "contain",
                                                mx: "auto",
                                            }}
                                        />

                                        <Box sx={{display:'flex' , justifyContent:'center', alignItems:'center',mt: '20px', gap:'10px', justifySelf: 'end', alignSelf:'end'}}>

                                            <Typography component='p' sx={{ fontSize: '0.8rem', fontWeight: '700',  }}>
                                                Más informacion
                                            </Typography>

                                            <LaunchIcon sx={{fontSize: '1.2rem',fontWeight:'700'}}/>

                                        </Box>



                                    </CardActionArea>
                                </Card>
                            </PhotoView>
                        </Grid>
                    ))}
                </Grid>
            </PhotoProvider>
        </Box>
    );
}
