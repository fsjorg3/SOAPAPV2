import { Box, Container, Typography } from "@mui/material";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";
import { FinancialPortal } from "../components/informacion-financiera/FinancialPortal";

export default function InformacionFinanciera() {
    useDocumentMeta(seoMetadata.informacionFinanciera);

    return (
        <Container maxWidth='lg'>

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
                    Información financiera
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
                    Consulta la información financiera, contable, presupuestal y programática del Sistema Operador de los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla por periodo fiscal.
                </Typography>
            </Box>

            <FinancialPortal />

        </Container>
    );
}
