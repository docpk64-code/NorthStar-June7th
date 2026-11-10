import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import SmileCamera from './components/SmileCamera';
import SEOHead from './components/SEOHead';
import './styles/smilePreview.css';

const treatments = [
  { id: 'arch', number: '01', title: 'Full-arch implants', subtitle: 'Imagine a complete new smile', detail: 'Explore the appearance of a complete arch of replacement teeth. A photo cannot assess bone, implant placement, or treatment suitability.', goal: 'A balanced, complete smile', image: 'full-arch' },
  { id: 'aligners', number: '02', title: 'Invisalign / clear aligners', subtitle: 'Explore a straighter smile', detail: 'Explore the idea of straighter teeth while keeping their natural character. A photograph cannot predict tooth movement, bite changes, or treatment time.', goal: 'Natural teeth, a straighter appearance', image: 'dental-implants' },
  { id: 'veneers', number: '03', title: 'Veneers', subtitle: 'Reimagine shape and shade', detail: 'Explore a cosmetic change in visible tooth shape and shade. A dentist must assess enamel, gum health, bite, and whether veneers are appropriate.', goal: 'Refined shape and a natural shade', image: 'extractions' },
];

export default function SmilePreviewPage() {
  const [treatment, setTreatment] = useState('arch');
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const [split, setSplit] = useState(50);
  const [showSample, setShowSample] = useState(true);
  const [loading, setLoading] = useState(false);
  const upload = useRef<HTMLInputElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraTrigger = useRef<HTMLButtonElement>(null);
  const closeCamera = () => { setCameraOpen(false); cameraTrigger.current?.focus(); };
  const revision = useRef(0);
  const selected = treatments.find(item => item.id === treatment)!;
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);
  useEffect(() => () => { revision.current++; }, []);

  const clearPhoto = () => {
    revision.current++; setPhoto(null); setError(''); setConsent(false); setLoading(false); setShowSample(true);
    if (upload.current) upload.current.value = '';
    setCameraOpen(false);
  };
  const choosePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setCameraOpen(false);
    await acceptPhoto(file);
  };
  const acceptPhoto = async (file: File) => {
    const current = ++revision.current;
    setError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError('Please choose a JPG, PNG, or WebP image. On iPhone, use a screenshot if your photo is HEIC.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Please choose a photo smaller than 10 MB.'); return; }
    setLoading(true);
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    try {
      await image.decode();
      if (current !== revision.current) { URL.revokeObjectURL(url); return; }
      if (image.naturalWidth < 400 || image.naturalHeight < 400) throw new Error('small');
      if (image.naturalWidth * image.naturalHeight > 40_000_000) throw new Error('large');
      setPhoto(url); setShowSample(false); setConsent(false);
    } catch (reason) {
      URL.revokeObjectURL(url);
      if (current === revision.current) setError(reason instanceof Error && reason.message === 'small' ? 'Use a clearer photo at least 400 × 400 pixels.' : 'This image could not be opened. Try a smaller JPG or PNG photo.');
    } finally { if (current === revision.current) setLoading(false); }
  };

  return <div className="smile-page">
    <SEOHead title="Smile Preview — demonstration" description="Explore the NorthStar Smile Preview interface with three treatment choices and a fictional smile comparison." noindex />
    <header className="smile-header"><a href="/" className="smile-brand"><span aria-hidden="true">✦</span><span>NorthStar<small>IMPLANT DENTISTRY</small></span></a><a href="/contact/" className="smile-header-contact">Book a consultation <span aria-hidden="true">↗</span></a></header>
    <main>
      <section className="smile-intro"><div className="smile-eyebrow">A LITTLE INSPIRATION. A NEW POSSIBILITY.</div><h1>Your smile.<br /><em>A new perspective.</em></h1><p>Explore what a smile transformation could look like.<br className="smile-desktop-break" /> Start with a treatment, then add your photo.</p><div className="smile-demo-badge"><span aria-hidden="true">●</span> Live camera & photo upload · AI preview coming later</div></section>
      <section className="smile-workspace" aria-label="Smile preview studio">
        <div className="smile-controls">
          <div className="smile-step"><span>1</span><h2>Choose your smile journey</h2></div>
          <fieldset className="smile-options"><legend className="smile-sr-only">Treatment choice</legend>{treatments.map(item => <label key={item.id} className={`smile-option ${treatment === item.id ? 'selected' : ''}`}><input type="radio" name="treatment" value={item.id} checked={treatment === item.id} onChange={() => setTreatment(item.id)} /><span className="smile-option-number">{item.number}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><span className="smile-radio" aria-hidden="true" /></label>)}</fieldset>
          <p className="smile-treatment-detail" aria-live="polite">{selected.detail}</p>
          <div className="smile-step"><span>2</span><h2>Add your smile photo</h2></div>
          <div className="smile-upload-box"><button ref={cameraTrigger} type="button" className="smile-camera-icon smile-camera-open" aria-label="Open front-facing camera" onClick={() => setCameraOpen(true)} disabled={loading || cameraOpen}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 5 9.5 3h5L16 5h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><circle cx="12" cy="12" r="4"/></svg></button><strong>A clear photo is a great start</strong><p>Face the camera, smile with teeth visible, and use even, natural light. Avoid filters.</p><div className="smile-upload-actions"><button className="smile-button" onClick={() => upload.current?.click()} disabled={loading}>{loading ? 'Opening photo…' : photo ? 'Replace photo' : 'Choose a photo'} <span aria-hidden="true">↑</span></button><button className="smile-camera-button" onClick={() => setCameraOpen(true)} disabled={loading || cameraOpen}>Take a photo</button></div><small>JPG, PNG or WebP · up to 10 MB<br />Front camera on phones · webcam on laptops. Camera permission is required.</small><input ref={upload} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} hidden aria-label="Choose a smile photo" /></div>
          {cameraOpen && <SmileCamera onCapture={file => { void acceptPhoto(file); }} onClose={closeCamera} />}
          {error && <p role="alert" className="smile-error">{error}</p>}
          <p className="smile-privacy"><span aria-hidden="true">◇</span> Private by design: in this preview, your photo stays in this browser and is never sent for AI processing.</p>
          <label className="smile-consent"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> <span>I am 18 or older, this is my photo, and I understand that a smile preview is illustrative and does not establish treatment suitability.</span></label>
          <button className="smile-generate" disabled>AI generation not yet activated</button><p className="smile-activation">You can try the photo controls and sample comparison now. Personalized AI previews will be available after secure processing is connected.</p>
        </div>
        <div className="smile-result-column">
          <div className="smile-result-heading"><div><span className="smile-eyebrow">THE POSSIBILITIES, VISUALIZED</span><h2>{photo && !showSample ? 'Your starting point' : 'A glimpse of a new smile'}</h2></div><span className="smile-sample-pill">{photo && !showSample ? 'Your photo' : 'Fictional example'}</span></div>
          {photo && !showSample ? <div className="smile-personal-photo"><img src={photo} alt="Your selected smile photo, stored only in this browser" /><span>Your photo · no AI edits applied</span></div> : <div className="smile-comparison" role="img" aria-label="Fictional AI-generated smile example. Drag the slider below to compare the starting smile and illustrative cosmetic smile."><img src="/assets/smile-preview/sample-1.webp" alt="" /><img className="smile-before" src="/assets/smile-preview/sample-0.webp" alt="" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} /><span className="smile-photo-label before">Starting smile</span><span className="smile-photo-label after">Illustrative smile</span><div className="smile-divider" style={{ left: `${split}%` }}><span>↔</span></div><span className="smile-watermark">AI-generated example · not a real patient</span></div>}
          {(!photo || showSample) && <div className="smile-slider"><label htmlFor="smile-compare">Drag to compare <span aria-hidden="true">↔</span></label><input id="smile-compare" type="range" min="0" max="100" value={split} onChange={e => setSplit(Number(e.target.value))} aria-valuetext={`${split}% starting smile visible`} /></div>}
          {photo && <div className="smile-photo-actions"><button onClick={() => setShowSample(!showSample)}>{showSample ? 'View my photo' : 'View fictional example'}</button><button onClick={clearPhoto}>Remove my photo</button></div>}
          <div className="smile-goal"><span aria-hidden="true">✦</span><div><small>YOUR SELECTED DIRECTION</small><h3>{selected.goal}</h3><p>{photo && !showSample ? 'Your photo is ready for a future personalized preview. No result has been generated.' : 'This shared sample demonstrates the comparison tool. It is not a treatment-specific result or a preview of your own smile.'}</p></div></div>
          <div className="smile-disclaimer"><strong>Inspiration starts here. Your treatment plan starts with a dentist.</strong><p>Any future AI image is an appearance concept, not a diagnosis, treatment recommendation, or guaranteed outcome. Your examination and any necessary scans determine what is achievable.</p></div>
        </div>
      </section>
      <section className="smile-next"><div><span className="smile-eyebrow">LET’S MAKE IT PERSONAL</span><h2>Ready to explore your options?</h2><p>Talk with our team about your goals and the next step for your smile.</p></div><a href="/contact/" className="smile-button">Book a consultation <span aria-hidden="true">↗</span></a></section>
    </main>
    <footer className="smile-footer"><a href="/">NorthStar Implant Dentistry</a><span>Smile Preview · demonstration</span><a href="/terms/">Terms & privacy</a></footer>
  </div>;
}
