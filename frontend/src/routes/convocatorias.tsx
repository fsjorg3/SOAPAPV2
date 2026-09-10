import { Box, Container, Typography } from "@mui/material";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";
import { ConvocatoriasPortal } from "../components/convocatorias/ConvocatoriasPortal";

export default function Convocatorias() {
    useDocumentMeta(seoMetadata.convocatorias);

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
                        textTransform: "uppercase"
                    }}
                >
                    Convocatorias de Obra Pública y Adquisiciones
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                    }}
                />
            </Box>

            <ConvocatoriasPortal />

        </Container>
    );
}
