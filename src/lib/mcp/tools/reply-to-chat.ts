import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "reply_to_chat",
  title: "Reply to a chat conversation",
  description:
    "Send an admin reply into a live chat conversation. The visitor sees it in the site chat widget.",
  inputSchema: {
    conversation_id: z.string().describe("The conversation id (uuid) to reply in."),
    message: z.string().describe("The reply text to send to the visitor."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ conversation_id, message }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const text = message.trim();
    if (!text) return { content: [{ type: "text", text: "Message is empty." }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({ conversation_id, sender: "admin", name: "Themyth Agency", message: text })
      .select("id, sender, message, created_at")
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { message: data },
    };
  },
});
