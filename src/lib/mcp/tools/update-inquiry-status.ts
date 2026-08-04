import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_inquiry_status",
  title: "Update inquiry status",
  description:
    "Update the pipeline status of a contact inquiry and optionally mark it as read.",
  inputSchema: {
    inquiry_id: z.string().describe("The inquiry id (uuid)."),
    status: z.string().describe("New status, e.g. new, contacted, qualified, closed."),
    mark_read: z.boolean().optional().describe("Also stamp the inquiry as read."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ inquiry_id, status, mark_read }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const patch: Record<string, unknown> = { status };
    if (mark_read) patch.read_at = new Date().toISOString();
    const { data, error } = await supabase
      .from("contact_inquiries")
      .update(patch)
      .eq("id", inquiry_id)
      .select("id, name, email, status, read_at")
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) {
      return { content: [{ type: "text", text: "Inquiry not found or not accessible." }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { inquiry: data },
    };
  },
});
