import type { TramiteConfig } from '../../config/tramites/tipos';
import { construirJsonLd } from '../../utils/tramites';

// Datos estructurados schema.org del trámite. El precio sale de tramite.costo.
// JSON.stringify no escapa "<": se reemplaza para que un texto no pueda cerrar la etiqueta <script>.
export default function JsonLdServicio({ tramite }: { tramite: TramiteConfig }) {
  const json = JSON.stringify(construirJsonLd(tramite)).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
