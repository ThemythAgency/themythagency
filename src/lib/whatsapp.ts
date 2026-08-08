export const WHATSAPP_NUMBER = "12267837543";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

type EnquiryInput = {
  packageName: string;
  basePrice?: string;
  addOns?: string[];
  services?: string[];
  total: number;
  recurring?: boolean;
};

export const buildPackageMessage = ({
  packageName,
  basePrice,
  addOns = [],
  services = [],
  total,
  recurring,
}: EnquiryInput) => {
  const lines = [
    `Hello Themyth Agency, I would like to get started.`,
    ``,
    `Package: ${packageName}`,
  ];
  if (basePrice) lines.push(`Base price: ${basePrice}`);
  if (services.length) {
    lines.push(``, `Selected services:`);
    services.forEach((s) => lines.push(`• ${s}`));
  }
  if (addOns.length) {
    lines.push(``, `Selected add-ons:`);
    addOns.forEach((a) => lines.push(`• ${a}`));
  } else if (!services.length) {
    lines.push(`Add-ons: none selected`);
  }
  lines.push(``, `Estimated total: ${money(total)}${recurring ? " per month" : ""}`);
  lines.push(``, `Please confirm the next steps.`);
  return lines.join("\n");
};
