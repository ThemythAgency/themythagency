import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ label, title, description, align = "left" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <div className={`flex items-center gap-4 mb-5 ${align === "center" ? "justify-center" : ""}`}>
          <div className="gold-line" />
          <span className="text-label text-accent">{label}</span>
        </div>
      )}
      <h2 className={`text-display-lg ${description ? "mb-5" : ""} ${align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-body-lg text-muted-foreground ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
