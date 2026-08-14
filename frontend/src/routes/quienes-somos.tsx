import { } from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Componentes del Timeline de MUI Lab
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

// Iconos de Material UI
import EngineeringIcon from "@mui/icons-material/Engineering";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GavelIcon from "@mui/icons-material/Gavel";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";

export default function QuienesSomos() {
    useDocumentMeta(seoMetadata.quienesSomos);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const mision = `
    Suministrar los servicios públicos de agua potable, drenaje, alcantarillado, 
    saneamiento, tratamiento, disposición de aguas residuales y el reúso de las mismas, 
    a la población de la Zona de Cobertura, contribuyendo a su accesibilidad en 
    cantidad y calidad suficientes, como un derecho humano fundamental y favoreciendo 
    el aprovechamiento sustentable de los recursos hídricos del Estado.`;

    const vision = `
    Ser un organismo innovador y autosuficiente, que contribuye al derecho humano de 
    acceso a los servicios de agua potable, drenaje, alcantarillado, saneamiento, 
    privación, disposición de aguas residuales y el reúso de las mismas, de la 
    población de la Zona de Cobertura, apoyando a la conservación del medio ambiente y 
    administrando con eficiencia los recursos.
    `;

    const funcionesConIcono = [
        {
            texto: `Planear, programar, conservar, mantener, ampliar y rehabilitar, administrar 
        y operar las obras y sistemas de agua potable, drenaje, alcantarillado y saneamiento 
        de aguas residuales y el reúso de las mismas, así como el tratamiento de aguas 
        sulfhídricas o salinas y su reúso respectivo, y en general la prestación o concesión 
        de servicios, conforme lo establezcan las disposiciones aplicables.`,
            Icono: EngineeringIcon,
        },
        {
            texto: `Garantizar la prestación de los Servicios Públicos de agua potable y alcantarillado 
        en el Municipio de Puebla y en el Área de Cobertura.`,
            Icono: WaterDropIcon,
        },
        {
            texto: `Supervisar la construcción, operación y mantenimiento de la infraestructura hídrica 
        en su zona de competencia.`,
            Icono: VisibilityIcon,
        },
        {
            texto: `Ser una autoridad Fiscal.`,
            Icono: AccountBalanceIcon,
        },
        {
            texto: `Proponer la actualización de los Derechos, Contribuciones y Productos por los 
        servicios públicos proporcionados.`,
            Icono: MonetizationOnIcon,
        },
        {
            texto: `Determinar infracciones e imponer sanciones conforme a la Ley de la Materia.`,
            Icono: GavelIcon,
        },
        {
            texto: `Dar asesoría a personas físicas o morales respecto a los servicios hídricos que 
        presta el Sistema.`,
            Icono: SupportAgentIcon,
        },
        {
            texto: `Fomentar la cultura de uso sustentable del agua y cuidado del medio ambiente.`,
            Icono: EnergySavingsLeafIcon,
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Title */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginBottom: { xs: "24px", md: "40px" },
                }}
            >
                <Typography
                    sx={{
                        fontSize: "40px",
                        fontWeight: "900",
                        color: "primary.main",
                    }}
                >
                    Quiénes Somos
                </Typography>
                <Box
                    sx={{
                        width: { xs: "25%", md: "15%" },
                        height: "5px",
                        backgroundColor: "secondary.main",
                        mt: 1,
                    }}
                />
            </Box>

            {/* Misión y Visión */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                    mb: 5,
                    alignItems: "stretch",
                }}
            >
                <Card variant="standard" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                        <Typography variant="h3" component="h2" gutterBottom sx={{ color: "secondary.main", fontWeight: 700 }}>
                            Misión
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.7, textAlign: "justify" }}>
                            {mision.trim()}
                        </Typography>
                    </CardContent>
                </Card>

                <Card variant="standard" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                        <Typography variant="h3" component="h2" gutterBottom sx={{ color: "secondary.dark", fontWeight: 700 }}>
                            Visión
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.7, textAlign: "justify" }}>
                            {vision.trim()}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Funciones y Atribuciones (Timeline) */}
            <Typography variant="h3" component="h2" gutterBottom
                sx={{
                    color: "primary.main",
                    mb: 3,
                    fontWeight: 700,
                    mt: 5,
                    textAlign: "center",

                }}>
                Funciones y Atribuciones
            </Typography>

            <Timeline
                position={isMobile ? "right" : "alternate"}
                sx={{
                    p: 0,
                    ...(isMobile && {
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    }),
                }}
            >
                {funcionesConIcono.map((item, index) => {
                    const Icon = item.Icono;
                    return (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{
                                        backgroundColor: "primary.main",
                                        color: "primary.contrastText",
                                        p: 1.5,
                                        border: "none",
                                        boxShadow: "none",
                                    }}
                                >
                                    <Icon sx={{ fontSize: "1.5rem" }} />
                                </TimelineDot>
                                {index < funcionesConIcono.length - 1 && (
                                    <TimelineConnector sx={{ backgroundColor: "primary.main" }} />
                                )}
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: 2, px: 2 }}>
                                <Card variant="outlined" sx={{ backgroundColor: "background.paper" }}>
                                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                                        <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.6 }}>
                                            {item.texto.trim()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        </Container>
    );
}