/* eslint-disable react-refresh/only-export-components -- este archivo define el router, no un componente; no aplica a Fast Refresh */
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";
import LayoutPublico from "./layouts/LayoutPublico";

const Inicio = lazy(() => import("./routes/inicio"));
const Contacto = lazy(() => import("./routes/contacto"));
const Directorio = lazy(() => import("./routes/directorio"));
const QuienesSomos = lazy(() => import("./routes/quienes-somos"));
const Normatividad = lazy(() => import("./routes/normatividad"));
const InformacionFinanciera = lazy(() => import("./routes/informacion-financiera"));
const Convocatorias = lazy(() => import("./routes/convocatorias"));
const Regularizate2026 = lazy(() => import("./routes/regularizate_2026"));
const RegularizacionDomestica = lazy(() => import("./routes/regularizacion-domestica"));
const Regularizacion2026 = lazy(() => import("./routes/regularizacion_2026"));
const Etica = lazy(() => import("./routes/etica"));

const Error404 = lazy(() => import("./routes/error-404"));

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
          { path: "comite_de_etica", element: <Etica /> },
          { path: "regularizate_2026", element: <Regularizate2026 /> },
          { path: "regularizacion_domestica", element: <RegularizacionDomestica /> },
          { path: "regularizacion_2026", element: <Regularizacion2026 /> },
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
