import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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
