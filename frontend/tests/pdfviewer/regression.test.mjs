import test from 'node:test';
import assert from 'node:assert/strict';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { measurePages, pageRowHeight, widestPage } from '../../src/components/pdfviewer/pdfLayout.ts';
import { makePdf, mixedPages } from './fixture.mjs';

test('real PDF: mixed sizes, portrait/landscape first, rotation and single page', async () => {
  for (const pages of [mixedPages, [...mixedPages].reverse(), [mixedPages[0]]]) {
    const task = getDocument({ data: makePdf(pages) });
    try {
      const pdf = await task.promise;
      const sizes = await measurePages(pdf, new AbortController().signal);
      const expected = pages.map(({ width, height, rotate }) => rotate === 90 ? { width: height, height: width } : { width, height });
      assert.deepEqual(sizes, expected);
      for (const scale of [0.25, 1, 3]) {
        const heights = sizes.map((_, index) => pageRowHeight(index, { pageSizes: sizes, scale }));
        assert.equal(heights.reduce((a, b) => a + b, 0), sizes.reduce((sum, page) => sum + page.height * scale, 0) + 32 * sizes.length + 128);
        assert.equal(widestPage(sizes), Math.max(...expected.map(page => page.width)));
      }
    } finally {
      await task.destroy();
    }
  }
});

test('long document: at most four reads, preserving order despite completion order', async () => {
  let active = 0;
  let peak = 0;
  const pdf = { numPages: 50, async getPage(number) {
    active++;
    peak = Math.max(peak, active);
    await new Promise(resolve => setTimeout(resolve, number % 4));
    active--;
    return { getViewport: () => ({ width: number * 10, height: number * 20 }) };
  } };
  const sizes = await measurePages(pdf, new AbortController().signal);
  assert.equal(peak, 4);
  assert.deepEqual(sizes.map(page => page.width), Array.from({ length: 50 }, (_, i) => (i + 1) * 10));
});

test('invalid dimensions and read errors reject preparation without fallback', async () => {
  for (const width of [0, -1, NaN, Infinity]) {
    await assert.rejects(measurePages({ numPages: 1, getPage: async () => ({
      getViewport: () => ({ width, height: 792 }),
    }) }, new AbortController().signal), /Dimensiones inválidas/);
  }
  await assert.rejects(measurePages({ numPages: 1, getPage: async () => { throw new Error('read failed'); } },
    new AbortController().signal), /read failed/);
});

test('discarded preparation stops scheduling and rejects stale results', async () => {
  const controller = new AbortController();
  const releases = [];
  let calls = 0;
  const pending = measurePages({ numPages: 50, getPage: () => {
    calls++;
    return new Promise(resolve => releases.push(resolve));
  } }, controller.signal);
  assert.equal(calls, 4);
  controller.abort();
  releases.forEach(resolve => resolve({ getViewport: () => ({ width: 612, height: 792 }) }));
  await assert.rejects(pending, { name: 'AbortError' });
  assert.equal(calls, 4);
});

