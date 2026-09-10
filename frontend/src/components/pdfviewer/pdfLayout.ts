import type { PDFDocumentProxy } from 'pdfjs-dist';

export interface PageSize {
  width: number;
  height: number;
}

export const PAGE_MARGIN = 32;

export async function measurePages(pdf: Pick<PDFDocumentProxy, 'numPages' | 'getPage'>, signal: AbortSignal): Promise<PageSize[]> {
  const sizes = new Array<PageSize>(pdf.numPages);
  let nextIndex = 0;
  let failed = false;
  async function worker() {
    while (nextIndex < pdf.numPages && !failed) {
      signal.throwIfAborted();
      const index = nextIndex++;
      try {
        const page = await pdf.getPage(index + 1);
        signal.throwIfAborted();
        const { width, height } = page.getViewport({ scale: 1 });
        if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
          throw new Error(`Dimensiones inválidas en la página ${index + 1}`);
        }
        sizes[index] = { width, height };
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(4, pdf.numPages) }, () => worker()));
  signal.throwIfAborted();
  return sizes;
}

export function pageRowHeight(index: number, { pageSizes, scale }: { pageSizes: PageSize[]; scale: number }) {
  return pageSizes[index].height * scale + PAGE_MARGIN
    + (index === 0 ? PAGE_MARGIN : 0)
    + (index === pageSizes.length - 1 ? PAGE_MARGIN * 3 : 0);
}

export function widestPage(pageSizes: PageSize[]) {
  return pageSizes.reduce((width, page) => Math.max(width, page.width), 0);
}
