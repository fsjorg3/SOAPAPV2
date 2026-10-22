import { Box, Card, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PhotoView } from 'react-photo-view';
import type { ResourceItem } from './eticaData';

export default function EticaResourceCard({ image, label, title, description, alt }: ResourceItem) {
    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: 'secondary.main',
                    boxShadow: 2,
                },
            }}
        >
            <PhotoView src={image}>
                <Box
                    component="button"
                    type="button"
                    aria-label={`Ampliar infografía: ${title}`}
                    sx={{
                        display: 'block',
                        width: '100%',
                        height: 220,
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
                    <Box
                        component="img"
                        src={image}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        sx={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 220ms ease',
                        }}
                    />
                </Box>
            </PhotoView>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    component="p"
                    variant="overline"
                    sx={{ color: 'secondary.main', fontWeight: 700, lineHeight: 1.2 }}
                >
                    {label}
                </Typography>
                <Typography component="h3" variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {description}
                </Typography>
                <Typography
                    component="span"
                    variant="button"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'primary.main',
                        fontWeight: 700,
                    }}
                >
                    Ver infografía
                    <ArrowForwardIcon fontSize="small" />
                </Typography>
            </CardContent>
        </Card>
    );
}
