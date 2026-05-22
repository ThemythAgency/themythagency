import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { LogIn, UserPlus, ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin/inbox", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/admin/inbox`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        toast({ title: "Account created. Signing you in..." });
        const { error: e2 } = await supabase.auth.signInWithPassword({ email, password });
        if (e2) throw e2;
        navigate("/admin/inbox");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin/inbox");
      }
    } catch (err: any) {
      toast({ title: err.message ?? "Auth failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card text-foreground p-10 shadow-2xl"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <h1 className="font-display text-3xl mb-2">Admin {mode === "login" ? "Login" : "Signup"}</h1>
        <p className="text-sm text-muted-foreground font-body mb-8">
          {mode === "login" ? "Sign in to access your inbox." : "First account becomes admin automatically."}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border text-sm font-body focus:outline-none focus:border-accent"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 text-xs uppercase tracking-wider text-muted-foreground hover:text-accent"
        >
          {mode === "login" ? "No account? Create one" : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
