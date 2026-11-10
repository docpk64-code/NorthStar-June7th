import SiteLink from './SiteLink';
import '../styles/smilePreviewInvite.css';

export default function SmilePreviewInvite() {
  return <section className="ns-smile-invite" aria-label="Explore Smile Preview">
    <div className="ns-smile-invite-image"><img src="/assets/smile-preview/sample-1.webp" alt="Fictional AI-generated cosmetic smile example" width="900" height="900" loading="lazy" /><span>AI-generated example</span></div>
    <div className="ns-smile-invite-copy"><p className="ns-smile-invite-kicker">NORTHSTAR SMILE PREVIEW <span>DEMO</span></p><h2>See your smile in a new light.</h2><p>Explore full-arch implants, Invisalign / clear aligners, and veneers in our interactive smile studio.</p><SiteLink href="/smile-preview/" className="ns-smile-invite-link">Explore Smile Preview <span aria-hidden="true">↗</span></SiteLink><small>Try the photo controls and fictional comparison. Personalized AI generation is not yet available. Photos stay in your browser.</small></div>
  </section>;
}
