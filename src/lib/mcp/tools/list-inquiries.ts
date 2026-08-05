import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { recordToolCall } from "../audit";

export default defineTool({
  name: "list_inquiries",
  title: "List contact inquiries",
  description:
    "List lead/contact form inquiries submitted on the Themyth Agency site, newest first. Optionally filter by status or unread only.",
  inputSchema: {
    status: z.string().optional().describe("Filter by status, e.g. new, contacted, closed."),
    unread_only: z.boolean().optional().describe("Only return inquiries that have not been read."),
    limit: z.number().int().optional().describe("Max rows to return (default 20, max 100)."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ status, unread_only, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("contact_inquiries")
      .select(
        "id, name, email, website, service_interest, revenue_range, budget_range, message, status, read_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(Math.min(Math.max(limit ?? 20, 1), 100));
    if (status) query = query.eq("status", status);
    if (unread_only) query = query.is("read_at", null);
    const { data, error } = await query;
    await recordToolCall(ctx, {
      tool: "list_inquiries",
      action: "read",
      args: { status, unread_only, limit },
      targetTable: "contact_inquiries",
      summary: error ? "Failed to list inquiries" : `Listed ${data?.length ?? 0} inquiries`,
      success: !error,
      error: error?.message,
    });
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { inquiries: data ?? [] },
    };
  },
});
