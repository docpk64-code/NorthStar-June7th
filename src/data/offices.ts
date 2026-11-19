export const offices = [
  {
    id: 'briarwood', name: 'Briarwood, Queens', city: 'Briarwood', street: '139-12 84th Drive, Suite 1G', zip: '11435', comingSoon: false,
    intro: 'Visit NorthStar Implant Dentistry in Briarwood for a conversation about your smile, your concerns, and your treatment goals. Our Queens office is located on 84th Drive, in Suite 1G.',
    arrival: 'Use 139-12 84th Drive, Suite 1G when planning your visit. Please confirm the Briarwood office when scheduling so your appointment and directions match the correct location.',
    planning: 'The Briarwood subway station is served by the E and F trains. If you’re driving, check nearby public parking before your visit.',
    consultation: 'Meet with the NorthStar team in Queens to discuss replacing one or more teeth or planning a full-arch restoration. If you already have dental X-rays or a treatment estimate, ask which records to bring.',
  },
  {
    id: 'manhattan', name: 'Manhattan', city: 'New York', street: '333 East 34th Street, Suite M1', zip: '10016', comingSoon: false,
    intro: 'Our Manhattan office welcomes patients at 333 East 34th Street, Suite M1. Meet with the NorthStar team to discuss dental implants and your next steps in care at our New York City location.',
    arrival: 'The office is on East 34th Street. Include Suite M1 in your directions and confirm that your appointment is at the Manhattan location before traveling.',
    planning: 'From the 6 train at 33rd Street, head east toward the office. Use Suite M1 when you arrive, and call us if you need help locating the suite.',
    consultation: 'Our East 34th Street office serves patients near Murray Hill and Kips Bay. Tell us whether you’re exploring new implants, replacing failing teeth, or seeking a second opinion on a previous implant or restoration.',
  },
  {
    id: 'commack', name: 'Commack, Long Island', city: 'Commack', street: '283 Commack Road, Suite 130', zip: '11725', comingSoon: false,
    intro: 'NorthStar’s Commack office gives Long Island patients a local place to discuss dental implants and treatment planning. You will find us at 283 Commack Road, Suite 130.',
    arrival: 'Enter 283 Commack Road, Suite 130 into your navigation app. Please select Commack when discussing your appointment with our team; our other offices have different addresses.',
    planning: 'If you’re driving from elsewhere on Long Island, use Commack Road from the Northern State Parkway. On-site parking is available. Look for Suite 130 when you arrive.',
    consultation: 'At the Commack office, you can discuss replacing a single tooth or options for several missing teeth, a loose denture, or a full-arch restoration. Bring a list of what you’d like to improve about how your teeth fit or function.',
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
export const officeConsultationPath = (id: OfficeId) => `/contact/?office=${id}#consultation`;
export const mapUrl = (office: typeof offices[number]) => `https://maps.google.com/?q=${encodeURIComponent(`${office.street}, ${office.city}, NY ${office.zip}`)}`;
