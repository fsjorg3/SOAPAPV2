import { Box, Typography } from '@mui/material';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import EticaResourceCard from './EticaResourceCard';
import { resourceItems } from './eticaData';

export default function EticaResources() {
    if (resourceItems.length === 0) return null;

    return (
        <Box component="section" aria-labelledby="resources-title" sx={{ mb: { xs: 5, md: 8 } }}>
            <Typography
                id="resources-title"
                component="h2"
                sx={{
                    color: 'primary.main',
                    fontSize: { xs: '1.8rem', md: '2rem' },
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                Infografías y recursos
            </Typography>
            <Box
                aria-hidden="true"
                sx={{
                    width: { xs: '28%', sm: '20%', md: '14%' },
                    height: 5,
                    mx: 'auto',
                    mt: 1,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: 'secondary.main',
                }}
            />
            <Typography
                component="p"
                variant="body1"
                sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
            >
                Material informativo para fomentar la integridad y la prevención de la corrupción.
            </Typography>
            <PhotoProvider maskOpacity={0.9}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                        gap: 3,
                    }}
                >
                    {resourceItems.map((item) => (
                        <EticaResourceCard key={item.image} {...item} />
                    ))}
                </Box>
            </PhotoProvider>
        </Box>
    );
}
