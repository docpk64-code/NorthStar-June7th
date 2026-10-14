import { useState } from 'react';
import { PageLayout } from './PageLayout';
import notice from './data/hipaa.json';

const fields = [
  ['patient', 'Patient full name'],
  ['dob', 'Date of birth (MM/DD/YYYY)'],
  ['received', 'Date notice received (MM/DD/YYYY)'],
  ['representative', 'Representative name (if signing for patient)'],
  ['authority', 'Relationship / legal authority (office will verify)'],
] as const;
const pdf = '/forms/northstar-hipaa-notice-and-acknowledgment.pdf';
const styles = `
.hipaa-tools {display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}
.hipaa-tools a,.hipaa-tools button {display:inline-block;border:1px solid #96701f;border-radius:8px;padding:12px 18px;background:#f1d58e;color:#162d43!important;font:600 15px/1.4 system-ui;cursor:pointer;text-decoration:none}
.hipaa-tools :focus-visible,.hipaa-field input:focus-visible {outline:3px solid #24669b;outline-offset:3px}
.hipaa-intro {padding:24px;background:#f4f7fa;border-left:4px solid #bc963f;border-radius:10px;color:#243d50}
.hipaa-notice section {margin:30px 0}.hipaa-notice h3 {margin:22px 0 7px;color:#19364e;font-size:1.1rem}
.hipaa-notice p,.hipaa-ack p {line-height:1.7;color:#33475a}
.hipaa-ack {border:1px solid #ccd6df;padding:clamp(18px,4vw,36px);border-radius:14px;background:white;margin-top:32px}
.hipaa-field {display:block;margin:20px 0;font-weight:600;color:#243d50}
.hipaa-field input {display:block;box-sizing:border-box;width:100%;padding:12px;border:1px solid #7d91a2;border-radius:6px;margin-top:8px;font:16px system-ui;color:#102a40;background:#f8fafc}
.hipaa-print-value {display:none}.hipaa-signature {margin-top:32px!important;border-top:1px solid #8997a4;padding-top:12px}
@media print {
 @page {margin:18mm}
 body,.page-root,.page-body {background:white!important;color:black!important;margin:0!important;padding:0!important;max-width:none!important}
 .page-root > :not(.page-body),.hipaa-no-print,.hipaa-notice {display:none!important}
 .hipaa-ack {border:0;padding:0;margin:0;border-radius:0;box-shadow:none}
 .hipaa-field input {display:none}.hipaa-print-value {display:block;min-height:24px;padding:8px 0;border-bottom:1px solid #888;overflow-wrap:anywhere;white-space:pre-wrap;font-weight:400}
 .hipaa-ack p {font-size:11pt;line-height:1.5}.hipaa-field {break-inside:avoid;margin:16px 0;font-size:10pt}
}
`;
export default function HipaaPage() {
  const [values, setValues] = useState<Record<string,string>>({});
  return <PageLayout kicker="Patient privacy" title="HIPAA Privacy Notice & Forms" subtitle="Your information. Your rights. A clear guide to privacy at NorthStar." description="Read NorthStar Implant Dentistry's Notice of Privacy Practices, download a fillable PDF, or complete your acknowledgment in your browser.">
    <style>{styles}</style>
    <div className="hipaa-no-print hipaa-intro">
      <h2>Complete your privacy acknowledgment</h2>
      <p>Read the notice, fill in the acknowledgment below, then print or save it as a PDF. Sign the printed copy and bring it to your appointment.</p>
      <p><strong>Your entries stay on this page.</strong> They are not sent to NorthStar or saved by this form. Leaving or refreshing clears them. Save only on a device you trust. Please do not send completed forms through our general contact form.</p>
      <div className="hipaa-tools"><a href={pdf} download>Download fillable PDF · 4 pages</a><a href="#acknowledgment">Fill out acknowledgment</a></div>
      <p>Prefer paper? Download the packet or ask for a copy at the office. Need help? <a href="tel:6313151400">(631) 315-1400</a>.</p>
    </div>
    <article className="hipaa-notice" aria-label="Notice of Privacy Practices">
      <h2>Notice of Privacy Practices</h2><p><strong>Effective {notice.effectiveDate}</strong></p><p><strong>{notice.heading}</strong></p><p>{notice.contact}</p>
      {notice.pages.map(page => <section key={page.title}><h2>{page.title}</h2>{page.sections.map(section => <div key={section.title}><h3>{section.title}</h3><p>{section.text}</p></div>)}</section>)}
      <p><a href="https://www.hhs.gov/hipaa/filing-a-complaint/index.html">Visit HHS to learn about filing a privacy complaint</a>.</p>
    </article>
    <section className="hipaa-ack" id="acknowledgment" aria-labelledby="ack-title">
      <p><strong>NORTHSTAR IMPLANT DENTISTRY</strong><br/>Notice effective {notice.effectiveDate} · NS-PRIVACY-01</p>
      <h2 id="ack-title">Acknowledgment of receipt</h2><p>{notice.acknowledgment}</p>
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        {fields.map(([key,label]) => <label className="hipaa-field" key={key} htmlFor={`hipaa-${key}`}>{label}<input id={`hipaa-${key}`} type="text" maxLength={100} autoComplete="off" value={values[key] || ''} onChange={event => setValues(previous => ({...previous,[key]:event.target.value}))}/><span className="hipaa-print-value">{values[key] || ' '}</span></label>)}
        <p className="hipaa-signature">Patient or representative signature: ____________________________</p><p>Date signed: ____________________ <small>(Sign by hand after printing.)</small></p>
        <div className="hipaa-tools hipaa-no-print"><button type="button" onClick={() => window.print()}>Print / Save completed acknowledgment</button><button type="button" onClick={() => {if(window.confirm('Clear all information entered on this page?')) setValues({});}}>Clear entries</button></div>
        <p className="hipaa-no-print">In the print dialog, select your printer or “Save as PDF.” Download the full packet above to keep the privacy notice. This form does not submit electronically to the practice.</p>
      </form>
    </section>
  </PageLayout>;
}
