/**
 * Stufenlinie: das ruhige Markenelement der Website.
 * Eine feine Linie, die in Stufen ansteigt – die Treppe aus der Adriacon-Bildwelt,
 * reduziert auf eine Kontur. Wird als Übergang zwischen Abschnitten eingesetzt.
 */
export function StepLine({
  className = '',
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const stroke = tone === 'dark' ? '#8CCAEE' : '#3884C3';
  return (
    <svg
      viewBox="0 0 480 96"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 88 H80 V70 H160 V52 H240 V34 H320 V16 H400 V4 H480"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        opacity="0.5"
      />
    </svg>
  );
}
