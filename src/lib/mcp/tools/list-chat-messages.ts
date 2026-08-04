import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_chat_messages",
  title: "Read a chat conversation",
  description: "Read the full message thread of one live chat conversation, oldest first.",
  inputSchema: {
    conversation_id: z.string().describe("The conversation id (uuid)."),
    limit: z.number().int().optional().describe("Max messages to return (default 100, max 500)."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ conversation_id, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, sender, name, message, created_at, read_at")
      .eq("conversation_id", conversation_id)
      .order("created_at", { ascending: true })
      .limit(Math.min(Math.max(limit ?? 100, 1), 500));
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { messages: data ?? [] },
    };
  },
});
