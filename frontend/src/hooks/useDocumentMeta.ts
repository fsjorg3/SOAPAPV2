import { useEffect } from 'react';

interface DocumentMetaOptions {
  title: string;
  description: string;
  // Valor de <meta name="robots"> solo para esta ruta (p. ej. "noindex" en páginas no publicadas).
  robots?: string;
}

function upsertMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function useDocumentMeta({ title, description, robots }: DocumentMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content;
    document.title = title;
    upsertMetaTag('description', description);
    upsertMetaTag('og:title', title, 'property');
    upsertMetaTag('og:description', description, 'property');
    if (robots) upsertMetaTag('robots', robots);

    return () => {
      document.title = previousTitle;
      if (robots && previousRobots) upsertMetaTag('robots', previousRobots);
    };
  }, [title, description, robots]);
}
