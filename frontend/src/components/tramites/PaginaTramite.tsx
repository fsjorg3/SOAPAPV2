import { Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ANCLA_DOCUMENTOS } from '../../config/tramites/tipos';
import type { TramiteConfig } from '../../config/tramites/tipos';
import AvisoLegal from './AvisoLegal';
import ContactoTelefonos from './ContactoTelefonos';
import CostoVigencia from './CostoVigencia';
import DocumentosPorSolicitante from './DocumentosPorSolicitante';
import { FLYER, panelSx } from './flyer';
import FormasPago from './FormasPago';
import JsonLdServicio from './JsonLdServicio';
import LugarAtencion from './LugarAtencion';
import PanelRequisitos from './PanelRequisitos';
import PasosTramite from './PasosTramite';
import RecuadroInformativo from './RecuadroInformativo';
import SolicitudFactura from './SolicitudFactura';
import TramiteTitulo from './TramiteTitulo';
import VerificacionPrevia from './VerificacionPrevia';

// Página completa de un trámite con el diseño autorizado por Comunicación Social (flyer).
// Cada ruta de /tramites/* solo elige el config (p. ej. CONSTANCIA_NO_ADEUDO);
// las secciones sin datos (factura, transferencia…) no se muestran.
export default function PaginaTramite({ tramite }: { tramite: TramiteConfig }) {
  return (
    <Box
      sx={{
        maxWidth: FLYER.anchoMaximo,
        mx: 'auto',
        py: 'clamp(0rem, 2vw, 1.5rem)',
        color: FLYER.texto,
        lineHeight: 1.5,
        '@media print': { '& *': { WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } },
      }}
    >
      <JsonLdServicio tramite={tramite} />

      <TramiteTitulo tramite={tramite} />

      {/* Panel guinda 1: requisitos y documentos */}
      <Box component="section" aria-labelledby="req-titulo" sx={panelSx}>
        <PanelRequisitos tramite={tramite} idTitulo="req-titulo" />
        <DocumentosPorSolicitante id={ANCLA_DOCUMENTOS} perfiles={tramite.perfiles} />
        {tramite.recuadroInformativo && <RecuadroInformativo recuadro={tramite.recuadroInformativo} />}
        {tramite.verificacionPrevia && <VerificacionPrevia texto={tramite.verificacionPrevia} />}
      </Box>

      <LugarAtencion id="lugar-atencion" oficina={tramite.oficina} />

      {/* Panel guinda 2: costo, pago, factura, pasos y contacto */}
      <Box component="section" aria-labelledby="pago-titulo" sx={panelSx}>
        <Typography id="pago-titulo" component="h2" sx={visuallyHidden}>
          Costo, vigencia y formas de pago
        </Typography>
        <CostoVigencia tramite={tramite} />
        <FormasPago transferencia={tramite.transferencia} ventanilla={tramite.ventanilla} />
        <SolicitudFactura factura={tramite.factura} />
        <PasosTramite pasos={tramite.pasos} />
        <ContactoTelefonos telefonos={tramite.oficina.telefonos} />
      </Box>

      <AvisoLegal texto={tramite.avisoLegal} />
    </Box>
  );
}
