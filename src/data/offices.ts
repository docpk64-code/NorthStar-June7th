export const offices = [
  {
    id: 'briarwood', name: 'Briarwood, Queens', city: 'Briarwood', street: '139-12 84th Drive, Suite 1G', zip: '11435', comingSoon: false,
    intro: 'Visit NorthStar Implant Dentistry in Briarwood for a conversation about your smile, your concerns, and your treatment goals. Our Queens office is located on 84th Drive, in Suite 1G.',
    arrival: 'Use 139-12 84th Drive, Suite 1G when planning your visit. Please confirm the Briarwood office when scheduling so your appointment and directions match the correct location.',
    planning: 'For patients traveling within Queens, Briarwood offers an alternative to a trip into Manhattan or out to Long Island. Use the map below to plan your route, and allow time to find the building and Suite 1G. Call our team if you need help locating the office.',
  },
  {
    id: 'manhattan', name: 'Manhattan', city: 'New York', street: '333 East 34th Street, Suite M1', zip: '10016', comingSoon: false,
    intro: 'Our Manhattan office welcomes patients at 333 East 34th Street, Suite M1. Meet with the NorthStar team to discuss dental implants and your next steps in care at our New York City location.',
    arrival: 'The office is on East 34th Street. Include Suite M1 in your directions and confirm that your appointment is at the Manhattan location before traveling.',
    planning: 'If you are fitting a visit around your workday or traveling into the city, plan your route to East 34th Street in advance. Travel times and parking availability can vary. Our team can help clarify where to arrive when you call to schedule.',
  },
  {
    id: 'commack', name: 'Commack, Long Island', city: 'Commack', street: '283 Commack Road, Suite 130', zip: '11725', comingSoon: false,
    intro: 'NorthStar’s Commack office gives Long Island patients a local place to discuss dental implants and treatment planning. You will find us at 283 Commack Road, Suite 130.',
    arrival: 'Enter 283 Commack Road, Suite 130 into your navigation app. Please select Commack when discussing your appointment with our team; our other offices have different addresses.',
    planning: 'For patients who prefer to receive care on Long Island, the Commack location provides an alternative to traveling into Queens or Manhattan. Review your driving route before leaving and allow time to locate Suite 130 within the building.',
  },
  {
    id: 'brooklyn', name: 'Brooklyn', city: 'Brooklyn', street: '32 Court Street, Suite 301', zip: '11201', comingSoon: true,
    intro: 'NorthStar Implant Dentistry is preparing a new Brooklyn office at 32 Court Street, Suite 301. Opening January 4, 2027. This location is not yet open for patient visits.',
    arrival: 'The future office address is 32 Court Street, Suite 301, Brooklyn, NY 11201. The map identifies the planned location; please do not travel here for an appointment until opening and scheduling details are confirmed.',
    planning: 'The Brooklyn office opens January 4, 2027. Please call our team for office hours and appointment availability. For care before the Brooklyn office opens, contact our team about an appointment at Briarwood, Manhattan, or Commack.',
  },
] as const;
export type OfficeId = typeof offices[number]['id'];
export const officePath = (id: string) => `/locations/${id}/`;
export const mapUrl = (office: typeof offices[number]) => `https://maps.google.com/?q=${encodeURIComponent(`${office.street}, ${office.city}, NY ${office.zip}`)}`;
