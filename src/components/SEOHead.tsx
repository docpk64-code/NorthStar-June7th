import { useEffect } from 'react';
import { canonicalUrl, SITE_ORIGIN } from '../utils/urls';

import { offices, officePath, mapUrl } from '../data/offices';

export default function SEOHead({ title, description, noindex = false }: { title: string; description: string; noindex?: boolean }) {
  useEffect(() => {
    const url = canonicalUrl(window.location.pathname);
    const currentOffice = offices.find(office => url === SITE_ORIGIN + officePath(office.id));
    const activeOffices = currentOffice ? (currentOffice.comingSoon ? [] : [currentOffice]) : offices.filter(office => !office.comingSoon);
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
      ...(currentOffice ? [{ '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description, ...(currentOffice.comingSoon ? {} : { mainEntity: { '@id': `${SITE_ORIGIN}/locations/#${currentOffice.id}` } }) }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'Locations', item: SITE_ORIGIN + '/locations/' }, { '@type': 'ListItem', position: 3, name: currentOffice.name, item: url }] }] : []),
      ...activeOffices.map(office => ({
        '@type': 'Dentist', '@id': `${SITE_ORIGIN}/locations/#${office.id}`,
        name: 'NorthStar Implant Dentistry', url: SITE_ORIGIN + officePath(office.id), hasMap: mapUrl(office), telephone: '+1-631-315-1400',
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
