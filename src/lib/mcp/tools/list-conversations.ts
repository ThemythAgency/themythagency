import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_conversations",
  title: "List live chat conversations",
  description:
    "List live chat conversations from the site widget, most recently active first, with unread counts.",
  inputSchema: {
    unread_only: z.boolean().optional().describe("Only conversations with unread visitor messages."),
    limit: z.number().int().optional().describe("Max rows to return (default 20, max 100)."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ unread_only, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("chat_conversations")
      .select("id, name, email, admin_unread_count, last_message_at, created_at")
      .order("last_message_at", { ascending: false })
      .limit(Math.min(Math.max(limit ?? 20, 1), 100));
    if (unread_only) query = query.gt("admin_unread_count", 0);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { conversations: data ?? [] },
    };
  },
});
