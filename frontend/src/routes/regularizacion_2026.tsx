import { useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeroSection from "../components/regularizacion_2026/HeroSection";
import SituacionSection from "../components/regularizacion_2026/SituacionSection";
import ConsideracionesImportantesSection from "../components/regularizacion_2026/ConsideracionesImportantesSection";
import ComoYDondeSection from "../components/regularizacion_2026/ComoYDondeSection";
import AtencionServiciosSection from "../components/regularizacion_2026/AtencionServiciosSection";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";

export default function Regularizacion2026() {
    useDocumentMeta(seoMetadata.regularizacion2026);
    const nextSectionRef = useRef<HTMLDivElement>(null);

    return (
        <Box sx={{ width: '100%' }}>
            <HeroSection />
            <Container maxWidth={false} disableGutters ref={nextSectionRef}>
                <SituacionSection />
                <ConsideracionesImportantesSection />
                <ComoYDondeSection />
                <AtencionServiciosSection />
            </Container>
        </Box>
    );
}
