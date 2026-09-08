import { Box, Container, Typography } from "@mui/material";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";
import { NormatividadPortal } from "../components/normatividad/NormatividadPortal";

export default function Normatividad() {
    useDocumentMeta(seoMetadata.normatividad);

    return (
        <Container sx={{ py: 4, minHeight: '80vh' }}>

            {/* Title */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginBottom: { xs: "20px", md: "40px" },
                }}
            >
                <Typography
                    sx={{
                        textAlign: "left",
                        fontSize: "40px",
                        fontWeight: "900",
                        color: "primary.main",
                        borderBottom: "2px solid secondary.main",
                    }}
                >
                    Normatividad
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        marginTop: "16px",
                        textAlign: "left",
                        maxWidth: "800px",
                    }}
                >
                    Consulta el marco jurídico y normativo del Organismo.
                </Typography>
            </Box>

            <NormatividadPortal />

        </Container>
    );
}
