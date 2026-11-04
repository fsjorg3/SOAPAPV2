import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PASOS } from '../../config/permisoDescarga';
import TituloSeccion from './TituloSeccion';
import { ALTO_NAVBAR } from './estilos';

export default function PasoAPaso() {
  const [activo, setActivo] = useState(0);
  const pasosRef = useRef<(HTMLElement | null)[]>([]);

  // El paso activo es el que cruza una línea al 45 % del alto de la ventana.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setActivo(Number((entrada.target as HTMLElement).dataset.paso));
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    );
    pasosRef.current.forEach((paso) => paso && observador.observe(paso));
    return () => observador.disconnect();
  }, []);

  return (
    <Box component="section" aria-labelledby="pd-pasos" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 6 }, py: { xs: 2, md: 6 } }}>
      <TituloSeccion id="pd-pasos" antetitulo="05 · El trámite de hoy" titulo="Siete pasos, de la ventanilla a tu permiso." sx={{ maxWidth: 900 }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 }, alignItems: 'start' }}>
        {/* Índice fijo, solo en escritorio: los pasos ya llevan su número en móvil. */}
        <Box aria-hidden="true" sx={{ display: { xs: 'none', md: 'flex' }, position: 'sticky', top: ALTO_NAVBAR.md + 16, flexDirection: 'column', gap: 3.5 }}>
          <Typography
            sx={{
              fontSize: 'clamp(7rem, 15vw, 15rem)', lineHeight: 0.85, fontWeight: 800, letterSpacing: '-0.05em',
              color: 'background.default', WebkitTextStroke: '2px', WebkitTextStrokeColor: (t) => t.palette.primary.main,
            }}
          >
            0{activo + 1}
          </Typography>
          <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {PASOS.map((paso, i) => {
              const estado = i === activo ? 'activo' : i < activo ? 'hecho' : 'pendiente';
              return (
                <Box component="li" key={paso.etiqueta} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '0.875rem', fontWeight: estado === 'activo' ? 700 : 600, color: estado === 'activo' ? 'primary.main' : 'text.secondary' }}>
                  <Box
                    sx={{
                      width: 10, height: 10, borderRadius: '50%', border: 2, flex: 'none',
                      borderColor: estado === 'activo' ? 'secondary.main' : estado === 'hecho' ? 'primary.main' : 'grey.400',
                      bgcolor: estado === 'activo' ? 'secondary.main' : estado === 'hecho' ? 'primary.main' : 'background.paper',
                    }}
                  />
                  {paso.etiqueta}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, borderBottom: 1, borderColor: 'divider' }}>
          {PASOS.map((paso, i) => (
            <Box
              component="li"
              key={paso.etiqueta}
              ref={(el: HTMLElement | null) => { pasosRef.current[i] = el; }}
              data-paso={i}
              sx={{
                display: 'flex', flexDirection: 'column', gap: 1.75, justifyContent: 'center',
                minHeight: { xs: 0, md: '62vh' }, py: 4, borderTop: 1, borderColor: 'divider',
                color: { xs: 'text.primary', md: i === activo ? 'text.primary' : 'text.secondary' },
                transition: 'color .35s ease',
              }}
            >
              <Typography component="p" sx={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.02em', color: 'primary.light' }}>Paso {i + 1}</Typography>
              <Typography component="h3" sx={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 700, color: 'primary.main' }}>
                {paso.titulo}
              </Typography>
              <Typography>{paso.descripcion}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
