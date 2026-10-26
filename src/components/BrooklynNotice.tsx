import SiteLink from './SiteLink';
export default function BrooklynNotice() {
  return (
    <aside aria-label="Brooklyn office coming soon" style={{ marginTop: '1rem', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #d1a245', background: '#fff9e9', color: '#07111c' }}>
      <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1.1rem' }}>Brooklyn — Coming soon</p>
      <p style={{ margin: 0, lineHeight: 1.6 }}>32 Court Street, Suite 301<br />Brooklyn, NY 11201</p>
      <p style={{ margin: '0.65rem 0 0', color: '#4a5668', fontSize: '0.9rem' }}>Opening January 4, 2027. This location is not yet open.</p>
      <p style={{ marginBottom: 0 }}><SiteLink href="/locations/brooklyn/" style={{ color: '#755300', fontWeight: 700 }}>Explore the Brooklyn office →</SiteLink></p>
    </aside>
  );
}
