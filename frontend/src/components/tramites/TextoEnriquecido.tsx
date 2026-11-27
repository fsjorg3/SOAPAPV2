import { Fragment } from 'react';

// Pinta un texto del config de trámites: **así** se vuelve <strong> y "\n" se vuelve <br>.
// Mantiene los datos sin JSX y conserva los énfasis de la redacción.
export default function TextoEnriquecido({ texto }: { texto: string }) {
  return (
    <>
      {texto.split('\n').map((linea, l) => (
        <Fragment key={l}>
          {l > 0 && <br />}
          {linea.split(/\*\*(.+?)\*\*/g).map((parte, i) =>
            i % 2 === 1 ? <strong key={i}>{parte}</strong> : <Fragment key={i}>{parte}</Fragment>,
          )}
        </Fragment>
      ))}
    </>
  );
}
