import { useEffect, useRef, useState } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { FLYER } from './flyer';

interface BotonCopiarProps {
  valor: string;
  // Qué se copia, para el lector de pantalla: "número de cuenta", "CLABE"…
  descripcion: string;
}

async function copiarAlPortapapeles(valor: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(valor);
      return true;
    } catch {
      // Sigue al método alterno.
    }
  }
  try {
    const area = document.createElement('textarea');
    area.value = valor;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

// Botón píldora "Copiar" del flyer (.copiar); al copiar se rellena de guinda.
export default function BotonCopiar({ valor, descripcion }: BotonCopiarProps) {
  const [copiado, setCopiado] = useState(false);
  const temporizador = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(temporizador.current), []);

  const copiar = async () => {
    if (!(await copiarAlPortapapeles(valor))) return;
    setCopiado(true);
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setCopiado(false), 1800);
  };

  return (
    <>
      <ButtonBase
        onClick={copiar}
        aria-label={`Copiar ${descripcion}`}
        sx={{
          flex: '0 0 auto',
          fontFamily: 'inherit',
          fontSize: '.8rem',
          fontWeight: 700,
          lineHeight: 1.5,
          border: `1.5px solid ${FLYER.guinda}`,
          borderRadius: '999px',
          px: '.7rem',
          py: '.3rem',
          color: copiado ? FLYER.blanco : FLYER.guinda,
          backgroundColor: copiado ? FLYER.guinda : 'transparent',
          '&:hover': { backgroundColor: copiado ? FLYER.guinda : FLYER.duraznoSuave },
          '@media print': { display: 'none' },
        }}
      >
        {copiado ? '¡Copiado!' : 'Copiar'}
      </ButtonBase>
      {/* Región viva aparte: el aria-label del botón no se anuncia al cambiar. */}
      <Box component="span" role="status" sx={visuallyHidden}>
        {copiado ? `Copiado al portapapeles: ${descripcion}` : ''}
      </Box>
    </>
  );
}
