// ─── Shared types ────────────────────────────────────────────────────────────

export interface MenuItem {
  label: string;
  shortLabel: string;
  href: string;
  eyebrow: string;
  description: string;
  imageSrc: string;
}

export interface CaseStudy {
  title: string;
  note: string;
  beforeA: string;
  beforeB: string;
  afterA: string;
  afterB: string;
  beforeSrc?: string;
  afterSrc?: string;
}

export interface Wedge {
  item: MenuItem;
  index: number;
  centerAngle: number;
  startAngle: number;
  endAngle: number;
}
