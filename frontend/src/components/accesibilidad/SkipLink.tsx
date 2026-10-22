import { Link } from '@mui/material';

// Enlace oculto fuera de pantalla que aparece al recibir foco con el teclado (primer Tab de la página).
// Su destino es el id del <main> de LayoutPublico.
export default function SkipLink() {
  return (
    <Link
      href="#contenido-principal"
      sx={(theme) => ({
        position: 'absolute',
        left: -9999,
        top: 8,
        zIndex: theme.zIndex.appBar + 2,
        px: 2,
        py: 1,
        borderRadius: 1,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        '&:focus': { left: 8 },
        '&:visited, &:hover': { color: 'primary.contrastText' },
      })}
    >
      Saltar al contenido principal
    </Link>
  );
}
