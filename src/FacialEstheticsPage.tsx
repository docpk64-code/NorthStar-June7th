import { PageLayout } from './PageLayout';
import SiteLink from './components/SiteLink';

export default function FacialEstheticsPage() {
  return (
    <PageLayout
      kicker="Skin & facial care"
      title="Facial Esthetics"
      subtitle="Explore HydraFacial and Emface at NorthStar."
      description="Explore NorthStar facial esthetics, including HydraFacial skin treatments and Emface facial treatments. Learn about each option and request a consultation."
    >
      <div className="page-section">
        <h2>Explore your facial treatment options</h2>
        <p>Choose a treatment below to learn more about the technology, appointment experience, and consultation process. Our team can discuss which options may suit your goals.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          <SiteLink href="/hydrafacial/" className="page-section" style={{ border: '1px solid #c59d3c', display: 'block', margin: 0 }}>
            <p className="page-kicker">Skin care</p>
            <h2>HydraFacial</h2>
            <p>Learn about cleansing, exfoliation, and hydration options for your skin.</p>
            <strong>Explore HydraFacial →</strong>
          </SiteLink>
          <SiteLink href="/emface/" className="page-section" style={{ border: '1px solid #c59d3c', display: 'block', margin: 0 }}>
            <p className="page-kicker">Facial care</p>
            <h2>Emface</h2>
            <p>Learn about facial muscle toning and skin treatment with Emface.</p>
            <strong>Explore Emface →</strong>
          </SiteLink>
        </div>
      </div>
    </PageLayout>
  );
}
