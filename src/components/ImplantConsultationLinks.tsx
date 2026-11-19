import { offices, officeConsultationPath } from '../data/offices';
import './implantPatientPaths.css';

export default function ImplantConsultationLinks() {
  return (
    <nav className="implant-office-links" aria-label="Request a consultation by office">
      {offices.filter(office => !office.comingSoon).map(office => (
        <a key={office.id} href={officeConsultationPath(office.id)}>{office.name}</a>
      ))}
    </nav>
  );
}
