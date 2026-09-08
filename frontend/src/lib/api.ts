import type { Problema } from '../types/api';

const RAIZ_API = import.meta.env.VITE_API_URL;

export function apiUrl(path: string): string {
  const sinBarraInicial = path.startsWith('/') ? path.slice(1) : path;
  return `${RAIZ_API}${sinBarraInicial}`;
}

export class ErrorApi extends Error {
  status?: number;
  codigo?: string;

  constructor(message: string, status?: number, codigo?: string) {
    super(message);
    this.name = 'ErrorApi';
    this.status = status;
    this.codigo = codigo;
  }
}

export async function fetcherV1<T>(path: string): Promise<T> {
  const response = await fetch(apiUrl(path));

  if (!response.ok) {
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/problem+json')) {
      const problema = (await response.json()) as Problema;
      throw new ErrorApi(problema.detail ?? problema.title, problema.status, problema.codigo);
    }
    throw new ErrorApi(`Error ${response.status} al consultar ${path}`, response.status);
  }

  return response.json() as Promise<T>;
}
