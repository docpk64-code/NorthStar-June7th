import { useEffect } from 'react';
import './fullArchPrototype.css';

const nuviaSource = 'https://www.nuviasmiles.com/blog/your-questions-answered-by-a-nuvia-dentist';
const nuviaFaq = 'https://www.nuviasmiles.com/dental-implant-process-frequently-asked-questions';

export function SmilePrototypeInvite() {
  return <section className="prototype-invite" aria-labelledby="prototype-invite-title">
    <div className="pp-shell prototype-invite-inner">
      <div><p className="pp-eyebrow">Your voice in your full-arch smile</p><h2 id="prototype-invite-title">Try your smile before we make it final.</h2></div>
      <div><p>NorthStar uses a prototype stage to review how your new teeth look, how you speak, and how your bite feels. Your feedback helps us refine the design before making your final teeth.</p><a className="prototype-link" href="/full-arch/#prototype-smile">See our process and the Nuvia comparison</a></div>
    </div>
  </section>;
}

export default function FullArchPrototype() {
  useEffect(() => {
    if (window.location.hash === '#prototype-smile') {
      const frame = requestAnimationFrame(() => document.getElementById('prototype-smile')?.scrollIntoView());
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  return <section className="page-section prototype-section" id="prototype-smile" aria-labelledby="prototype-title">
    <p className="page-kicker">Designed with you</p>
    <h2 id="prototype-title">Your final smile deserves a test drive.</h2>
    <p className="prototype-intro">Tooth shape, smile line, lip support, speech, and bite are personal. At NorthStar, prototyping gives you and your dentist a chance to evaluate the design together before your final full-arch teeth are made.</p>
    <ol className="prototype-stages" aria-label="NorthStar’s prototype process">
      <li><h3>Plan your smile</h3><p>Discuss the look you want, your concerns, and what your anatomy and treatment plan can support.</p></li>
      <li><h3>Try it and refine it</h3><p>Use a trial restoration or healing bridge, as appropriate, to assess appearance, speech, and bite. Tell us what feels right and what you would like to change.</p></li>
      <li><h3>Make your final teeth</h3><p>Review healing, clinical fit, and the agreed design. Build the refinements into your final restoration, with material and timing chosen for your case.</p></li>
    </ol>
    <div className="prototype-comparison">
      <h3 id="prototype-compare-title">Considering Nuvia’s 24-hour zirconia approach?</h3>
      <p>Nuvia describes delivering zirconia teeth within 24 hours of implant surgery. NorthStar’s process includes a separate prototype stage before fabrication of the final teeth. Here is what that difference means for your experience.</p>
      <table aria-labelledby="prototype-compare-title">
        <thead><tr><th scope="col">What to compare</th><th scope="col">Nuvia’s published process</th><th scope="col">NorthStar’s prototype process</th></tr></thead>
        <tbody>
          <tr><th scope="row">First fixed teeth</th><td data-label="Nuvia">Zirconia teeth delivered within 24 hours for eligible patients.</td><td data-label="NorthStar">A fixed healing bridge may be possible on surgery day when implant stability and the treatment plan allow it. Final teeth follow the prototype and healing review.</td></tr>
          <tr><th scope="row">Your design feedback</th><td data-label="Nuvia">Digital measurements and patient design choices before surgery; concerns can be discussed with the care team afterward.</td><td data-label="NorthStar">A dedicated trial stage lets us assess your smile, speech, lip support, and bite with you, then incorporate agreed refinements before final fabrication.</td></tr>
          <tr><th scope="row">Healing and follow-up</th><td data-label="Nuvia">A four-month visit checks implant integration. Its FAQ describes addressing a gum gap if one develops.</td><td data-label="NorthStar">We reassess healing and tissue contours, review cleaning access, and update the design as needed before completing the final restoration.</td></tr>
          <tr><th scope="row">What to ask at consultation</th><td colSpan={2}>Which teeth will I receive first? When can I test the design? What happens if I want changes? What follow-up, adjustments, repairs, and remakes are included in my written estimate?</td></tr>
        </tbody>
      </table>
      <p className="prototype-source">Nuvia summary based on its <a href={nuviaSource} target="_blank" rel="noopener noreferrer">published dentist explanation</a> and <a href={nuviaFaq} target="_blank" rel="noopener noreferrer">process FAQs</a>, reviewed November 27, 2026. Confirm current details with each provider.</p>
    </div>
    <div className="prototype-expectations" aria-labelledby="prototype-gap-title">
      <h3 id="prototype-gap-title">Why we prefer to refine the design before the final teeth</h3>
      <p>Nuvia’s FAQ describes adding material if a gap develops during healing. A later addition can be a useful treatment, but closing a space is not always the same as designing the final restoration around healed tissues. That is one reason NorthStar includes a prototype stage.</p>
      <ul>
        <li><strong>An added material creates a junction.</strong> If composite resin is bonded to zirconia, the result includes a bond between two materials. Bond durability depends on the materials, surface preparation, and aging; that junction needs monitoring.</li>
        <li><strong>Surface finish and cleaning access still matter.</strong> Pink composite can discolor, and its surface finish affects staining. Any addition must be carefully shaped and polished so that the restoration remains accessible for cleaning. Simply filling a gap is not the whole design task.</li>
        <li><strong>A gap repair does not address every design concern.</strong> We also need to assess tooth position, lip support, speech, and bite. Prototyping gives you and your dentist a dedicated opportunity to review those features and incorporate refinements before final fabrication.</li>
      </ul>
      <p><strong>Our preference is to plan the final contours with you after assessing healing, rather than rely on a later addition as the main solution.</strong> Adjustments or repairs may still be appropriate with either approach. Some clearance beneath an implant bridge may be intentional for cleaning; every space does not need to be closed.</p>
      <p className="prototype-source">The material and method used for a particular gap correction should be confirmed with the treating provider. The bonding and staining concerns above apply when resin is added to zirconia; they do not establish Nuvia’s repair protocol or complication rate.</p>
      <details className="fa-references"><summary>Evidence behind these design considerations</summary><ul>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12930121/" target="_blank" rel="noopener noreferrer">Clinical consensus on trial restorations, speech, lip support, and cleaning access</a></li>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12693697/" target="_blank" rel="noopener noreferrer">Laboratory study of gingiva-colored composite bonding and artificial aging</a></li>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7321486/" target="_blank" rel="noopener noreferrer">Laboratory study of gingiva-colored composite surface finish and color stability</a></li>
      </ul><p className="prototype-source">Laboratory findings describe material behavior under test conditions, not comparative patient outcomes for NorthStar and Nuvia.</p></details>
    </div>
    <div className="prototype-expectations"><h3>Room for refinement as you heal.</h3><p>Gums and bone change after extractions and implant surgery. A prototype helps us evaluate and refine the restoration as treatment progresses. Both approaches require healing, diet instructions, home care, and follow-up. Neither a material nor a delivery date guarantees implant success, a particular appearance, or a restoration that never needs adjustment.</p><p>For your case, we’ll explain the expected stages, material choices, timing, and fees. NorthStar provides both your implant surgery and final teeth.</p><a className="prototype-cta" href="/contact/#consultation">Discuss your full-arch smile</a></div>
  </section>;
}
