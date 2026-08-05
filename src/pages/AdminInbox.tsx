import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { toast } from "@/hooks/use-toast";
import {
  MessageSquare, Inbox, LogOut, Send, Search, Mail, Phone, Globe, DollarSign, ArrowLeft, Loader2,
  ScrollText, CheckCircle2, XCircle,
} from "lucide-react";

type Conversation = {
  id: string;
  visitor_id: string;
  name: string | null;
  email: string | null;
  last_message_at: string;
  admin_unread_count: number;
  created_at: string;
};

type ChatMessage = {
  id: string;
  conversation_id: string | null;
  sender: string;
  name: string;
  message: string;
  created_at: string;
  is_streaming?: boolean | null;
};

type AuditLog = {
  id: string;
  user_email: string | null;
  client_id: string | null;
  tool_name: string;
  action: string;
  arguments: Record<string, unknown> | null;
  target_table: string | null;
  target_id: string | null;
  summary: string | null;
  success: boolean;
  error_message: string | null;
  created_at: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  website: string | null;
  revenue_range: string | null;
  budget_range: string | null;
  service_interest: string | null;
  message: string | null;
  status: string;
  read_at: string | null;
  created_at: string;
};

const AdminInbox = () => {
  const { session, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"chat" | "inquiries" | "audit">("chat");
  const [search, setSearch] = useState("");

  // Chat state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);

  // MCP audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/login", { replace: true });
  }, [loading, session, navigate]);

  // Load conversations
  const loadConversations = useCallback(async () => {
    const { data } = await supabase
      .from("chat_conversations")
      .select("*")
      .order("last_message_at", { ascending: false });
    if (data) setConversations(data as Conversation[]);
  }, []);

  const loadInquiries = useCallback(async () => {
    const { data } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setInquiries(data as Inquiry[]);
  }, []);

  const loadAuditLogs = useCallback(async () => {
    const { data } = await supabase
      .from("mcp_audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (data) setAuditLogs(data as AuditLog[]);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    loadConversations();
    loadInquiries();
    loadAuditLogs();
    // Poll inbox lists every 5s (realtime publication is disabled for chat tables for security).
    const id = window.setInterval(() => {
      loadConversations();
      loadInquiries();
      loadAuditLogs();
    }, 5000);
    return () => window.clearInterval(id);
  }, [isAdmin, loadConversations, loadInquiries, loadAuditLogs]);

  // Load messages for active conversation + poll
  useEffect(() => {
    if (!activeId) return;
    const loadMsgs = () =>
      supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", activeId)
        .order("created_at", { ascending: true })
        .then(({ data }) => {
          if (data) setMessages(data as ChatMessage[]);
        });
    loadMsgs();

    // Reset unread + read marker
    supabase
      .from("chat_conversations")
      .update({ admin_unread_count: 0 })
      .eq("id", activeId)
      .then(() => loadConversations());

    const id = window.setInterval(loadMsgs, 4000);
    return () => window.clearInterval(id);
  }, [activeId, loadConversations]);


  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !activeId) return;
    setSending(true);
    try {
      const { error } = await supabase.from("chat_messages").insert({
        conversation_id: activeId,
        sender: "admin",
        name: "Themyth Team",
        message: reply.trim(),
      });
      if (error) throw error;
      setReply("");
    } catch {
      toast({ title: "Could not send reply.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const markInquiryRead = async (inq: Inquiry) => {
    setActiveInquiry(inq);
    if (!inq.read_at) {
      await supabase
        .from("contact_inquiries")
        .update({ read_at: new Date().toISOString(), status: "read" })
        .eq("id", inq.id);
      loadInquiries();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground p-6">
        <div className="bg-card text-foreground p-8 max-w-md text-center">
          <h2 className="font-display text-2xl mb-3">Access denied</h2>
          <p className="text-sm text-muted-foreground font-body mb-6">
            Your account doesn't have admin privileges.
          </p>
          <button onClick={handleLogout} className="btn-primary justify-center w-full">
            Sign out <LogOut size={14} />
          </button>
        </div>
      </div>
    );
  }

  const filteredConvs = conversations.filter(
    (c) =>
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredLogs = auditLogs.filter(
    (l) =>
      !search ||
      l.tool_name.toLowerCase().includes(search.toLowerCase()) ||
      (l.user_email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (l.summary ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (l.target_id ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const filteredInqs = inquiries.filter(
    (i) =>
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-accent flex items-center gap-1">
            <ArrowLeft size={14} /> Site
          </Link>
          <h1 className="font-display text-xl">Admin Inbox</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-body hidden md:inline">{session?.user.email}</span>
          <button onClick={handleLogout} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-accent flex items-center gap-1.5">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="border-b border-border bg-card px-6 flex gap-1">
        {(["chat", "inquiries", "audit"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-body uppercase tracking-wider transition-colors flex items-center gap-2 border-b-2 ${
              tab === t ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "chat" ? <MessageSquare size={14} /> : t === "inquiries" ? <Inbox size={14} /> : <ScrollText size={14} />}
            {t === "chat" ? "Live Chat" : t === "inquiries" ? "Contact Inquiries" : "MCP Audit Log"}
            <span className="ml-1 text-[10px] bg-muted px-1.5 rounded-full">
              {t === "chat"
                ? conversations.reduce((a, c) => a + (c.admin_unread_count || 0), 0)
                : t === "inquiries"
                  ? inquiries.filter((i) => !i.read_at).length
                  : auditLogs.length}
            </span>
          </button>
        ))}
      </div>

      {tab === "audit" ? (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative mb-6 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tool, user, or record..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-card border border-border text-sm font-body focus:outline-none focus:border-accent"
              />
            </div>
            <p className="text-xs text-muted-foreground font-body mb-4">
              Every agent (MCP) tool invocation, who ran it, what it touched, and when.
            </p>
            {filteredLogs.length === 0 ? (
              <p className="text-xs text-muted-foreground font-body text-center py-16">No tool activity recorded yet.</p>
            ) : (
              <div className="border border-border bg-card divide-y divide-border">
                {filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        {log.success ? (
                          <CheckCircle2 size={14} className="text-accent shrink-0" />
                        ) : (
                          <XCircle size={14} className="text-destructive shrink-0" />
                        )}
                        <code className="font-body text-sm font-semibold">{log.tool_name}</code>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 ${
                            log.action === "write" ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {log.action}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground font-body">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    {log.summary && <p className="text-sm font-body mt-2">{log.summary}</p>}
                    {log.error_message && (
                      <p className="text-xs font-body text-destructive mt-1">{log.error_message}</p>
                    )}
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-[11px] text-muted-foreground font-body">
                      <span>By {log.user_email ?? "unknown user"}</span>
                      {log.client_id && <span>Client: {log.client_id}</span>}
                      {log.target_table && (
                        <span>
                          Target: {log.target_table}
                          {log.target_id ? ` / ${log.target_id.slice(0, 8)}` : ""}
                        </span>
                      )}
                    </div>
                    {log.arguments && Object.keys(log.arguments).length > 0 && (
                      <pre className="mt-3 text-[11px] font-mono bg-muted/60 p-3 overflow-x-auto">
                        {JSON.stringify(log.arguments, null, 2)}
                      </pre>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
      <div className="flex-1 grid md:grid-cols-[340px_1fr] overflow-hidden">
        <aside className="border-r border-border bg-card overflow-y-auto flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {tab === "chat" ? (
            <div>
              {filteredConvs.length === 0 && (
                <p className="text-xs text-muted-foreground text-center p-8 font-body">No conversations yet.</p>
              )}
              {filteredConvs.map((c) => (
                <motion.button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                    activeId === c.id ? "bg-muted" : ""
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-display text-sm font-medium truncate">{c.name || "Anonymous"}</p>
                    {c.admin_unread_count > 0 && (
                      <span className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                        {c.admin_unread_count}
                      </span>
                    )}
                  </div>
                  {c.email && <p className="text-[11px] text-muted-foreground truncate font-body">{c.email}</p>}
                  <p className="text-[10px] text-muted-foreground mt-1 font-body">
                    {new Date(c.last_message_at).toLocaleString()}
                  </p>
                </motion.button>
              ))}
            </div>
          ) : (
            <div>
              {filteredInqs.length === 0 && (
                <p className="text-xs text-muted-foreground text-center p-8 font-body">No inquiries yet.</p>
              )}
              {filteredInqs.map((i) => (
                <motion.button
                  key={i.id}
                  onClick={() => markInquiryRead(i)}
                  className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                    activeInquiry?.id === i.id ? "bg-muted" : ""
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className={`font-display text-sm truncate ${!i.read_at ? "font-semibold" : ""}`}>{i.name}</p>
                    {!i.read_at && <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate font-body">{i.email}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-body">
                    {new Date(i.created_at).toLocaleString()}
                  </p>
                </motion.button>
              ))}
            </div>
          )}
        </aside>

        <main className="flex flex-col overflow-hidden bg-background">
          {tab === "chat" ? (
            activeId ? (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-3">
                  {messages.map((m) => {
                    const fromAdmin = m.sender === "admin";
                    return (
                      <div key={m.id} className={`flex ${fromAdmin ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] px-4 py-2.5 text-sm font-body whitespace-pre-wrap break-words ${
                            fromAdmin
                              ? "bg-accent text-accent-foreground rounded-2xl rounded-br-sm"
                              : "bg-card border border-border text-foreground rounded-2xl rounded-bl-sm"
                          }`}
                        >
                          {!fromAdmin && (
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                              {m.name}
                            </p>
                          )}
                          {m.message}
                          {m.is_streaming && (
                            <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-current opacity-70 animate-pulse" />
                          )}
                          <p className={`text-[9px] mt-1 ${fromAdmin ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                            {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <form onSubmit={handleReply} className="border-t border-border bg-card p-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={sending || !reply.trim()}
                    className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors px-5 disabled:opacity-40 flex items-center gap-2"
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground font-body text-sm">
                Select a conversation to view messages
              </div>
            )
          ) : activeInquiry ? (
            <div className="p-6 md:p-10 overflow-y-auto">
              <h2 className="font-display text-2xl mb-2">{activeInquiry.name}</h2>
              <p className="text-xs text-muted-foreground font-body mb-6">
                Submitted {new Date(activeInquiry.created_at).toLocaleString()}
              </p>
              <dl className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-2">
                  <Mail size={14} className="text-accent mt-1" />
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</dt>
                    <dd className="text-sm font-body"><a href={`mailto:${activeInquiry.email}`} className="hover:text-accent">{activeInquiry.email}</a></dd>
                  </div>
                </div>
                {activeInquiry.website && (
                  <div className="flex items-start gap-2">
                    <Globe size={14} className="text-accent mt-1" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Website</dt>
                      <dd className="text-sm font-body">{activeInquiry.website}</dd>
                    </div>
                  </div>
                )}
                {activeInquiry.revenue_range && (
                  <div className="flex items-start gap-2">
                    <DollarSign size={14} className="text-accent mt-1" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue</dt>
                      <dd className="text-sm font-body">{activeInquiry.revenue_range}</dd>
                    </div>
                  </div>
                )}
                {activeInquiry.budget_range && (
                  <div className="flex items-start gap-2">
                    <DollarSign size={14} className="text-accent mt-1" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Budget</dt>
                      <dd className="text-sm font-body">{activeInquiry.budget_range}</dd>
                    </div>
                  </div>
                )}
                {activeInquiry.service_interest && (
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <Phone size={14} className="text-accent mt-1" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Service</dt>
                      <dd className="text-sm font-body">{activeInquiry.service_interest}</dd>
                    </div>
                  </div>
                )}
              </dl>
              {activeInquiry.message && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Message</h3>
                  <p className="text-sm font-body whitespace-pre-wrap leading-relaxed bg-card border border-border p-5">
                    {activeInquiry.message}
                  </p>
                </div>
              )}
              <a
                href={`mailto:${activeInquiry.email}?subject=Re: Your inquiry to Themyth Agency`}
                className="btn-primary mt-8 inline-flex"
              >
                Reply via Email <Send size={14} />
              </a>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground font-body text-sm">
              Select an inquiry to view details
            </div>
          )}
        </main>
      </div>
      )}
    </div>
  );
};

export default AdminInbox;
