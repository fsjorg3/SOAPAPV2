// Configuración del sitio que se lee en tiempo de ejecución desde public/sitio-config.json.
// Se edita directamente en el servidor (dist/sitio-config.json) sin recompilar; aplica al recargar la página.
//   vedaElectoral: true  → el sitio se muestra en escala de grises de forma obligatoria (periodo de veda).
export interface ConfigSitio {
  vedaElectoral: boolean;
}

export const CONFIG_SITIO_DEFECTO: ConfigSitio = { vedaElectoral: false };

// Nunca lanza: si el archivo no existe o es inválido, el sitio carga con los valores por defecto.
export async function cargarConfigSitio(): Promise<ConfigSitio> {
  try {
    const respuesta = await fetch(`${import.meta.env.BASE_URL}sitio-config.json`, { cache: 'no-store' });
    if (!respuesta.ok) return CONFIG_SITIO_DEFECTO;
    const datos: unknown = await respuesta.json();
    const veda = (datos as Partial<ConfigSitio> | null)?.vedaElectoral;
    return { vedaElectoral: typeof veda === 'boolean' ? veda : CONFIG_SITIO_DEFECTO.vedaElectoral };
  } catch {
    return CONFIG_SITIO_DEFECTO;
  }
}
