// Trámites que aparecen como tarjetas en la sección "Trámites" de inicio, en este orden.
// Para agregar otro trámite al inicio basta con sumarlo a la lista.
import { CONSTANCIA_NO_ADEUDO } from './constanciaNoAdeudo.ts';
import { CONSTANCIA_PREDIO_NO_REGISTRADO } from './constanciaPredioNoRegistrado.ts';
import type { TramiteConfig } from './tipos.ts';

export const TRAMITES_INICIO: TramiteConfig[] = [CONSTANCIA_NO_ADEUDO, CONSTANCIA_PREDIO_NO_REGISTRADO];
