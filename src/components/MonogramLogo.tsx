import logoImg from "@/assets/logo.png";

interface MonogramLogoProps {
  className?: string;
  size?: number;
  variant?: "default" | "circular";
}

/**
 * The logo artwork is navy + gold on a white plate. To keep it visually
 * identical in dark mode, it always sits on the same light plate.
 */
const MonogramLogo = ({ className = "", size = 32, variant = "default" }: MonogramLogoProps) => {
  if (variant === "circular") {
    return (
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center bg-white ${className}`}
        style={{ width: size + 12, height: size + 12 }}
      >
        <img
          src={logoImg}
          alt="Themyth Agency"
          width={size}
          height={size}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <img
      src={logoImg}
      alt="Themyth Agency"
      width={size}
      height={size}
      className={`rounded bg-white ${className}`}
      style={{ objectFit: "contain" }}
    />
  );
};

export default MonogramLogo;
