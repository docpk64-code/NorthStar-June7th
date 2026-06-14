/**
 * pages/index.tsx — All 10 inner page components
 * Edit the placeholder text marked with [EDIT: ...] to add your real content.
 */

import React from 'react';
import { navigate } from './Root';
import { useForm, ValidationError } from '@formspree/react';
import { PageLayout } from './PageLayout';
import { SYNDEO_IMG, BA1_IMG, BA2_IMG, PERK_LIP_IMG, PERK_EYE_IMG } from './Hydrafacial-images';

// ─── About ───────────────────────────────────────────────────────────────────
export function AboutPage() {
  return (
    <PageLayout
      kicker="Meet the Practice"
      title="About NorthStar Implant Dentistry"
      subtitle="A patient-centered surgical practice built on precision, comfort, and long-term outcomes."
    >
      <div className="page-section">
        <p className="page-kicker">Our Philosophy</p>
        <h2>Care Built Around You</h2>
        <p>
          [EDIT: Introduce Dr. Kampf and the practice philosophy here. Describe
          what sets NorthStar apart — the patient-first approach, the calm
          environment, the commitment to transparent communication.]
        </p>
        <p>
          [EDIT: Add a second paragraph about the team, years of experience, or
          the types of patients you see most.]
        </p>
      </div>

      <div className="page-section" style={{ position: 'relative' }}>
        <div
          style={{
            minHeight: 'clamp(140px, 40vw, 380px)',
            paddingRight: 'clamp(0px, 42vw, 400px)',
            position: 'relative' as const,
          }}
        >
          <p className="page-kicker">Meet the Doctor</p>
          <img
            loading="lazy"
            src="data:image/jpeg;base64,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"
            alt="Dr. Peter Kampf"
            style={{
              width: '360px',
              height: '360px',
              borderRadius: '1rem',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
              position: 'absolute',
              top: '0',
              right: '0',
              border: '3px solid rgba(197,157,60,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          />
          <h2>Dr. Peter Kampf</h2>
        </div>
        <div style={{ width: '100%', marginTop: '1.5rem' }}>
          <p>
            Dr. Peter R. Kampf is the founder of NorthStar Implant Dentistry and
            one of the New York metropolitan area's most experienced and
            versatile dental surgeons. With over three decades of clinical
            practice, Dr. Kampf has built a reputation for exceptional surgical
            skill, meticulous attention to detail, and a genuine commitment to
            transforming the lives of his patients — one smile at a time.
          </p>

          <p>
            Dr. Kampf graduated from the New York University College of
            Dentistry in 1992, the same class as his longtime colleagues and
            NorthStar associates Dr. Elisa Nelson and Dr. Agnes Nadrag.
            Following dental school, he pursued advanced postgraduate training
            as a post-doctoral fellow and resident in oral surgery and hospital
            dentistry at the Columbia Presbyterian Medical Center — now
            NewYork-Presbyterian / Columbia University Irving Medical Center —
            one of the most prestigious academic medical institutions in the
            United States. This rigorous hospital-based training gave Dr. Kampf
            extensive experience in the medical and surgical management of
            complex patients, knowledge that continues to inform his approach to
            care. As research increasingly demonstrates the deep connection
            between oral health and systemic conditions such as cardiovascular
            disease, diabetes, and sleep disorders, Dr. Kampf's broad medical
            foundation sets him apart from surgeons with purely dental training.
          </p>

          <p>
            After Columbia, Dr. Kampf pursued additional advanced surgical
            training at Brookdale Medical Center in Brooklyn, New York, where he
            deepened his expertise in dental implants, bone grafting, bone
            regenerative techniques, and full mouth reconstruction utilizing
            multiple modalities of dental implants. This second residency
            solidified his focus on implant surgery and complex oral
            rehabilitation — the clinical foundation upon which NorthStar
            Implant Dentistry was built.
          </p>

          <p>
            Dr. Kampf's clinical interests span the full spectrum of advanced
            implant dentistry and oral surgery. He has developed particular
            expertise in complex and specialized implant solutions — including
            zygomatic and remote anchorage implants for patients who have been
            told they cannot receive conventional implants due to severe bone
            loss. He is among a select group of practitioners nationwide with
            the training and experience to offer these life-changing solutions
            to patients who have been turned away elsewhere. His other areas of
            focus include complex oral rehabilitation and full mouth
            reconstruction, oral medicine, atypical facial pain, trigeminal
            neuralgia, TMJ syndromes, and sleep apnea — reflecting a scope of
            practice that goes far beyond routine implant placement.
          </p>

          <p>
            Recognized by the American Academy of Implant Dentistry — whose
            emblem he proudly wears on his lab coat — Dr. Kampf is a member of
            this prestigious organization, which has been the credentialing
            standard for implant dentistry since 1951. His membership reflects
            not only his surgical credentials but his ongoing commitment to
            advancing his knowledge and skills in a rapidly evolving field.
          </p>

          <p>
            Beyond his surgical practice, Dr. Kampf brings a deeply human
            dimension to his work. Patients consistently describe him as kind,
            thorough, calm under pressure, and genuinely invested in their
            well-being. He takes the time to listen, to explain, and to ensure
            that every patient — regardless of the complexity of their situation
            — feels informed, respected, and cared for. At NorthStar, his vision
            is simple: to guide patients to the best possible outcomes with
            honesty, precision, and compassion.
          </p>

          <p style={{ fontWeight: 700, marginTop: '1.2rem' }}>
            🧾 Education & Training
          </p>
          <ul>
            <li>
              Doctor of Dental Surgery (DDS) — New York University College of
              Dentistry, 1992
            </li>
            <li>
              Post-Doctoral Fellow & Resident, Oral Surgery and Hospital
              Dentistry — Columbia Presbyterian Medical Center
              (NewYork-Presbyterian / Columbia University Irving Medical Center)
            </li>
            <li>
              Advanced Surgical Training, Dental Implants, Bone Grafting & Full
              Mouth Reconstruction — Brookdale Medical Center, Brooklyn, New
              York
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginTop: '1rem' }}>
            🔬 Clinical Specialties & Interests
          </p>
          <ul>
            <li>
              All phases of dental implants — single tooth, multiple teeth, and
              full-arch restoration
            </li>
            <li>
              Zygomatic and remote anchorage implants for patients with severe
              bone loss
            </li>
            <li>Bone grafting and bone regenerative techniques</li>
            <li>Complex oral rehabilitation and full mouth reconstruction</li>
            <li>Oral medicine and oral pathology</li>
            <li>Atypical facial pain and trigeminal neuralgia</li>
            <li>TMJ syndromes</li>
            <li>Sleep apnea — surgical and dental management</li>
          </ul>

          <p style={{ fontWeight: 700, marginTop: '1rem' }}>
            🏛 Professional Affiliations & Memberships
          </p>
          <ul>
            <li>Member — American Academy of Implant Dentistry (AAID)</li>
            <li>Member — American Dental Association</li>
            <li>Member — New York State Dental Association</li>
          </ul>
        </div>
      </div>

      <div className="page-section" style={{ position: 'relative' }}>
        <div
          style={{
            minHeight: 'clamp(140px, 40vw, 380px)',
            paddingRight: 'clamp(0px, 42vw, 400px)',
            position: 'relative' as const,
          }}
        >
          <p className="page-kicker">Meet the Doctor</p>
          <img
            loading="lazy"
            src="data:image/jpeg;base64,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"
            alt="Dr. Agnes Nadrag"
            style={{
              position: 'absolute' as const,
              top: 0,
              right: 0,
              width: 'clamp(120px, 38vw, 360px)',
              height: 'clamp(120px, 38vw, 360px)',
              borderRadius: '1rem',
              objectFit: 'cover',
              objectPosition: 'top',
              border: '3px solid rgba(197,157,60,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          />
          <h2>Dr. Agnes Nadrag</h2>
        </div>
        <div style={{ width: '100%', marginTop: '1.5rem' }}>
          <p>
            Specializing in general and cosmetic dentistry, Dr. Agnes Nadrag is
            among the highest-rated dentists in New York, serving the Manhattan
            and Queens neighborhoods and surrounding areas. Her goal as a
            practitioner is to ensure that each of her patients receives the
            highest available standard of dental care.
          </p>
          <p>
            Dr. Nadrag received her Doctor of Dental Surgery degree from New
            York University's acclaimed College of Dentistry. She is now a
            dental authority in New York and a member of prominent professional
            organizations including the American Dental Association, the
            American Association of Dental Examiners, and the International
            Congress of Oral Implantologists.
          </p>
          <p>
            As a certified dental practitioner, Dr. Nadrag's focus is always on
            her patients. She strives to provide the best standard of care and
            the highest quality dental options available — a commitment
            reflected in her consistently outstanding five-star patient reviews.
            Offering a full range of dental services, Dr. Nadrag covers
            everything from preventive cleanings and tooth repair to complete
            implant tooth replacement and custom smile design.
          </p>
          <p>
            Dr. Nadrag places particular importance on using cutting-edge dental
            technology and procedures to correct facial pain and dangerous
            conditions such as sleep apnea. As a lifelong resident of New York
            and a graduate of NYU, she is a local dentist who proudly serves her
            neighborhood with a personalized, one-on-one approach — and is
            fluent in English, Polish, and Romanian.
          </p>

          <p style={{ fontWeight: 700, marginTop: '1.2rem' }}>
            🧾 Education & Training
          </p>
          <ul>
            <li>
              Doctor of Dental Surgery (DDS) — New York University College of
              Dentistry, 1993
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginTop: '1rem' }}>
            🏛 Professional Affiliations & Memberships
          </p>
          <ul>
            <li>Member — American Dental Association</li>
            <li>Member — American Association of Dental Examiners</li>
            <li>Member — International Congress of Oral Implantologists</li>
          </ul>

          <p style={{ fontWeight: 700, marginTop: '1rem' }}>
            🗣 Languages Spoken
          </p>
          <ul>
            <li>English · Polish · Romanian</li>
          </ul>
        </div>
      </div>

      <div className="page-section" style={{ position: 'relative' }}>
        <div
          style={{
            minHeight: 'clamp(140px, 40vw, 380px)',
            paddingRight: 'clamp(0px, 42vw, 400px)',
            position: 'relative' as const,
          }}
        >
          <p className="page-kicker">Meet the Doctor</p>
          <img
            loading="lazy"
            src="data:image/jpeg;base64,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"
            alt="Dr. Elisa Nelson"
            style={{
              width: '360px',
              height: '360px',
              borderRadius: '1rem',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
              position: 'absolute',
              top: '0',
              right: '0',
              border: '3px solid rgba(197,157,60,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          />
          <h2>Dr. Elisa Nelson</h2>
          <p>
            [EDIT: Add Dr. Nelson's biography here — education, training,
            certifications, professional affiliations, and any personal details
            that help patients connect.]
          </p>
          <p
            style={{
              fontWeight: 700,
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
            }}
          >
            Dr. Elisa B. Nelson, DDS
          </p>
          <p>
            Dr. Elisa B. Nelson is a highly experienced restorative dentist
            whose career reflects the perfect integration of science, precision,
            and artistry. With over three decades of clinical experience, she is
            known for delivering refined, natural-looking results while
            maintaining an unwavering commitment to patient comfort and
            long-term oral health.
          </p>
        </div>
        <div style={{ width: '100%', marginTop: '1.5rem' }}>
          <p>
            A graduate of New York University College of Dentistry, Dr. Nelson
            earned her Doctor of Dental Surgery degree in 1992. She then
            completed a General Practice Residency at Flushing Hospital Medical
            Center, where she received advanced training in comprehensive care,
            complex restorative dentistry, and patient management.
          </p>
          <p>
            Following her residency, Dr. Nelson joined her father, Dr. Henry
            Nelson, in his established Woodhaven practice—continuing a legacy of
            compassionate, relationship-based dentistry. She later founded her
            own practice on Long Island, where she has built a reputation for
            excellence and continuity of care, treating multiple generations of
            families over the course of her career.
          </p>
          <p>
            Dr. Nelson's approach to dentistry is deeply personal. She believes
            every patient deserves individualized attention, thoughtful
            treatment planning, and a calm, welcoming environment. Her patients
            often describe her care as meticulous, gentle, and highly
            attentive—qualities that have earned lasting trust within the
            community.
          </p>
          <p>
            In addition to her clinical work, Dr. Nelson served as an Associate
            Professor in the Department of Oral Medicine and Pathology at New
            York University College of Dentistry, where she contributed to the
            education and mentorship of future dentists.
          </p>
          <p>
            Dr. Nelson shares a longstanding professional connection with Dr.
            Peter Kampf—both were classmates at NYU College of Dentistry,
            graduating in 1992. This shared foundation reflects a mutual
            commitment to excellence, precision, and continued advancement in
            modern dentistry.
          </p>
          <p>
            Today, Dr. Nelson continues to provide comprehensive restorative
            care with a focus on aesthetics, function, and long-term
            stability—an approach that aligns seamlessly with the philosophy of
            NorthStar Implant Dentistry.
          </p>

          <p style={{ fontWeight: 700, marginTop: '1.2rem' }}>
            🧾 Education &amp; Training
          </p>
          <ul>
            <li>
              Bachelor of Arts — Long Island University (C.W. Post Campus), 1984
            </li>
            <li>
              Doctor of Dental Surgery (DDS) — New York University College of
              Dentistry, 1992
            </li>
            <li>
              General Practice Residency — Flushing Hospital Medical Center,
              1992–1993
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginTop: '1rem' }}>
            🎓 Academic Experience
          </p>
          <ul>
            <li>
              Associate Professor, Department of Oral Medicine &amp; Pathology —
              New York University College of Dentistry (1994–1996)
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginTop: '1rem' }}>
            🏛 Professional Affiliations &amp; Memberships
          </p>
          <ul>
            <li>Member — American Dental Association</li>
            <li>Member — New York State Dental Association</li>
            <li>Member — Academy of General Dentistry</li>
            <li>Member — Suffolk County Dental Society</li>
            <li>Member — American Academy of Clear Aligners</li>
            <li>Member — Spear Study Club</li>
          </ul>
        </div>
      </div>

      <div className="page-section" style={{ position: 'relative' }}>
        <div
          style={{
            minHeight: 'clamp(140px, 40vw, 380px)',
            paddingRight: 'clamp(0px, 42vw, 400px)',
            position: 'relative' as const,
          }}
        >
          <p className="page-kicker">Meet the Doctor</p>
          <img
            loading="lazy"
            src="data:image/jpeg;base64,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"
            alt="Dr. Carlos Garcia"
            style={{
              position: 'absolute' as const,
              top: 0,
              right: 0,
              width: 'clamp(120px, 38vw, 360px)',
              height: 'clamp(120px, 38vw, 360px)',
              borderRadius: '1rem',
              objectFit: 'cover' as const,
              objectPosition: 'top' as const,
              border: '3px solid rgba(197,157,60,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          />
          <h2>Dr. Carlos Garcia</h2>
        </div>
        <div style={{ width: '100%', marginTop: '1.5rem' }}>
          <p>
            [EDIT: Add Dr. Garcia's biography here — education, training,
            certifications, professional affiliations, and any personal details
            that help patients connect.]
          </p>
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Office</p>
        <h2>A Calm, Welcoming Environment</h2>
        <p>
          [EDIT: Describe the office setting at 139-12 84th Drive, Suite 1G,
          Briarwood, NY. Talk about parking, accessibility, what patients
          experience when they walk in.]
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Procedures ──────────────────────────────────────────────────────────────
export function ProceduresPage() {
  return (
    <PageLayout
      kicker="Comprehensive Care"
      title="Procedures"
      subtitle="From initial evaluation through final restoration, NorthStar offers a full spectrum of surgical and implant procedures."
    >
      <div className="page-section">
        <p className="page-kicker">What We Offer</p>
        <h2>A Full Range of Procedures</h2>
        <p>
          [EDIT: Provide an overview of all procedures offered. This could
          include extractions, bone grafting, sinus lifts, implant placement,
          and restorative coordination.]
        </p>
        <div className="page-card-grid">
          {[
            {
              title: 'Tooth Extractions',
              slug: '/procedure/tooth-extractions',
            },
            { title: 'Bone Grafting', slug: '/procedure/bone-grafting' },
            { title: 'Sinus Lifts', slug: '/procedure/sinus-lifts' },
            {
              title: 'Implant Placement',
              slug: '/procedure/implant-placement',
            },
            {
              title: 'Ridge Preservation',
              slug: '/procedure/ridge-preservation',
            },
            {
              title: 'Restorative Coordination',
              slug: '/procedure/restorative-coordination',
            },
            {
              title: 'Specialized Circumstances Remote Anchorage Implant',
              slug: '/procedure/remote-anchorage-implant',
            },
            {
              title: 'Wisdom Teeth Extractions',
              slug: '/procedure/wisdom-teeth-extractions',
            },
            {
              title: 'Full Mouth Reconstruction',
              slug: '/procedure/full-mouth-reconstruction',
            },
            {
              title: 'Oral Medicine & Pathology — Biopsies',
              slug: '/procedure/oral-medicine-pathology',
            },
            {
              title: 'Pre-Prosthetic Surgery',
              slug: '/procedure/pre-prosthetic-surgery',
            },
            {
              title: 'Impacted / Unerupted Teeth',
              slug: '/procedure/impacted-unerupted-teeth',
            },
            {
              title: 'Maxillary Expansion — MARPE',
              slug: '/procedure/maxillary-expansion-marpe',
            },
            { title: 'Technology', slug: '/procedure/technology' },
          ].map((card) => (
            <div
              key={card.title}
              className="page-card"
              style={{
                cursor: 'pointer',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
              }}
              onClick={() => navigate(card.slug)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 12px 32px rgba(197,157,60,0.18)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate(card.slug);
              }}
            >
              <h3>{card.title}</h3>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#c59d3c',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  marginTop: '0.75rem',
                }}
              >
                Learn More →
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          [EDIT: Walk patients through the general treatment process from
          consultation to completion.]
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Dental Implants ─────────────────────────────────────────────────────────
export function DentalImplantsPage() {
  return (
    <PageLayout
      kicker="Precision Restoration"
      title="Dental Implants"
      subtitle="Modern implant treatment built around diagnostics, digital planning, long-term function, and everyday confidence."
    >
      <div className="page-section">
        <p className="page-kicker">What Is a Dental Implant?</p>
        <h2>A Permanent Foundation for Your Smile</h2>
        <p>
          A dental implant is a small titanium post that is surgically placed
          into the jawbone to replace the root of a missing tooth. Once it fuses
          with the surrounding bone — a process called osseointegration — it
          provides a stable, permanent anchor for a custom-made crown, bridge,
          or full-arch prosthesis. The result is a replacement tooth that looks,
          feels, and functions virtually identically to a natural tooth.
        </p>
        <p>
          Implants are made from medical-grade titanium, a material that is
          exceptionally biocompatible and has been used safely in dental and
          orthopedic surgery for decades. Unlike traditional bridges, which
          require grinding down adjacent healthy teeth, implants stand
          completely on their own. Unlike dentures, they are fixed in place and
          do not slip or require adhesives. With proper care, a well-placed
          implant can last a lifetime — making it one of the most cost-effective
          long-term investments in your oral health.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Am I a Candidate?</p>
        <h2>Who Is a Good Candidate for Implants?</h2>
        <ul>
          <li>
            <strong>Adequate bone density and volume</strong> — sufficient
            jawbone is needed to support the implant. Patients with bone loss
            may require a bone graft prior to placement.
          </li>
          <li>
            <strong>Healthy gums</strong> — active gum disease must be treated
            before implant surgery to ensure a healthy foundation.
          </li>
          <li>
            <strong>Good overall health</strong> — most healthy adults are
            candidates. Certain conditions such as uncontrolled diabetes or
            blood disorders may require additional evaluation.
          </li>
          <li>
            <strong>Non-smoker or willing to quit</strong> — smoking
            significantly impairs healing and reduces implant success rates. We
            strongly encourage patients to stop smoking before and after
            surgery.
          </li>
          <li>
            <strong>Commitment to oral hygiene</strong> — long-term implant
            success depends on consistent brushing, flossing, and regular
            professional maintenance.
          </li>
        </ul>
        <p>
          The best way to determine whether implants are right for you is
          through a comprehensive consultation with our surgical team, which
          includes 3D imaging to assess your bone and anatomy in detail. Even
          patients who have been told they are not candidates elsewhere may have
          options — including bone grafting or specialized remote anchorage
          techniques.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>Step by Step</h2>
        <div className="page-card-grid">
          {[
            {
              title: '1. Consultation',
              body: 'Your journey begins with a comprehensive evaluation including a clinical examination, review of your medical and dental history, and cone beam CT (3D) imaging. This gives our surgeon a complete picture of your bone volume, anatomy, and overall oral health — and forms the foundation of your personalized treatment plan.',
            },
            {
              title: '2. Treatment Planning',
              body: 'Using advanced digital planning software, your surgeon maps the ideal position, angulation, and depth of your implant on a virtual 3D model of your anatomy. In many cases, a custom surgical guide is fabricated from this plan to ensure millimeter-level precision during surgery.',
            },
            {
              title: '3. Implant Placement',
              body: 'The surgical appointment is performed under local anesthesia with sedation options available. A small channel is made in the bone and the titanium implant is carefully seated into position. Most patients are surprised by how comfortable and efficient the procedure is. Any necessary bone grafting is completed at this stage if not done previously.',
            },
            {
              title: '4. Healing (Osseointegration)',
              body: 'Over the next three to six months, the implant gradually fuses with the surrounding bone in a process called osseointegration. During this time, you will wear a temporary restoration if needed and return for follow-up visits so our team can monitor your healing progress.',
            },
            {
              title: '5. Final Restoration',
              body: 'Once osseointegration is confirmed, you return to your restorative dentist for placement of the final crown, bridge, or prosthesis. NorthStar coordinates directly with your restorative provider throughout the process to ensure the final result fits perfectly and functions beautifully.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Ready to Begin?</p>
        <h2>Schedule Your Implant Consultation</h2>
        <p>
          Whether you are missing one tooth or many, dental implants may be the
          life-changing solution you have been looking for. Our team at
          NorthStar Implant Dentistry brings together advanced surgical
          training, state-of-the-art technology, and a genuine commitment to
          patient care. Contact us today to schedule your consultation and take
          the first step toward a permanent, confident smile.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Full-Arch ───────────────────────────────────────────────────────────────
export function FullArchPage() {
  return (
    <PageLayout
      kicker="Complete Smile Support"
      title="Full-Arch Solutions"
      subtitle="Rebuild stability, chewing power, and quality of life with full-arch implant-supported restorations."
    >
      <div className="page-section">
        <p className="page-kicker">What Is Full-Arch?</p>
        <h2>Restoring an Entire Arch of Teeth</h2>
        <p>
          Full-arch implant restoration is a treatment that replaces an entire
          upper or lower arch of missing or failing teeth using just four to six
          strategically placed dental implants. Commonly referred to by names
          such as All-on-4 or All-on-6, this approach supports a full fixed
          prosthesis — a complete set of teeth that is permanently anchored to
          the implants and does not come in or out like traditional dentures.
        </p>
        <p>
          The implants are placed at precise angles to maximize contact with
          available bone, often eliminating the need for extensive bone grafting
          even in patients with significant bone loss. The result is a stable,
          comfortable, and natural-looking set of teeth that restores full
          chewing function, speech, and confidence. For many patients, a
          provisional set of teeth can be delivered on the same day as surgery —
          a life-changing transformation achieved in a single appointment.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Benefits</p>
        <h2>Why Patients Choose Full-Arch</h2>
        <ul>
          <li>
            <strong>Fixed and non-removable</strong> — unlike traditional
            dentures, full-arch restorations are anchored securely and stay in
            place during eating, speaking, and sleeping.
          </li>
          <li>
            <strong>Dramatically improved chewing function</strong> — patients
            can enjoy a wide variety of foods, including those that were
            impossible with loose or uncomfortable dentures.
          </li>
          <li>
            <strong>Bone preservation</strong> — the implants stimulate the
            jawbone just like natural tooth roots, preventing the bone
            resorption that accelerates with denture wear over time.
          </li>
          <li>
            <strong>Natural appearance</strong> — the final prosthesis is
            custom-designed to match your facial features and provide a
            beautiful, proportional smile.
          </li>
          <li>
            <strong>Long-term durability</strong> — with proper care and
            maintenance, full-arch restorations can last many years, making them
            one of the most durable and cost-effective tooth replacement options
            available.
          </li>
          <li>
            <strong>Immediate results in many cases</strong> — many patients
            leave surgery with a functional provisional prosthesis the same day,
            dramatically reducing the time spent without teeth.
          </li>
        </ul>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Journey</p>
        <h2>What Full-Arch Treatment Looks Like</h2>
        <p>
          The process begins with a comprehensive consultation and 3D cone beam
          CT imaging to evaluate your bone volume, anatomy, and overall oral
          health. Our surgical team works closely with your restorative dentist
          to develop a coordinated treatment plan that defines implant
          positions, prosthesis design, and the overall timeline before any
          surgery takes place.
        </p>
        <p>
          On surgery day, any remaining failing teeth are extracted, the
          implants are placed, and — in qualifying cases — a provisional
          prosthesis is attached the same day. Over the following three to six
          months, osseointegration occurs as the implants fuse with the bone.
          Once confirmed, your final custom prosthesis is fabricated and
          delivered by your restorative dentist. The entire journey from
          consultation to final teeth typically spans six to twelve months,
          depending on your individual anatomy and treatment needs. Our team
          supports you at every stage with detailed instructions, follow-up
          visits, and compassionate, attentive care.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Is Full-Arch Right for You?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          Full-arch implant restoration can be life-changing for patients who
          are struggling with failing teeth, ill-fitting dentures, or
          significant tooth loss. NorthStar Implant Dentistry has the surgical
          expertise, advanced technology, and collaborative care model to guide
          you through this process with confidence and precision. Contact us to
          schedule your consultation and find out whether full-arch is the right
          solution for you.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Wisdom Teeth ─────────────────────────────────────────────────────────────
export function WisdomTeethPage() {
  return (
    <PageLayout
      kicker="Surgical Expertise"
      title="Wisdom Teeth"
      subtitle="Expert evaluation, comfort-focused planning, and skilled removal of symptomatic or impacted wisdom teeth."
    >
      <div className="page-section">
        <p className="page-kicker">When Is Removal Necessary?</p>
        <h2>Understanding Wisdom Teeth</h2>
        <p>
          Wisdom teeth — also known as third molars — are the last teeth to
          develop, typically appearing between the ages of 17 and 25. Because
          the modern human jaw often does not have enough space to accommodate
          them, wisdom teeth frequently become impacted — meaning they are
          unable to fully erupt into a normal position. Impacted wisdom teeth
          can cause significant problems if left untreated, including pain,
          infection, damage to neighboring teeth, cyst formation, and crowding
          of the existing bite.
        </p>
        <p>
          Even wisdom teeth that appear to have erupted partially can harbor
          bacteria in the surrounding gum pocket that is extremely difficult to
          clean, making them prone to recurrent infection and decay. In these
          situations, removal is often the most prudent course of action —
          preventing more serious problems down the road and protecting the
          health of the surrounding teeth and bone.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Signs & Symptoms</p>
        <h2>How to Know If Your Wisdom Teeth Are a Problem</h2>
        <ul>
          <li>
            <strong>Pain or pressure at the back of the mouth</strong> —
            persistent aching or sharp pain in the upper or lower jaw near the
            back teeth is one of the most common signs of a problematic wisdom
            tooth.
          </li>
          <li>
            <strong>Swelling, redness, or tenderness of the gums</strong> —
            inflammation around a partially erupted wisdom tooth often indicates
            infection of the surrounding tissue, a condition called
            pericoronitis.
          </li>
          <li>
            <strong>Difficulty opening the mouth or jaw stiffness</strong> —
            infection or inflammation from a wisdom tooth can cause limited jaw
            opening (trismus) and significant discomfort.
          </li>
          <li>
            <strong>Bad taste or odor near the back of the mouth</strong> —
            bacteria trapped beneath a partially erupted wisdom tooth can
            produce a persistent bad taste or smell that does not resolve with
            brushing.
          </li>
          <li>
            <strong>
              Visible partially erupted tooth or flap of gum tissue
            </strong>{' '}
            — a wisdom tooth poking through the gum at an angle, or a flap of
            tissue partially covering it, is a clear sign of impaction that
            warrants evaluation.
          </li>
          <li>
            <strong>Referred pain to the ear, jaw, or head</strong> — wisdom
            tooth pressure can radiate to surrounding structures, sometimes
            being mistaken for earache or headache.
          </li>
        </ul>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Procedure</p>
        <h2>What to Expect During Removal</h2>
        <p>
          Before surgery, cone beam CT (3D) imaging is obtained to map the
          precise position and orientation of each wisdom tooth and its
          proximity to important structures such as the inferior alveolar nerve
          in the lower jaw and the maxillary sinuses above the upper back teeth.
          This imaging allows our surgeons to plan each extraction with maximum
          safety and efficiency.
        </p>
        <p>
          The procedure is performed under local anesthesia. IV sedation is
          available and highly recommended for patients who prefer to be relaxed
          and unaware during the surgery — many patients report having little to
          no memory of the procedure at all. Depending on the degree of
          impaction, the tooth may be sectioned into smaller pieces for easier,
          less traumatic removal. The entire procedure typically takes between
          30 and 90 minutes depending on the number of teeth and complexity.
          Most patients go home the same day and are comfortable within a few
          days.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Recovery</p>
        <h2>Healing After Wisdom Tooth Surgery</h2>
        <p>
          The first 24 to 48 hours after surgery are when swelling, soreness,
          and minor bleeding are most pronounced. Applying ice packs, keeping
          your head elevated, and taking prescribed medications as directed will
          help manage discomfort effectively. A soft diet — including foods like
          yogurt, smoothies, mashed potatoes, and soup — is recommended for the
          first several days. Avoid using straws, smoking, and vigorous rinsing,
          all of which can dislodge the blood clot forming in the socket and
          increase the risk of dry socket.
        </p>
        <p>
          Most patients return to normal daily activities within three to five
          days, with complete tissue healing over the following two to three
          weeks. Our team provides thorough written post-operative instructions
          and is available by phone to answer any questions during your
          recovery. A follow-up visit is typically scheduled one to two weeks
          after surgery to confirm healing is progressing well.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Ready to Schedule?</p>
        <h2>Get an Evaluation Today</h2>
        <p>
          If you are experiencing pain or discomfort in the back of your jaw —
          or if your dentist has recommended wisdom tooth evaluation — do not
          wait. Early assessment and timely removal, when indicated, prevents
          more serious complications and typically results in a faster, easier
          recovery. Contact NorthStar Implant Dentistry to schedule your
          consultation today.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Sedation ────────────────────────────────────────────────────────────────
export function SedationPage() {
  return (
    <PageLayout
      kicker="Comfort-First Approach"
      title="Sedation Options"
      subtitle="Safe, transparent, and calming sedation options so every patient can receive the care they need — comfortably."
    >
      <div className="page-section">
        <p className="page-kicker">Why Sedation?</p>
        <h2>Making Dental Surgery More Comfortable</h2>
        <p>
          Dental anxiety is more common than most people realize — and it should
          never be a barrier to receiving the care you need. At NorthStar
          Implant Dentistry, we take patient comfort seriously and offer a range
          of sedation options to ensure that every procedure, from a simple
          extraction to complex implant surgery, can be performed in a calm,
          relaxed, and pain-free environment.
        </p>
        <p>
          Sedation is recommended for patients who experience dental anxiety or
          fear, patients undergoing lengthy or complex surgical procedures,
          patients with a strong gag reflex, patients who have had difficult
          experiences with dental care in the past, and patients who simply
          prefer to be relaxed and unaware during their treatment. Our team will
          discuss your options, your medical history, and your preferences
          during your consultation to determine the most appropriate level of
          sedation for your procedure.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Your Options</p>
        <h2>Sedation Levels We Offer</h2>
        <div className="page-card-grid">
          {[
            {
              title: 'Local Anesthesia',
              body: 'Local anesthesia is administered by injection at the surgical site, completely numbing the area being treated. It is used in all surgical procedures at NorthStar and ensures you feel no pain during the operation. Patients remain fully awake and alert. For patients undergoing straightforward procedures without significant anxiety, local anesthesia alone may be sufficient.',
            },
            {
              title: 'Nitrous Oxide',
              body: 'Nitrous oxide — commonly known as laughing gas — is inhaled through a small mask placed over the nose. It produces a pleasant sense of relaxation and mild euphoria within minutes, reducing anxiety while keeping you conscious and cooperative. The effects wear off almost immediately after the mask is removed, allowing most patients to drive themselves home after their appointment.',
            },
            {
              title: 'Oral Sedation',
              body: 'Oral sedation involves taking a prescription medication — typically a benzodiazepine such as triazolam or diazepam — approximately one hour before your procedure. The medication produces a moderate level of relaxation and drowsiness, and many patients have little memory of the procedure afterward. A responsible adult must accompany you to and from your appointment when oral sedation is used.',
            },
            {
              title: 'IV Sedation',
              body: 'Intravenous (IV) sedation delivers sedative medication directly into the bloodstream through a small catheter placed in the arm. It produces a deep state of relaxation in which most patients have little to no awareness or memory of the procedure — sometimes described as being "asleep" even though you are technically conscious and breathing on your own. IV sedation is ideal for complex surgeries, highly anxious patients, and full-arch procedures. A responsible adult must drive you home afterward.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Safety</p>
        <h2>Our Commitment to Your Safety</h2>
        <p>
          Patient safety is our highest priority during every sedation
          procedure. All sedation at NorthStar is administered and monitored by
          trained professionals following established protocols and guidelines.
          Throughout your procedure, your vital signs — including blood
          pressure, heart rate, oxygen saturation, and respiratory rate — are
          continuously monitored using state-of-the-art equipment. Emergency
          reversal agents, oxygen, and resuscitation equipment are always
          immediately available.
        </p>
        <p>
          Prior to any sedation, a thorough review of your medical history,
          current medications, and allergies is conducted to identify any
          contraindications and customize your sedation plan for maximum safety
          and effectiveness. Our team will provide you with detailed
          pre-operative instructions — including fasting guidelines and
          medication adjustments — to ensure your procedure proceeds safely.
          Your comfort and safety are never compromised.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Ready to Schedule?</p>
        <h2>Let Us Make Your Experience Comfortable</h2>
        <p>
          You should never avoid needed dental care because of fear or anxiety.
          At NorthStar, we are committed to creating an environment where every
          patient feels safe, respected, and cared for — regardless of their
          level of dental anxiety. Contact us to discuss your sedation options
          and take the first step toward stress-free care.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Patient Information ──────────────────────────────────────────────────────
export function PatientInfoPage() {
  return (
    <PageLayout
      kicker="Prepare for Your Visit"
      title="Patient Information"
      subtitle="Everything you need to know before, during, and after your appointment at NorthStar."
    >
      <div className="page-section">
        <p className="page-kicker">New Patients</p>
        <h2>What to Bring to Your First Visit</h2>
        <ul>
          <li>
            <strong>Photo ID</strong> — a valid government-issued photo
            identification such as a driver's license or passport.
          </li>
          <li>
            <strong>Insurance card</strong> — bring your dental and/or medical
            insurance card if applicable. We will verify your coverage and
            explain your benefits at your appointment.
          </li>
          <li>
            <strong>List of current medications</strong> — include the name,
            dosage, and frequency of all prescription medications,
            over-the-counter drugs, vitamins, and supplements you take
            regularly.
          </li>
          <li>
            <strong>Completed new patient forms</strong> — to save time at your
            appointment, please complete your new patient forms in advance. You
            can access them on our Patient Forms page.
          </li>
          <li>
            <strong>Recent X-rays or dental records</strong> — if you have had
            recent dental X-rays or a cone beam CT scan taken elsewhere, please
            bring them or request that they be forwarded to our office prior to
            your visit. This can reduce duplication and help us evaluate your
            case more efficiently.
          </li>
          <li>
            <strong>A list of questions</strong> — we encourage you to write
            down any questions or concerns you have about your oral health or
            proposed treatment so we can address them thoroughly during your
            appointment.
          </li>
        </ul>
      </div>

      <div className="page-section">
        <p className="page-kicker">Forms</p>
        <h2>
          <span
            onClick={() => navigate('/patient-forms')}
            style={{
              cursor: 'pointer',
              color: '#c59d3c',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(197,157,60,0.4)',
              textUnderlineOffset: '4px',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecorationColor = '#c59d3c')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecorationColor =
                'rgba(197,157,60,0.4)')
            }
          >
            Patient Forms
          </span>
        </h2>
        <p>
          Please complete your patient forms before your first visit to help us
          serve you efficiently. You can access all required forms — including
          the Registration Form, Medical History, Dental History, Financial
          Policy, and HIPAA Acknowledgment — on our dedicated Patient Forms
          page. Click the link above or use the Patient Forms button on our home
          page to get started.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Insurance & Financing</p>
        <h2>Payment & Coverage Options</h2>
        <p>
          NorthStar Implant Dentistry accepts most major dental insurance plans
          and will work with your carrier to maximize your benefits. Our team
          will review your coverage prior to treatment and provide a clear
          explanation of your out-of-pocket responsibilities before any
          procedure begins. We believe financial considerations should never
          stand in the way of the care you need — and we are committed to
          transparency and communication every step of the way.
        </p>
        <p>
          For patients without insurance or for procedures not covered by
          insurance, we offer flexible financing options through third-party
          providers including CareCredit and Lending Club Patient Solutions.
          These programs allow you to spread the cost of treatment over
          manageable monthly payments, often with low or no interest options for
          qualified applicants. Ask our team for details during your
          consultation.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Before Your Procedure</p>
        <h2>Pre-Operative Instructions</h2>
        <p>
          Proper preparation before your procedure helps ensure your safety and
          a smooth surgical experience. If you are receiving IV sedation or
          general anesthesia, you must not eat or drink anything — including
          water — for at least eight hours before your scheduled appointment
          time. A responsible adult must accompany you to and from the office
          and remain available to assist you for the remainder of the day.
        </p>
        <p>
          If you take daily medications, ask our office whether you should
          continue taking them on the morning of surgery — some medications
          should be taken as usual with a small sip of water, while others may
          need to be temporarily adjusted. Wear comfortable, loose-fitting
          clothing with short or rolled-up sleeves to allow easy access to your
          arm for IV placement if needed. Remove contact lenses and avoid
          wearing nail polish on the day of surgery as these can interfere with
          monitoring equipment.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">After Your Procedure</p>
        <h2>Post-Operative Care</h2>
        <p>
          Following surgery, rest is essential for the first 24 hours. Avoid
          strenuous physical activity, bending, and lifting for at least two to
          three days. Keep your head elevated — even while sleeping — to
          minimize swelling. Apply ice packs to the outside of your face in
          20-minute intervals during the first 24 to 48 hours to reduce swelling
          and discomfort. Do not use ice after 48 hours; gentle heat may be
          applied thereafter if needed.
        </p>
        <p>
          Eat soft foods and stay well hydrated. Avoid hard, crunchy, or spicy
          foods until instructed otherwise. Do not use a straw, smoke, or rinse
          vigorously for at least 48 hours following extraction procedures, as
          this can dislodge the protective blood clot from the surgical site.
          Take all prescribed medications exactly as directed. If you experience
          excessive bleeding, severe swelling, fever, or unusual pain not
          controlled by medication, contact our office immediately.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Technology ──────────────────────────────────────────────────────────────
export function TechnologyPage() {
  return (
    <PageLayout
      kicker="Digitally Guided Care"
      title="Technology"
      subtitle="Advanced imaging, diagnostics, and digital planning tools that support predictable outcomes and clear communication."
    >
      <div className="page-section">
        <p className="page-kicker">Our Technology</p>
        <h2>Precision Tools for Better Outcomes</h2>
        <p>
          At NorthStar Implant Dentistry, advanced technology is not a luxury —
          it is a fundamental part of how we deliver safe, predictable, and
          exceptional care. Every tool we invest in serves a direct purpose: to
          give our surgeons better information, improve the accuracy of every
          procedure, and provide our patients with outcomes they can trust. From
          the moment you walk in for a consultation to the final placement of
          your restoration, technology guides every decision we make.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Imaging</p>
        <h2>3D Cone Beam CT Imaging</h2>
        <p>
          Our in-office cone beam computed tomography (CBCT) scanner produces
          high-resolution three-dimensional images of your teeth, jawbone,
          nerves, sinuses, and surrounding craniofacial structures in a single
          low-radiation scan completed in under a minute. Unlike conventional
          two-dimensional dental X-rays, CBCT imaging reveals your anatomy in
          all three planes — allowing our surgeons to measure bone volume and
          density at the exact implant site, identify the precise location of
          the inferior alveolar nerve and maxillary sinuses, detect pathology
          that is invisible on 2D films, and plan complex procedures with a
          level of anatomical awareness that simply was not possible a
          generation ago.
        </p>
        <p>
          This imaging is standard for all implant evaluations, bone grafting
          assessments, wisdom tooth extractions, and complex surgical cases at
          NorthStar. It forms the foundation of every treatment plan we create.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Digital Planning</p>
        <h2>Guided Implant Surgery</h2>
        <p>
          Using specialized implant planning software, our surgeons import your
          CBCT scan and create a precise virtual model of your anatomy. On this
          digital model, each implant is planned to the exact position, depth,
          and angulation that will produce the best surgical and restorative
          outcome. Bone quality, available width and height, proximity to nerves
          and sinuses, and the planned restorative design are all factored into
          the virtual plan before a single incision is made.
        </p>
        <p>
          From this digital plan, a custom surgical guide can be fabricated — a
          precisely fitting appliance that is placed over your teeth during
          surgery and directs the drill to the exact planned position,
          eliminating guesswork and dramatically reducing the margin of error.
          Guided surgery results in more accurate implant placement, shorter
          procedure times, less tissue trauma, and more predictable healing
          outcomes. It represents the highest standard of care in modern implant
          dentistry.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Additional Tools</p>
        <h2>More Technology We Use</h2>
        <div className="page-card-grid">
          {[
            {
              title: 'Digital Intraoral Scanning',
              body: 'Intraoral scanners capture precise digital impressions of your teeth and gums without the need for traditional impression trays and materials. The result is a highly accurate digital model that can be shared electronically with your restorative dentist or dental laboratory, improving the fit and quality of crowns, bridges, and prostheses while reducing chair time and patient discomfort.',
            },
            {
              title: 'Piezoelectric Surgery',
              body: 'Piezoelectric ultrasonic instruments use precisely controlled vibrations to cut bone with exceptional accuracy while leaving soft tissue — including nerves and blood vessels — virtually unharmed. This technology is particularly valuable during sinus lifts, bone grafting, and nerve proximity procedures, where protecting adjacent structures is paramount. Patients typically experience less swelling and faster healing compared to conventional rotary instruments.',
            },
            {
              title: 'Platelet-Rich Fibrin (PRF)',
              body: "Platelet-Rich Fibrin (PRF) is a regenerative technique in which a small sample of the patient's own blood is spun in a centrifuge to concentrate growth factors and platelets. The resulting membrane or gel is applied to surgical sites to accelerate tissue healing, promote bone regeneration, and reduce post-operative inflammation. PRF is a natural, safe, and effective way to enhance outcomes in grafting and implant procedures.",
            },
          ].map((card, i) => (
            <div key={i} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Experience the Difference</p>
        <h2>See Our Technology Firsthand</h2>
        <p>
          We welcome you to visit NorthStar and see our facility and technology
          for yourself. Our team is happy to walk you through our diagnostic and
          planning process so you can understand exactly how your care will be
          delivered before committing to treatment. Contact us to schedule your
          consultation today.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function TestimonialsPage() {
  const testimonials = [
    {
      quote: '[EDIT: Paste real patient review here.]',
      name: '[EDIT: Patient First Name]',
      procedure: '[EDIT: Procedure type]',
    },
    {
      quote: '[EDIT: Paste real patient review here.]',
      name: '[EDIT: Patient First Name]',
      procedure: '[EDIT: Procedure type]',
    },
    {
      quote: '[EDIT: Paste real patient review here.]',
      name: '[EDIT: Patient First Name]',
      procedure: '[EDIT: Procedure type]',
    },
    {
      quote: '[EDIT: Paste real patient review here.]',
      name: '[EDIT: Patient First Name]',
      procedure: '[EDIT: Procedure type]',
    },
    {
      quote: '[EDIT: Paste real patient review here.]',
      name: '[EDIT: Patient First Name]',
      procedure: '[EDIT: Procedure type]',
    },
    {
      quote: '[EDIT: Paste real patient review here.]',
      name: '[EDIT: Patient First Name]',
      procedure: '[EDIT: Procedure type]',
    },
  ];

  return (
    <PageLayout
      kicker="Patient Trust"
      title="Testimonials"
      subtitle="Real stories from real patients about their experience at NorthStar Implant Dentistry."
    >
      <div className="page-section">
        <p className="page-kicker">What Patients Say</p>
        <h2>Voices from Our Community</h2>
        <div className="page-card-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="page-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                "{t.quote}"
              </p>
              <div>
                <p style={{ fontWeight: 600, margin: 0, color: '#07111c' }}>
                  — {t.name}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#c59d3c', margin: 0 }}>
                  {t.procedure}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Leave a Review</p>
        <h2>Share Your Experience</h2>
        <p>
          Your feedback means the world to us and helps future patients make
          informed decisions about their care. If you have been a patient at
          NorthStar Implant Dentistry, we would be deeply grateful if you took a
          moment to share your experience. You can leave a review on Google,
          Healthgrades, or Yelp — links below.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '1rem',
          }}
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              background: '#c59d3c',
              color: '#fff',
              borderRadius: '0.4rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ⭐ Review on Google
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              background: '#07111c',
              color: '#c59d3c',
              border: '1.5px solid #c59d3c',
              borderRadius: '0.4rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ⭐ Review on Healthgrades
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              background: '#07111c',
              color: '#c59d3c',
              border: '1.5px solid #c59d3c',
              borderRadius: '0.4rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ⭐ Review on Yelp
          </a>
        </div>
      </div>
    </PageLayout>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export function ContactPage() {
  const [formState, handleFormspreeSubmit] = useForm('xbdpbdkj');

  return (
    <PageLayout
      kicker="Start Here"
      title="Contact & Schedule"
      subtitle="Reach out to schedule a consultation or ask questions about implants, wisdom teeth, sedation, or any of our services."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '1.5rem',
        }}
      >
        {/* Info column */}
        <div>
          <div className="page-section">
            <p className="page-kicker">Office Locations</p>
            <h2>Find Us</h2>
            {[
              {
                name: 'Briarwood, NY',
                address: '139-12 84th Drive, Suite 1G, Briarwood, NY',
                phone: '631-315-1400',
                tel: '6313151400',
                maps: 'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY',
              },
              {
                name: 'New York, NY',
                address: '333 East 34th Street, Suite M1, New York, NY 10016',
                phone: '631-315-1400',
                tel: '6313151400',
                maps: 'https://maps.google.com/?q=333+East+34th+Street+Suite+M1+New+York+NY+10016',
              },
              {
                name: 'Commack, NY',
                address: '283 Commack Road, Suite 130, Commack, NY 11725',
                phone: '631-315-1400',
                tel: '6313151400',
                maps: 'https://maps.google.com/?q=283+Commack+Road+Suite+130+Commack+NY+11725',
              },
            ].map((loc) => (
              <div
                key={loc.name}
                style={{
                  marginBottom: '1.25rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid #e8ecf2',
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    color: '#07111c',
                    margin: '0 0 0.25rem',
                    fontSize: '1.05rem',
                  }}
                >
                  {loc.name}
                </p>
                <p style={{ margin: '0 0 0.25rem', color: '#4a5668' }}>
                  {loc.address}
                </p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  <a href={`tel:${loc.tel}`} style={{ color: '#c59d3c' }}>
                    {loc.phone}
                  </a>
                </p>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                    color: '#1d1302',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  Get Directions
                </a>
              </div>
            ))}
            <p>
              <strong>Hours:</strong>
              <br />
              [Mon–Fri: 9am–9pm
Sat: 9am–3pm
Sun: Emergency appointments only — call 631-315-1400]
            </p>
          </div>
          <div className="page-section">
            <p className="page-kicker">Directions</p>
            <h2>Getting Here</h2>
            <p>
              [EDIT: Add parking information, nearby landmarks, or public
              transit directions for each location.]
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginTop: '0.75rem',
              }}
            >
              <a
                href="https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                  color: '#1d1302',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                Briarwood, NY → Maps
              </a>
              <a
                href="https://maps.google.com/?q=333+East+34th+Street+Suite+M1+New+York+NY+10016"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                  color: '#1d1302',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                New York, NY → Maps
              </a>
              <a
                href="https://maps.google.com/?q=283+Commack+Road+Suite+130+Commack+NY+11725"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                  color: '#1d1302',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                Commack, NY → Maps
              </a>
            </div>
          </div>
        </div>

        {/* Form column */}
        <div className="page-section">
          <p className="page-kicker">Get in Touch</p>
          <h2>Request a Consultation</h2>

          {formState.succeeded ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p style={{ fontSize: '2.5rem' }}>🌟</p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#07111c',
                }}
              >
                Message Received!
              </h3>
              <p style={{ color: '#5a6a7e' }}>
                Thank you for reaching out. Dr. Kampf's team will be in touch
                with you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleFormspreeSubmit}
              style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <label
                  style={{
                    display: 'grid',
                    gap: '0.3rem',
                    fontSize: '0.88rem',
                    color: '#4a5668',
                  }}
                >
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Jane"
                    required
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '0.6rem',
                      border: '1px solid #dde3ed',
                      fontSize: '0.95rem',
                    }}
                  />
                </label>
                <label
                  style={{
                    display: 'grid',
                    gap: '0.3rem',
                    fontSize: '0.88rem',
                    color: '#4a5668',
                  }}
                >
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Smith"
                    required
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '0.6rem',
                      border: '1px solid #dde3ed',
                      fontSize: '0.95rem',
                    }}
                  />
                </label>
              </div>
              <label
                style={{
                  display: 'grid',
                  gap: '0.3rem',
                  fontSize: '0.88rem',
                  color: '#4a5668',
                }}
              >
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  required
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #dde3ed',
                    fontSize: '0.95rem',
                  }}
                />
                <ValidationError
                  field="email"
                  prefix="Email"
                  errors={formState.errors}
                  style={{ color: '#dc2626', fontSize: '0.82rem' }}
                />
              </label>
              <label
                style={{
                  display: 'grid',
                  gap: '0.3rem',
                  fontSize: '0.88rem',
                  color: '#4a5668',
                }}
              >
                Phone
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 000-0000"
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #dde3ed',
                    fontSize: '0.95rem',
                  }}
                />
              </label>
              <label
                style={{
                  display: 'grid',
                  gap: '0.3rem',
                  fontSize: '0.88rem',
                  color: '#4a5668',
                }}
              >
                Message
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="I'd like to learn more about..."
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #dde3ed',
                    fontSize: '0.95rem',
                    resize: 'vertical',
                  }}
                />
                <ValidationError
                  field="message"
                  prefix="Message"
                  errors={formState.errors}
                  style={{ color: '#dc2626', fontSize: '0.82rem' }}
                />
              </label>
              <button
                type="submit"
                disabled={formState.submitting}
                style={{
                  padding: '0.85rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                  color: '#1d1302',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: formState.submitting ? 'not-allowed' : 'pointer',
                  opacity: formState.submitting ? 0.7 : 1,
                }}
              >
                {formState.submitting ? 'Sending…' : 'Submit Inquiry'}
              </button>
              <p style={{ color: '#5a6a7e', fontSize: '0.85rem', margin: 0 }}>
                Your message goes directly to the NorthStar team.
              </p>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

// ─── Locations ───────────────────────────────────────────────────────────────
export function LocationsPage() {
  const locations = [
    {
      name: 'Briarwood, NY',
      address: '139-12 84th Drive, Suite 1G',
      city: 'Briarwood, NY',
      phone: '631-315-1400',
      tel: '6313151400',
      maps: 'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY',
      parking: 'Briarwood — 139-12 84th Drive, Suite 1G
      Accessible by E and F subway lines (Briarwood/Van Wyck Blvd station).
      Public parking garage available nearby.',
      hours: `Mon–Fri: 9am–9pm · Sat: 9am–3pm · Sun: Emergency only, call 631-315-1400`,
    },
    {
      name: 'New York, NY',
      address: '333 East 34th Street, Suite M1',
      city: 'New York, NY 10016',
      phone: '631-315-1400',
      tel: '6313151400',
      maps: 'https://maps.google.com/?q=333+East+34th+Street+Suite+M1+New+York+NY+10016',
      parking: 'Briarwood — 139-12 84th Drive, Suite 1G
      Accessible by E and F subway lines (Briarwood/Van Wyck Blvd station).
      Public parking garage available nearby.
      hours: `Mon–Fri: 9am–9pm · Sat: 9am–3pm · Sun: Emergency only, call 631-315-1400`,
    },
    {
      name: 'Commack, NY',
      address: '283 Commack Road, Suite 130',
      city: 'Commack, NY 11725',
      phone: '631-315-1400',
      tel: '6313151400',
      maps: 'https://maps.google.com/?q=283+Commack+Road+Suite+130+Commack+NY+11725',
      Commack — 283 Commack Road, Suite 130
      Free on-site parking available. Easily accessible from the Northern State Parkway.',
      hours: `Mon–Fri: 9am–9pm · Sat: 9am–3pm · Sun: Emergency only, call 631-315-1400`,
    },
  ];

  return (
    <PageLayout
      kicker="Our Offices"
      title="Locations"
      subtitle="NorthStar Implant Dentistry serves patients across three convenient locations in the New York area."
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {locations.map((loc) => (
          <div
            key={loc.name}
            className="page-section"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            <div>
              <p className="page-kicker">{loc.city}</p>
              <h2>{loc.name}</h2>
              <p>
                <strong>Address:</strong>
                <br />
                {loc.address}
                <br />
                {loc.city}
              </p>
              <p>
                <strong>Phone:</strong>
                <br />
                <a href={`tel:${loc.tel}`} style={{ color: '#c59d3c' }}>
                  {loc.phone}
                </a>
              </p>
              <p>
                <strong>Hours:</strong>
                <br />
                {loc.hours}
              </p>
              <a
                href={loc.maps}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.75rem',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                  color: '#1d1302',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Get Directions
              </a>
            </div>
            <div>
              <p>
                <strong>Parking &amp; Access:</strong>
              </p>
              <p>{loc.parking}</p>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

// ─── Patient Forms ────────────────────────────────────────────────────────────
export function PatientFormsPage() {
  const forms = [
    {
      title: 'Registration Form',
      icon: '📋',
      description:
        'New patients please complete the registration form prior to your first visit. This helps us set up your patient profile and ensure a smooth check-in experience.',
      fields: [
        'Full Legal Name',
        'Date of Birth',
        'Address',
        'Phone Number',
        'Email Address',
        'Emergency Contact',
        'Insurance Information',
      ],
    },
    {
      title: 'Medical History Form',
      icon: '🏥',
      description:
        'A complete and accurate medical history is essential for safe dental care. Please list all current medications, allergies, and medical conditions.',
      fields: [
        'Current Medications',
        'Known Allergies',
        'Medical Conditions',
        'Previous Surgeries',
        'Primary Care Physician',
        'Blood Pressure / Heart Conditions',
        'Diabetes / Bleeding Disorders',
      ],
    },
    {
      title: 'Dental History Form',
      icon: '🦷',
      description:
        'Your dental history helps our team understand your previous care, any concerns you have, and how to best approach your treatment.',
      fields: [
        'Last Dental Visit',
        'Previous Dentist',
        'Past Dental Procedures',
        'Dental Anxiety Level',
        'Chief Complaint / Reason for Visit',
        'Previous Implants or Extractions',
        'Current Dental Concerns',
      ],
    },
    {
      title: 'Financial Policy',
      icon: '💳',
      description:
        'Please review our financial policy before your appointment. We are committed to transparency around fees, insurance coordination, and payment options.',
      fields: [
        'Insurance Assignment of Benefits',
        'Co-Payment Policy',
        'Payment Plan Options',
        'Cancellation Policy',
        'Outstanding Balance Policy',
        'Accepted Payment Methods',
      ],
    },
    {
      title: 'The UPFRONT Contract',
      icon: '📝',
      description:
        'The UPFRONT Contract outlines the mutual commitments between NorthStar Implant Dentistry and our patients — ensuring clarity, transparency, and trust from the very first visit.',
      fields: [
        'Treatment Plan Agreement',
        'Fee Disclosure',
        'Patient Responsibilities',
        'Practice Responsibilities',
        'Communication Expectations',
        'Right to Modify Treatment',
      ],
    },
    {
      title: 'Consent Forms',
      icon: '✅',
      description:
        'Informed consent forms are required before any surgical or procedural treatment. Please read carefully and ask any questions before signing.',
      fields: [
        'Surgical Consent',
        'Anesthesia / Sedation Consent',
        'Implant Placement Consent',
        'Extraction Consent',
        'Risks & Alternatives Acknowledgment',
        'Post-Operative Instructions Acknowledgment',
      ],
    },
    {
      title: 'HIPAA Policy',
      icon: '🔒',
      description:
        'Your privacy is our priority. Our HIPAA Notice of Privacy Practices explains how your personal health information is collected, used, and protected.',
      fields: [
        'Notice of Privacy Practices',
        'Authorization to Release Records',
        'Preferred Contact Method',
        'Authorized Representatives',
        'Right to Access Records',
        'Complaint Procedures',
      ],
    },
  ];

  return (
    <PageLayout
      kicker="Patient Resources"
      title="Patient Forms"
      subtitle="Please complete the following forms prior to your visit. If you have any questions, don't hesitate to call our office."
    >
      <div style={{ display: 'grid', gap: '2rem' }}>
        {forms.map((form) => (
          <div
            key={form.title}
            className="page-section"
            style={{ borderLeft: '4px solid #c59d3c', paddingLeft: '1.5rem' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{form.icon}</span>
              <h2 style={{ margin: 0 }}>{form.title}</h2>
            </div>
            <p style={{ marginBottom: '1rem' }}>{form.description}</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              {form.fields.map((field) => (
                <div
                  key={field}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.6rem',
                    background: 'rgba(197,157,60,0.07)',
                    border: '1px solid rgba(197,157,60,0.2)',
                    fontSize: '0.88rem',
                    color: '#4a5668',
                  }}
                >
                  <span style={{ color: '#c59d3c', fontWeight: 700 }}>·</span>{' '}
                  {field}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                  color: '#1d1302',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                📄 Download Form
              </button>
              <button
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '999px',
                  background: 'transparent',
                  color: '#c59d3c',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: '1px solid rgba(197,157,60,0.5)',
                  cursor: 'pointer',
                }}
              >
                ✏️ Fill Out Online
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="page-section"
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '2rem',
          background: 'rgba(197,157,60,0.06)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(197,157,60,0.2)',
        }}
      >
        <p
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Need help completing your forms?
        </p>
        <p style={{ color: '#4a5668', marginBottom: '1rem' }}>
          Our team is happy to assist you. Call us at any of our three locations
          or stop by the office.
        </p>
        <a
          href="/contact"
          style={{
            display: 'inline-block',
            padding: '0.65rem 1.8rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
            color: '#1d1302',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Contact Us
        </a>
      </div>
    </PageLayout>
  );
}

// ─── Procedure Detail Pages ───────────────────────────────────────────────────
function ProcedureDetailPage({
  title,
  kicker,
  subtitle,
}: {
  title: string;
  kicker: string;
  subtitle: string;
}) {
  return (
    <PageLayout kicker={kicker} title={title} subtitle={subtitle}>
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          [EDIT: Provide a detailed overview of {title}. Explain what the
          procedure involves, who it is for, and what patients can expect.]
        </p>
        <p>
          [EDIT: Add additional context — clinical indications, ideal
          candidates, and how this procedure fits within NorthStar's overall
          treatment philosophy.]
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          [EDIT: Walk the patient through the procedure step by step — from the
          initial consultation and diagnosis through surgery, recovery, and
          follow-up care.]
        </p>
        <p>
          [EDIT: Address common patient concerns such as pain management,
          downtime, and timeline to full recovery.]
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          [EDIT: Describe expected outcomes, success rates, and long-term
          maintenance considerations for this procedure.]
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          [EDIT: Invite patients to book a consultation to discuss this
          procedure. Reinforce NorthStar's commitment to personalized care and
          transparent communication.]
        </p>
      </div>
    </PageLayout>
  );
}

export function ToothExtractionsPage() {
  return (
    <PageLayout
      kicker="Surgical Care"
      title="Tooth Extractions"
      subtitle="Safe, precise removal of damaged or problematic teeth with a focus on comfort and healing."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Tooth extraction is the careful removal of a tooth from its socket in
          the jawbone. While our goal is always to preserve natural teeth
          whenever possible, extraction becomes necessary when a tooth is too
          damaged or decayed to be saved, is causing overcrowding, or poses a
          risk to surrounding teeth and bone. At NorthStar Implant Dentistry,
          extractions are performed with surgical precision, minimizing trauma
          to the surrounding tissue to optimize healing and prepare the site for
          future restoration.
        </p>
        <p>
          Common reasons for extraction include severe decay, advanced
          periodontal disease, a broken or fractured tooth that cannot be
          repaired, or teeth that are blocking the proper eruption of other
          teeth. In many cases, extraction is the first step in a broader
          treatment plan that includes dental implants or other restorative
          options.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Your treatment begins with a comprehensive consultation and cone beam
          CT imaging to evaluate the tooth, surrounding bone, and nearby
          anatomical structures. Local anesthesia is administered to ensure you
          are completely comfortable throughout the procedure. For more complex
          cases — such as impacted or broken teeth — sedation options are
          available.
        </p>
        <p>
          The extraction itself is performed using specialized instruments
          designed to gently loosen and remove the tooth while preserving as
          much surrounding bone as possible. Following removal, the socket is
          thoroughly cleaned and prepared. Depending on your treatment plan,
          bone grafting material may be placed at the same visit to maintain
          bone volume for a future implant. Most patients experience mild
          soreness for a few days, which is well managed with prescribed or
          over-the-counter pain relief.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          Most extraction sites heal fully within a few weeks, with bone
          remodeling continuing over several months. Following post-operative
          instructions — including soft diet, proper oral hygiene, and avoiding
          smoking — significantly improves healing outcomes. When extraction is
          combined with ridge preservation or bone grafting, patients are well
          positioned for a successful implant placement once healing is
          complete. Our team will monitor your recovery closely and guide you
          through each stage of your treatment plan.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you have been told a tooth needs to be removed — or if you are
          experiencing significant pain, swelling, or damage — we encourage you
          to schedule a consultation with our team. At NorthStar, we take the
          time to thoroughly evaluate your situation, explain all of your
          options, and ensure you feel confident and informed every step of the
          way. Your comfort and long-term oral health are our highest
          priorities.
        </p>
      </div>
    </PageLayout>
  );
}
export function BoneGraftingPage() {
  return (
    <PageLayout
      kicker="Foundation Building"
      title="Bone Grafting"
      subtitle="Restoring bone volume and density to create a stable foundation for dental implants."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>What Is Bone Grafting?</h2>
        <p>
          Bone grafting is a surgical procedure that rebuilds or augments areas
          of the jaw where bone has been lost or is insufficient to support a
          dental implant. When a tooth is lost, the surrounding jawbone begins
          to deteriorate almost immediately — a process called resorption.
          Without the stimulation provided by a tooth root, the bone gradually
          shrinks in both height and width. Over time, this bone loss can make
          implant placement impossible using conventional techniques, and can
          even alter the shape of the face and jaw.
        </p>
        <p>
          Bone grafting reverses this process by introducing graft material into
          the deficient area, stimulating the body's natural healing response
          and encouraging new bone cells to grow. Once the graft has matured and
          integrated — a process that typically takes three to six months — the
          site is ready to receive a dental implant with the strength and
          stability needed for long-term success. At NorthStar Implant
          Dentistry, bone grafting is performed with surgical precision using
          the most advanced materials and techniques available, always with the
          long-term implant outcome firmly in mind.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Who Needs a Bone Graft?</p>
        <h2>Common Reasons for Bone Loss</h2>
        <div className="page-card-grid">
          {[
            {
              title: 'Tooth Extraction',
              body: 'Bone loss begins within days of a tooth being removed. Without a socket preservation graft placed at the time of extraction, significant volume can be lost within the first few months — often making a future implant impossible without additional grafting.',
            },
            {
              title: 'Long-Term Missing Teeth',
              body: 'Patients who have been missing teeth for months or years — whether with or without a denture — typically experience progressive bone resorption at the site. The longer the tooth has been missing, the more bone is usually lost.',
            },
            {
              title: 'Gum Disease (Periodontitis)',
              body: 'Advanced gum disease destroys the bone that supports the teeth. Even after the infection is treated, the resulting bone defects often require grafting before implants can be placed.',
            },
            {
              title: 'Trauma or Injury',
              body: 'Accidents, fractures, or infections can result in localized bone loss that requires reconstruction before functional and aesthetic restoration is possible.',
            },
            {
              title: 'Failed Implants',
              body: 'When an implant fails — due to infection, improper placement, or other causes — it often leaves a defect in the bone that must be grafted before a replacement implant can be attempted.',
            },
            {
              title: 'Congenital Deficiency',
              body: 'Some patients are born with areas of underdeveloped bone in the jaw. Grafting can address these deficiencies and create viable implant sites where none previously existed.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Types of Graft Material</p>
        <h2>What Is Used to Rebuild the Bone?</h2>
        <p>
          Not all bone grafts are the same — the type of material used depends
          on the size and location of the defect, the patient's medical history,
          and the specific goals of treatment. At NorthStar, we select graft
          materials carefully based on clinical evidence and the individual
          needs of each patient.
        </p>
        <div className="page-card-grid">
          {[
            {
              title: 'Autograft (Your Own Bone)',
              body: "Bone harvested from the patient's own body — typically from the chin, jaw, or hip — is considered the gold standard because it contains living bone cells and natural growth factors. It integrates most predictably but requires a second surgical site.",
            },
            {
              title: 'Allograft (Donor Bone)',
              body: 'Processed bone from a human donor, obtained from a certified bone bank. Allografts are rigorously screened and sterilized for safety. They eliminate the need for a donor site and are one of the most commonly used graft materials in implant dentistry.',
            },
            {
              title: 'Xenograft (Animal-Derived Bone)',
              body: 'Most commonly derived from bovine (cow) sources, xenografts are processed to remove all organic material, leaving only the mineral scaffold. They serve as an excellent framework that the body gradually replaces with its own bone over time.',
            },
            {
              title: 'Alloplast (Synthetic Bone)',
              body: 'Man-made materials — including hydroxyapatite, calcium phosphate, and bioactive glass — that mimic the mineral composition of natural bone. They are an excellent option for patients who prefer to avoid human or animal-derived products.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Watch & Learn</p>
        <h2>Bone Grafting in Action</h2>
        <p>
          Watch the video below for a closer look at the bone grafting process
          and what it means for your implant journey.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1.5rem 0',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '9/16',
            }}
          >
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2817005775309255%2F&show_text=false&width=267&t=0"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                overflow: 'hidden',
                borderRadius: '0.75rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                display: 'block',
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Your bone grafting journey begins with a comprehensive evaluation
          including cone beam CT (3D) imaging to precisely measure the amount of
          bone available, identify the extent of the deficiency, and plan the
          most appropriate grafting approach. This imaging is essential — it
          allows Dr. Kampf to design a surgical plan that maximizes bone volume
          at the implant site while minimizing trauma to surrounding tissues.
        </p>
        <p>
          The procedure itself is performed under local anesthesia, with IV
          sedation available for patients who prefer to be relaxed and unaware
          during surgery. A small incision is made in the gum to expose the
          underlying bone, and the graft material is carefully placed and
          secured within the defect. In many cases, a membrane — a thin barrier
          made of collagen or titanium — is placed over the graft to protect it
          and guide bone growth. The gum tissue is then closed over the site
          with sutures.
        </p>
        <p>
          Healing varies depending on the size of the graft. Smaller socket
          preservation grafts may be ready for implant placement in as little as
          three to four months. Larger block grafts or sinus augmentations may
          require six to nine months of healing before the bone is mature enough
          to support an implant. During this healing period, our team monitors
          your progress with follow-up imaging and clinic visits to confirm
          integration is proceeding as planned.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Recovery</p>
        <h2>After the Procedure</h2>
        <p>
          Most patients experience mild to moderate soreness and swelling in the
          first three to five days following bone grafting, which is well
          managed with prescribed or over-the-counter pain relief and cold
          compresses. A soft diet is recommended for the first week, and
          strenuous physical activity should be avoided for several days. It is
          important not to disturb the graft site — avoid smoking, using straws,
          or pressing on the area with your tongue or finger.
        </p>
        <p>
          Our team provides detailed written post-operative instructions and is
          available by phone throughout your recovery. A follow-up visit is
          typically scheduled one to two weeks after surgery to check healing,
          remove sutures if needed, and answer any questions. Cone beam CT
          imaging will be taken at the appropriate interval to confirm the graft
          has matured before implant placement is scheduled.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Success</h2>
        <p>
          When performed by an experienced surgeon using high-quality materials,
          bone grafting has a high success rate and provides a reliable
          foundation for implant placement. Grafted bone that fully integrates
          is functionally equivalent to native bone — it supports implants with
          the same stability and longevity as naturally abundant bone. The key
          to long-term success is patience during healing, adherence to
          post-operative instructions, and precise timing of implant placement
          once the graft has matured.
        </p>
        <p>
          At NorthStar, we view bone grafting not as an obstacle but as an
          opportunity — a way to restore what was lost and make life-changing
          implant dentistry possible for patients who might otherwise have been
          told it was not an option. We take pride in the care and precision
          with which we approach every graft, because we know that the
          foundation we build today determines the stability and longevity of
          the implant that follows.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Ready to Take the Next Step?</p>
        <h2>Schedule a Bone Grafting Consultation</h2>
        <p>
          If you have been told you need a bone graft before implants — or if
          you are concerned about bone loss at the site of a missing tooth — we
          encourage you to schedule a consultation with our team. Dr. Kampf will
          evaluate your specific situation using advanced 3D imaging, explain
          your options clearly and honestly, and work with you to develop a
          treatment plan that gives your implant the strongest possible
          foundation. Contact NorthStar Implant Dentistry today to get started.
        </p>
      </div>
    </PageLayout>
  );
}
export function SinusLiftsPage() {
  return (
    <PageLayout
      kicker="Advanced Preparation"
      title="Sinus Lifts"
      subtitle="Creating the space needed for upper jaw implants through precise sinus augmentation."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          A sinus lift, also known as sinus augmentation, is a surgical
          procedure that adds bone to the upper jaw in the area of the molars
          and premolars. It is one of the most common procedures performed prior
          to placing dental implants in the upper jaw, where bone volume is
          often insufficient due to the proximity of the maxillary sinus — a
          large air-filled cavity located just above the back teeth.
        </p>
        <p>
          When teeth in the upper back jaw have been missing for some time, the
          bone that once supported them deteriorates, and the sinus cavity can
          expand downward into the space previously occupied by the tooth roots.
          This leaves too little bone height to safely anchor an implant. A
          sinus lift resolves this by grafting new bone material into the sinus
          floor, creating a stable foundation for implant placement.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          The procedure begins with detailed 3D cone beam CT imaging to
          precisely measure available bone height and map the anatomy of your
          sinus. During the procedure, a small window is made in the lateral
          wall of the sinus, and the sinus membrane is gently lifted upward.
          Bone graft material — which may be your own bone, donor bone, or a
          synthetic substitute — is then carefully packed into the space created
          beneath the elevated membrane.
        </p>
        <p>
          The procedure is performed under local anesthesia, with sedation
          available for patient comfort. Healing time typically ranges from four
          to nine months, after which the grafted bone is ready to support
          implant placement. Some patients with adequate existing bone may be
          able to have implants placed simultaneously at the time of the sinus
          lift. Our surgeons will determine the best approach based on your
          individual anatomy and treatment goals.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          Sinus lift procedures have a high success rate and have made implant
          dentistry possible for countless patients who were previously told
          they lacked sufficient bone. With proper healing and oral hygiene, the
          grafted bone integrates fully and provides a durable platform for
          implants that can last a lifetime. Patients are advised to avoid
          blowing their nose forcefully, sneezing with their mouth closed, or
          using straws during the early healing phase to protect the sinus
          membrane while it heals.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you have been told you do not have enough bone for upper jaw
          implants, a sinus lift may be exactly the solution you need. Our team
          at NorthStar has extensive experience with sinus augmentation
          procedures and uses advanced imaging and surgical techniques to ensure
          precision and safety. Contact us to schedule a comprehensive
          evaluation and learn whether this procedure is right for you.
        </p>
      </div>
    </PageLayout>
  );
}
export function ImplantPlacementPage() {
  return (
    <PageLayout
      kicker="Precision Surgery"
      title="Implant Placement"
      subtitle="Guided surgical placement of titanium implants designed for long-term stability and function."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Dental implant placement is a surgical procedure in which a small
          titanium post is precisely inserted into the jawbone to serve as an
          artificial tooth root. This post forms the foundation upon which a
          crown, bridge, or full-arch prosthesis is attached, restoring both the
          function and appearance of a natural tooth. Titanium is used because
          of its remarkable biocompatibility — over time, the implant fuses
          directly with the surrounding bone through a process called
          osseointegration, creating a stable and permanent anchor.
        </p>
        <p>
          Implants are widely considered the gold standard in tooth replacement.
          Unlike dentures or bridges, they do not rely on adjacent teeth for
          support, they preserve bone, and they function just like natural
          teeth. At NorthStar, implant placement is performed by surgeons with
          advanced training in implantology, using digital planning and guided
          techniques to achieve optimal positioning, angulation, and depth.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          The process begins with a thorough evaluation including cone beam CT
          imaging, which allows us to create a precise 3D map of your bone,
          nerves, and surrounding anatomy. Using this data, your surgeon
          digitally plans the exact placement of each implant before the
          procedure begins. In many cases, a surgical guide is fabricated to
          ensure the implant is placed with millimeter-level accuracy.
        </p>
        <p>
          On the day of surgery, local anesthesia and sedation options are
          provided for your comfort. A small incision is made in the gum, a
          precise channel is created in the bone, and the implant is gently
          seated into position. The gum tissue is then closed around the
          implant. Most patients are surprised by how minimal the discomfort is.
          A healing period of three to six months follows, during which the
          implant fuses with the bone. Once integration is confirmed, your
          restorative dentist will attach the final crown or prosthesis.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          Dental implants have a long-term success rate exceeding 95% in healthy
          patients. With proper oral hygiene and regular dental visits, implants
          can last decades — often a lifetime. Unlike natural teeth, the
          titanium implant itself cannot decay. Maintaining healthy gums around
          the implant through brushing, flossing, and professional cleanings is
          the key to long-term success. Our team provides detailed aftercare
          instructions and ongoing monitoring to protect your investment.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          Whether you are missing a single tooth or multiple teeth, dental
          implants may be the ideal solution for restoring your smile and
          quality of life. NorthStar Implant Dentistry specializes in the full
          scope of implant care — from evaluation and surgical placement to
          coordination with your restorative dentist. Schedule a consultation
          today and take the first step toward a permanent, natural-looking
          smile.
        </p>
      </div>
    </PageLayout>
  );
}
export function RidgePreservationPage() {
  return (
    <PageLayout
      kicker="Protecting Your Bone"
      title="Ridge Preservation"
      subtitle="Maintaining bone structure after extraction to support future implant success."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Ridge preservation — also called socket preservation — is a procedure
          performed immediately after a tooth extraction to prevent the natural
          bone loss that occurs when a tooth is removed. Without intervention,
          the jawbone begins to resorb (shrink) within days of an extraction,
          and significant volume can be lost within the first few months. This
          bone loss can compromise the ability to place a dental implant, affect
          the appearance of the smile, and alter facial contours over time.
        </p>
        <p>
          By placing bone graft material into the extraction socket at the time
          of removal, we maintain the shape and volume of the ridge so that it
          remains suitable for implant placement when the time comes. Ridge
          preservation is a straightforward, proactive step that significantly
          improves outcomes for patients who plan to have implants in the
          future.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Ridge preservation is typically performed at the same appointment as
          the tooth extraction. Once the tooth is removed, the socket is gently
          cleaned and prepared. A bone graft material — derived from human donor
          bone, animal-sourced bone, synthetic materials, or a combination — is
          packed into the socket to fill the void left by the tooth root. A
          collagen membrane or similar covering is often placed over the graft
          to protect it and promote healing.
        </p>
        <p>
          The procedure adds minimal time and discomfort to the extraction
          appointment. Healing of the soft tissue over the socket typically
          takes two to four weeks, while the bone graft matures and integrates
          over the following three to six months. Once healing is complete, the
          site is evaluated and implant placement can proceed with confidence.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          Studies consistently show that ridge preservation significantly
          reduces bone resorption following extraction, resulting in better bone
          volume and density at the implant site. Patients who undergo ridge
          preservation at the time of extraction often require less complex bone
          grafting procedures later and achieve more predictable implant
          outcomes. Recovery is similar to a standard extraction, and most
          patients return to normal activity within a few days.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you are facing a tooth extraction and are considering a dental
          implant in the future, ridge preservation is an important step we
          strongly recommend discussing at your consultation. At NorthStar, we
          plan each extraction with your long-term outcome in mind — ensuring
          that your bone is protected and your path to restoration is as smooth
          as possible. Contact us to learn more.
        </p>
      </div>
    </PageLayout>
  );
}
export function RestorativeCoordPage() {
  return (
    <PageLayout
      kicker="Team-Based Care"
      title="Restorative Coordination"
      subtitle="Seamless collaboration with your restorative dentist for comprehensive implant outcomes."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Successful implant dentistry is a team effort. At NorthStar Implant
          Dentistry, we specialize in the surgical component of implant care —
          including extraction, bone grafting, and implant placement — while
          working closely with your restorative dentist, who is responsible for
          designing and delivering the final crown, bridge, or full-arch
          prosthesis that attaches to the implant.
        </p>
        <p>
          This collaborative model ensures that every aspect of your treatment
          is thoughtfully planned and executed. Before surgery even begins, we
          communicate directly with your restorative dentist to align on implant
          positioning, angulation, and timing so that the final restoration fits
          perfectly and functions beautifully. If you do not have a restorative
          dentist, we are happy to provide referrals to trusted providers in our
          network.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          The implant process is divided into two phases. The surgical phase is
          performed at NorthStar and includes any necessary extractions, bone
          grafting, and the placement of the implant itself. After a healing
          period — typically three to six months — during which the implant
          fuses with the bone, you return to your restorative dentist for the
          second phase: the placement of the abutment and final prosthetic crown
          or bridge.
        </p>
        <p>
          Throughout this process, NorthStar maintains open communication with
          your restorative dentist, sharing imaging, surgical reports, and
          healing updates. We also provide detailed records and impressions to
          ensure precise fabrication of your final restoration. This seamless
          hand-off between surgical and restorative care is central to the
          NorthStar approach.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          When the surgical and restorative phases are carefully coordinated,
          the result is an implant restoration that looks, feels, and functions
          like a natural tooth. Proper planning prevents complications such as
          implants placed at incorrect angles, crowns that do not fit well, or
          bite issues that can strain the implant over time. Long-term success
          depends on maintaining excellent oral hygiene and attending regular
          check-ups with both your surgeon and restorative dentist.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          Whether you are coming to us with your own restorative dentist or
          starting fresh, NorthStar will ensure your care is coordinated and
          cohesive from start to finish. We believe that great outcomes come
          from great teamwork — and we take pride in being a surgical partner
          you and your dentist can trust completely. Contact us to begin your
          implant journey.
        </p>
      </div>
    </PageLayout>
  );
}
export function RemoteAnchorImplantPage() {
  return (
    <PageLayout
      kicker="Specialized Solutions"
      title="Remote Anchorage Implant"
      subtitle="Innovative implant options for patients with complex bone conditions or limited anatomy."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Remote anchorage implants — which include zygomatic implants,
          pterygoid implants, and other extra-maxillary techniques — are
          advanced solutions designed for patients who have been told they
          cannot receive traditional dental implants due to severe bone loss or
          deficiency in the upper jaw. Rather than anchoring into the alveolar
          ridge (the standard implant site), these specialized implants engage
          remote areas of the skull and facial skeleton that retain dense,
          reliable bone — such as the zygomatic bone (cheekbone) or the
          pterygoid plates behind the upper jaw.
        </p>
        <p>
          These techniques were developed to give hope to patients with complex
          anatomical challenges — including those who have worn full dentures
          for many years, experienced significant bone atrophy, undergone prior
          failed implant surgeries, or have medical conditions that affect bone
          density. At NorthStar, Dr. Kampf has specialized training in these
          advanced techniques and has helped many patients achieve fixed,
          functional teeth when other practices had no solutions to offer.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          This procedure requires extensive pre-surgical planning using cone
          beam CT imaging and 3D digital simulation to map the trajectory of
          each implant through the facial skeleton to its remote anchorage site.
          The surgery is typically performed under IV sedation or general
          anesthesia and requires a highly skilled surgical team with specific
          expertise in craniofacial anatomy.
        </p>
        <p>
          Zygomatic implants, for example, pass through the upper jaw and anchor
          in the dense bone of the cheekbone, completely bypassing the deficient
          ridge. In many cases, a fixed provisional prosthesis can be attached
          on the same day as surgery — giving patients functional teeth
          immediately. Final restorations are typically placed after a healing
          period of several months.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          Remote anchorage implants have demonstrated excellent long-term
          success rates in patients with severe bone deficiency, offering a
          life-changing alternative to removable dentures or no treatment at
          all. Patients report dramatic improvements in chewing function,
          speech, confidence, and quality of life. As with all implant
          procedures, long-term success depends on maintaining excellent oral
          hygiene around the implant prosthesis and attending regular
          professional maintenance appointments.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you have been told you are not a candidate for dental implants due
          to insufficient bone, please do not give up. Remote anchorage implant
          techniques may offer a path forward that other practices cannot
          provide. Contact NorthStar Implant Dentistry to schedule a specialized
          consultation and find out whether this innovative approach is right
          for you.
        </p>
      </div>
    </PageLayout>
  );
}
export function WisdomTeethExtPage() {
  return (
    <PageLayout
      kicker="Surgical Expertise"
      title="Wisdom Teeth Extractions"
      subtitle="Expert evaluation and surgical removal of symptomatic or impacted wisdom teeth."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Wisdom teeth — also called third molars — are the last teeth to
          develop, typically emerging between the ages of 17 and 25. Because the
          modern jaw often lacks sufficient space to accommodate them, wisdom
          teeth frequently become impacted, meaning they are unable to fully
          erupt through the gum line. Impacted wisdom teeth can cause a range of
          problems including pain, infection, damage to adjacent teeth, cyst
          formation, and crowding of the existing dentition.
        </p>
        <p>
          Even wisdom teeth that have partially erupted can be difficult to
          clean and are prone to decay and gum disease. At NorthStar Implant
          Dentistry, we use advanced 3D imaging to thoroughly evaluate the
          position, depth, and orientation of each wisdom tooth before
          recommending removal, ensuring a treatment plan that is safe, precise,
          and appropriate for your individual anatomy.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Before surgery, cone beam CT imaging is obtained to map the exact
          position of each wisdom tooth and its relationship to critical
          structures such as the inferior alveolar nerve and the maxillary
          sinuses. This detailed evaluation ensures that the surgical approach
          is planned with maximum safety and efficiency.
        </p>
        <p>
          The procedure is performed under local anesthesia, with IV sedation
          available for patients who prefer to be fully relaxed and unaware
          during the surgery. The surgeon makes a small incision in the gum if
          necessary, carefully sections the tooth if needed for easier removal,
          and extracts it with minimal impact to the surrounding bone and
          tissue. Most patients are able to return home the same day and resume
          normal activities within a few days. Soreness, swelling, and minor
          bleeding are normal in the first 48 to 72 hours and are manageable
          with prescribed medications and cold compresses.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          The vast majority of wisdom tooth extractions heal without
          complication. Following post-operative instructions carefully —
          including keeping the area clean, avoiding straws, smoking, and hard
          foods — greatly reduces the risk of dry socket and promotes faster
          healing. Most patients are back to their normal routine within three
          to five days. Our team provides thorough post-operative instructions
          and is available to answer any questions during your recovery.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you are experiencing pain, swelling, or discomfort in the back of
          your jaw — or if your dentist has recommended wisdom tooth removal —
          contact NorthStar to schedule an evaluation. Our surgeons perform
          wisdom tooth extractions routinely and with a high level of skill and
          care, making the experience as comfortable and stress-free as
          possible.
        </p>
      </div>
    </PageLayout>
  );
}
export function FullMouthReconPage() {
  return (
    <PageLayout
      kicker="Complete Restoration"
      title="Full Mouth Reconstruction"
      subtitle="Comprehensive rebuilding of function, health, and aesthetics across the entire mouth."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Full mouth reconstruction is a comprehensive, coordinated treatment
          plan that addresses multiple dental problems simultaneously to restore
          the health, function, and appearance of the entire mouth. It is
          recommended for patients who have experienced extensive tooth loss,
          severe decay, advanced gum disease, significant wear from bruxism
          (teeth grinding), trauma, or a combination of these conditions.
        </p>
        <p>
          Unlike a single procedure, full mouth reconstruction is a carefully
          sequenced series of treatments — which may include extractions, bone
          grafting, implant placement, gum therapy, and restorative work —
          designed as a unified plan with a clear endpoint. At NorthStar, we
          work collaboratively with your restorative dentist to ensure that
          every phase is executed in the right order, with the right techniques,
          to achieve a result that is not only beautiful but structurally sound
          and built to last.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Full mouth reconstruction begins with an in-depth evaluation that
          includes comprehensive imaging, bite analysis, periodontal assessment,
          and a detailed discussion of your goals and concerns. Based on this
          evaluation, a customized treatment plan is developed that outlines
          every procedure, the sequence in which they will be performed, the
          timeline, and the expected outcomes at each stage.
        </p>
        <p>
          Surgical phases — such as extractions, grafting, and implant placement
          — are typically completed first to establish the structural
          foundation. Once healing is confirmed, restorative work such as
          crowns, bridges, and implant-supported prostheses is completed.
          Throughout the process, patients are kept informed and supported, with
          sedation options available to ensure comfort at every appointment.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          The result of a well-executed full mouth reconstruction is
          transformative — patients experience dramatic improvements in their
          ability to chew, speak, and smile with confidence. Beyond aesthetics,
          reconstruction addresses the underlying functional and structural
          issues that were damaging the teeth and bone over time, preventing
          further deterioration. Long-term maintenance through consistent oral
          hygiene and regular professional care is essential to protecting the
          investment made in your smile.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If your dental health has reached a point where multiple teeth or the
          entire mouth requires attention, a full mouth reconstruction may be
          the comprehensive solution you have been looking for. NorthStar
          Implant Dentistry brings together the surgical expertise and
          collaborative coordination needed to guide you through this process
          with clarity, compassion, and skill. Contact us to schedule your
          consultation and begin the journey to a fully restored smile.
        </p>
      </div>
    </PageLayout>
  );
}
export function OralMedPathologyPage() {
  return (
    <PageLayout
      kicker="Diagnostic Care"
      title="Oral Medicine & Pathology — Biopsies"
      subtitle="Evaluation and biopsy services for oral lesions, soft tissue changes, and pathology screening."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Oral medicine and pathology encompasses the diagnosis and management
          of diseases affecting the mouth, jaw, and surrounding structures. This
          includes the evaluation of unusual lesions, growths, discolorations,
          ulcers, or changes in the oral tissues that may require further
          investigation. Early detection of abnormal changes in the oral cavity
          is critical — many serious conditions, including oral cancer, are far
          more treatable when identified at an early stage.
        </p>
        <p>
          At NorthStar, our surgeons are trained to recognize, evaluate, and
          biopsy suspicious oral lesions. A biopsy involves removing a small
          sample of tissue from the area of concern and sending it to an oral
          pathology laboratory for microscopic analysis. This is the definitive
          way to determine whether a lesion is benign, pre-malignant, or
          malignant, and to guide appropriate treatment.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          The evaluation begins with a thorough clinical examination of your
          oral tissues, including the lips, tongue, cheeks, gums, palate, and
          floor of the mouth. If a lesion or abnormality is identified that
          warrants further investigation, a biopsy is recommended. The procedure
          is performed under local anesthesia and typically takes only a few
          minutes. A small tissue sample is carefully excised and sent to a
          board-certified oral pathologist for analysis.
        </p>
        <p>
          Results are typically available within one to two weeks. Our team will
          contact you promptly to discuss the findings and, if necessary,
          outline the next steps in your care. Most biopsies return benign
          results, but the peace of mind that comes from a confirmed diagnosis —
          and the life-saving potential of early detection when something is
          found — makes this a profoundly important step for patients with
          suspicious oral changes.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          For benign findings, patients are typically monitored over time to
          ensure the lesion does not change or recur. For pre-malignant or
          malignant findings, prompt referral and coordinated care with the
          appropriate specialists is arranged. Oral cancer survival rates are
          significantly higher when the disease is caught early — which is why
          routine oral cancer screening and prompt evaluation of any unusual
          oral changes are so important.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you or your dentist has noticed an unusual sore, growth,
          discoloration, or change in your oral tissues that has not resolved
          within two weeks, please do not delay in seeking an evaluation. At
          NorthStar, we take oral pathology seriously and are committed to
          providing thorough, compassionate diagnostic care. Contact us to
          schedule an appointment.
        </p>
      </div>
    </PageLayout>
  );
}
export function PreProstheticSurgPage() {
  return (
    <PageLayout
      kicker="Preparing Your Smile"
      title="Pre-Prosthetic Surgery"
      subtitle="Surgical preparation of the mouth to ensure optimal fit and comfort for prosthetic appliances."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          Pre-prosthetic surgery refers to a range of surgical procedures
          performed to prepare the mouth for the successful placement of a
          dental prosthesis — such as a denture, partial denture, or
          implant-supported restoration. The goal is to create an oral
          environment that provides optimal support, retention, and comfort for
          the prosthetic appliance.
        </p>
        <p>
          Common pre-prosthetic procedures include smoothing or reshaping the
          jawbone (alveoloplasty), removing excess or irregular gum tissue (soft
          tissue recontouring), eliminating bony protrusions (tori removal), and
          correcting the shape of the jaw ridges. These procedures ensure that
          the prosthesis fits properly, stays securely in place, and does not
          cause soreness or pressure points — all of which are critical to
          patient satisfaction and long-term oral health.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Pre-prosthetic surgery is typically performed under local anesthesia,
          with sedation available for patients who prefer additional comfort.
          The specific procedures performed depend on the condition of the bone
          and soft tissue and the type of prosthesis being planned. Procedures
          are generally straightforward and well-tolerated, with healing times
          ranging from a few weeks to a few months depending on the extent of
          the work performed.
        </p>
        <p>
          Following surgery, your restorative dentist or prosthodontist will
          coordinate the timing of prosthesis fabrication to ensure the tissue
          has healed and stabilized before impressions are taken. Close
          communication between our surgical team and your restorative provider
          ensures a smooth transition from surgery to the final prosthesis.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          Patients who undergo pre-prosthetic surgery consistently report
          better-fitting, more comfortable prostheses. Poorly fitting dentures
          can cause significant pain, accelerate bone loss, and make eating and
          speaking difficult — outcomes that proper surgical preparation can
          prevent. Once healed, most patients adjust well to their prosthesis
          and enjoy a significant improvement in function, appearance, and
          confidence.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you are preparing to receive a denture or other prosthetic
          appliance, or if you are experiencing discomfort with an existing
          prosthesis, pre-prosthetic surgery may be the solution. Our team at
          NorthStar will evaluate your oral anatomy and work closely with your
          restorative provider to develop the most appropriate surgical plan.
          Contact us to schedule your consultation.
        </p>
      </div>
    </PageLayout>
  );
}
export function ImpactedTeethPage() {
  return (
    <PageLayout
      kicker="Surgical Exposure"
      title="Impacted / Unerupted Teeth"
      subtitle="Management of teeth that have failed to erupt properly through the gum tissue."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          An impacted tooth is one that has been unable to fully erupt into its
          proper position in the dental arch. While wisdom teeth are the most
          commonly impacted, canines and premolars can also become impacted —
          remaining partially or fully buried beneath the gum and bone. Left
          untreated, impacted teeth can cause pain, infection, damage to
          adjacent teeth, cyst formation, and misalignment of the bite.
        </p>
        <p>
          The management of impacted teeth — other than wisdom teeth — often
          involves a collaborative approach between the oral surgeon and an
          orthodontist. Rather than extracting the tooth, the goal is frequently
          to expose it surgically and guide it into its correct position in the
          arch through orthodontic treatment. This approach preserves a natural
          tooth that would otherwise be lost, maintaining the integrity of the
          bite and avoiding the need for future replacement.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Treatment begins with a comprehensive evaluation including cone beam
          CT imaging to determine the exact position, depth, and orientation of
          the impacted tooth and its relationship to adjacent teeth, nerves, and
          bone. If surgical exposure is planned, the procedure is performed
          under local anesthesia with sedation available for comfort.
        </p>
        <p>
          During the procedure, a small flap of gum tissue is opened to expose
          the crown of the impacted tooth. In cases where orthodontic guidance
          is planned, a small bracket and gold chain are bonded to the tooth
          before the flap is closed. The chain is attached to the orthodontic
          appliance, which applies gentle, continuous force to gradually guide
          the tooth into its proper position over the course of several months.
          In cases where the tooth cannot be saved, surgical removal is
          performed with the same careful, tissue-sparing technique used for
          other extractions.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          When surgical exposure and orthodontic guidance are successful, the
          result is a fully functional natural tooth in its correct position —
          an outcome that avoids the need for an implant or bridge and preserves
          the natural dentition. Success rates are highest when treatment is
          initiated at the appropriate time, which is why early evaluation by
          both an oral surgeon and orthodontist is recommended for children and
          adolescents with impacted canines or premolars.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you or your child has been told that a tooth is impacted or has
          failed to erupt, early evaluation is key. NorthStar Implant Dentistry
          provides expert surgical assessment and treatment of impacted teeth,
          working in close coordination with your orthodontist to develop the
          best possible plan. Contact us to schedule a consultation today.
        </p>
      </div>
    </PageLayout>
  );
}
export function MaxillaryExpansionPage() {
  return (
    <PageLayout
      kicker="Jaw Development"
      title="Maxillary Expansion — MARPE"
      subtitle="Miniscrew-assisted rapid palatal expansion for adult patients."
    >
      <div className="page-section">
        <p className="page-kicker">Overview</p>
        <h2>About This Procedure</h2>
        <p>
          MARPE — Miniscrew-Assisted Rapid Palatal Expansion — is an advanced
          technique that allows for non-surgical widening of the upper jaw
          (maxilla) in adult patients. Traditionally, palatal expansion was only
          reliably achievable in growing children and adolescents, whose
          midpalatal suture had not yet fully fused. In adults, the suture is
          typically fused, making conventional expanders ineffective without
          surgery.
        </p>
        <p>
          MARPE overcomes this limitation by using small titanium miniscrews
          that anchor directly into the palatal bone, providing the mechanical
          force needed to gradually separate the fused suture and widen the
          palate. This technique can correct narrow arches, improve nasal airway
          function, create space for crowded teeth, and enhance outcomes for
          orthodontic treatment — all without the need for a traditional
          surgical procedure called SARPE (surgically assisted rapid palatal
          expansion).
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          MARPE is a collaborative procedure performed in partnership with your
          orthodontist. The oral surgeon places four small miniscrews into the
          palatal bone under local anesthesia — a procedure that typically takes
          less than 30 minutes and is well tolerated. The orthodontist then
          attaches a custom-fabricated expander appliance to the miniscrews,
          which the patient activates by turning a small key each day according
          to the prescribed protocol.
        </p>
        <p>
          Over the course of several weeks to months, the palate gradually
          widens as the midpalatal suture is separated. A gap between the upper
          front teeth is a normal and expected sign that expansion is occurring.
          Once the desired width is achieved, the appliance is left in place for
          a consolidation period to allow new bone to form across the expanded
          suture before it is removed. Orthodontic treatment typically continues
          following expansion to align the teeth in the newly widened arch.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Care</h2>
        <p>
          MARPE has shown excellent results in adult patients who were
          previously considered poor candidates for palatal expansion. Benefits
          include improved nasal breathing, reduced sleep-disordered breathing
          symptoms in some patients, creation of space that eliminates the need
          for tooth extraction in orthodontic treatment, and improved facial
          balance. Results are stable when the expansion is followed by an
          appropriate consolidation period and proper orthodontic retention.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you or your orthodontist are considering palatal expansion and have
          been told it is not possible due to your age, MARPE may be the
          solution. Our surgeons work in close partnership with orthodontic
          providers to evaluate candidacy, plan the procedure, and achieve
          outstanding outcomes. Contact NorthStar to schedule a consultation and
          learn more.
        </p>
      </div>
    </PageLayout>
  );
}
export function ProcedureTechnologyPage() {
  return (
    <PageLayout
      kicker="Digitally Guided Care"
      title="Technology at NorthStar"
      subtitle="State-of-the-art imaging and digital planning tools that support precise, predictable outcomes."
    >
      <div className="page-section">
        <p className="page-kicker">Our Approach</p>
        <h2>Technology-Driven Precision</h2>
        <p>
          At NorthStar Implant Dentistry, we believe that the best surgical
          outcomes begin with the best information. We invest in advanced
          diagnostic and planning technology not because it is impressive, but
          because it directly improves the safety, accuracy, and predictability
          of every procedure we perform. Our technology-driven approach means
          fewer surprises, better outcomes, and a more comfortable experience
          for our patients.
        </p>
        <p>
          From the moment you arrive for your consultation, our team uses
          cutting-edge tools to gather a complete picture of your oral anatomy,
          plan your treatment with digital precision, and execute procedures
          with guided accuracy — all in service of one goal: delivering results
          you can trust.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Imaging</p>
        <h2>Cone Beam CT (3D Imaging)</h2>
        <p>
          Our in-office cone beam computed tomography (CBCT) scanner produces
          detailed three-dimensional images of your teeth, bone, nerves,
          sinuses, and surrounding structures in a single low-radiation scan.
          Unlike traditional 2D X-rays, CBCT imaging allows us to evaluate bone
          volume and density in all three dimensions, identify the precise
          location of anatomical structures that must be protected during
          surgery, and plan implant placement with digital precision before the
          patient ever enters the operating room.
        </p>
        <p>
          This level of diagnostic detail is essential for complex cases —
          including sinus lifts, bone grafting, zygomatic implants, impacted
          teeth, and full mouth reconstruction — where anatomical awareness is
          critical to surgical safety.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Planning & Guidance</p>
        <h2>Digital Surgical Planning & Guided Surgery</h2>
        <p>
          Using specialized implant planning software, our surgeons digitally
          simulate each procedure on a virtual model of your anatomy before
          performing it in the real world. Implant position, angulation, depth,
          and diameter are all optimized virtually, ensuring that the final
          placement is ideal for the restorative outcome your dentist is
          planning.
        </p>
        <p>
          In many cases, a surgical guide is fabricated from this digital plan —
          a custom appliance that fits precisely over your teeth and directs the
          drill to the exact planned position during surgery. Guided surgery
          significantly reduces the margin of error and increases procedural
          efficiency, resulting in faster surgeries, less tissue trauma, and
          more predictable healing.
        </p>
      </div>
      <div className="page-section">
        <p className="page-kicker">Ready to Learn More?</p>
        <h2>Experience the NorthStar Difference</h2>
        <p>
          When you choose NorthStar, you are choosing a practice that combines
          surgical expertise with the most advanced tools available to modern
          implant dentistry. We welcome you to come in, meet our team, and see
          our technology firsthand. Contact us to schedule your consultation
          today.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── Specialized Circumstances Detail Pages ───────────────────────────────────

export function CantGetImplantsPage() {
  return (
    <PageLayout
      kicker="Don't Give Up on Your Smile"
      title="Told You Can't Get Dental Implants? There's Still Hope."
      subtitle="Innovative surgical solutions for patients with severe bone loss or complex anatomy who have been told implants are not possible."
    >
      <div className="page-section">
        <p className="page-kicker">You May Have More Options Than You Think</p>
        <h2>When Conventional Implants Are Not Enough</h2>
        <p>
          Being told you are not a candidate for dental implants can be
          devastating — especially when you have been living with missing teeth,
          failing dentures, or a compromised smile for years. But what many
          patients do not realize is that a no from one provider is not
          necessarily the final answer. Advances in implant surgery over the
          past two decades have opened the door to solutions that did not exist
          a generation ago, and NorthStar Implant Dentistry specializes in
          exactly these cases.
        </p>
        <p>
          The most common reason patients are told they cannot receive
          conventional implants is insufficient bone. When teeth are lost, the
          jawbone begins to resorb within weeks. Over months and years,
          significant bone volume can be lost. For these patients, standard
          implant placement is not feasible using conventional approaches — but
          that does not mean implants are impossible. Below are the six advanced
          remote anchorage techniques Dr. Kampf offers for patients who have
          been turned away elsewhere.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Technique 1 of 6</p>
        <h2>Zygomatic Implants</h2>
        <svg
          width="100%"
          viewBox="0 0 680 300"
          role="img"
          style={{
            display: 'block',
            margin: '1rem 0',
            maxWidth: '100%',
            overflowX: 'hidden' as const,
          }}
        >
          <title>Zygomatic implant cross-section</title>
          <desc>
            Long implant bypassing the deficient upper jaw and anchoring into
            the dense cheekbone.
          </desc>
          <defs>
            <marker
              id="a1"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="context-stroke"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <ellipse
            cx="280"
            cy="110"
            rx="140"
            ry="90"
            fill="none"
            stroke="rgba(197,157,60,0.3)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="270"
            cy="140"
            rx="55"
            ry="38"
            fill="rgba(100,160,220,0.1)"
            stroke="rgba(100,160,220,0.3)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x="270"
            y="144"
            textAnchor="middle"
            style={{
              fontSize: '11px',
              fill: 'rgba(100,160,220,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Maxillary sinus
          </text>
          <rect
            x="180"
            y="185"
            width="200"
            height="16"
            rx="6"
            fill="rgba(197,157,60,0.15)"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="197"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Severely resorbed ridge
          </text>
          <ellipse
            cx="390"
            cy="118"
            rx="52"
            ry="30"
            fill="rgba(197,157,60,0.2)"
            stroke="rgba(197,157,60,0.5)"
            strokeWidth="1.5"
          />
          <text
            x="390"
            y="122"
            textAnchor="middle"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Zygoma (cheekbone)
          </text>
          <line
            x1="242"
            y1="195"
            x2="366"
            y2="110"
            stroke="#c59d3c"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="242"
            y1="195"
            x2="366"
            y2="110"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="226" y="201" width="32" height="16" rx="5" fill="#c59d3c" />
          <text
            x="242"
            y="213"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <line
            x1="368"
            y1="110"
            x2="460"
            y2="75"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="465"
            y="73"
            style={{
              fontSize: '12px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Anchors in zygoma
          </text>
          <text
            x="465"
            y="88"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            bypasses sinus entirely
          </text>
          <line
            x1="240"
            y1="195"
            x2="130"
            y2="235"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="125"
            y="234"
            textAnchor="end"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            45–55mm length
          </text>
          <text
            x="125"
            y="248"
            textAnchor="end"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            same-day teeth possible
          </text>
        </svg>
        <p>
          Zygomatic implants are long titanium implants — typically 35–55mm —
          that bypass the deficient upper jawbone entirely and anchor instead
          into the dense bone of the cheekbone (zygoma). Developed in the 1990s
          and now with decades of clinical evidence, they are one of the most
          proven solutions for patients with severe upper jaw bone loss. In many
          cases, a full fixed set of teeth can be delivered the same day as
          surgery. They may be used singly, in pairs, or in combination with
          pterygoid or trans-nasal implants for comprehensive full-arch
          rehabilitation.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Technique 2 of 6</p>
        <h2>Pterygoid Implants</h2>
        <svg
          width="100%"
          viewBox="0 0 680 270"
          role="img"
          style={{
            display: 'block',
            margin: '1rem 0',
            maxWidth: '100%',
            overflowX: 'hidden' as const,
          }}
        >
          <title>Pterygoid implant cross-section</title>
          <desc>
            Implant angled posteriorly past the sinus to anchor in the dense
            pterygoid plates behind the upper jaw.
          </desc>
          <defs>
            <marker
              id="a2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="context-stroke"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <rect
            x="150"
            y="155"
            width="250"
            height="16"
            rx="6"
            fill="rgba(197,157,60,0.15)"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="1"
          />
          <text
            x="275"
            y="167"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Atrophic upper jaw (maxilla)
          </text>
          <ellipse
            cx="270"
            cy="120"
            rx="80"
            ry="45"
            fill="rgba(100,160,220,0.08)"
            stroke="rgba(100,160,220,0.25)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x="250"
            y="124"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(100,160,220,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            Maxillary sinus
          </text>
          <rect
            x="400"
            y="108"
            width="55"
            height="85"
            rx="8"
            fill="rgba(197,157,60,0.22)"
            stroke="rgba(197,157,60,0.55)"
            strokeWidth="1.5"
          />
          <text
            x="427"
            y="148"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Pterygoid
          </text>
          <text
            x="427"
            y="160"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            plates
          </text>
          <line
            x1="290"
            y1="163"
            x2="412"
            y2="130"
            stroke="#c59d3c"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="290"
            y1="163"
            x2="412"
            y2="130"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="274" y="169" width="32" height="16" rx="5" fill="#c59d3c" />
          <text
            x="290"
            y="181"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <line
            x1="414"
            y1="130"
            x2="500"
            y2="90"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="505"
            y="88"
            style={{
              fontSize: '12px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Dense pterygoid bone
          </text>
          <text
            x="505"
            y="103"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            posterior anchorage
          </text>
          <text
            x="80"
            y="100"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Steep posterior angle
          </text>
          <text
            x="80"
            y="115"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            no sinus grafting needed
          </text>
        </svg>
        <p>
          Pterygoid implants are placed at a steep posterior angle, passing
          through the tuberosity of the upper jaw and anchoring deep into the
          pterygoid plates — dense bony structures located behind the maxilla
          that are largely unaffected by the resorption that plagues the ridge.
          Often used bilaterally in combination with anterior or zygomatic
          implants, pterygoid implants are a key component of comprehensive
          full-arch rehabilitation for patients with severely atrophic upper
          jaws. They eliminate the need for posterior sinus grafting and allow
          immediate loading in qualifying cases.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Technique 3 of 6</p>
        <h2>Trans-Nasal Implants</h2>
        <svg
          width="100%"
          viewBox="0 0 680 290"
          role="img"
          style={{
            display: 'block',
            margin: '1rem 0',
            maxWidth: '100%',
            overflowX: 'hidden' as const,
          }}
        >
          <title>Trans-nasal implant cross-section</title>
          <desc>
            Implant passing through the nasal cavity and anchoring in the
            frontal process of the maxilla near the nasal floor.
          </desc>
          <defs>
            <marker
              id="a3"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="context-stroke"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <ellipse
            cx="290"
            cy="130"
            rx="72"
            ry="56"
            fill="rgba(100,160,220,0.1)"
            stroke="rgba(100,160,220,0.35)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x="290"
            y="134"
            textAnchor="middle"
            style={{
              fontSize: '11px',
              fill: 'rgba(100,160,220,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Nasal cavity
          </text>
          <rect
            x="185"
            y="178"
            width="210"
            height="16"
            rx="6"
            fill="rgba(197,157,60,0.15)"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="1"
          />
          <text
            x="290"
            y="190"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Severely atrophic premaxilla
          </text>
          <ellipse
            cx="218"
            cy="100"
            rx="30"
            ry="20"
            fill="rgba(197,157,60,0.25)"
            stroke="rgba(197,157,60,0.55)"
            strokeWidth="1.5"
          />
          <text
            x="218"
            y="104"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Frontal process
          </text>
          <text
            x="218"
            y="116"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            (nasal wall bone)
          </text>
          <line
            x1="266"
            y1="183"
            x2="228"
            y2="108"
            stroke="#c59d3c"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="266"
            y1="183"
            x2="228"
            y2="108"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="250" y="189" width="32" height="16" rx="5" fill="#c59d3c" />
          <text
            x="266"
            y="201"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <line
            x1="225"
            y1="97"
            x2="130"
            y2="55"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="125"
            y="52"
            textAnchor="end"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            3–5mm apical anchorage
          </text>
          <text
            x="125"
            y="66"
            textAnchor="end"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            in nasal wall bone
          </text>
          <line
            x1="268"
            y1="185"
            x2="460"
            y2="235"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="465"
            y="238"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            22–25mm implant
          </text>
          <text
            x="465"
            y="252"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            traverses nasal cavity
          </text>
        </svg>
        <p>
          Trans-nasal implants are a recently developed technique for the
          severely atrophic premaxilla — the front portion of the upper jaw —
          where conventional implants are not feasible. The implant is inserted
          from the mouth, passes through the nasal cavity at a precise angle,
          and anchors in 3–5mm of dense bone at the frontal process of the
          maxilla. Trans-nasal implants are used in combination with zygomatic
          implants to support a full-arch restoration, reducing or eliminating
          the need for a quad-zygoma approach. They require careful CBCT-guided
          surgical planning and are performed only by surgeons with specific
          expertise in craniofacial anatomy.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Technique 4 of 6</p>
        <h2>Trans-Sinus / Tuberosity Implants</h2>
        <svg
          width="100%"
          viewBox="0 0 680 285"
          role="img"
          style={{
            display: 'block',
            margin: '1rem 0',
            maxWidth: '100%',
            overflowX: 'hidden' as const,
          }}
        >
          <title>Trans-sinus implant cross-section</title>
          <desc>
            Implant angled mesially from the ridge crest, traversing the
            maxillary sinus and achieving double bicortical anchorage at the
            nasal wall.
          </desc>
          <defs>
            <marker
              id="a4"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="context-stroke"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <ellipse
            cx="280"
            cy="128"
            rx="100"
            ry="70"
            fill="rgba(100,160,220,0.1)"
            stroke="rgba(100,160,220,0.35)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x="280"
            y="132"
            textAnchor="middle"
            style={{
              fontSize: '12px',
              fill: 'rgba(100,160,220,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Maxillary sinus
          </text>
          <rect
            x="162"
            y="84"
            width="22"
            height="86"
            rx="5"
            fill="rgba(197,157,60,0.25)"
            stroke="rgba(197,157,60,0.55)"
            strokeWidth="1.5"
          />
          <text
            x="152"
            y="130"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
              transform: 'rotate(-90deg)',
              transformOrigin: '152px 130px',
            }}
          >
            Nasal wall
          </text>
          <rect
            x="160"
            y="188"
            width="240"
            height="16"
            rx="6"
            fill="rgba(197,157,60,0.15)"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="200"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Ridge crest (insufficient bone)
          </text>
          <line
            x1="328"
            y1="194"
            x2="190"
            y2="110"
            stroke="#c59d3c"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="328"
            y1="194"
            x2="190"
            y2="110"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx="328"
            cy="194"
            r="5"
            fill="#c59d3c"
            stroke="white"
            strokeWidth="1.5"
          />
          <circle
            cx="190"
            cy="110"
            r="5"
            fill="#c59d3c"
            stroke="white"
            strokeWidth="1.5"
          />
          <ellipse
            cx="258"
            cy="153"
            rx="28"
            ry="17"
            fill="rgba(197,157,60,0.12)"
            stroke="rgba(197,157,60,0.3)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <text
            x="258"
            y="157"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            Graft in sinus
          </text>
          <rect x="312" y="200" width="32" height="16" rx="5" fill="#c59d3c" />
          <text
            x="328"
            y="212"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <line
            x1="190"
            y1="108"
            x2="90"
            y2="65"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="85"
            y="62"
            textAnchor="end"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Nasal wall cortex
          </text>
          <line
            x1="330"
            y1="194"
            x2="480"
            y2="238"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="485"
            y="241"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Double bicortical
          </text>
          <text
            x="485"
            y="255"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            anchorage (20–25mm)
          </text>
        </svg>
        <p>
          Trans-sinus implants are placed at the ridge crest and angled
          mesially, passing through the maxillary sinus and anchoring
          simultaneously in the crestal bone and the nasal wall — achieving
          double bicortical anchorage. This provides excellent primary stability
          without requiring zygomatic placement or extensive sinus grafting. A
          small amount of bone graft material is placed around the exposed
          portion of the implant within the sinus during the same appointment.
          Trans-sinus implants are particularly useful in Bedrossian Zone I and
          II atrophy where the sinus has expanded but some crestal bone remains.
          They offer a technically demanding but highly effective alternative
          when anatomy permits.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Technique 5 of 6</p>
        <h2>Sub-Periosteal Implants</h2>
        <svg
          width="100%"
          viewBox="0 0 680 250"
          role="img"
          style={{
            display: 'block',
            margin: '1rem 0',
            maxWidth: '100%',
            overflowX: 'hidden' as const,
          }}
        >
          <title>Sub-periosteal implant cross-section</title>
          <desc>
            Custom-fabricated titanium framework resting on the jawbone surface
            beneath the gum, with abutment posts supporting crowns above.
          </desc>
          <defs>
            <marker
              id="a5"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="context-stroke"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <rect
            x="120"
            y="158"
            width="360"
            height="42"
            rx="10"
            fill="rgba(197,157,60,0.18)"
            stroke="rgba(197,157,60,0.5)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="182"
            textAnchor="middle"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Severely resorbed jawbone
          </text>
          <rect
            x="110"
            y="136"
            width="380"
            height="24"
            rx="8"
            fill="rgba(220,140,140,0.15)"
            stroke="rgba(220,140,140,0.3)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="151"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(220,140,140,0.85)',
              fontFamily: 'sans-serif',
            }}
          >
            Gum tissue
          </text>
          <rect
            x="130"
            y="141"
            width="340"
            height="18"
            rx="5"
            fill="rgba(197,157,60,0.32)"
            stroke="#c59d3c"
            strokeWidth="2"
          />
          <text
            x="300"
            y="153"
            textAnchor="middle"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            3D custom framework — sits on bone surface
          </text>
          <rect x="194" y="110" width="12" height="33" rx="3" fill="#c59d3c" />
          <rect x="294" y="110" width="12" height="33" rx="3" fill="#c59d3c" />
          <rect x="394" y="110" width="12" height="33" rx="3" fill="#c59d3c" />
          <rect x="178" y="94" width="44" height="18" rx="5" fill="#c59d3c" />
          <rect x="278" y="94" width="44" height="18" rx="5" fill="#c59d3c" />
          <rect x="378" y="94" width="44" height="18" rx="5" fill="#c59d3c" />
          <text
            x="200"
            y="106"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <text
            x="300"
            y="106"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <text
            x="400"
            y="106"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <line
            x1="130"
            y1="150"
            x2="55"
            y2="185"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="50"
            y="188"
            textAnchor="end"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            No bone
          </text>
          <text
            x="50"
            y="202"
            textAnchor="end"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            penetration
          </text>
          <line
            x1="490"
            y1="150"
            x2="560"
            y2="120"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="565"
            y="118"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Titanium frame
          </text>
          <text
            x="565"
            y="132"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            CBCT-guided fit
          </text>
        </svg>
        <p>
          Sub-periosteal implants rest directly on the jawbone surface beneath
          the gum tissue, rather than penetrating the bone. They are
          custom-fabricated using a 3D CBCT scan — the resulting titanium
          framework conforms precisely to the ridge for intimate, distributed
          contact. Abutment posts protrude through the gum to support the
          prosthesis. Sub-periosteal implants are ideal for patients with
          extreme bone loss who cannot accommodate any endosseous implant —
          including zygomatic — and who are not candidates for bone grafting.
          Modern CBCT-guided fabrication has dramatically improved fit and
          long-term outcomes for this technique.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Technique 6 of 6</p>
        <h2>Trans-Mandibular Implants</h2>
        <svg
          width="100%"
          viewBox="0 0 680 275"
          role="img"
          style={{
            display: 'block',
            margin: '1rem 0',
            maxWidth: '100%',
            overflowX: 'hidden' as const,
          }}
        >
          <title>Trans-mandibular implant cross-section</title>
          <desc>
            Implant posts passing completely through the lower jaw from ridge to
            inferior cortex, anchored by an extraoral baseplate beneath the
            chin.
          </desc>
          <defs>
            <marker
              id="a6"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="context-stroke"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <rect
            x="160"
            y="125"
            width="280"
            height="72"
            rx="14"
            fill="rgba(197,157,60,0.18)"
            stroke="rgba(197,157,60,0.5)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="164"
            textAnchor="middle"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Mandible (lower jaw)
          </text>
          <rect
            x="160"
            y="193"
            width="280"
            height="12"
            rx="5"
            fill="rgba(197,157,60,0.3)"
            stroke="rgba(197,157,60,0.6)"
            strokeWidth="1"
          />
          <rect
            x="200"
            y="207"
            width="200"
            height="10"
            rx="4"
            fill="rgba(197,157,60,0.4)"
            stroke="#c59d3c"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="216"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Extraoral baseplate (beneath chin)
          </text>
          <rect
            x="160"
            y="113"
            width="280"
            height="14"
            rx="4"
            fill="rgba(220,140,140,0.15)"
            stroke="rgba(220,140,140,0.3)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="124"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: 'rgba(220,140,140,0.8)',
              fontFamily: 'sans-serif',
            }}
          >
            Gum tissue — severely resorbed ridge
          </text>
          <rect x="213" y="82" width="10" height="140" rx="3" fill="#c59d3c" />
          <rect x="295" y="82" width="10" height="140" rx="3" fill="#c59d3c" />
          <rect x="377" y="82" width="10" height="140" rx="3" fill="#c59d3c" />
          <rect x="197" y="66" width="42" height="18" rx="5" fill="#c59d3c" />
          <rect x="279" y="66" width="42" height="18" rx="5" fill="#c59d3c" />
          <rect x="361" y="66" width="42" height="18" rx="5" fill="#c59d3c" />
          <text
            x="218"
            y="78"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <text
            x="300"
            y="78"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <text
            x="382"
            y="78"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              fill: '#07111c',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            Crown
          </text>
          <line
            x1="160"
            y1="212"
            x2="80"
            y2="238"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="75"
            y="238"
            textAnchor="end"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Baseplate
          </text>
          <text
            x="75"
            y="252"
            textAnchor="end"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            under chin
          </text>
          <line
            x1="440"
            y1="160"
            x2="510"
            y2="160"
            stroke="rgba(197,157,60,0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
          <text
            x="515"
            y="158"
            style={{
              fontSize: '11px',
              fill: 'rgba(197,157,60,0.9)',
              fontFamily: 'sans-serif',
            }}
          >
            Full mandible
          </text>
          <text
            x="515"
            y="172"
            style={{
              fontSize: '10px',
              fill: 'rgba(197,157,60,0.7)',
              fontFamily: 'sans-serif',
            }}
          >
            penetration top to bottom
          </text>
        </svg>
        <p>
          Trans-mandibular implants are a specialized solution for the severely
          atrophic lower jaw, where bone loss is so extreme that no conventional
          option is feasible. The implant system consists of long posts that
          pass completely through the mandible from the crestal ridge to the
          inferior cortex beneath the chin, where they are secured by an
          extraoral baseplate. This provides extremely stable, full-thickness
          anchorage even in the most severely resorbed lower jaw.
          Trans-mandibular implants are one of the most technically demanding
          procedures in implant dentistry, reserved for cases where all other
          lower jaw implant options have been exhausted. They have been
          performed since the 1970s and have a well-documented history of
          success in appropriately selected patients.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Our Approach</p>
        <h2>A Specialized Evaluation Makes All the Difference</h2>
        <p>
          Not every surgeon has the training or experience to offer these
          advanced techniques — and not every patient who has been turned away
          is actually out of options. At NorthStar, Dr. Kampf performs a
          comprehensive evaluation using cone beam CT imaging to assess your
          bone anatomy in full detail and determine which approach — or
          combination of approaches — is best suited to your situation.
        </p>
        <p>
          We believe every patient deserves a thorough, honest evaluation before
          accepting that implants are not possible. Our consultations are
          detailed, unhurried, and focused entirely on finding the best path
          forward. In many cases, patients who came to us after being turned
          away elsewhere have gone on to receive fixed, permanent teeth they
          never thought were within reach.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Take the Next Step</p>
        <h2>Schedule a Specialized Consultation</h2>
        <p>
          If you have been told you cannot get dental implants — for any reason
          — we invite you to come in and let us take a fresh look. A second
          opinion from a surgeon with specialized expertise in complex and
          advanced implant techniques may reveal options that were previously
          overlooked. Contact NorthStar Implant Dentistry today to schedule your
          evaluation. There may be more hope than you realize.
        </p>
      </div>
    </PageLayout>
  );
}

export function BotchedSmilePage() {
  return (
    <PageLayout
      kicker="We Can Help"
      title="Botched Smile or Failed Implants?"
      subtitle="Expert evaluation and corrective care for patients suffering from poor implant outcomes, failed restorations, or dental work gone wrong."
    >
      <div className="page-section">
        <p className="page-kicker">You Are Not Alone</p>
        <h2>When Dental Work Goes Wrong</h2>
        <p>
          Not all dental implants and restorations are created equal. As implant
          dentistry has grown in popularity, so too has the number of patients
          who have received substandard care — implants placed at incorrect
          angles, crowns that don't fit properly, prostheses that fail
          prematurely, gum tissue that recedes to expose metal components, or
          infections that were never properly addressed. The result can be pain,
          embarrassment, difficulty eating, and a profound loss of confidence.
        </p>
        <p>
          If you are living with a smile that was supposed to improve your life
          but has instead caused you ongoing problems, you are not alone — and
          you are not without options. At NorthStar Implant Dentistry, Dr. Kampf
          has extensive experience evaluating and correcting failed implant
          cases and compromised restorations. We understand both the physical
          and emotional toll of a botched outcome, and we approach every
          corrective case with sensitivity, thoroughness, and a commitment to
          getting it right.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Common Problems We See</p>
        <h2>Signs That Something Has Gone Wrong</h2>
        <div className="page-card-grid">
          {[
            {
              title: 'Failed or Failing Implants',
              body: 'Implants that are loose, painful, or showing signs of infection (peri-implantitis) may be failing. Early intervention — including cleaning, bone regeneration, or in some cases removal and replacement — can often salvage the situation before it becomes irreversible.',
            },
            {
              title: 'Exposed Implant Components',
              body: 'Visible metal threads, abutments, or margins at the gumline are signs that the implant was placed too shallowly, or that gum and bone recession has occurred. Surgical correction of the soft and hard tissue can restore the aesthetic result and protect the implant long term.',
            },
            {
              title: 'Ill-Fitting Prostheses',
              body: "Crowns, bridges, or full-arch prostheses that don't fit properly can cause bite problems, speech difficulties, food trapping, and accelerated wear. In many cases, the restorative work can be redone once the underlying implant positions are confirmed to be sound.",
            },
            {
              title: 'Infection & Bone Loss Around Implants',
              body: 'Peri-implantitis is a destructive inflammatory condition affecting the bone and gum tissue around an implant — similar to gum disease around natural teeth. Without treatment, it leads to progressive bone loss and ultimately implant failure. Early diagnosis and treatment significantly improves outcomes.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Our Process</p>
        <h2>How We Evaluate and Correct Failed Cases</h2>
        <p>
          Every corrective case begins with a comprehensive evaluation —
          including a detailed clinical examination, full cone beam CT (3D)
          imaging to assess the current state of your implants and bone, and an
          honest conversation about what went wrong, what can be corrected, and
          what the realistic path forward looks like. We never make promises we
          cannot keep, and we take the time to make sure you fully understand
          your options before any treatment is planned.
        </p>
        <p>
          Corrective treatment plans are highly individualized and may involve
          implant removal and replacement, bone regeneration procedures, soft
          tissue grafting, new prosthetic work coordinated with your restorative
          dentist, or a combination of these approaches. Our goal is to resolve
          your current problems, restore your function and appearance, and
          ensure that the final result is built on a solid foundation that will
          serve you well for years to come.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Get a Second Opinion</p>
        <h2>You Deserve a Smile You Can Be Proud Of</h2>
        <p>
          If you are unhappy with prior dental work — or if you are experiencing
          pain, instability, or aesthetic concerns with existing implants or
          restorations — do not wait. Contact NorthStar Implant Dentistry to
          schedule a corrective consultation. We will give you an honest,
          thorough assessment and work with you to develop a plan that restores
          both your smile and your confidence.
        </p>
      </div>
    </PageLayout>
  );
}

export function SubPeriostealImplantPage() {
  return (
    <PageLayout
      kicker="The Hidden Gem of Implantology"
      title="Sub-Periosteal Implant"
      subtitle="A time-tested, custom-fabricated implant solution for patients with severely resorbed jawbones who cannot accommodate conventional implants."
    >
      <div className="page-section">
        <p className="page-kicker">What Is a Sub-Periosteal Implant?</p>
        <h2>An Elegant Solution for a Complex Problem</h2>
        <p>
          A sub-periosteal implant is a type of dental implant that rests on top
          of the jawbone, beneath the gum tissue, rather than being inserted
          into the bone the way conventional endosseous implants are. It is
          custom-fabricated — using precise 3D imaging of the patient's bone
          anatomy — to sit flush against the surface of the ridge and provide
          stable support for a prosthetic tooth or set of teeth.
        </p>
        <p>
          Sub-periosteal implants were actually one of the earliest forms of
          dental implantology, introduced decades before the modern titanium
          screw implant became the standard of care. While they fell out of
          widespread use as bone grafting techniques improved, they have
          experienced a significant resurgence in recent years — driven by
          advances in 3D imaging and computer-aided design that allow for
          unprecedented precision in fabrication. Today, the sub-periosteal
          implant is recognized as a sophisticated and highly effective solution
          for a select group of patients — earning it the title of "the hidden
          gem of implantology."
        </p>
      </div>

      {/* ── Sub-Periosteal Photo Gallery ── */}
      <div className="page-section">
        <p className="page-kicker">See It in Action</p>
        <h2>Sub-Periosteal Implants — Clinical Examples</h2>
        <p>
          The images below show real sub-periosteal implant frameworks and
          restorations, illustrating how the custom-fabricated structure
          conforms to the bone and supports a full set of fixed teeth.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1rem',
            marginTop: '1.2rem',
          }}
        >
          <figure style={{ margin: 0 }}>
            <img
              loading="lazy"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUEBAUEAwUFBAUGBgUGCA4JCAcHCBEMDQoOFBEVFBMRExMWGB8bFhceFxMTGyUcHiAhIyMjFRomKSYiKR8iIyL/2wBDAQYGBggHCBAJCRAiFhMWIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiL/wAARCACoASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7LooooAKKKKACuR8Va3d6Td2aWbxiORG3703dCK66uI8exYhsJvRnT88H+lS9gMyXxtqcf/Pv/wB8f/XrG1H4h61bTbI3t/8Aviqcy/uf+ub1yXiWXyryP/crGc5cozvI/iDrJ6vb/wDfFXU8a6t/z0j/ANzyRXntpJ5tnHWzCvleXRGUgO0HjPU/+mH/AHxS/wDCY6n/AM9IP++K5mFqe9PmkB0f/CY6n/0w/wC+Krp441OT/nh/3xWEZP3NU5fL/wCWdHNID0az8RXd94Fu7+32f2jabklTj5WU5/VCD+Ncrb/EPUrmLP7uMlNyp5O3+f8AniuRe+jsr27Tz54/t3l+anOyQr938ef5U64WOOGT/ln8ip/uqATRzSA6aw+JGrX14LfFvHv3bH2feH97Fbh8W6t/ft/++K8V8B+Zfa9Jcf6+3S2X99s2rvOPkHsB3r0rdRzSA3o/FOrSS4E8eP8AcH+FR3/jDVrazeSJ4OP76VkR1Bff8eckdHNIDTTx9q0kWcW//fH/ANeoZviNqX+r326Sf7Cf41zNpL/of/A65ubUv+Kq/sz7P99PN87+717d+n60ueQHqOi+Pr+XXbe31GSBrd9vmuE27c8de3Vfyr1bNfKky/6yPzP9Zu3/AI/w131h471m306O0lu45Jdm1H2Dd7dev1ohV/mHynVa54zu7XWJ4LLy/s8b7N+zdyuN365H4VXXxtqflf8ALD/viuQWfzdNj/2//HueealVqfNIR0x8b6t53/LD/c2VG/jvVv8Apgn/AACucZarTrRzSA6xPHOrXE3lxeQn+35VWf8AhLdX/wCekf8A3wK5PS1/cyf79TreR+d5f9/7n5d6OaQG8fGurZ+/b/xfJsqpcePdatv+WkEn/AB8tc/5n+mXH+fSqeqPRzSAvXfxU8Q2/l+X9l+9h98Ves+E9Rv9W8O29/qscccs+XRI0K/J2PPr1/EV8/WOlf21rum2Eknlx3VxGrun3sZyce+BX05DFHbQxxxDYka7VX2HSrhcciaiiitCQooooAKKKKACiisa58RaZZXv2W4uNkn8XyHav1PQUAbNcb49P+gWP/XU/wAq2p/EelW8W838En+zG+9m+gFcJ4i1v+2ru38qOSOODds343MTj0+lS2Bisv7mSuT8UQfvre4/vp/KutSqt5Yx6lpslp/y0j+eH/erGUfdGc3ozfuY66KBo/8AV1z2m2Mn7y3k/dyJ8v8Au1fs9Mv5bz/SZI440T5Nn8X1qY/CWbPmxxVE9z5tV0sf+/n8b7B+lSfY4/Jk8r+59/8Au1RBBe3cdtD+9krES+uNSm8vTY/+2z/6vH8zUGkWkd9DJd3NxJ5kiff37VVffGM1q20tvbTSRxfvPL+5s+7SLNJVki8uO58uTy/40/ib6dq5vxJqsf2yTRLKPz7ye2aW4/uwp059zlQPciumtZftPmfu/uf561U0/wAOWmm6xf39t5kl7qU2+V3+bbjoq+gFMgs+G7OSx02OOWPy5Pld0/unA+UnueK16SJfKhqPd/rKAJ0WmXK/uZKgs9Qj+2SRy/8ALP8AwzVeLxHYX15d28dxHJcQfJMifw/5zQBkO376q2q3NppF5aXFzHHH9r/dfadn3SOQpPUA5apGb/TJKvS2Nvq+jyWF7/q3/j/iX0Ye4rNfEWYWnNHcw3EnmeZHPu+597Ic/wBNpqLyI/7ejuL3z5I/J/0dEy3+9jH6/UVHZQa9onjCOO5t45NKn2xI6J8q8ctnqD7H8K39Ts7C5/0S+kjjj3703uF+b+7z1+lVYCCfU7P93HbfvI/l2TfOy+/zDofr6VP59v5PmW1x5kdVN3lf6PL/AMs/uf3dtRLYx33+jy/6z+DZ6d1NDA1UvKkuZ45aqW9pJLDJH9o/eI/8afd/WpBY3H/LSSOP/Y3/AP1qogfDeSReZHF/HU1hH/pkkn+xWK6yR3kkcX7+T/f+Ve/QAVtaRHceTJJcxxxx/j835mpRYRr/AKZJ/n0qhqX+urWsIv3MlxL/AB7tn+7nisedvMvKogk8PN9m8baLJ/09xp+Z2/1r6Mr5oeOSO8jkjk8uRHV0f+6Qchvzr3zQNcg1/SY7iL/W/wDLaLd80b9x9PQ9xWkByNuiiitCQooooAKKKKACvHNSkk/t6/jk/wCfmT/0M17HXO634XsNaO+QSQXH/PaH+L6jof51LjcDzC7/ANTTt37mruu6NPosyW9zJ58bruWbZt3evGTyP8KzI2rIZbSq1z+6m+0Rf8Dqef8A1MlUZv8ASdN/ef8ALN6ALMkUd9NHcR/u7iP+P+9/smpTL9ms5P3f7z5tif3jXPpPJFWpBqElIDHSLU9S0eOC58uC4kmXe87hVxk/KfQD5fyrebwfpv8AYc761rUl3eP8tvbadc7lUgfxDoc98jtS/av+mcdSfbKAM2fQftNnHaRSSQW6ffRMLu9OtT2nh6wtv+ekn++/+FWftlDXX/POgC3t/wCWcX+rqMNHVT7VUaSfvqALbyVzvi/TvEuraP8A2Z4KSd9RnmjR5oHEfkp3YuT8o7cc88V0dd/4I0/7Nof2qVAJ7tt//AP4f6n8acY8wHzlfaBq1nZf2Dr8k5vDN/psm8ssmOmGIyQRWRqNnHpupWkdt+72bfnT5dvUCvoT4raMJdGj1uKLdJp3/HwE+80JPP5Zz+JrxfxXZ+VDYXcX/Lf/AD/Ws6seUqJu6d5kmjxyXMnmXEbskv55H6Fa0LSX99UHhfSp5PB+p3dzH/pKXav/ALsTRgKufXK/+PUR0nH7QzpFX/VyRf8ALSuN8a+E5NbmtLux/eXFpuR4f7wOOnv7V19nP+58urKtHWhBwukafJbQ+XLBPH/wA1bklkttSt44rf76N88j7dvTp3zXb+ZHVWWO3k/1scdAFXRdF+26ulpFd+R56N/r8y7mH8IGRzjcevao/EOkalo2r26QyXEgT5H2IGWRTjD7cHgYwR2yfrVxYrePy5I/MjkT50dHKsp9j2q8/iC7/wCfuf8A7/GmBztjd+Z/rI445H/jRNu78OxrQ8jzP+Pn93H/AOhUz7VHF/qo44/+AVSuLySWkBPfXPmfu4qzYEj+2fvf7lSJREn77zKAKNy3+mVSe8kttYjuLa4kgk+X50cq35irupfuq567f/lpQB02peK9Ti6and+Z/f8AtL/L+tdz8KPF194gOr2OpT/aPsPlvFM/3sNuBBPf7v6mvPNO8D614s2T2UHl6e/y/aXmChiODxycA+1e1eDfBWn+C9PkgscyXNzta4uX+9IRnH0AycD3NXDmuB1lFFFaiCiiigAooooA5/xTpP8Aa+hyJEmbiD95F9R1H4j+leVp/ro69zry3xZpP9m6x5kUf+j3b70/uq/cf1//AFVnNDMaX/UyVlbq14v3tY11/o32j/c3pWTdkBRur6wivPs9zdwR3En/ACxeYK35Vagi8r/lpXH+M/CcmpeKtIuNAtI/7O1hFdH/AIemW3E/qTWhB5eialHpkepwX/8Ac2Pu2kdVz3/+tXkUc0U5qLjubyp6HVq1NDVEsnm1m3fibTNN1iDTJbiT7bPt+RIXb73TJA7/ANa9czOw0nwxd63aPPZT2vyPtdHZs/yrGuJI7bUriwkuI/tED7HTf8y1oRX8+iyyT/6RBcWqM3k7Nu4gZCsD2PT8ayhLHcw/aI4/M8z77v8Ae3Hk5Pr9786ZBIzU+1b99J/uVA1S2f8Ay0oAw/G2sXGm6b9nsriOC9u9tvbu77fmPVs9uO/TmvV/hz4vuNb04aZr3ya7arl8rsaZAcFiv8LA8MPX0zgeD+PILi51i3kto/M+yW0j73TcsecDdj2rtPhlF/xUegx21/H5kE07On8TIYm3IP8Age1+aIS94D6AnijuYZIZV3xyIUdD/EDwa+VvEdpJ5OiaZLJ/x6JNvf8A65gV9YHpXzx8QfD09vr3lxSf6RdTSJbon3VEpAVT75DfgRV1Y8yHE9P8AaXF/wAK/i80f8hFWaUj+IfdGP8AgAX9a821vTpNJ1Ke0lk8ySD+P+8vZq91sbKPTtNtLO3/ANVbRLEn0UYFeReKrnSb6c3+nT3c9xev5sqToVWNfLUAAEDGMZ7/AHjzwBROPuiMC1vPKhq8NQjl/wCWlYluvm+ZUH7uX95HJHJ/uOG/lWHMWbIuZIpv3cnmVKdQrIS5/c+XHH/v/jXX+GtFsL3Tb+/vvM+z2P8AHx+8fGSOc4/h496uJBkrd1OPM8mopfL8793H5fz/ACJv3bfxqR2/c0rlkbyVm3N9b2MPmalcRwR/7b7ankuY4/Mkk/1aJvd68j8V6rpl9NPJe6n5cnks8KeTI0agZPVQcHiuXEVp05KFJXb6LUXuxXNN2R69pep6Zq8Mkmm3cE/l/f2feX6jqKt3EnlVzvgyzsNI+HtpJFJBd3t08b/aYHDqqNnCkjoeOn0rQuZf3NGCxX1iDb6OxU1YoavP/wAs6yLKwn1/UbTTbL/j4nm8pP7q+rn2ADH8KdeSSSzfu/Mkk37ERPmZmPAUDua9r+HfgceG7J7/AFL/AJC92nzr/wA+6ddgPc+p9h6ZPbGPMZna6XYQaTpFrYWYxBaxCJB7Ad/er1FFbiCiiigAooooAKKKKACql7aQX1pJBcpvjccj/D3q3RQB5RqHhu/0nzHl8t7Pf/rk/qO1cd4tk+w2cd3J/wAe0m2J3/u5fG7Pb79fQjqJAUcZRq8L+Plj/YPw3u7uyt3ks7qaO3uUH/LuGzh8+m4Kv1YVy4mP7p8pUfiPnXxdYamL2Owl1OSSy06VJ7dN++PkgjjofpW58L9FnjPmaj5cclq++FIMbdpB/LOc1weoQQR6an9pa1psey2/0iznSSV41fhHwFPJ3A+oGOxGPafAlnaaboNhJbavaa7ZvYr5V7B+628sSm0gEFcqPmwT+g4aieGwVJTa5W77NP8Aq5nStPEzdtVpvodxbRSXM3lxf6z/AB6VzOtrf6t4ktPM0ifTZNKRVt3eF0lbDlt5z/t7iK6Kznkj/eRSR+Z8r7Eysi45+6Rmrmr+MJ9e8j7Rs/c/d2Ljr1rqpVIzjzcxtKJNqGp3er6PBaXMnmbJvtD787skfdHtndWXbfurOSP/AKbfJ+VZl/rlvpv7y9kggjk+5vmSNpF/vAEgkVGvie0ufL8u4/1j/J/tfQ9/wqJYulzctx8kiTxL4hsPC+gz6nq8kn2dPuJAgZmY8BRkgfiewNVPC/iqDW7y7+zXEc9sjrFKj/LLbv8AL8p7MP3iDcO59qPFXh6TxR4bn0y2kjjknddj7A67sjGQeCPb2rzDwvpceieL30G28RWs95JNs8lJj5fy5IiizjdmSMjcBjO361jiXGEHO751ay6W63M1Jqqo9Hf7z1Sa18rxtJcS/wCru7Zoof7rYPzKfrnP4VY+Dlg4+KV5BH/y4+ZK79fk+eML+JdW/wCA0qr/AG3Z3FvLJ5Fxv3wzJ96N+zYP8q7v4S+F7jSJtS1LUZ7T7bdqq+TBM8rbQx+diwHXjt26+nbTcZWlEqR65XiWpSXGofEbT5+sb6pH/wABSOVQv6D9a9jvLuOx06e7mO2OFGdvwrxS4WS5s7SOP57jzo1+T+Is4X+ZreYke3zzCCGSR/uIhY/hXzrqUlvbQ2kn/Pd1T7/zcnj64r3TxNd3ln4cvJ9OgknuQvyrGu5gCcFgO5A5rwqa1kufskktpPaW8Ds6JdWzozMox1I7ZX8hUzCJgag9pL9ojvZJPs+zfsT5fM/eKCv4pu/KvN/Avj/XtV177HLHYz6fPu/1FuEjhBI8rygQHA4cc8H1r0XXNStNEs5NTvbT7Xb2rx7ERN0jOX3DaB3wjc9utQeB5vDXiPSL/V/DGiJYSWt8sVxDA5dWUxZjZAfugAsNvbFePzwjKpOcLq8UpdurKl704xT7uxN4hnjtobe4itIJ9RjfZbzPCGaFj1YEjjp+eK6TQ9Yki0e7tJY5PLuttx9/5llHG73BHGPpXJeJtat9N8u31LTLuD+NHnTZu6jp6c1hwfEuO2/dxW8En/AHVvzz/Stv7Qo/ZL9lI9q1PSpNE+yfabiCSSdN3yPu29Mf+zc+1VA1cppfiW08QQ+ZHJ+82fc/u1spdfZv3ddMKtOrG8DPllEnvLaO5hkj/wCWbpsf8RXhnjDwz/ZGsX8ljeJ9n8nzfJvvmjjPGXBwRj73XHXvXrmqaxJFZySRfu4/u/j2XPrXJeJfD2mXvha71DxZqf2SOdFW0SPY7MwOcbSQH68jOMd64auLUMRCNFvm20107Cq04TpP2i08zU8B6/pHh/4e6nafa7C7t47aO/8AnTymkY4DIFIGfUcd617KW71aGwjsrSR7y6hV0hT5m5GeT/MmvANRsLDTovtdlJcSWfypcPs2IoG37o3OOdq98DpivurwL4Xg0HQ7edo/+JhdRK9xI67SuQD5YHYD/Pt00MGqGJqcrev825FGt7Winp8tjO8EfD9NACalqoSfVsfJ3S3B9PVvU/gO5PoZozS16SVhhRRRTAKKKKACiiigAooooAKKKKACqt1a299Zy297Ak9vMhSSGZQyuD1BB4Iq1RQB5Pe/APwJe6ibpNLktpMbf3Lhhj0G8Egew4rJ1b9nzRhp3l+EtSvtHuI/9VjDxZ91wD+IP4GvbqTFYTw9OouWSHF8rufFHi2Hxz4GH2TxJHcR2afJFeJ+/tW9NpIwpPoQh9q5i28aavc/8vf7z+//ABfrX3xPBHcQSR3EaSRuu1kddwYehHevmf4ufBPTdGtLnxT4Xie3s7f59Q0yBN22LPMsC57dTHwCM4wRg+ZWytRTdI2jV7nz7eyyXN5JJJJJJJI/zu77mb6mu58F6Rd3P7u2kjkjk/1sP3uPcf1qbRvAdh4t8HyXegX/APxNYN3yI4eORsZXaf7pHrgjuMgiuf8AhLd/234qkjsZLux1GNPNim37l2gHKtH352559enWuCrg6soWiac8bn1R4f8AA9ppukfaPtF9PceS2xJHDLG2OCOM5Hua+R9P8B6xpvjSPT9WsYIHsZkiim4fzI1yRtJJKkn6cMa+m4/H2vaLps8HiCwsf9S32S8gm/dyMBnaytypxz36HmvLdM8OR+KLy8u9bv7ue9fy5UmtZiqqJEDKwPQ/qKnBVsXRlLDreSs7mNSjGraT6HFW/wASNavfF6SfYLv7Hevu+2JsVmUYBlKsuOevUE5z3r3K01O4i8v/AEiOfZtffB8qsrAEMO4yCpx2zivFtS+DesW3iP7dbRyTjfvR47jbH+K4yOcHaDivTvDeh3ek6P8AZ76TzLj5d/8AdXAwFFetGMIVYRoppW1v38iIc/K/aNeVjsjefbYfLvZJJ4/4Ed9yq1QTSfYv9ItrjyI4/nR9n3WHTH5VB/2zqlcL9pmj/d/6v/b3LXXcR3UXxLvvKRJbRPN2ff2H5vfbniuW8Ra9Je+ZcXMkfmP/ABzvtVVAJP0UAMeOfqareX5UP+rrJ8Q6Hcato8kdjJ5dxH86b/lVuMFTUYh1PZPk3Kja54h4i8bweJJbvw9q0c9pZSP8l1s2OzsV2uqnkqPLU9em71r6K8B+DrTwT8LLiP8AtPz5Lub7b8/7vyxjhcEk/wB4596+dbb4Za3ba9+7sLuO2+b5J0Cxcvk5Yk5H0GcfnW/H4su7nxVJ4dkv31L+0btUd9mxY41LBhj6LXlY6lKUFSw1+V7379/8+hVJPm56m629DofiZ4jk8bfZI/D9pPdyWqbXmRP3fH+0eK8ehjuPtnlyR/vN+zZ975q+jtaX7N4Vv/s0fl+XbNs2fLt4rwDwNZz6l8Tvs+pSSSWdq8srp/eK8Dnr15/ClHBeyXs0zXn5tR63N3pt5HJbSSQXEf8Ac+Vlrbl+Jep+THHL5Ekkf8f3Vb6gf0xXb+Nb/RZtOjj1F0kuY4Wleaf7trCONzP97k4VFGcuwAFa/wAIvgPYeJ9OtPFPix5H0+cb7TSkbYWAYj98RyOR90fieop08FUlOzCU+VXOB0NPGPxM1FINJt7i/wDI+XfxFbWueuSMKvr/AHz719Aab8ChJoMEHinWpLu8j+ZUgi2xRkjlQT87D8RnHSvYtP0+z0rTYrTTbWC0s4F2xQwIERR7AcCrp6V6VDAUqUlLqvlYwqT9pHlex5PoHwM8M6Rq8GoXKC7kglEqQ7dkXmL913BJLsO2TjvjPNesduRRwBSduK9DfUyjFQXLFaD6KKKCgooooAKKKKACiiigAooooAKKKKACiiigAooooAKrXdrHe2U9pcjfHOjIw9jxVmigD4Z+BlnPonirxdoMv/MKuGt9j/3o5XX+jfnVT4b6dJZfGy/8uP8Ad77v8hK6ivoLxn8LdQt/Hl3408DRRzXmoeX/AGnpk03lLcbBjfGSMbyAowSoyM55OfNfh5PaXuvSTx/u720tmtbtP4o5jd3Ekin35Uf8Brz6qlGSXmar4TsfF/2CLTbCTVo5JLKO7j81E+9ghl49/nrlPhK1xfaDJ9p/5dfKtU/3I0yP0da0fidc/ZvBM93cxyT29peW1xcIn3mjEqbsfhuq78PLnTP+EJ0yTTf9XPCrO/8AthADn6Yx+FTKnJ4lS8v6/MOb3Tskjpj2kdN+0x/89Kcssf8Az0rqMyCS0/551ClrV9JI6FaOgCstpStBVmq17P8AZrPzP9ZJ/AifxN/dplmRqsscdnJJL/q40Z6+f/h3pEdz8YP9Z5klrDJLN/svsUMv/fcjD8K9c8X6hHbeD9Tu77zPuKmz/eIX+tcF8ImSLWNX1eW3nj+1QxsnmQ7fMMruSw9RlOtck2/bKI/sntz6RHfWclvJ/q50ZH+hGK+aI9Yj0nxVcWFzBHBJof2v+0LlPvTL5gxgepJUAfSvpNdTkjh/49/3n9zeN35ZzXzXaeDfEXxI+LOvWHhmB5HmuVlu7+ZDHBaoAFV2P8R4yijk8nsSNJUoykn1Q4eZrfDbwtr/AMYfF1wfKgg0bTbhZb2YfcWXB8qId28sbzgfxsSeor7f8O6DaeGNBg0zTg/2eDPzOdzMTySaxPht8P8ATPht4Es9B0keYE/e3Fy6bXuJjjc5HboAB2AA7V2ddcIcpnOXMxaKKKskKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKADtXw34l8L+Jvhn8WdZk8G6L4hvLKRl3o9jJdRXW7c29XTuPl6jO8v7Z+4WYICzkVif8JVoAtJbgatY/Z4nVXfzhtVm5Gfrms5w5yk+U+SYfiXcXtnJpniTwzvluna1lto0O6TIPybG65H86h1nS7j4O+JNMt7K7nk0rW0jvG097Z1S3Mm4FQx5yNo4AB+bkevtun/Bu1vfGEfiGy8YX8+j/ANrtqSWCJGy7wnlFBJ12gL5fTOwY6/PXXfEfwJP440vTotO1qTRdQ068juobpLcTj5WB2lCR/EFOf9nuMiuX2NVwd3r0NOdI8m+GEv8Awsa71BMSWP2HbuG/zElyWHBAHTC5H+0K9Ef4aX8c6eVqULxj/noGVv0rb+G/geTwF4R/si41aTVbl52uHujCIl+bACqmTgAAdScnJ9h3Fb0oS5Fz7kSlroeL6t4P1rTpo/Kjku7b+/ajLL+FYcyXdtN5FzBPHcf3HhO724r6Foq+QXMeQad4L8RajAftM8Omxt/GAWk/754x+JH0rtNA8H2+i3f2s3Elzc7NqvJ0XPXA9a6ukNUkLmPl3496bf6d8S9H1C21O0sbfXIVtdklyYlWSA+YZ5Og6FF3dtq+1ecaD4J1uX4Q2niGyfVtSt5763iSHw65kljhOTLuUD5iNyrxko6kHjOPs/XfDWi+KLSK38RaVY6lbwSebFHdQrKqvgjcM9Dgn86ggu/D3hcWmhW0ljpyIqrb2UeI1UMW27VHqVf8jXO8NGU3ORanZHw7c+EvEVjDBd/2L43sY50u/s7paPuaQZEfmBTuQEeVnIBOGxnivrf4MeEk8J/DS0jEeoxyag/2t4dSx50IKKkaMAPlIjSMFexzXYQ+KNGubyS3t9TtXnjLq0YfkFMbvyyPzrLuPiP4Xtrw2n9rRySqOkCNL+qgiqhThTd7lKM6ukI/cdh0o69RXO2HjPQ9SmSC31GD7RIdqI+Y2ZvQBgMn2rocGt4yUtjKcJQ0kh1FFFMQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeXePfD0Ws3VxdiSRLiyiVc87doBc9Oh57V5Pqei6noHhu40y2t4Ps99MtxsT5mbAyMHHHvx2r6I1KP7PqPmf8sp9u/+7kcfyrDa2jlmtJ/L/eWrsif7p4K/otctRe9zRO6jikoclSN0eX6bqXiKXwrZ2GgXepQXtveSO0KIissBctvY42kknp+ldXpfxT1LzbC31zTIbWTesV3IZtwXg7n4GByBx71sadpn9m+JL+SP/j3u0V0/Mll/M/kR6VkeMNFj/d6nHb+ZHJ8kyJ8vPZj/ACP4Uc84q5pCFCdX2fR7bfcJY/Gb/iYyx6jpM5tkeRBLZIZSMEbSQccEFunpXV2fxP8ACV9MkVvqv+kPwIGgkV8/Qrmki0qz/s2O0+zx+Wifc2d8ct9a4nTNCj/4TbyLm3j8uBGl+58rKOje3O39aHVmmKnRws4PfT8T1ifXbG3hEkryeX/fSJ2UfUgcVLBq9hc2huLa9tpIP+eqShlH1NZKXPlQ+X/frzHV/Dkf/CVfZ4rf/j6dWR0/hX+LjHbr+NXOq4nPh6EKsmm7Hq8fifTbrebKR7qNOskCFk/BujfhmsvUPiBo1lG/ltPcXA/5YJC6tn33AAVJFHHbWcFvbR+XHAmxK4nxbpElzrFpcW0f/H3+6d0/vg9/wP6Upzmo+6XhqVGpV5ZvQyNQ1nX9R1Z9a06W7tbeP5zCju8S/IF57HpnoOcmuetY7j7ZHcS3F/d3u9djzzeZIrZJG0tnHLtjHrXtkVtHbWcdvH/q0T5E/uiuV0Hw19m8SXd3cx/6Pau32f8A2ien5D/PFZSU9NTuo4nDqM7wWmxyF94OuNJPn+fJJcao8kUqI5Zm3YJVjnDA46Y7VtaP8Pbe2vI4L3y5I5Id7ony7WzgLkdfr7V2jp5upW//AEz3P/wLGP605ZP9Mk/6Zp/Wj2S5jneYVOS0dDnvDugx2Om3dxJ/x8fMkL/xKBxx+Pf29K9StZvtFnBN/wA9UVvzGa4yJvN037PH/rJEZET/AGjmuztoBbWVvAnSFFQfgMV0Uo8qOKtVlVnzssUUUVqZBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAySNJB86Bqxr3Rnklke3kRN/wA2zZ/EPxrcrj9U16a18daZpsc8aWc21ZkwPvMkpUZ7ZKLStcCJhPIQI4J3MP3n2cL/APX9qsQ/6T8kfz7/APgVb/8Aadn/AGv9g8//AEzZv8rnpUlzcwWNo89xIEiQ/M/1OP5mp5AOb3eV+7l/dyJS7f8Alp5f+s+Tf/7LmuktbmC9s4Lq2cSQToro46MDyDUsiJKNki7h70cgHK02um+xW/8AzwjpyQRxxlERMP8Ae/2qXIO5zNSwRSSTfu037PmrofskH/PvH/3wKekUcQ+RET/dGKfII5t4Z/8AnhP/AN8GpP7Muood+wSfxbM/Mv8AStDW9UGiaPJeyIZBG6LsXj7zhf61S1XWHj8Eyarbv5Mj26yxZw21mAwPfk4o5A5iKDRZ5GeaWTy5Puqn3vzI6VPDoB3eZLN87/fVPu49j61zd/4su7bwlot5Hdx/aJ5XW4d0HRQ27jtggV6CrBwGQ0+RBzDI4Y4okSNOEXav0qaiiqAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArKuNE0251KO/uLSN7tGVkkOd2Uzt/LJ/OiigDDbStW/wCFjpqflwf2f/qt+/5tnl+nr5n6VreJLS7vtH8ixSOSR5Y9+84+QOCce/FFFAB4Wtbyy8I6ZaanHHHeW8KxOqHKjbwOfoBW3RRQAUUUUAFFFFAGPrujjWtPitzcPAsdxHK2zndtbO0+1FpolvF4ct9Ivj9tghjVG88f6zHIyPw/SiigBs/hrSLi1jgksIDHD5myPlQu/wC/09a1kjEUaJHwi0UUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q=="
              alt="Sub-periosteal implant framework on lower jaw model"
              style={{
                width: '100%',
                borderRadius: '0.9rem',
                objectFit: 'cover',
                aspectRatio: '4/3',
                border: '1px solid rgba(197,157,60,0.3)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
              }}
            />
            <figcaption
              style={{
                fontSize: '0.8rem',
                color: 'rgba(197,157,60,0.75)',
                marginTop: '0.5rem',
                textAlign: 'center',
              }}
            >
              Lower jaw framework model with abutment posts
            </figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <img
              loading="lazy"
              src="data:image/jpeg;base64,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"
              alt="Sub-periosteal implant — upper jaw with zygomatic anchorage"
              style={{
                width: '100%',
                borderRadius: '0.9rem',
                objectFit: 'cover',
                aspectRatio: '4/3',
                border: '1px solid rgba(197,157,60,0.3)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
              }}
            />
            <figcaption
              style={{
                fontSize: '0.8rem',
                color: 'rgba(197,157,60,0.75)',
                marginTop: '0.5rem',
                textAlign: 'center',
              }}
            >
              Upper jaw sub-periosteal framework with zygomatic anchorage
            </figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <img
              loading="lazy"
              src="data:image/jpeg;base64,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"
              alt="Sub-periosteal implant placement with prosthesis"
              style={{
                width: '100%',
                borderRadius: '0.9rem',
                objectFit: 'cover',
                aspectRatio: '4/3',
                border: '1px solid rgba(197,157,60,0.3)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
              }}
            />
            <figcaption
              style={{
                fontSize: '0.8rem',
                color: 'rgba(197,157,60,0.75)',
                marginTop: '0.5rem',
                textAlign: 'center',
              }}
            >
              Full implant system with prosthetic teeth ready for attachment
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="page-section">
        <p className="page-kicker">Who Is a Candidate?</p>
        <h2>When Sub-Periosteal Implants Are the Right Choice</h2>
        <p>
          Sub-periosteal implants are indicated for patients who have
          experienced severe jawbone resorption — typically long-term denture
          wearers, patients who have lost teeth due to advanced periodontal
          disease, or individuals who are not candidates for bone grafting due
          to medical conditions, prior radiation, or personal preference. The
          key criterion is insufficient bone height or width to accommodate a
          conventional implant, even after grafting.
        </p>
        <p>
          These patients are often told by other providers that implants are
          simply not possible. The sub-periosteal implant offers a compelling
          alternative — avoiding the need for extensive bone grafting,
          significantly reducing treatment time, and delivering a fixed, stable
          restoration on a bone structure that conventional approaches cannot
          utilize.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Process</p>
        <h2>What to Expect</h2>
        <p>
          Treatment begins with a high-resolution cone beam CT scan that
          captures a precise 3D model of the patient's jawbone. Using this data,
          the sub-periosteal implant framework is digitally designed and
          custom-fabricated in a dental laboratory to match the exact contours
          of the bone surface. The result is a framework that fits with
          remarkable precision — distributing load evenly across the ridge and
          providing a stable platform for the prosthesis.
        </p>
        <p>
          Surgical placement involves a single procedure in which the gum tissue
          is gently reflected, the custom framework is seated directly onto the
          bone, and the tissue is closed around the implant's abutment posts.
          Healing typically takes several weeks, after which the final
          prosthesis is attached. The procedure is performed under local
          anesthesia with sedation available, and most patients are pleasantly
          surprised by the straightforward nature of the recovery.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Outcomes</p>
        <h2>Results & Long-Term Expectations</h2>
        <p>
          When properly planned and placed, sub-periosteal implants provide
          excellent stability, function, and patient satisfaction. They are
          particularly valued for restoring chewing function and eliminating the
          instability and discomfort of conventional dentures — outcomes that
          can dramatically improve quality of life. As with all implant
          solutions, long-term success depends on maintaining excellent oral
          hygiene around the framework and prosthesis, and attending regular
          professional maintenance appointments.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Interested in Learning More?</p>
        <h2>Schedule a Consultation</h2>
        <p>
          If you have been told that implants are not an option for you due to
          bone loss, the sub-periosteal implant may be the solution that changes
          everything. Dr. Kampf at NorthStar Implant Dentistry has the
          specialized knowledge and experience to evaluate whether this approach
          is appropriate for your anatomy and goals. Contact us today to
          schedule a comprehensive consultation and find out whether the hidden
          gem of implantology is right for you.
        </p>
      </div>
    </PageLayout>
  );
}

// ─── HydraFacial Page ─────────────────────────────────────────────────────────
// STEP 1: Create a new file in StackBlitz src/ called hydrafacial-images.ts
//         and paste the contents of hydrafacial-images.ts into it.
//
// STEP 2: Add this import to the TOP of your pages.tsx (with the other imports):
//   import { SYNDEO_IMG, BA1_IMG, BA2_IMG, PERK_LIP_IMG, PERK_EYE_IMG } from './hydrafacial-images';
//
// STEP 3: Replace your existing HydraFacialPage function with everything below.

export function HydraFacialPage() {
  return (
    <PageLayout
      kicker="Glow From Within"
      title="HydraFacial"
      subtitle="The world's #1 most requested facial treatment — delivering instant, visible results with zero downtime. Now available at NorthStar."
    >

      {/* ── Authorized Provider Badge ── */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg,#f4d88c,#d1a245)', color: '#1d1302', fontWeight: 700, fontSize: '0.85rem', padding: '0.5rem 1.2rem', borderRadius: '999px', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
        ✓ Authorized HydraFacial Provider
      </div>

      {/* ── Why NorthStar ── */}
      <div className="page-section">
        <p className="page-kicker">Why NorthStar Offers HydraFacial</p>
        <h2>Where Skin Health Meets Dental Excellence</h2>
        <p>At NorthStar Implant Dentistry, we have always believed that true health and confidence go beyond the teeth. The face is the canvas — and the skin on that canvas deserves the same level of expert, technology-driven care that we bring to every surgical procedure we perform. HydraFacial is the natural extension of that philosophy: clinically proven, non-invasive, and capable of delivering results that patients can see immediately after a single visit.</p>
        <p>More than a facial, HydraFacial is a medically backed skin treatment used in thousands of professional practices worldwide. It is consistently ranked as the most requested professional facial treatment globally. Whether you are a dental patient looking to complement your new smile with radiant, healthy skin, or a new patient drawn in by the treatment itself, NorthStar is your trusted destination for whole-face confidence.</p>
      </div>

      {/* ── Device + Technology ── */}
      <div className="page-section" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem', alignItems: 'center' }}>
        <div>
          <p className="page-kicker">The Technology</p>
          <h2>Patented Vortex-Fusion® Technology</h2>
          <p>HydraFacial is built around a proprietary Vortex-Fusion delivery system — a patented technology that uses a spiral HydroPeel® tip and vacuum-powered fluidics to simultaneously remove impurities from the skin while infusing deeply nourishing serums. Unlike traditional facials that cleanse and hydrate as separate steps, HydraFacial does both at once, in a continuous closed-loop process that maximizes serum absorption and minimizes irritation.</p>
          <p>The result is immediate, measurable improvement in skin clarity, hydration, tone, and texture — visible after just one treatment, with no redness and no downtime.</p>
        </div>
        <div>
          <img
            src={SYNDEO_IMG}
            alt="HydraFacial Syndeo device at NorthStar"
            style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(197,157,60,0.2)' }}
          />
        </div>
      </div>

      {/* ── 7-Step Breakdown ── */}
      <div className="page-section">
        <p className="page-kicker">The Treatment</p>
        <h2>Seven Powerful Therapies — One Session</h2>
        <div className="page-card-grid">
          {[
            { title: '1. Lymphatic Therapy', body: 'Gentle suction encourages lymphatic drainage, reduces puffiness, and promotes a more sculpted, lifted appearance. This preparatory step detoxifies the skin and enhances the efficacy of all subsequent steps.' },
            { title: '2. Microdermabrasion', body: 'Gentle physical resurfacing removes surface impurities, dead skin cells, and excess oil while preparing the skin for deeper exfoliation. Leaves skin immediately smoother and more even in tone.' },
            { title: '3. Acid Peel', body: 'A gentle blend of glycolic and salicylic acids loosens deeply embedded debris and congestion from pores — without the irritation or peeling associated with traditional chemical peels.' },
            { title: '4. Vortex Extraction', body: 'Painless automated extraction removes blackheads, whiteheads, and pore congestion using the Vortex-Fusion suction system — far more comfortable and effective than manual extraction.' },
            { title: '5. Serum Infusion', body: 'Intensely nourishing serums packed with antioxidants, peptides, and hyaluronic acid are infused deep into freshly cleansed skin — visibly plumping, brightening, and restoring radiance.' },
            { title: '6. LED Light Therapy', body: 'Red or blue LED light is applied to enhance results. Red light stimulates collagen production and reduces fine lines. Blue light targets acne-causing bacteria and calms inflammation.' },
            { title: '7. Booster Personalization', body: 'A targeted super serum booster customizes every treatment to your specific concern — from anti-aging and brightening to intense hydration, acne control, or firmness restoration.' },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Treatment Tiers ── */}
      <div className="page-section">
        <p className="page-kicker">Choose Your Experience</p>
        <h2>Treatment Options at NorthStar</h2>
        <div className="page-card-grid">
          {[
            { title: 'Signature HydraFacial', time: '~30 minutes', body: 'The essential three-step experience: cleanse, extract, and hydrate. Perfect for first-time patients or those looking for a quick, effective skin refresh with zero downtime.' },
            { title: 'Deluxe HydraFacial', time: '~45 minutes', body: 'Everything in the Signature treatment plus a personalized booster serum and LED light therapy. Addresses specific concerns including aging, brightness, hydration, or acne-prone skin.' },
            { title: 'Platinum HydraFacial', time: '~75 minutes', body: 'The ultimate HydraFacial experience — all seven therapies including lymphatic drainage, a premium booster, and LED therapy. The most comprehensive skin transformation in a single session.' },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <div style={{ display: 'inline-block', background: 'rgba(197,157,60,0.12)', color: '#854F0B', fontSize: '0.78rem', fontWeight: 600, padding: '2px 10px', borderRadius: '999px', marginBottom: '0.5rem', border: '1px solid rgba(197,157,60,0.3)' }}>{card.time}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Before & After ── */}
      <div className="page-section">
        <p className="page-kicker">Clinically Proven</p>
        <h2>Real Results — Hydralock HA Booster</h2>
        <p>The Hydralock HA booster is clinically proven to dramatically increase hydration and reduce the appearance of fine lines and wrinkles after just one treatment.*</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1.5rem', margin: '1.5rem 0' }}>
          <img src={BA1_IMG} alt="HydraFacial before and after — hydration improvement" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', boxShadow: '0 6px 24px rgba(0,0,0,0.12)' }} />
          <img src={BA2_IMG} alt="HydraFacial before and after — fine line reduction" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', boxShadow: '0 6px 24px rgba(0,0,0,0.12)' }} />
        </div>
        <p style={{ fontSize: '0.78rem', color: '#888780' }}>*Based on Corneometer measurements of 38 participants before and 24 hours after treatment in a clinical study. Individual results may vary.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { stat: '37%', label: 'Reduction in wrinkles' },
            { stat: '30%', label: 'Increase in muscle tone' },
            { stat: '23%', label: 'Measurable lifting' },
            { stat: '455%', label: 'Increase in skin hydration' },
          ].map((item) => (
            <div key={item.stat} style={{ background: 'rgba(197,157,60,0.08)', border: '1px solid rgba(197,157,60,0.25)', borderRadius: '1rem', padding: '1rem', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: '#c59d3c', margin: '0 0 0.25rem', lineHeight: 1 }}>{item.stat}</p>
              <p style={{ fontSize: '0.78rem', color: '#4a5668', margin: 0, lineHeight: 1.4 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booster Serums ── */}
      <div className="page-section">
        <p className="page-kicker">Personalized Super Serums</p>
        <h2>HydraFacial Boosters — Targeted Results</h2>
        <p>Booster serums transform every treatment into a fully customized skin experience. Each booster amplifies results for a specific concern and can be added to any Deluxe or Platinum treatment. Our team will recommend the right booster during your consultation.</p>
        <div className="page-card-grid">
          {[
            { title: 'ReGen GF+', body: "Growth factor booster that mimics the skin's natural repair process to reduce visible signs of aging, boost collagen and elastin, and restore youthful firmness." },
            { title: 'Dermabuilder', body: 'A nine-peptide complex that deeply hydrates, strengthens the skin barrier, and visibly reduces signs of aging — firmer, more youthful-looking skin after a single session.' },
            { title: 'Britenol', body: 'Brightening booster featuring a proprietary Vita-C Complex that visibly evens skin tone, reduces dark spots, and delivers an immediate luminous, revived glow.' },
            { title: 'Hydralock HA', body: 'Triple hyaluronic acid complex clinically proven to deliver a 455% increase in skin hydration and a 63% reduction in wrinkle appearance after just one treatment.' },
            { title: 'Rozatrol', body: 'Calming booster designed to reduce visible redness, soothe reactive skin, and minimize oiliness — ideal for sensitive, rosacea-prone, or acne-reactive complexions.' },
            { title: 'Beta-HD', body: 'Deep-cleansing booster that targets congestion, minimizes pore appearance, and reduces visible breakouts — the go-to for acne-prone or oily skin types.' },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Perk Add-Ons ── */}
      <div className="page-section">
        <p className="page-kicker">Take-Home Add-Ons</p>
        <h2>HydraFacial Perk — Lip & Eye Enhancements</h2>
        <p>The HydraFacial Perk system extends your results beyond the treatment room. These targeted rollerball serums use micro-rollers to gently exfoliate and infuse nourishing ingredients into the delicate lip and eye areas — with a take-home pen so the glow continues between visits.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <img src={PERK_LIP_IMG} alt="HydraFacial Perk Lip Revitalizing Serum" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', objectPosition: 'center', aspectRatio: '3/4', boxShadow: '0 6px 24px rgba(0,0,0,0.10)', border: '1px solid rgba(197,157,60,0.15)' }} />
            <p style={{ fontWeight: 600, margin: 0, color: '#07111c', fontSize: '0.95rem' }}>Perk Lip Revitalizing Serum</p>
            <p style={{ fontSize: '0.85rem', color: '#4a5668', margin: 0 }}>Exfoliates and nourishes the lip area for a plumper, smoother pout. Includes a take-home rollerball to extend results between visits.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <img src={PERK_EYE_IMG} alt="HydraFacial Perk Eye Replenishing Serum" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', objectPosition: 'center', aspectRatio: '3/4', boxShadow: '0 6px 24px rgba(0,0,0,0.10)', border: '1px solid rgba(197,157,60,0.15)' }} />
            <p style={{ fontWeight: 600, margin: 0, color: '#07111c', fontSize: '0.95rem' }}>Perk Eye Replenishing Serum</p>
            <p style={{ fontSize: '0.85rem', color: '#4a5668', margin: 0 }}>Targets fine lines, puffiness, and dark circles. Replenishes moisture and restores a bright, rested appearance around the eye area.</p>
          </div>
        </div>
      </div>

      {/* ── Video Placeholder ── */}
      <div className="page-section">
        <p className="page-kicker">See It In Action</p>
        <h2>The HydraFacial Experience</h2>
        <div style={{ background: 'rgba(197,157,60,0.06)', border: '1.5px dashed rgba(197,157,60,0.4)', borderRadius: '1rem', padding: '2.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#c59d3c', margin: '0 0 0.5rem' }}>Video — coming soon</p>
          <p style={{ fontSize: '0.88rem', color: '#4a5668', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>Upload your HydraFacial videos to YouTube (unlisted) then replace this block with an iframe. Three videos are ready from The Drop: Overview Loop, Treatment Journey, and What's In Your Gunkie.</p>
        </div>
      </div>

      {/* ── What to Expect ── */}
      <div className="page-section">
        <p className="page-kicker">Your Visit</p>
        <h2>What to Expect at NorthStar</h2>
        <p>Your HydraFacial experience begins with a brief skin consultation to assess your concerns and select the right treatment tier and booster. The treatment itself is performed in a relaxing, comfortable setting — most patients describe the sensation as a cool, refreshing suction massage. There is no pain, no redness, and no recovery time. You are free to return to all normal activities immediately after your appointment.</p>
        <p>For optimal long-term results, we recommend a series of monthly treatments, with quarterly or seasonal maintenance visits thereafter. Our team will design a treatment schedule that fits your lifestyle and skin goals.</p>
      </div>

      {/* ── Closing CTA ── */}
      <div className="page-section">
        <p className="page-kicker">Book Your Glow</p>
        <h2>Schedule Your HydraFacial at NorthStar</h2>
        <p>Whether you are looking for a one-time radiance boost or committing to a long-term skin health regimen, NorthStar's HydraFacial service delivers results you can see and feel from your very first visit. Contact us today.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
          <a href="tel:+16313151400" style={{ display: 'inline-block', padding: '0.6rem 1.4rem', borderRadius: '999px', background: 'linear-gradient(135deg,#f4d88c,#d1a245)', color: '#1d1302', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
            Call (631) 315-1400
          </a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-block', padding: '0.6rem 1.4rem', borderRadius: '999px', background: 'transparent', color: '#c59d3c', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', border: '1.5px solid rgba(197,157,60,0.5)' }}>
            Request a Consultation
          </a>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#4a5668' }}>
          139-12 84th Drive, Suite 1G, Briarwood, NY &nbsp;·&nbsp; 333 East 34th Street, Suite M1, New York, NY &nbsp;·&nbsp; 283 Commack Road, Suite 130, Commack, NY
        </p>
      </div>

    </PageLayout>
  );
}
// ─── Emface Page ──────────────────────────────────────────────────────────────
export function EmfacePage() {
  return (
    <PageLayout
      kicker="Non-Surgical Facelift"
      title="Emface by BTL"
      subtitle="The world's first needle-free treatment to simultaneously tone facial muscles and tighten skin — a natural lift without injections, surgery, or downtime."
      description="Emface at NorthStar Implant Dentistry — BTL's revolutionary Synchronized RF and HIFES technology delivers a non-surgical facelift with clinically proven lifting and tightening results. Briarwood, New York, Commack."
    >
      <div className="page-section">
        <p className="page-kicker">A Perfect Complement to Implant Care</p>
        <h2>Why NorthStar Offers Emface</h2>
        <p>
          At NorthStar Implant Dentistry, we restore smiles — and we believe
          that a restored smile deserves a restored face to go with it. Emface
          is the most advanced non-invasive facial rejuvenation technology
          available today, and it is a natural extension of the same commitment
          to precision, technology, and patient outcomes that defines everything
          we do.
        </p>
        <p>
          For patients who want to look as confident and youthful as their new
          smile makes them feel — without needles, fillers, surgery, or recovery
          time — Emface is the answer. And for the significant percentage of
          dental patients who are already committed to their health and
          appearance, offering Emface at NorthStar means they can address both
          concerns in one trusted, familiar environment.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">What Is Emface?</p>
        <h2>Two Technologies. One Revolutionary Treatment.</h2>
        <p>
          Emface, developed by BTL Aesthetics — the company behind the globally
          acclaimed Emsculpt body-contouring platform — is the world's first
          treatment to simultaneously address both the skin and the underlying
          facial muscles in a single, non-invasive session. This dual-action
          approach sets Emface apart from every other facial rejuvenation
          technology on the market.
        </p>
        <p>
          Traditional anti-aging treatments target either the skin (fillers,
          Botox, laser) or the muscles (surgical facelift) — but never both at
          once, and never without needles, incisions, or significant recovery.
          Emface changes this equation entirely by combining two synchronized
          energy technologies that work in concert to lift every layer of the
          face from the deepest muscle to the outermost skin — producing a
          natural, comprehensive result that looks like a refreshed, younger
          version of yourself.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">The Technology</p>
        <h2>Synchronized RF + HIFES — How It Works</h2>
        <div className="page-card-grid">
          {[
            {
              title: 'Synchronized Radiofrequency (RF)',
              body: "Precisely calibrated radiofrequency energy is delivered to the dermis, heating the skin's deeper layers to stimulate the production of new collagen and elastin fibers. This produces progressive tightening and smoothing of the skin surface — reducing the appearance of fine lines and wrinkles while improving overall skin texture, tone, and radiance.",
            },
            {
              title: 'High-Intensity Facial Electrical Stimulation (HIFES™)',
              body: 'HIFES technology selectively activates and contracts the specific facial muscles targeted by the treatment — the frontalis, zygomaticus, and risorius — in a controlled, repeatable pattern that is far more efficient than voluntary muscle exercise. These contractions increase muscle density and tone, restoring the structural support of the face and producing a measurable lifting effect.',
            },
            {
              title: 'Synchronized Delivery',
              body: 'What makes Emface unique is that both technologies operate simultaneously in a synchronized protocol — meaning the muscle is being toned and lifted at the same moment the skin is being tightened and rejuvenated. This synergistic effect produces results greater than either technology could achieve independently, and in far less time.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Treatment Areas</p>
        <h2>Where Emface Lifts and Transforms</h2>
        <div className="page-card-grid">
          {[
            {
              title: 'Forehead',
              body: 'HIFES tones the frontalis muscle to elevate brows and open the upper face, while RF smooths forehead lines and restores a refreshed, more awake appearance.',
            },
            {
              title: 'Cheeks',
              body: 'Toning the zygomaticus and risorius muscles restores mid-face volume and definition, lifting sagging cheeks and restoring the natural contours of youth.',
            },
            {
              title: 'Jawline',
              body: 'Improved muscle tone and skin tightening along the jaw defines the jawline, reduces jowling, and creates a cleaner, more sculpted lower face profile.',
            },
            {
              title: 'Under the Chin (Submentum)',
              body: 'The Emface Submentum applicator targets the neck and under-chin area — the only non-invasive treatment to address every layer from muscle to skin in this notoriously difficult-to-treat zone.',
            },
            {
              title: 'Eye Area',
              body: "Dedicated eye applicators firm the framework around the eyes, helping to lift drooping eyelids, reduce under-eye puffiness, and address crow's feet.",
            },
            {
              title: 'Overall Facial Lifting',
              body: 'The combined effect of RF and HIFES across all treatment areas produces a comprehensive, whole-face lifting result — natural-looking, symmetrical, and progressively improving over 6–12 weeks.',
            },
          ].map((card) => (
            <div key={card.title} className="page-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <p className="page-kicker">Clinically Proven Results</p>
        <h2>The Numbers Speak for Themselves</h2>
        <p>
          Emface's efficacy is supported by nine independent clinical studies —
          a level of scientific validation that is rare in the aesthetics
          industry. Across these studies, participants who completed the
          recommended treatment course of four sessions experienced, on average:
        </p>
        <ul>
          <li>
            <strong>37% reduction in wrinkles</strong> — measured objectively
            using standardized skin analysis photography
          </li>
          <li>
            <strong>30% increase in facial muscle tone</strong> — quantified
            using ultrasound imaging and MRI measurement of muscle density
          </li>
          <li>
            <strong>23% lifting effect</strong> — verified through standardized
            photographic comparison and patient-reported outcomes
          </li>
        </ul>
        <p>
          Optimal results are typically seen 6–12 weeks after the final session,
          as the body's natural collagen production and muscle remodeling
          processes continue to work. Results last six months to one year, with
          maintenance treatments recommended every six to twelve months to
          sustain the lifting and tightening effect over time.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">What to Expect</p>
        <h2>Your Emface Experience at NorthStar</h2>
        <p>
          Each Emface session takes approximately 20 minutes — making it
          genuinely compatible with a busy professional schedule. Hands-free
          applicator patches are placed on the targeted areas of the face,
          settings are calibrated to your individual anatomy, and treatment
          begins. Most patients describe the sensation as a warm, gentle
          tingling combined with mild muscle twitching — entirely comfortable
          and requiring no anesthesia or numbing cream.
        </p>
        <p>
          There is no downtime whatsoever. The vast majority of patients apply
          makeup, exercise, and return to work immediately after their session.
          A small number of patients experience minor, transient redness that
          resolves within minutes to hours. The standard treatment protocol
          consists of four sessions, each scheduled one week apart. Additional
          sessions can be added for patients seeking enhanced results or who are
          addressing more significant aging concerns. Our team will conduct a
          thorough consultation before your first session to assess your facial
          anatomy and customize your treatment plan.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Who Is a Candidate?</p>
        <h2>Is Emface Right for You?</h2>
        <p>
          Emface is an excellent option for men and women of virtually any age
          who are looking to address or prevent common signs of facial aging —
          including sagging cheeks, a softened jawline, drooping brows or
          eyelids, a double chin, or general loss of facial definition and
          firmness. It is particularly well-suited for patients who prefer to
          avoid injectable treatments, are not ready for surgical intervention,
          or want to maintain and extend the results of prior aesthetic
          procedures.
        </p>
        <p>
          Emface can be used as a standalone treatment or in combination with
          other non-invasive approaches. Importantly, it does not interfere with
          existing Botox or filler results — in fact, many aesthetic providers
          use Emface in conjunction with injectables to achieve a more
          comprehensive and longer-lasting outcome. As with any aesthetic
          treatment, a consultation with our team is the best way to determine
          whether Emface is appropriate for your specific anatomy, goals, and
          expectations.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Also at NorthStar</p>
        <h2>Pair Emface with HydraFacial for Complete Facial Rejuvenation</h2>
        <p>
          For patients seeking the most comprehensive non-invasive facial
          transformation available, we recommend combining Emface with our
          HydraFacial service. While Emface addresses the structural layers of
          the face — lifting muscles and tightening skin — HydraFacial perfects
          the surface: deeply cleansing, extracting impurities, and infusing the
          skin with nourishing serums for an immediate, radiant glow. Together,
          these two treatments address every dimension of facial health and
          beauty — from the deepest muscle to the outermost skin — without a
          single needle, incision, or day of recovery.
        </p>
      </div>

      <div className="page-section">
        <p className="page-kicker">Begin Your Transformation</p>
        <h2>Schedule Your Emface Consultation at NorthStar</h2>
        <p>
          If you are ready to lift, firm, and rejuvenate your face without
          surgery or injections, Emface at NorthStar Implant Dentistry is your
          next step. Contact us today to schedule a consultation with our team.
          We will assess your facial anatomy, discuss your goals honestly, and
          design a personalized treatment plan that delivers visible, lasting
          results — naturally.
        </p>
      </div>
    </PageLayout>
  );
}
