// Mapa interactivo con Leaflet + teselas de OpenStreetMap.
// Cárgalo con React.lazy (ver MapaUbicacionDiferido): así Leaflet y su CSS solo se descargan en las páginas que lo usan.
import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { divIcon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export interface MarcadorMapa {
  lat: number;
  lng: number;
  titulo: string;
  descripcion?: string;
}

export interface MapaUbicacionProps {
  marcadores: MarcadorMapa[];
  // Centro del mapa; por defecto, el primer marcador.
  centro?: { lat: number; lng: number };
  zoom?: number;
  // Descripción del mapa para lectores de pantalla.
  etiqueta: string;
}

// Pin SVG con divIcon: evita el icono por defecto de Leaflet, cuyas rutas a PNG se rompen al empaquetar con Vite.
function crearPin(color: string) {
  return divIcon({
    className: '',
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48" aria-hidden="true">
      <path d="M18 1C8.6 1 1 8.6 1 18c0 12.4 17 29 17 29s17-16.6 17-29C35 8.6 27.4 1 18 1z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="18" cy="18" r="6.5" fill="#FFFFFF"/>
    </svg>`,
    iconSize: [36, 48],
    iconAnchor: [18, 47],
    popupAnchor: [0, -42],
  });
}

export default function MapaUbicacion({ marcadores, centro, zoom = 16, etiqueta }: MapaUbicacionProps) {
  const theme = useTheme();
  const pin = useMemo(() => crearPin(theme.palette.primary.main), [theme.palette.primary.main]);
  const inicio = centro ?? marcadores[0];

  if (!inicio) return null;

  return (
    <Box
      role="region"
      aria-label={etiqueta}
      sx={{
        height: '100%',
        width: '100%',
        // Leaflet usa z-index altos; se aíslan para que el mapa no quede encima de la navbar fija.
        isolation: 'isolate',
        '& .leaflet-container': { height: '100%', width: '100%', fontFamily: 'inherit' },
        '& .leaflet-popup-content': { margin: '10px 14px', fontSize: '0.875rem' },
      }}
    >
      <MapContainer
        center={[inicio.lat, inicio.lng]}
        zoom={zoom}
        // No captura la rueda del mouse al hacer scroll por la página.
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marcadores.map((m) => (
          <Marker key={`${m.lat},${m.lng}`} position={[m.lat, m.lng]} icon={pin} title={m.titulo} alt={m.titulo}>
            <Popup>
              <strong>{m.titulo}</strong>
              {m.descripcion && (
                <>
                  <br />
                  {m.descripcion}
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
