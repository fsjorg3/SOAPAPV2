import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ConfigSitio } from '../../config/sitio-config';
import { guardarPreferencias, leerPreferencias, PREFERENCIAS_DEFECTO } from './preferencias';
import type { PreferenciasAccesibilidad } from './preferencias';
import { AccesibilidadContext } from './useAccesibilidad';

interface AccesibilidadProviderProps {
  configSitio: ConfigSitio;
  children: ReactNode;
}

// Estado global de las opciones de accesibilidad. La lectura de localStorage es síncrona en el
// estado inicial, así que el primer render ya sale con las preferencias del visitante (sin parpadeo).
export default function AccesibilidadProvider({ configSitio, children }: AccesibilidadProviderProps) {
  const [preferencias, setPreferencias] = useState<PreferenciasAccesibilidad>(leerPreferencias);

  const cambiarPreferencias = (nuevas: PreferenciasAccesibilidad) => {
    setPreferencias(nuevas);
    guardarPreferencias(nuevas);
  };

  const valor = {
    preferencias,
    actualizar: <K extends keyof PreferenciasAccesibilidad>(clave: K, valorNuevo: PreferenciasAccesibilidad[K]) =>
      cambiarPreferencias({ ...preferencias, [clave]: valorNuevo }),
    restablecer: () => cambiarPreferencias(PREFERENCIAS_DEFECTO),
    vedaElectoral: configSitio.vedaElectoral,
    escalaGrisesEfectiva: configSitio.vedaElectoral || preferencias.escalaGrises,
  };

  return <AccesibilidadContext.Provider value={valor}>{children}</AccesibilidadContext.Provider>;
}
