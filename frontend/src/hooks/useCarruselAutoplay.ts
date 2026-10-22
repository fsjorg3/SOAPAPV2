import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

// Estado y control del plugin Autoplay de un carrusel embla, para el botón Pausar/Reanudar (WCAG 2.2.2).
// Se sincroniza con los eventos del plugin: si el carrusel se detiene por interacción, el botón lo refleja.
// `disponible` es false cuando hay una sola posición (el plugin no arranca y el botón no debe mostrarse).
export function useCarruselAutoplay(emblaApi: EmblaCarouselType | undefined) {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [disponible, setDisponible] = useState(false);

  useEffect(() => {
    const autoplay = emblaApi?.plugins().autoplay;
    if (!emblaApi || !autoplay) return;

    const sincronizar = () => {
      setReproduciendo(autoplay.isPlaying());
      setDisponible(emblaApi.scrollSnapList().length > 1);
    };
    // El plugin emite play/stop ANTES de actualizar isPlaying(), así que el estado se toma del evento.
    // timerset se emite en cada ciclo: corrige el estado si el autoplay arrancó antes de suscribirse.
    const alReproducir = () => setReproduciendo(true);
    const alDetener = () => setReproduciendo(false);

    sincronizar();
    emblaApi
      .on('autoplay:play', alReproducir)
      .on('autoplay:timerset', alReproducir)
      .on('autoplay:stop', alDetener)
      .on('reInit', sincronizar);
    return () => {
      emblaApi
        .off('autoplay:play', alReproducir)
        .off('autoplay:timerset', alReproducir)
        .off('autoplay:stop', alDetener)
        .off('reInit', sincronizar);
    };
  }, [emblaApi]);

  const alternar = useCallback(() => {
    const autoplay = emblaApi?.plugins().autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
  }, [emblaApi]);

  return { reproduciendo, disponible, alternar };
}
