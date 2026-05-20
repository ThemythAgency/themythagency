import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast({ title: "Please add your name and a message.", variant: "destructive" });
      return;
    }
    if (form.name.length > 100 || form.message.length > 1000) {
      toast({ title: "Message too long.", variant: "destructive" });
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("chat_messages").insert({
        name: form.name.trim(),
        email: form.email.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setOpen(false);
        setForm({ name: "", email: "", message: "" });
      }, 2400);
    } catch {
      toast({ title: "Could not send. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open live chat"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 180 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-background animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm bg-card border border-border shadow-2xl overflow-hidden"
          >
            <div className="bg-primary text-primary-foreground px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h4 className="font-display text-base font-medium">Talk to Themyth</h4>
                  <p className="text-[11px] font-body opacity-70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Usually replies within a few hours
                  </p>
                </div>
              </div>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <CheckCircle2 size={40} className="text-accent mx-auto mb-3" />
                <p className="font-display text-base font-medium mb-1">Message sent</p>
                <p className="text-xs text-muted-foreground font-body">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-3">
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  maxLength={255}
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent transition-colors"
                />
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send size={14} />
                </motion.button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;
