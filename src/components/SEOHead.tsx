import { useEffect } from 'react';
import { canonicalUrl, SITE_ORIGIN } from '../utils/urls';

const offices = [
  { id: 'briarwood', city: 'Briarwood', street: '139-12 84th Drive, Suite 1G', zip: '11435' },
  { id: 'manhattan', city: 'New York', street: '333 East 34th Street, Suite M1', zip: '10016' },
  { id: 'commack', city: 'Commack', street: '283 Commack Road, Suite 130', zip: '11725' },
];
export default function SEOHead({ title, description, noindex = false }: { title: string; description: string; noindex?: boolean }) {
  useEffect(() => {
    const url = canonicalUrl(window.location.pathname);
    document.title = `${title} | NorthStar Implant Dentistry`;
    const meta = (key: string, value: string, attribute = 'name') => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, key); document.head.appendChild(tag); }
      tag.content = value;
    };
    meta('description', description);
    meta('robots', noindex ? 'noindex, follow' : 'index, follow');
    meta('og:title', document.title, 'property');
    meta('og:description', description, 'property');
    meta('og:type', 'website', 'property');
    meta('og:url', url, 'property');
    document.querySelectorAll('link[rel="canonical"]').forEach(tag => tag.remove());
    if (!noindex) {
      const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = url;
      document.head.appendChild(canonical);
    }
    document.querySelectorAll('script[id^="schema-northstar"]').forEach(tag => tag.remove());
    const schema = document.createElement('script');
    schema.id = 'schema-northstar'; schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#organization`, name: 'NorthStar Implant Dentistry', url: SITE_ORIGIN + '/', telephone: '+1-631-315-1400' },
      ...offices.map(office => ({
        '@type': 'Dentist', '@id': `${SITE_ORIGIN}/locations/#${office.id}`,
        name: 'NorthStar Implant Dentistry', url: `${SITE_ORIGIN}/locations/`, telephone: '+1-631-315-1400',
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '20:00' }],
        description: 'Monday–Saturday, 9am–8pm. Sunday by appointment.',
        parentOrganization: { '@id': `${SITE_ORIGIN}/#organization` },
        address: { '@type': 'PostalAddress', streetAddress: office.street, addressLocality: office.city, addressRegion: 'NY', postalCode: office.zip, addressCountry: 'US' },
      })),
    ] });
    document.head.appendChild(schema);
  }, [title, description, noindex]);
  return null;
}
