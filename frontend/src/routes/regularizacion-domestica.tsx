import Container from "@mui/material/Container";
import { useState } from "react";
import ColoniasDialog from "../components/colonias-dialog";
import HeroSection from "../components/regularizacion-domestica/HeroSection";
import SobreProgramaSection from "../components/regularizacion-domestica/SobreProgramaSection";
import ComoAccederSection from "../components/regularizacion-domestica/ComoAccederSection";
import PagoUnicoSection from "../components/regularizacion-domestica/PagoUnicoSection";
import ConsideracionesImportantesSection from "../components/regularizacion-domestica/ConsideracionesImportantesSection";
import Modalidad2Section from "../components/regularizacion-domestica/Modalidad2Section";
import CostoContratacionSection from "../components/regularizacion-domestica/CostoContratacionSection";
import VigenciaSection from "../components/regularizacion-domestica/VigenciaSection";
import UsuariosExceptuadosSection from "../components/regularizacion-domestica/UsuariosExceptuadosSection";
import ConsideracionesLegalesSection from "../components/regularizacion-domestica/ConsideracionesLegalesSection";

export default function RegularizacionDomestica() {
    const [openColoniasDialog, setOpenColoniasDialog] = useState(false);

    return (
        <Container maxWidth='lg'>
            <HeroSection setOpenColoniasDialog={setOpenColoniasDialog} />
            <SobreProgramaSection />
            <ComoAccederSection />
            <PagoUnicoSection />
            <ConsideracionesImportantesSection />
            <Modalidad2Section />
            <CostoContratacionSection />
            <VigenciaSection />
            <UsuariosExceptuadosSection />
            <ConsideracionesLegalesSection />
            
            <ColoniasDialog open={openColoniasDialog} onClose={() => setOpenColoniasDialog(false)} />
        </Container>
    );
}
