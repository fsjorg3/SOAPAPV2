import { useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import EticaGalleryImage from './EticaGalleryImage';
import { galleryItems, sesiones } from './eticaData';
import type { SesionId } from './eticaData';

// Solo las sesiones con fotos tienen pestaña; la primera (más reciente) es la activa por defecto.
const sesionesConFotos = sesiones
    .map((sesion) => ({ ...sesion, fotos: galleryItems.filter((item) => item.sesion === sesion.id) }))
    .filter((sesion) => sesion.fotos.length > 0);

export default function EticaGallery() {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const galleryColumns = isLargeScreen ? 3 : isMediumScreen ? 2 : 1;
    const [sesionActiva, setSesionActiva] = useState<SesionId | undefined>(sesionesConFotos[0]?.id);

    const activa = sesionesConFotos.find((sesion) => sesion.id === sesionActiva);

    return (
        <Box component="section" aria-labelledby="gallery-title" sx={{ mb: 2 }}>
            <Typography
                id="gallery-title"
                component="h2"
                sx={{
                    color: 'primary.main',
                    fontSize: { xs: '1.8rem', md: '2rem' },
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                Galería fotográfica
            </Typography>
            <Box
                aria-hidden="true"
                sx={{
                    width: { xs: '28%', sm: '20%', md: '14%' },
                    height: 5,
                    mx: 'auto',
                    mt: 1,
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: 'secondary.main',
                }}
            />
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs
                    value={sesionActiva}
                    onChange={(_, valor: SesionId) => setSesionActiva(valor)}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="Galería por sesión"
                >
                    {sesionesConFotos.map((sesion) => (
                        <Tab
                            key={sesion.id}
                            value={sesion.id}
                            id={`galeria-tab-${sesion.id}`}
                            aria-controls={`galeria-tabpanel-${sesion.id}`}
                            label={`${sesion.etiqueta} (${sesion.fotos.length})`}
                        />
                    ))}
                </Tabs>
            </Box>
            {/* Solo se monta la sesión activa: las fotos de las demás no se descargan hasta abrir su pestaña.
                Cada sesión tiene su propio PhotoProvider, así el visor ampliado recorre solo esa sesión. */}
            {activa && (
                <Box
                    role="tabpanel"
                    id={`galeria-tabpanel-${activa.id}`}
                    aria-labelledby={`galeria-tab-${activa.id}`}
                >
                    <PhotoProvider key={activa.id} maskOpacity={0.9}>
                        <ImageList
                            cols={galleryColumns}
                            gap={8}
                            rowHeight={220}
                            sx={{ width: '100%', m: 0 }}
                        >
                            {activa.fotos.map((item) => (
                                <ImageListItem key={item.src} sx={{ overflow: 'hidden' }}>
                                    <EticaGalleryImage {...item} />
                                    <ImageListItemBar title="Toca la imagen para ampliar" />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </PhotoProvider>
                </Box>
            )}
        </Box>
    );
}
