import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { PhotoView } from 'react-photo-view';
import type { GalleryItem } from './eticaData';

export default function EticaGalleryImage({ src, alt }: GalleryItem) {
    const [loaded, setLoaded] = useState(false);

    return (
        <PhotoView src={src}>
            <Box
                component="button"
                type="button"
                aria-label={`Ampliar imagen: ${alt}`}
                sx={{
                    position: 'relative',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    p: 0,
                    border: 0,
                    backgroundColor: 'grey.100',
                    cursor: 'zoom-in',
                    overflow: 'hidden',
                    '&:focus-visible': {
                        outline: '3px solid',
                        outlineColor: 'secondary.main',
                        outlineOffset: '-3px',
                    },
                    '&:hover img': {
                        transform: 'scale(1.03)',
                    },
                }}
            >
                {!loaded && (
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        sx={{ position: 'absolute', inset: 0, zIndex: 1 }}
                    />
                )}
                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    sx={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 220ms ease, transform 220ms ease',
                    }}
                />
            </Box>
        </PhotoView>
    );
}
