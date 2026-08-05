import type { ToolContext } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "./supabase";

type AuditEntry = {
  tool: string;
  action: "read" | "write";
  args?: Record<string, unknown>;
  targetTable?: string;
  targetId?: string | null;
  summary?: string;
  success: boolean;
  error?: string | null;
};

/**
 * Records one MCP tool invocation in public.mcp_audit_logs.
 * Runs as the signed-in admin (RLS scoped). Never throws: auditing must not
 * break the tool call itself.
 */
export async function recordToolCall(ctx: ToolContext, entry: AuditEntry) {
  try {
    if (!ctx.isAuthenticated()) return;
    const supabase = supabaseForUser(ctx);
    await supabase.from("mcp_audit_logs").insert({
      user_id: ctx.getUserId(),
      user_email: ctx.getUserEmail() ?? null,
      client_id: ctx.getClientId() ?? null,
      tool_name: entry.tool,
      action: entry.action,
      arguments: (entry.args ?? {}) as Record<string, unknown>,
      target_table: entry.targetTable ?? null,
      target_id: entry.targetId ?? null,
      summary: entry.summary ?? null,
      success: entry.success,
      error_message: entry.error ?? null,
    });
  } catch {
    // Auditing is best-effort.
  }
}
