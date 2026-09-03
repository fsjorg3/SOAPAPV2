import Container from "@mui/material/Container";

import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { seoMetadata } from "../config/seo-metadata";
import VerificacionHero from "../components/verificacion/VerificacionHero";
import VerificacionSteps from "../components/verificacion/VerificacionSteps";
import VerificacionCards from "../components/verificacion/VerificacionCards";
import VerificacionForm from "../components/verificacion/VerificacionForm";

export default function VerificarConstancia() {
  useDocumentMeta(seoMetadata.verificarConstancia);

  return (
    <Container maxWidth="lg">
      <VerificacionHero />
      <VerificacionCards />
      <VerificacionSteps />
      
      <VerificacionForm />
    </Container>
  );
}
