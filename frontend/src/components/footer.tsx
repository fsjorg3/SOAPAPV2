import { useState } from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import { Link } from "react-router"
import { PdfViewer } from "./pdfviewer/PdfViewer"

import drop from '../assets/drop-minimalist.svg'
import { navbarItems } from "../components/navbar/navbar"


export default function Footer() {
    const [openPdf, setOpenPdf] = useState(false);
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

                        <Box 
                            component="nav" 
                            sx={{ 
                                display: "grid", 
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
                                gap: { xs: 0, md: 1 },
                                width: { xs: '100%', md: 'auto' }
                            }}
                        >
                            {navbarItems.flatMap(item => item.subItems ? item.subItems : [item]).map((link) => (
                                <Button
                                    key={link.texto}
                                    component={Link}
                                    to={link.ruta!}
                                    sx={{
                                        textAlign: 'center',
                                        justifyContent: { xs: "center", md: 'flex-start' }, // Centrado en móvil, a la izquierda en PC
                                        textTransform: "none",
                                        padding: { xs: '2px 0', md: '6px 12px' }, // Padding más pequeño en móvil para hacerlo compacto
                                        minHeight: '32px', // Reduce la altura predeterminada del botón en móvil
                                        color: (theme) => theme.palette.primary.contrastText,
                                        '&:hover': {
                                            color: 'secondary.main',
                                        },
                                        "&.active": {
                                            color: "secondary.light",
                                        },
                                    }}
                                >
                                    {link.texto}
                                </Button>
                            ))}
                        </Box>

                    </Box>

                </Box>
                <Divider sx={{ display: 'flex', width: '100%', height: '1px', backgroundColor: 'primary.contrastText', my: 2 }} />
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <Typography
                        component='a'
                        href="#"
                        onClick={(e) => { e.preventDefault(); setOpenPdf(true); }}
                        sx={{ color: 'primary.contrastText', cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                        Aviso de privacidad
                    </Typography>
                    <Typography
                        component='a'
                        href="https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml?idEntidad=MjE=&idSujetoObligado=NDIzNg==#inicio"
                        sx={{
                            color: 'primary.contrastText',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        Plataforma Nacional de Transparencia
                    </Typography>
                </Box>
            </Box>


        </Box>

        <PdfViewer
            open={openPdf}
            onClose={() => setOpenPdf(false)}
            pdfUrl="/pdfs/aviso-privacidad.pdf"
        />
    </>)


}