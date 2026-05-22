import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ChatMessage = {
  id: string;
  conversation_id: string | null;
  sender: string;
  name: string;
  message: string;
  created_at: string;
};

const VISITOR_KEY = "themyth_visitor_id";
const NAME_KEY = "themyth_visitor_name";
const EMAIL_KEY = "themyth_visitor_email";
const CONV_KEY = "themyth_conversation_id";

const uuid = () =>
  crypto.randomUUID?.() ||
  "v-" + Math.random().toString(36).slice(2) + Date.now().toString(36);

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY) || "");
  const [conversationId, setConversationId] = useState<string | null>(() =>
    localStorage.getItem(CONV_KEY)
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visitorId = (() => {
    let v = localStorage.getItem(VISITOR_KEY);
    if (!v) {
      v = uuid();
      localStorage.setItem(VISITOR_KEY, v);
    }
    return v;
  })();

  // Load existing conversation + messages
  useEffect(() => {
    if (!conversationId) return;
    supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as ChatMessage[]);
      });
  }, [conversationId]);

  // Realtime subscription
  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const m = payload.new as ChatMessage;
          setMessages((prev) => (prev.find((x) => x.id === m.id) ? prev : [...prev, m]));
          if (m.sender === "admin" && !open) setUnread((u) => u + 1);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, open]);

  // Auto-scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Clear unread on open
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const ensureConversation = useCallback(async (): Promise<string | null> => {
    if (conversationId) return conversationId;
    if (!name.trim()) {
      toast({ title: "Please enter your name first.", variant: "destructive" });
      return null;
    }
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({
        visitor_id: visitorId,
        name: name.trim(),
        email: email.trim() || null,
      })
      .select("id")
      .single();
    if (error || !data) {
      toast({ title: "Could not start conversation.", variant: "destructive" });
      return null;
    }
    localStorage.setItem(NAME_KEY, name.trim());
    if (email.trim()) localStorage.setItem(EMAIL_KEY, email.trim());
    localStorage.setItem(CONV_KEY, data.id);
    setConversationId(data.id);
    return data.id;
  }, [conversationId, name, email, visitorId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    if (text.length > 1000) {
      toast({ title: "Message too long.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const convId = await ensureConversation();
      if (!convId) return;
      const { error } = await supabase.from("chat_messages").insert({
        conversation_id: convId,
        sender: "visitor",
        name: name.trim(),
        email: email.trim() || null,
        message: text,
      });
      if (error) throw error;
      setDraft("");
    } catch {
      toast({ title: "Could not send. Try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const needsIntro = !conversationId;

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
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center border-2 border-background">
            {unread}
          </span>
        )}
        {!open && unread === 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-background animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm bg-card border border-border shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "min(560px, calc(100vh - 8rem))" }}
          >
            <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                <MessageSquare size={16} />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base font-medium">Talk to Themyth</h4>
                <p className="text-[11px] font-body opacity-70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  We reply in real-time
                </p>
              </div>
            </div>

            {needsIntro ? (
              <div className="p-5 space-y-3 overflow-y-auto">
                <p className="text-sm text-muted-foreground font-body">
                  Start your conversation — we'll keep your chat history right here.
                </p>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Email (optional, for replies)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
                />
                <form onSubmit={handleSend} className="space-y-2">
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder="How can we help?"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="w-full px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent resize-none"
                  />
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-50">
                    {sending ? "Starting..." : "Start Conversation"}
                    <Send size={14} />
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground font-body py-8">
                      Say hello to start the conversation.
                    </p>
                  )}
                  {messages.map((m) => {
                    const mine = m.sender === "visitor";
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] px-3.5 py-2.5 text-sm font-body whitespace-pre-wrap break-words ${
                            mine
                              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
                              : "bg-background border border-border text-foreground rounded-2xl rounded-bl-sm"
                          }`}
                        >
                          {!mine && (
                            <p className="text-[10px] uppercase tracking-wider text-accent mb-1 font-semibold">Themyth</p>
                          )}
                          {m.message}
                          <p className={`text-[9px] mt-1 ${mine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <form onSubmit={handleSend} className="border-t border-border bg-card p-3 flex gap-2 shrink-0">
                  <input
                    type="text"
                    maxLength={1000}
                    placeholder="Type a message..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={sending || !draft.trim()}
                    className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors px-4 disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;
