import useSWR from 'swr';
import { fetcherV1 } from '../lib/api';
import type { Respuesta } from '../types/api';
import type { DatosConvocatorias } from '../types/convocatorias';

export function useConvocatorias() {
  const { data, error, isLoading } = useSWR<Respuesta<DatosConvocatorias>>('api/v1/convocatorias', fetcherV1);
  return { convocatorias: data?.data.convocatorias ?? [], error, isLoading };
}
