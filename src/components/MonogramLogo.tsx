import logoImg from "@/assets/logo.png";

interface MonogramLogoProps {
  className?: string;
  size?: number;
  variant?: "default" | "circular";
}

const MonogramLogo = ({ className = "", size = 32, variant = "default" }: MonogramLogoProps) => {
  if (variant === "circular") {
    return (
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}
        style={{ width: size + 8, height: size + 8 }}
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
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
};

export default MonogramLogo;
