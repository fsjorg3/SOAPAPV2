import { createContext, useContext } from 'react';
import type { PreferenciasAccesibilidad } from './preferencias';

export interface ValorAccesibilidad {
  preferencias: PreferenciasAccesibilidad;
  actualizar: <K extends keyof PreferenciasAccesibilidad>(clave: K, valor: PreferenciasAccesibilidad[K]) => void;
  restablecer: () => void;
  // true cuando sitio-config.json activa la veda electoral: la escala de grises es obligatoria.
  vedaElectoral: boolean;
  // Escala de grises que realmente se aplica (preferencia del visitante o veda).
  escalaGrisesEfectiva: boolean;
}

export const AccesibilidadContext = createContext<ValorAccesibilidad | null>(null);

export function useAccesibilidad(): ValorAccesibilidad {
  const valor = useContext(AccesibilidadContext);
  if (!valor) throw new Error('useAccesibilidad debe usarse dentro de <AccesibilidadProvider>');
  return valor;
}
