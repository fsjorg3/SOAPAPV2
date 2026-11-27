import PaginaTramite from '../components/tramites/PaginaTramite';
import { CONSTANCIA_NO_ADEUDO } from '../config/tramites/constanciaNoAdeudo';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { seoMetadata } from '../config/seo-metadata';

export default function ConstanciaNoAdeudo() {
  useDocumentMeta(seoMetadata.constanciaNoAdeudo);
  return <PaginaTramite tramite={CONSTANCIA_NO_ADEUDO} />;
}
