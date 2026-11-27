// Utilidades de las páginas de trámites. Sin dependencias de React: se prueban con node --test.
import type { OficinaAtencion, TramiteConfig } from '../config/tramites/tipos.ts';

const SITIO = 'https://soapap.gob.mx';

const formatoMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
});

// 507 → "$507.00"
export function formatearMonto(monto: number): string {
  return formatoMXN.format(monto);
}

// Costo con moneda y, si aplica, la leyenda de IVA: "$509.00 MXN, IVA incluido".
export function textoCosto(tramite: Pick<TramiteConfig, 'costo' | 'ivaIncluido'>): string {
  const base = `${formatearMonto(tramite.costo)} MXN`;
  return tramite.ivaIncluido ? `${base}, IVA incluido` : base;
}

// Quita guiones y espacios para copiar números de cuenta o CLABE.
export function soloDigitos(texto: string): string {
  return texto.replace(/[^\d]/g, '');
}

export function direccionEnUnaLinea(oficina: OficinaAtencion): string {
  return `${oficina.calle}, colonia ${oficina.colonia}, C.P. ${oficina.codigoPostal}, ${oficina.ciudad}, ${oficina.estado}`;
}

// Abre la ruta en Google Maps (web o app) hacia las coordenadas de la oficina.
export function urlComoLlegar(oficina: OficinaAtencion): string {
  const { lat, lng } = oficina.coordenadas;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function rutaTramite(tramite: Pick<TramiteConfig, 'slug'>): string {
  return `/tramites/${tramite.slug}`;
}

// Datos estructurados schema.org (GovernmentService) del trámite.
export function construirJsonLd(tramite: TramiteConfig) {
  const { oficina } = tramite;
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: tramite.nombre,
    serviceType: tramite.tipoServicio,
    url: `${SITIO}${rutaTramite(tramite)}`,
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Sistema Operador de los Servicios de Agua Potable y Alcantarillado del Municipio de Puebla (SOAPAP)',
      url: SITIO,
    },
    areaServed: 'Puebla, México',
    offers: {
      '@type': 'Offer',
      price: tramite.costo.toFixed(2),
      priceCurrency: 'MXN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: tramite.costo.toFixed(2),
        priceCurrency: 'MXN',
        valueAddedTaxIncluded: tramite.ivaIncluido,
      },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: oficina.telefonos.map((t) => ({ '@type': 'ContactPoint', telephone: t.e164 })),
      serviceLocation: {
        '@type': 'Place',
        name: oficina.nombre,
        address: {
          '@type': 'PostalAddress',
          streetAddress: oficina.calle,
          addressLocality: oficina.ciudad,
          addressRegion: oficina.estado,
          postalCode: oficina.codigoPostal,
          addressCountry: 'MX',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: oficina.coordenadas.lat,
          longitude: oficina.coordenadas.lng,
        },
        openingHours: oficina.horarioSchema,
      },
    },
  };
}
