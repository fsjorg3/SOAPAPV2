import useSWR from 'swr';
import { fetcherV1 } from '../lib/api';
import type { Respuesta } from '../types/api';
import type { DatosNormatividad, DatosTitulo } from '../types/normatividad';

export function useNormatividad() {
  const { data, error, isLoading } = useSWR<Respuesta<DatosNormatividad>>('api/v1/normatividad/secciones', fetcherV1);
  return { secciones: data?.data.secciones ?? [], error, isLoading };
}

export function useTituloConcesion() {
  const { data, error, isLoading } = useSWR<Respuesta<DatosTitulo>>('api/v1/normatividad/titulo-concesion', fetcherV1);
  return { grupos: data?.data.grupos ?? [], error, isLoading };
}
