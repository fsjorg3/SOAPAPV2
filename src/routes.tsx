import { createBrowserRouter } from "react-router";
import App from "./App";
import LayoutPublico from "./layouts/LayoutPublico";
import Inicio from "./routes/inicio";
import Contacto from "./routes/contacto";

const Directorio = () => <div>Directorio Institucional</div>;
const QuienesSomos = () => <div>Quiénes Somos</div>;
const Recursos = () => <div>Recursos y Documentos</div>;
const Pagina404 = () => (
  <div style={{ textAlign: "center", padding: "40px 20px" }}>
    <h2>Error 404: Página no encontrada</h2>
    <p>El recurso al que intentas acceder no existe o fue movido.</p>
  </div>
);

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
          { path: "recursos", element: <Recursos /> },
          { path: "*", element: <Pagina404 /> },
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
