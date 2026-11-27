import { Box, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { PagoTransferencia, PagoVentanilla } from '../../config/tramites/tipos';
import { soloDigitos } from '../../utils/tramites';
import BotonCopiar from './BotonCopiar';
import { encabezadoTarjetaSx, FLYER, notaSx, subtituloSx, tarjetaSx } from './flyer';
import TextoEnriquecido from './TextoEnriquecido';

interface FormasPagoProps {
  transferencia?: PagoTransferencia;
  ventanilla?: PagoVentanilla;
}

interface FilaProps {
  etiqueta: string;
  valor: string;
  // Números de cuenta: sin cortes de línea.
  numerico?: boolean;
  copiar?: { valor: string; descripcion: string };
}

// Fila de dato con línea punteada (.fila del flyer).
function Fila({ etiqueta, valor, numerico = false, copiar }: FilaProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '.5rem',
        py: '.35rem',
        '& + &': { borderTop: `1px dashed ${FLYER.lineaPunteada}` },
      }}
    >
      <Typography component="span" sx={{ fontSize: '.95rem', lineHeight: 1.5 }}>
        <Box component="b" sx={{ color: FLYER.guindaTexto, fontWeight: 800, mr: '.3rem' }}>
          {etiqueta}:
        </Box>
        <Box
          component={numerico ? 'code' : 'span'}
          sx={numerico ? { fontFamily: 'inherit', fontWeight: 600, fontSize: '1rem', letterSpacing: '.02em', whiteSpace: 'nowrap' } : { fontWeight: 600 }}
        >
          {valor}
        </Box>
      </Typography>
      {copiar && <BotonCopiar valor={copiar.valor} descripcion={copiar.descripcion} />}
    </Box>
  );
}

// Tarjetas blancas "Transferencia o depósito en banco" y "En ventanilla".
export default function FormasPago({ transferencia, ventanilla }: FormasPagoProps) {
  if (!transferencia && !ventanilla) return null;

  return (
    <>
      <Typography component="h3" sx={subtituloSx}>
        Formas de pago
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: transferencia && ventanilla ? '1fr 1fr' : '1fr',
          gap: '1rem',
          mt: '1.6rem',
          '@media (max-width:720px)': { gridTemplateColumns: '1fr' },
        }}
      >
        {transferencia && (
          <Box component="article" sx={tarjetaSx}>
            <Typography component="h4" sx={encabezadoTarjetaSx}>
              <AccountBalanceIcon aria-hidden="true" />
              Transferencia o depósito en banco
            </Typography>
            <Fila etiqueta="Banco" valor={transferencia.cuenta.banco} />
            <Fila etiqueta="Beneficiario" valor={transferencia.cuenta.beneficiario} />
            <Fila
              etiqueta="Cuenta"
              valor={transferencia.cuenta.cuenta}
              numerico
              copiar={{ valor: soloDigitos(transferencia.cuenta.cuenta), descripcion: 'número de cuenta' }}
            />
            <Fila
              etiqueta="CLABE"
              valor={transferencia.cuenta.clabe}
              numerico
              copiar={{ valor: soloDigitos(transferencia.cuenta.clabe), descripcion: 'CLABE interbancaria' }}
            />
            <Fila
              etiqueta="Concepto"
              valor={transferencia.concepto}
              copiar={{ valor: transferencia.concepto, descripcion: 'concepto de pago' }}
            />
            <Typography component="p" sx={notaSx}>
              <TextoEnriquecido texto={transferencia.nota} />
            </Typography>
          </Box>
        )}

        {ventanilla && (
          <Box component="article" sx={tarjetaSx}>
            <Typography component="h4" sx={encabezadoTarjetaSx}>
              <CreditCardIcon aria-hidden="true" />
              En ventanilla
            </Typography>
            <Typography component="p" sx={{ m: 0, mt: '.2rem', fontSize: '.95rem', lineHeight: 1.5 }}>
              <TextoEnriquecido texto={ventanilla.descripcion} />
            </Typography>
            <Typography component="p" sx={notaSx}>
              <TextoEnriquecido texto={ventanilla.nota} />
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
