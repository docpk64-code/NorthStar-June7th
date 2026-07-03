// ─── Geometry helpers ───────────────────────────────────────────────────────
// polarToCartesian / wedgePath — used by CompassGraphic to lay out the wedge
// segments and text labels around the compass wheel.

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

export function wedgePath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
): string {
  const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const startInner = polarToCartesian(cx, cy, innerR, endAngle);
  const endInner = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    `M ${startInner.x} ${startInner.y}`,
    `L ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${startInner.x} ${startInner.y}`,
    'Z',
  ].join(' ');
}
