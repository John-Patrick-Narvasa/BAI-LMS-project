export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="BAI Archives banana tree monogram"
    >
      <circle cx="24" cy="24" r="23" fill="var(--primary-green)" />
      <path
        d="M24 40V22"
        stroke="var(--banana-gold)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M24 22C24 22 17 20 12 12c8 0 12 4 12 10Z"
        fill="#FFFFFF"
        fillOpacity="0.9"
      />
      <path
        d="M24 22c0-6 4-10 12-10-5 8-12 10-12 10Z"
        fill="#FFFFFF"
        fillOpacity="0.7"
      />
      <path d="M24 26c-5 0-9-3-11-8 7 0 11 3 11 8Z" fill="#FFFFFF" fillOpacity="0.55" />
      <path
        d="M20 27c1.6-1.4 4.4-1.4 6 0 1.6 1.4 1.6 4.2 0 5.6-1.6 1.4-4.4 1.4-6 0-1.6-1.4-1.6-4.2 0-5.6Z"
        fill="var(--banana-gold)"
      />
    </svg>
  );
}
