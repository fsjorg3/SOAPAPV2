// Preferencias de accesibilidad del visitante: tipos, valores por defecto y persistencia en localStorage.

export type TamanoTexto = 'pequeno' | 'normal' | 'grande';

export interface PreferenciasAccesibilidad {
  tamanoTexto: TamanoTexto;
  altoContraste: boolean;
  subrayarEnlaces: boolean;
  escalaGrises: boolean;
  invertirColores: boolean;
}

export type PreferenciaBooleana = Exclude<keyof PreferenciasAccesibilidad, 'tamanoTexto'>;

export const PREFERENCIAS_DEFECTO: PreferenciasAccesibilidad = {
  tamanoTexto: 'normal',
  altoContraste: false,
  subrayarEnlaces: false,
  escalaGrises: false,
  invertirColores: false,
};

// font-size del <html>: toda la tipografía está en rem, así que escala con este valor.
export const ESCALA_TEXTO: Record<TamanoTexto, string> = {
  pequeno: '87.5%',
  normal: '100%',
  grande: '125%',
};

const CLAVE_ALMACENAMIENTO = 'soapap-accesibilidad';

const esTamanoTexto = (valor: unknown): valor is TamanoTexto =>
  typeof valor === 'string' && valor in ESCALA_TEXTO;

// Lectura tolerante: cualquier campo ausente o inválido toma su valor por defecto.
export function leerPreferencias(): PreferenciasAccesibilidad {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_ALMACENAMIENTO) ?? '{}') as Record<string, unknown>;
    const booleano = (clave: PreferenciaBooleana) =>
      typeof guardado[clave] === 'boolean' ? (guardado[clave] as boolean) : PREFERENCIAS_DEFECTO[clave];
    return {
      tamanoTexto: esTamanoTexto(guardado.tamanoTexto) ? guardado.tamanoTexto : PREFERENCIAS_DEFECTO.tamanoTexto,
      altoContraste: booleano('altoContraste'),
      subrayarEnlaces: booleano('subrayarEnlaces'),
      escalaGrises: booleano('escalaGrises'),
      invertirColores: booleano('invertirColores'),
    };
  } catch {
    return PREFERENCIAS_DEFECTO;
  }
}

export function guardarPreferencias(preferencias: PreferenciasAccesibilidad) {
  try {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(preferencias));
  } catch {
    // Almacenamiento bloqueado (modo privado, cookies deshabilitadas): las preferencias duran solo la sesión.
  }
}
