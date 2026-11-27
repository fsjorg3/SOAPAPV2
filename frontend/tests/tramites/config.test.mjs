// node --test tests/tramites/config.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { CONSTANCIA_NO_ADEUDO } from '../../src/config/tramites/constanciaNoAdeudo.ts';
import { CONSTANCIA_PREDIO_NO_REGISTRADO } from '../../src/config/tramites/constanciaPredioNoRegistrado.ts';
import { TRAMITES_INICIO } from '../../src/config/tramites/index.ts';
import { ANCLA_DOCUMENTOS } from '../../src/config/tramites/tipos.ts';
import {
  construirJsonLd,
  formatearMonto,
  rutaTramite,
  soloDigitos,
  textoCosto,
  urlComoLlegar,
} from '../../src/utils/tramites.ts';

const TRAMITES = [CONSTANCIA_NO_ADEUDO, CONSTANCIA_PREDIO_NO_REGISTRADO];

// Mismas claves que ICONOS_TRAMITE (components/tramites/iconos.ts, que importa MUI y no corre en node).
const ICONOS_VALIDOS = new Set(['recibo', 'identificacion', 'cuentaActiva', 'ticket', 'documento', 'propiedad', 'ubicacion']);

test('formatearMonto da pesos con dos decimales', () => {
  assert.equal(formatearMonto(507), '$507.00');
  assert.equal(formatearMonto(1250.5), '$1,250.50');
});

test('textoCosto agrega la leyenda de IVA solo si aplica', () => {
  assert.equal(textoCosto({ costo: 509, ivaIncluido: true }), '$509.00 MXN, IVA incluido');
  assert.equal(textoCosto({ costo: 509, ivaIncluido: false }), '$509.00 MXN');
});

test('soloDigitos limpia cuenta y CLABE para copiar', () => {
  assert.equal(soloDigitos('012-496-9375'), '0124969375');
  assert.equal(soloDigitos('012-650-001-249-693-754'), '012650001249693754');
});

for (const tramite of TRAMITES) {
  test(`${tramite.slug}: el JSON-LD toma precio, horario y teléfonos del config`, () => {
    const ld = construirJsonLd(tramite);
    assert.equal(ld.name, tramite.nombre);
    assert.equal(ld.serviceType, tramite.tipoServicio);
    assert.equal(ld.offers.price, tramite.costo.toFixed(2));
    assert.equal(ld.offers.priceCurrency, 'MXN');
    assert.equal(ld.offers.price, '509.00');
    assert.equal(ld.offers.priceSpecification.price, '509.00');
    assert.equal(ld.offers.priceSpecification.valueAddedTaxIncluded, true);
    assert.equal(ld.url, `https://soapap.gob.mx/tramites/${tramite.slug}`);
    assert.equal(ld.availableChannel.serviceLocation.openingHours, 'Mo-Fr 09:00-17:00');
    assert.deepEqual(
      ld.availableChannel.servicePhone.map((p) => p.telephone),
      tramite.oficina.telefonos.map((t) => t.e164),
    );
  });

  test(`${tramite.slug}: el JSON-LD sigue al costo si cambia`, () => {
    const ld = construirJsonLd({ ...tramite, costo: 612 });
    assert.equal(ld.offers.price, '612.00');
  });

  test(`${tramite.slug}: los textos con monto usan el costo del config`, () => {
    const monto = formatearMonto(tramite.costo);
    assert.ok(tramite.transferencia.nota.includes(`${monto}** (IVA incluido)`));
    assert.ok(tramite.pasos.some((p) => p.texto.includes(`${monto} (IVA incluido)`)));
    assert.ok(tramite.ventanilla.descripcion.includes('crédito o débito'));
    assert.ok(tramite.pasos.some((p) => p.texto.includes(`${tramite.vigenciaDias} días`)));
  });

  test(`${tramite.slug}: config consistente (perfiles, ids, ancla e iconos)`, () => {
    const { perfiles, requisitos, pasos } = tramite;
    assert.ok(perfiles.length > 0);
    for (const perfil of perfiles) assert.ok(perfil.documentos.length > 0, perfil.id);
    assert.equal(new Set(perfiles.map((p) => p.id)).size, perfiles.length);
    for (const r of requisitos) {
      assert.ok(ICONOS_VALIDOS.has(r.icono), r.icono);
      if (r.enlace) assert.equal(r.enlace.ancla, ANCLA_DOCUMENTOS);
    }
    assert.equal(pasos.length, 5);
    assert.ok(tramite.resumen.length > 0);
    assert.ok(tramite.imagenTarjeta, 'imagen 16:9 de la tarjeta de inicio');
    assert.ok(tramite.factura.asuntoCorreo.toLowerCase().includes(tramite.nombre.toLowerCase()));
  });

  test(`${tramite.slug}: ruta y enlaces de la oficina`, () => {
    assert.equal(rutaTramite(tramite), `/tramites/${tramite.slug}`);
    assert.match(urlComoLlegar(tramite.oficina), /destination=19\.013102,-98\.193766$/);
    assert.match(tramite.oficina.calle, /5312, interior 1/);
  });
}

test('predio no registrado: el albacea presenta la resolución del juicio sucesorio', () => {
  const albacea = CONSTANCIA_PREDIO_NO_REGISTRADO.perfiles.find((p) => p.id === 'albacea');
  assert.ok(albacea.documentos.includes('Resolución del juicio sucesorio.'));
  assert.ok(!albacea.documentos.some((d) => /defunción/i.test(d)));
});

test('predio no registrado: recuadro de dirección con una sola leyenda', () => {
  const { recuadroInformativo } = CONSTANCIA_PREDIO_NO_REGISTRADO;
  assert.ok(recuadroInformativo);
  assert.equal(recuadroInformativo.bloques.filter((b) => b.leyenda).length, 1);
  assert.equal(CONSTANCIA_NO_ADEUDO.recuadroInformativo, undefined);
});

test('inicio muestra ambos trámites con slugs únicos', () => {
  assert.deepEqual(
    TRAMITES_INICIO.map((t) => t.slug),
    ['constancia-no-adeudo', 'constancia-predio-no-registrado'],
  );
});
