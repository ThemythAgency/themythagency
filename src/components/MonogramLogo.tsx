import logoImg from "@/assets/logo.png";

interface MonogramLogoProps {
  className?: string;
  size?: number;
  variant?: "transparent" | "circular";
}

const MonogramLogo = ({ className = "", size = 32, variant = "transparent" }: MonogramLogoProps) => {
  if (variant === "circular") {
    return (
      <div
        className={`rounded-full bg-background/20 border border-primary-foreground/20 flex items-center justify-center overflow-hidden ${className}`}
        style={{ width: size + 8, height: size + 8 }}
      >
        <img
          src={logoImg}
          alt="Themyth Agency"
          width={size}
          height={size}
          style={{ objectFit: "contain", mixBlendMode: "multiply" }}
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
      style={{ objectFit: "contain", mixBlendMode: "multiply" }}
    />
  );
};

export default MonogramLogo;
