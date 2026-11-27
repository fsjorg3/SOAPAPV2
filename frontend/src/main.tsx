import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fuentes del sitio (archivos propios, sin Google Fonts). Montserrat es la fuente del tema;
// Raleway se usa en subtítulos de las páginas de trámites (diseño de Comunicación Social).
// Cada CSS declara unicode-range: el navegador solo descarga los subconjuntos que necesita.
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/800.css'
import '@fontsource/montserrat/900.css'
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'

import {router} from './routes.tsx'
import { RouterProvider } from 'react-router'
import AccesibilidadProvider from './components/accesibilidad/AccesibilidadContext'
import { cargarConfigSitio } from './config/sitio-config'

// La configuración del sitio (veda electoral) se lee antes del primer render para que
// la escala de grises obligatoria se aplique desde el primer pintado.
const configSitio = await cargarConfigSitio();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccesibilidadProvider configSitio={configSitio}>
      <RouterProvider router={router} />
    </AccesibilidadProvider>
  </StrictMode>,
)
