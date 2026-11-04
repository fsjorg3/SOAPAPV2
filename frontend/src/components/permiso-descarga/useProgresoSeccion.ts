import { useScroll } from 'motion/react';
import type { RefObject } from 'react';

// Progreso de 0 a 1 mientras la sección recorre la ventana: 0 cuando su borde superior llega arriba,
// 1 cuando su borde inferior llega abajo. Es un MotionValue: no provoca renders al hacer scroll.
export function useProgresoSeccion(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return scrollYProgress;
}
