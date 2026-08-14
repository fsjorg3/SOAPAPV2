import { Box, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import EticaGalleryImage from './EticaGalleryImage';
import { galleryItems } from './eticaData';

export default function EticaGallery() {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const galleryColumns = isLargeScreen ? 3 : isMediumScreen ? 2 : 1;

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
            <PhotoProvider maskOpacity={0.9}>
                <ImageList
                    cols={galleryColumns}
                    gap={8}
                    rowHeight={220}
                    sx={{ width: '100%', m: 0 }}
                >
                    {galleryItems.map((item) => (
                        <ImageListItem key={item.src} sx={{ overflow: 'hidden' }}>
                            <EticaGalleryImage {...item} />
                            <ImageListItemBar title="Toca la imagen para ampliar" />
                        </ImageListItem>
                    ))}
                </ImageList>
            </PhotoProvider>
        </Box>
    );
}
