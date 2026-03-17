export function MonogramLogo({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <text
        x="8"
        y="28"
        fontFamily="serif"
        fontSize="26"
        fill="currentColor"
        letterSpacing="-1.5"
      >
        R
      </text>
      <text
        x="18"
        y="31.5"
        fontFamily="serif"
        fontSize="22"
        fill="currentColor"
        letterSpacing="-1.5"
        opacity="0.9"
      >
        S
      </text>
    </svg>
  )
}
