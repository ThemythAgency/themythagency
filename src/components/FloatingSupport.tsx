import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import founder from "@/assets/founder-portrait.jpg";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const WA_TEXT = encodeURIComponent("Hello Themyth, can you help me with");
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

const WhatsAppGlyph = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.15c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

const Avatar = ({ size = 44 }: { size?: number }) => (
  <span className="relative inline-flex flex-shrink-0">
    <img
      src={founder}
      alt="Themyth Agency support"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="rounded-full object-cover object-top"
    />
    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#22C55E] ring-2 ring-card" />
  </span>
);

const FloatingSupport = () => {
  const [open, setOpen] = useState(false);

  const openChat = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("themyth:open-chat"));
  };

  return (
    <>
      {/* Desktop: Fiverr-style messaging widget */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        whileHover={{ y: -3 }}
        aria-label="Message us on WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3 rounded-full bg-card border border-border pl-3 pr-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_50px_rgba(0,0,0,0.25)] hover:border-accent/40 transition-all duration-300"
      >
        <Avatar />
        <span className="text-left leading-tight">
          <span className="block font-display text-base font-medium text-foreground">Message Us</span>
          <span className="block text-[11px] font-body text-muted-foreground">
            Online <span className="mx-1">•</span> Avg. response time:{" "}
            <span className="text-foreground font-semibold">1 Hour</span>
          </span>
        </span>
        <span className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
          <WhatsAppGlyph size={18} />
        </span>
      </motion.a>

      {/* Mobile: single FAB that expands into WhatsApp + Live chat */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <>
              <motion.a
                key="wa"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.9 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-full bg-card border border-border px-3 py-1.5 text-xs font-body shadow-lg">
                  WhatsApp
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
                  <WhatsAppGlyph size={24} />
                </span>
              </motion.a>

              <motion.button
                key="chat"
                type="button"
                onClick={openChat}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-full bg-card border border-border px-3 py-1.5 text-xs font-body shadow-lg">
                  Talk now
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <MessageSquare size={20} />
                </span>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close support options" : "Message us"}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-colors duration-300 ${
            open ? "bg-primary text-primary-foreground" : "bg-[#25D366] text-white"
          }`}
        >
          {open ? <X size={24} /> : <WhatsAppGlyph size={28} />}
        </button>
      </div>
    </>
  );
};

export default FloatingSupport;
