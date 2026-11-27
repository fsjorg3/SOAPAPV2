import PaginaTramite from '../components/tramites/PaginaTramite';
import { CONSTANCIA_PREDIO_NO_REGISTRADO } from '../config/tramites/constanciaPredioNoRegistrado';
import { seoMetadata } from '../config/seo-metadata';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function ConstanciaPredioNoRegistrado() {
  useDocumentMeta(seoMetadata.constanciaPredioNoRegistrado);
  return <PaginaTramite tramite={CONSTANCIA_PREDIO_NO_REGISTRADO} />;
}
