import { Avatar, Box, Card, Chip, Typography } from '@mui/material';
import { coordinacion, integrantes, presidencia } from './cilyndData';
import type { Integrante } from './cilyndData';

const ALTO_CONECTOR = 24;
const colorConector = 'divider';

const colorRol = (rol: Integrante['rol']) => {
    if (rol === 'Presidenta') return 'primary';
    if (rol === 'Coordinadora') return 'secondary';
    return 'default';
};

interface PersonaCardProps {
    persona: Integrante;
    // true: foto arriba y texto centrado (fila de integrantes); false: foto a la izquierda (presidencia y coordinación).
    vertical?: boolean;
}

function PersonaCard({ persona, vertical = false }: PersonaCardProps) {
    const { foto, nombre, cargo, rol } = persona;

    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: vertical ? 'column' : 'row',
                alignItems: 'center',
                gap: 2,
                p: 2,
                textAlign: vertical ? 'center' : 'left',
            }}
        >
            <Avatar
                src={foto}
                alt={`Fotografía de ${nombre}`}
                sx={{
                    width: vertical ? 96 : 80,
                    height: vertical ? 96 : 80,
                    flexShrink: 0,
                    border: '3px solid',
                    borderColor: rol === 'Presidenta' ? 'primary.main' : 'secondary.main',
                }}
            />
            <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: vertical ? 'center' : 'flex-start', gap: 0.5 }}>
                <Chip
                    label={rol}
                    size="small"
                    color={colorRol(rol)}
                    variant={rol === 'Presidenta' || rol === 'Coordinadora' ? 'filled' : 'outlined'}
                />
                <Typography component="h3" sx={{ color: 'text.primary', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.3 }}>
                    {nombre}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {cargo}
                </Typography>
            </Box>
        </Card>
    );
}

const listaBase = { listStyle: 'none', m: 0, p: 0 } as const;

// Conector vertical entre niveles, centrado.
const conector = {
    width: 2,
    height: ALTO_CONECTOR,
    mx: 'auto',
    backgroundColor: colorConector,
} as const;

export default function OrganigramaPanel() {
    return (
        <>
            <Typography component="p" variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Conoce a las personas servidoras públicas que integran el Comité de Igualdad Laboral y No Discriminación
            </Typography>

            <Box component="ul" sx={{ ...listaBase, maxWidth: 460, mx: 'auto' }}>
                <Box component="li">
                    <PersonaCard persona={presidencia} />
                </Box>
            </Box>
            <Box aria-hidden="true" sx={conector} />
            <Box component="ul" sx={{ ...listaBase, maxWidth: 460, mx: 'auto' }}>
                <Box component="li">
                    <PersonaCard persona={coordinacion} />
                </Box>
            </Box>
            <Box aria-hidden="true" sx={conector} />

            <Box
                component="ul"
                sx={{
                    ...listaBase,
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        md: 'repeat(3, minmax(0, 1fr))',
                        lg: 'repeat(6, minmax(0, 1fr))',
                    },
                    gap: 2,
                    // Línea horizontal que une a los 6 integrantes (solo en pantalla ancha, donde van en una sola fila).
                    '&::before': {
                        content: '""',
                        display: { xs: 'none', lg: 'block' },
                        position: 'absolute',
                        top: -ALTO_CONECTOR / 2 - 1,
                        left: 'calc(100% / 12)',
                        right: 'calc(100% / 12)',
                        height: 2,
                        backgroundColor: colorConector,
                    },
                }}
            >
                {integrantes.map((persona) => (
                    <Box
                        component="li"
                        key={persona.nombre}
                        sx={{
                            position: 'relative',
                            // Rama vertical de cada integrante hacia la línea horizontal.
                            '&::before': {
                                content: '""',
                                display: { xs: 'none', lg: 'block' },
                                position: 'absolute',
                                top: -ALTO_CONECTOR / 2,
                                left: '50%',
                                width: 2,
                                height: ALTO_CONECTOR / 2,
                                backgroundColor: colorConector,
                            },
                        }}
                    >
                        <PersonaCard persona={persona} vertical />
                    </Box>
                ))}
            </Box>
        </>
    );
}
