import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import ReactPlayer from "react-player";

import cuidar_agua from "../../assets/watter-culture/cuidar_agua.webp";
import ciclo_agua from "../../assets/watter-culture/ciclo_agua.webp";
import consumo_responsable from "../../assets/watter-culture/consumo_responsable.webp";
import importancia_agua from "../../assets/watter-culture/importancia_agua.webp";


export interface WaterCultureCard {
  id: number;
  img: string; // En Vite/Webpack las importaciones de imágenes se resuelven como cadenas de texto (rutas)
  title: string;
  description: string;
  src: string;
}

const cards: WaterCultureCard[] = [
  {
    id: 1,
    img: cuidar_agua,
    title: "¿Por qué hay que cuidar el agua?",
    description: "El agua dulce disponible es mínima. Debemos optimizar su uso y reducir el desperdicio urbano mediante acciones diarias, garantizando así este recurso vital del futuro.",
    src: 'https://www.youtube.com/watch?v=4slOW0tgDjs'
  },
  {
    id: 2,
    img: ciclo_agua,
    title: "Ciclo del agua",
    description: "Conoce de forma práctica el ciclo continuo del agua (evaporación, condensación, precipitación e infiltración) y sus estados, conocimiento clave para su gestión futura.",
    src: 'https://www.youtube.com/watch?v=9LVXk0sFauM'
  },
  {
    id: 3,
    img: consumo_responsable,
    title: "Consumo responsable del agua",
    description: "Mediante ejemplos prácticos y familiares, conoce estrategias vitales para ahorrar agua hoy, motivándonos a liderar acciones responsables que aseguren un futuro altamente sostenible.",
    src: 'https://www.youtube.com/watch?v=V5jd2oR_qIQ'
  },
  {
    id: 4,
    img: importancia_agua,
    title: "Reflexionar sobre la Importancia del Agua",
    description: "Conoce estrategias prácticas para evitar el desperdicio diario de agua y adéntrate en el fascinante ciclo hidrológico, impulsando acciones eficientes para garantizar nuestro futuro sostenible.",
    src: 'https://www.youtube.com/watch?v=8QU2F5-GBRk'
  }
];

function WaterCultureOptions() {
  const [selectedCard, setSelectedCard] = React.useState(cards[0]);

  // 1. Instanciamos la referencia para el contenedor del video
  const videoSectionRef = React.useRef<HTMLDivElement>(null);

  // 2. Creamos un manejador unificado para el clic
  const handleCardSelection = (card: WaterCultureCard) => {
    setSelectedCard(card);

    // Si la referencia existe en el DOM, ejecutamos el scroll suave.
    // En escritorio, como el elemento ya está a la vista, el navegador ignorará el salto de forma inteligente.
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        width: '100%',
        alignItems: 'stretch'
      }}
    >

      {/* PANEL IZQUIERDO: Tarjetas de Opciones */}
      <Card
        sx={{
          width: { xs: "100%", md: "40%", lg: "35%" },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          boxShadow: 2
        }}
      >
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Temas de interes
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </CardContent>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            minHeight: 0,
            p: 2,
            pt: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: 2,
            alignContent: 'start'
          }}
        >
          {cards.map((card) => (
            <Card
              variant={selectedCard.id === card.id ? "standard" : "outlined"}
              key={card.id}
              sx={{ display: "flex", bgcolor: 'background.paper' }}
            >
              <CardActionArea
                // 3. Reemplazamos la función anónima por nuestro manejador personalizado
                onClick={() => handleCardSelection(card)}
                sx={{ height: "100%", transition: 'all 0.2s' }}
              >
                <CardContent
                  sx={{
                    height: "100%", display: "flex", flexDirection: "column",
                    justifyContent: "flex-start", alignItems: "center",
                    textAlign: "center", p: 1.5,
                  }}
                >
                  <Box
                    component="img"
                    src={card.img}
                    alt={card.title}
                    sx={{ display: "block", height: 60, width: 60, mb: 1, objectFit: 'contain' }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'medium', lineHeight: 1.2 }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Card>

      {/* PANEL DERECHO: Video Principal */}
      <Card
        variant="outstanding"
        // 4. Anclamos la referencia al componente padre de la sección del video
        ref={videoSectionRef}
        sx={{
          width: { xs: '100%', md: '60%', lg: '65%' },
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          // Opcional: Agregar scroll-margin-top para que al hacer el salto, 
          // el componente no quede completamente pegado al borde superior de la pantalla
          scrollMarginTop: '24px'
        }}
      >
        <CardContent sx={{ pb: 2 }}>
          <Typography variant="overline" color="primary" sx={{ display: 'block', lineHeight: 1.2, mb: 0.5, fontWeight: "bold" }}>
            {selectedCard.title}
          </Typography>
          <Typography variant="body1" component="h2" color="text.secondary">
            {selectedCard.description}
          </Typography>
        </CardContent>

        <Box
          sx={{
            width: '100%',
            aspectRatio: "16/9",
            position: "relative",
            bgcolor: "black",
            mt: 'auto',
            borderRadius: '8px'

          }}
        >
          <ReactPlayer
            src={selectedCard.src}
            controls={true}
            width="100%"
            height="100%"
            config={{
              youtube: {
                //playerVars: { origin: window.location.origin }
              }
            }}
            style={{ borderRadius: '8px' }}
          />
        </Box>
      </Card>

    </Box>
  );
}

export default WaterCultureOptions;