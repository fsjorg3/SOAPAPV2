import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { PdfViewer } from '../../src/components/pdfviewer/PdfViewer';
import { makePdf, mixedPages } from './fixture.mjs';

const documents = {
  mixed: mixedPages,
  landscapeFirst: [...mixedPages].reverse(),
  single: [mixedPages[0]],
  long: Array.from({ length: 50 }, (_, index) => index === 1 ? mixedPages[1] : mixedPages[0]),
};
const urls = Object.fromEntries(Object.entries(documents).map(([name, pages]) => [
  name, URL.createObjectURL(new Blob([makePdf(pages)], { type: 'application/pdf' })),
]));
export function Check() {
  const [name, setName] = useState('mixed');
  const [open, setOpen] = useState(false);
  return <>
    <CssBaseline />
    <label>Documento <select value={name} onChange={event => setName(event.target.value)}>
      {Object.keys(documents).map(key => <option key={key}>{key}</option>)}
    </select></label>
    <button onClick={() => setOpen(true)}>Abrir PDF de prueba</button>
    <PdfViewer pdfUrl={urls[name]} open={open} onClose={() => setOpen(false)} />
  </>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><Check /></StrictMode>);
