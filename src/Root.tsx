/**
 * Root.tsx — Simple custom router using browser history API.
 * No react-router-dom needed. Works perfectly in StackBlitz.
 */
import React, { useState, useEffect, useCallback } from 'react';
import App from './App';
import {
  AboutPage,
  ProceduresPage,
  DentalImplantsPage,
  FullArchPage,
  WisdomTeethPage,
  SedationPage,
  PatientInfoPage,
  TechnologyPage,
  TestimonialsPage,
  ContactPage,
  LocationsPage,
  PatientFormsPage,
  ToothExtractionsPage,
  BoneGraftingPage,
  SinusLiftsPage,
  ImplantPlacementPage,
  RidgePreservationPage,
  RestorativeCoordPage,
  RemoteAnchorImplantPage,
  WisdomTeethExtPage,
  FullMouthReconPage,
  OralMedPathologyPage,
  PreProstheticSurgPage,
  ImpactedTeethPage,
  MaxillaryExpansionPage,
  ProcedureTechnologyPage,
  CantGetImplantsPage,
  BotchedSmilePage,
  SubPeriostealImplantPage,
  HydraFacialPage,
  EmfacePage,
} from './pages';

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
  '/technology': <TechnologyPage />,
  '/testimonials': <TestimonialsPage />,
  '/contact': <ContactPage />,
  '/locations': <LocationsPage />,
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
};

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function Root() {
  const [path, setPath] = useState(window.location.pathname);

  const onPopState = useCallback(() => {
    setPath(window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [onPopState]);

  const page = ROUTES[path] ?? ROUTES['/'];
  return <>{page}</>;
}
