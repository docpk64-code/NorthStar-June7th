/**
 * Root.tsx — Simple custom router using browser history API.
 * No react-router-dom needed. Works perfectly in StackBlitz.
 *
 * Pages are lazy-loaded so the initial bundle (homepage) doesn't have to
 * download every page's code/images up front.
 */
import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import App from './App';
import SEOHead from './components/SEOHead';
import { routeKey, pagePath } from './utils/urls';

const HipaaPage = lazy(() => import('./HipaaPage'));
const OfficePage = lazy(() => import('./OfficePage'));

const AboutPage = lazy(() => import('./pages').then(m => ({ default: m.AboutPage })));
const ProceduresPage = lazy(() => import('./pages').then(m => ({ default: m.ProceduresPage })));
const DentalImplantsPage = lazy(() => import('./pages').then(m => ({ default: m.DentalImplantsPage })));
const FullArchPage = lazy(() => import('./pages').then(m => ({ default: m.FullArchPage })));
const WisdomTeethPage = lazy(() => import('./pages').then(m => ({ default: m.WisdomTeethPage })));
const SedationPage = lazy(() => import('./pages').then(m => ({ default: m.SedationPage })));
const PatientInfoPage = lazy(() => import('./pages').then(m => ({ default: m.PatientInfoPage })));
const TechnologyPage = lazy(() => import('./pages').then(m => ({ default: m.TechnologyPage })));
const TestimonialsPage = lazy(() => import('./pages').then(m => ({ default: m.TestimonialsPage })));
const ContactPage = lazy(() => import('./pages').then(m => ({ default: m.ContactPage })));
const LocationsPage = lazy(() => import('./pages').then(m => ({ default: m.LocationsPage })));
const PatientFormsPage = lazy(() => import('./pages').then(m => ({ default: m.PatientFormsPage })));
const ToothExtractionsPage = lazy(() => import('./pages').then(m => ({ default: m.ToothExtractionsPage })));
const BoneGraftingPage = lazy(() => import('./pages').then(m => ({ default: m.BoneGraftingPage })));
const SinusLiftsPage = lazy(() => import('./pages').then(m => ({ default: m.SinusLiftsPage })));
const ImplantPlacementPage = lazy(() => import('./pages').then(m => ({ default: m.ImplantPlacementPage })));
const RidgePreservationPage = lazy(() => import('./pages').then(m => ({ default: m.RidgePreservationPage })));
const RestorativeCoordPage = lazy(() => import('./pages').then(m => ({ default: m.RestorativeCoordPage })));
const RemoteAnchorImplantPage = lazy(() => import('./pages').then(m => ({ default: m.RemoteAnchorImplantPage })));
const WisdomTeethExtPage = lazy(() => import('./pages').then(m => ({ default: m.WisdomTeethExtPage })));
const FullMouthReconPage = lazy(() => import('./pages').then(m => ({ default: m.FullMouthReconPage })));
const OralMedPathologyPage = lazy(() => import('./pages').then(m => ({ default: m.OralMedPathologyPage })));
const PreProstheticSurgPage = lazy(() => import('./pages').then(m => ({ default: m.PreProstheticSurgPage })));
const ImpactedTeethPage = lazy(() => import('./pages').then(m => ({ default: m.ImpactedTeethPage })));
const MaxillaryExpansionPage = lazy(() => import('./pages').then(m => ({ default: m.MaxillaryExpansionPage })));
const ProcedureTechnologyPage = lazy(() => import('./pages').then(m => ({ default: m.ProcedureTechnologyPage })));
const CantGetImplantsPage = lazy(() => import('./pages').then(m => ({ default: m.CantGetImplantsPage })));
const BotchedSmilePage = lazy(() => import('./pages').then(m => ({ default: m.BotchedSmilePage })));
const SubPeriostealImplantPage = lazy(() => import('./pages').then(m => ({ default: m.SubPeriostealImplantPage })));
const HydraFacialPage = lazy(() => import('./pages').then(m => ({ default: m.HydraFacialPage })));
const EmfacePage = lazy(() => import('./pages').then(m => ({ default: m.EmfacePage })));
const TermsPage = lazy(() => import('./pages').then(m => ({ default: m.TermsPage })));

const ROUTES: Record<string, React.ReactElement> = {
  '/': <App />,
  '/about': <AboutPage />,
  '/procedures': <ProceduresPage />,
  '/dental-implants': <DentalImplantsPage />,
  '/full-arch': <FullArchPage />,
  '/wisdom-teeth': <WisdomTeethPage />,
  '/sedation': <SedationPage />,
  '/patient-information': <PatientInfoPage />,
  '/patient-forms': <PatientFormsPage />,
  '/patient-forms/hipaa': <HipaaPage />,
  '/technology': <TechnologyPage />,
  '/testimonials': <TestimonialsPage />,
  '/contact': <ContactPage />,
  '/locations': <LocationsPage />,
  '/locations/briarwood': <OfficePage officeId="briarwood" />,
  '/locations/manhattan': <OfficePage officeId="manhattan" />,
  '/locations/commack': <OfficePage officeId="commack" />,
  '/locations/brooklyn': <OfficePage officeId="brooklyn" />,
  '/procedure/tooth-extractions': <ToothExtractionsPage />,
  '/procedure/bone-grafting': <BoneGraftingPage />,
  '/procedure/sinus-lifts': <SinusLiftsPage />,
  '/procedure/implant-placement': <ImplantPlacementPage />,
  '/procedure/ridge-preservation': <RidgePreservationPage />,
  '/procedure/restorative-coordination': <RestorativeCoordPage />,
  '/procedure/remote-anchorage-implant': <RemoteAnchorImplantPage />,
  '/procedure/wisdom-teeth-extractions': <WisdomTeethExtPage />,
  '/procedure/full-mouth-reconstruction': <FullMouthReconPage />,
  '/procedure/oral-medicine-pathology': <OralMedPathologyPage />,
  '/procedure/pre-prosthetic-surgery': <PreProstheticSurgPage />,
  '/procedure/impacted-unerupted-teeth': <ImpactedTeethPage />,
  '/procedure/maxillary-expansion-marpe': <MaxillaryExpansionPage />,
  '/procedure/technology': <ProcedureTechnologyPage />,
  '/specialized/cant-get-implants': <CantGetImplantsPage />,
  '/specialized/botched-smile': <BotchedSmilePage />,
  '/specialized/sub-periosteal-implant': <SubPeriostealImplantPage />,
  '/hydrafacial': <HydraFacialPage />,
  '/emface': <EmfacePage />,
  '/terms': <TermsPage />,
};

export function navigate(path: string) {
  const url = new URL(path, window.location.origin);
  window.history.pushState({}, '', pagePath(url.pathname) + url.search + url.hash);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c59d3c',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.4rem',
      }}
    >
      Loading…
    </div>
  );
}

export default function Root() {
  const [path, setPath] = useState(routeKey(window.location.pathname));

  const onPopState = useCallback(() => {
    setPath(routeKey(window.location.pathname));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [onPopState]);

  const page = ROUTES[path] ?? <NotFound />;
  return <Suspense key={path} fallback={<PageFallback />}>{page}</Suspense>;
}function NotFound() {
  return <main style={{ padding: '4rem 2rem', fontFamily: 'sans-serif', color: '#07111c', background: '#fff', minHeight: '100vh' }}>
    <SEOHead title="Page not found" description="This page could not be found. Visit NorthStar Implant Dentistry or contact our team." noindex />
    <h1>Page not found</h1><p>The address may have changed. Please choose a page below.</p>
    <p><a href="/">Home</a> · <a href="/procedures/">Procedures</a> · <a href="/contact/">Contact</a></p>
  </main>;
}
