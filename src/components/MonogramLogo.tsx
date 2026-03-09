const MonogramLogo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" fill="currentColor" />
      <path
        d="M12 36V12L24 28L36 12V36"
        stroke="hsl(var(--gold))"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <line x1="12" y1="36" x2="18" y2="36" stroke="hsl(var(--gold))" strokeWidth="2.5" />
      <line x1="30" y1="36" x2="36" y2="36" stroke="hsl(var(--gold))" strokeWidth="2.5" />
    </svg>
  );
};

export default MonogramLogo;
