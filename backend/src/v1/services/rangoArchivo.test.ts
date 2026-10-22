import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { servirPdf } from './rangoArchivo.service';

let archivoPrueba: string;
let contenido: Buffer;

before(() => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'soapap-rango-'));
  archivoPrueba = path.join(dir, 'prueba.pdf');
  contenido = Buffer.alloc(2048);
  for (let i = 0; i < contenido.length; i++) contenido[i] = i % 256;
  fs.writeFileSync(archivoPrueba, contenido);
});

/** Fakes mínimos de Request/Response de Express, suficientes para que fs.ReadStream#pipe funcione. */
function crearReqRes(rangeHeader?: string) {
  const req = new EventEmitter() as any;
  req.headers = rangeHeader ? { range: rangeHeader } : {};
  req.originalUrl = '/prueba';

  const chunks: Buffer[] = [];
  const res: any = new EventEmitter();
  res.statusCode = 200;
  res.headersSent = false;
  res.writableEnded = false;
  const headers: Record<string, unknown> = {};

  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.setHeader = (name: string, value: unknown) => {
    headers[name.toLowerCase()] = value;
  };
  res.getHeader = (name: string) => headers[name.toLowerCase()];
  res.json = (body: unknown) => {
    res.body = body;
    res.headersSent = true;
    res.writableEnded = true;
    res.emit('finish');
  };
  res.write = (chunk: Buffer) => {
    chunks.push(chunk);
    return true;
  };
  res.end = (chunk?: Buffer) => {
    if (chunk) chunks.push(chunk);
    res.headersSent = true;
    res.writableEnded = true;
    res.emit('finish');
  };
  res.destroy = () => {
    res.destroyed = true;
  };

  return { req, res, getBody: () => Buffer.concat(chunks) };
}

function esperarFin(res: EventEmitter): Promise<void> {
  return new Promise((resolve) => res.once('finish', resolve));
}

test('sin Range responde 200 con Content-Length igual al tamaño total', async () => {
  const { req, res, getBody } = crearReqRes();
  const fin = esperarFin(res);
  servirPdf(req, res, { rutaAbsoluta: archivoPrueba, nombreArchivo: 'prueba.pdf', disposicion: 'inline' });
  await fin;

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(Number(res.getHeader('Content-Length')), contenido.length);
  assert.strictEqual(getBody().length, contenido.length);
});

test('un rango cerrado responde 206 con el fragmento exacto', async () => {
  const { req, res, getBody } = crearReqRes('bytes=10-19');
  const fin = esperarFin(res);
  servirPdf(req, res, { rutaAbsoluta: archivoPrueba, nombreArchivo: 'prueba.pdf', disposicion: 'inline' });
  await fin;

  assert.strictEqual(res.statusCode, 206);
  assert.strictEqual(res.getHeader('Content-Range'), `bytes 10-19/${contenido.length}`);
  assert.deepStrictEqual(getBody(), contenido.subarray(10, 20));
});

test('un rango de sufijo devuelve exactamente los últimos N bytes', async () => {
  const { req, res, getBody } = crearReqRes('bytes=-100');
  const fin = esperarFin(res);
  servirPdf(req, res, { rutaAbsoluta: archivoPrueba, nombreArchivo: 'prueba.pdf', disposicion: 'inline' });
  await fin;

  assert.strictEqual(res.statusCode, 206);
  assert.deepStrictEqual(getBody(), contenido.subarray(contenido.length - 100));
});

test('un rango fuera del tamaño del archivo responde 416 con Content-Range del tamaño total', async () => {
  const { req, res } = crearReqRes(`bytes=${contenido.length + 100}-${contenido.length + 200}`);
  const fin = esperarFin(res);
  servirPdf(req, res, { rutaAbsoluta: archivoPrueba, nombreArchivo: 'prueba.pdf', disposicion: 'inline' });
  await fin;

  assert.strictEqual(res.statusCode, 416);
  assert.strictEqual(res.getHeader('Content-Range'), `bytes */${contenido.length}`);
  assert.strictEqual(res.getHeader('Content-Type'), 'application/problem+json');
});

test('un header Range no reconocido se trata como si no existiera (200 completo)', async () => {
  const { req, res, getBody } = crearReqRes('bytes=abc-def');
  const fin = esperarFin(res);
  servirPdf(req, res, { rutaAbsoluta: archivoPrueba, nombreArchivo: 'prueba.pdf', disposicion: 'inline' });
  await fin;

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(getBody().length, contenido.length);
});
