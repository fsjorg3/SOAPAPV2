// Minimal synthetic PDF with a visible frame and distinct corner marks.
export function makePdf(pages) {
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${3 + i * 2} 0 R`).join(' ')}] >>`];
  pages.forEach(({ width, height, rotate = 0 }) => {
    const pageId = objects.length + 1;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Rotate ${rotate} /Resources << >> /Contents ${pageId + 1} 0 R >>`);
    const content = `0 0 1 RG 2 w 2 2 ${width - 4} ${height - 4} re S
1 0 0 rg 4 4 20 20 re f
0 1 0 rg ${width - 24} 4 20 20 re f
0 0 1 rg 4 ${height - 24} 20 20 re f
0 0 0 rg ${width - 24} ${height - 24} 20 20 re f\n`;
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}endstream`);
  });
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('');
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return new TextEncoder().encode(pdf);
}
export const mixedPages = [
  { width: 612, height: 792 },
  { width: 792, height: 612 },
  { width: 595, height: 842 },
  { width: 612, height: 1008 },
  { width: 612, height: 792, rotate: 90 },
];

