import logoImg from "@/assets/logo.png";

const MonogramLogo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
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
