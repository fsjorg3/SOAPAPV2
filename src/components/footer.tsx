import { Box, Button, Divider, Typography } from "@mui/material"
import { Link } from "react-router"

import drop from '../assets/drop-minimalist.svg'
import { navbarItems } from "../components/navbar/navbar"


export default function Footer() {
    return (<>

        <Box sx={{ width: '100%', minHeight: '250px', backgroundColor: 'primary.main', borderRadius: '8px' }}>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    maxWidth: 'lg',
                    marginInline: 'auto',
                    px: 3, pt: 4, pb: 8
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

                    <Box sx={{ display: 'flex', gap: '15px', width: { xs: '100%', md: '50%' }, alignItems: 'center', justifyContent: 'center' }}>

                        <Box component='img' src={drop}
                            sx={{ display: 'block', width: { xs: '10%', md: '10%' }, border: '2px solid white', margin: '5px', padding: '5px', borderRadius: '8px' }} />

                        <Box sx={{ width: { xs: '80%', md: '60%' } }}>
                            <Typography variant='body2' sx={{ color: 'primary.contrastText', textTransform: 'uppercase' }}>
                                Sistema Operador de los Serivicios de Agua Potable y Alcantarillado del Municipio de Puebla
                            </Typography>
                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex', width: { xs: '100%', md: '50%' }, justifyContent: { xs: 'center', md: 'flex-end' }, marginTop: { xs: '20px', md: '0px' } }}>

                        <Box component="nav" sx={{ display: "flex", flexDirection: "column" }}>
                            {navbarItems.map(({ texto, ruta }) => (
                                <Button
                                    key={texto}
                                    component={Link}
                                    to={ruta}
                                    sx={{
                                        textAlign: 'center',
                                        justifyContent: { xs: "center", md: 'left' }, // Alinear texto a la izquierda
                                        textTransform: "none", // Evitar mayúsculas automáticas
                                        paddingLeft: 0, // Eliminar padding por defecto del componente Button
                                        color: (theme) => theme.palette.primary.contrastText, // Color del texto
                                        '&:hover': {
                                            color: 'secondary.main', // Color del texto al hacer hover
                                        },
                                        "&.active": {
                                            color: "secondary.light", // Clase interna que NavLink inyecta automáticamente
                                        },
                                    }}
                                >
                                    {texto}
                                </Button>
                            ))}
                        </Box>

                    </Box>

                </Box>
                <Divider sx={{ display: 'flex', width: '100%', height: '1px', backgroundColor: 'primary.contrastText' }} />
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <Typography component='a' href="#" sx={{ color: 'primary.contrastText' }}>Aviso de privacidad</Typography>
                    <Typography component='a' href="#" sx={{ color: 'primary.contrastText' }}>Plataforma Nacional de Transparencia</Typography>
                </Box>
            </Box>


        </Box>

    </>)


}