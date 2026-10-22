import useSWR from 'swr';
import { fetcherV1 } from '../lib/api';
import type { Respuesta } from '../types/api';
import type { Ejercicio, DatosSecciones, DatosDetalleSeccion } from '../types/transparencia';

export function useEjercicios() {
  const { data, error, isLoading } = useSWR<Respuesta<Ejercicio[]>>(
    'api/v1/transparencia/ejercicios',
    fetcherV1
  );
  return { ejercicios: data?.data ?? [], error, isLoading };
}

export function useSecciones(ejercicio: number | null) {
  const { data, error, isLoading } = useSWR<Respuesta<DatosSecciones>>(
    ejercicio != null ? `api/v1/transparencia/ejercicios/${ejercicio}/secciones` : null,
    fetcherV1
  );
  return { secciones: data?.data.secciones ?? [], error, isLoading };
}

export function useDetalleSeccion(ejercicio: number | null, seccionId: string | null) {
  const { data, error, isLoading } = useSWR<Respuesta<DatosDetalleSeccion>>(
    ejercicio != null && seccionId
      ? `api/v1/transparencia/ejercicios/${ejercicio}/secciones/${encodeURIComponent(seccionId)}`
      : null,
    fetcherV1
  );
  return { detalle: data?.data ?? null, error, isLoading };
}
