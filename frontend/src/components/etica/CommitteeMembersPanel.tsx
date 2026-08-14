import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { committeeMembers } from './eticaData';

export default function CommitteeMembersPanel() {
    return (
        <>
            <Typography component="p" variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Conoce a los servidores públicos que integran el Comité
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {committeeMembers.map(({ Icon, name, position, function: memberFunction }) => (
                    <Card
                        key={name}
                        variant="outlined"
                        sx={{
                            overflow: 'hidden',
                            transition: 'transform 180ms ease, border-color 180ms ease',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                borderColor: 'secondary.main',
                            },
                            '&:active': {
                                transform: 'translateY(-1px) scale(0.995)',
                            },
                        }}
                    >
                        <CardActionArea
                            sx={{
                                '&:focus-visible': {
                                    outline: '3px solid',
                                    outlineColor: 'secondary.main',
                                    outlineOffset: '-3px',
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                                    alignItems: 'center',
                                    gap: { xs: 1.5, sm: 2.5 },
                                    p: { xs: 1.5, sm: 2 },
                                    '&:last-child': { pb: { xs: 1.5, sm: 2 } },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 52, sm: 64 },
                                        height: { xs: 52, sm: 64 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        backgroundColor: 'grey.100',
                                        color: 'primary.main',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon sx={{ fontSize: { xs: 30, sm: 36 } }} />
                                </Box>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        component="h3"
                                        sx={{
                                            color: 'text.primary',
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                            fontWeight: 700,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                        {position}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <Box component="span" sx={{ fontWeight: 700 }}>
                                            Función:
                                        </Box>{' '}
                                        {memberFunction}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </>
    );
}
