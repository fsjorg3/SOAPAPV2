import { createBrowserRouter } from "react-router";
import App from "./App";
import LayoutPublico from "./layouts/LayoutPublico";
import Inicio from "./routes/inicio";
import Contacto from "./routes/contacto";
import Directorio from "./routes/directorio";
import QuienesSomos from "./routes/quienes-somos";
import Normatividad from "./routes/normatividad";
import InformacionFinanciera from "./routes/informacion-financiera";
import Convocatorias from "./routes/convocatorias";
import Regularizate2026 from "./routes/regularizate_2026";
import RegularizacionDomestica from "./routes/regularizacion-domestica";

import Error404 from "./routes/error-404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LayoutPublico />,
        children: [
          { index: true, element: <Inicio /> },
          { path: "contacto", element: <Contacto /> },
          { path: "directorio", element: <Directorio /> },
          { path: "quienes-somos", element: <QuienesSomos /> },
          { path: "normatividad", element: <Normatividad /> },
          { path: "informacion-financiera", element: <InformacionFinanciera /> },
          { path: "convocatorias", element: <Convocatorias /> },
          //{ path: "comite_de_etica", element: "Etica"},//<etica/> },
          { path: "regularizate_2026", element: <Regularizate2026 /> },
          { path: "regularizacion_domestica", element: <RegularizacionDomestica /> },
          { path: "*", element: <Error404 /> },
        ],
      },
      {
        path: "dashboard", //proximamente
        element: <></>,
        children: [
          // { index: true, element: <Dashboard /> }
        ],
      },
    ],
  },
]);
