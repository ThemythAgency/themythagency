import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { recordToolCall } from "../audit";

export default defineTool({
  name: "reply_to_chat",
  title: "Reply to a chat conversation",
  description:
    "Send an admin reply into a live chat conversation. The visitor sees it in the site chat widget. Supports streaming: pass the same stream_id across several calls to append partial text to one live message, then send final=true on the last chunk. Omit stream_id to send a complete message in one call.",
  inputSchema: {
    conversation_id: z.string().describe("The conversation id (uuid) to reply in."),
    message: z
      .string()
      .describe("The reply text, or the next partial chunk when streaming with a stream_id."),
    stream_id: z
      .string()
      .optional()
      .describe(
        "Optional stream identifier. Reuse the same value across calls to append chunks to one live message.",
      ),
    final: z
      .boolean()
      .optional()
      .describe(
        "Marks the streamed message complete. Defaults to true when no stream_id is given, false while streaming.",
      ),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ conversation_id, message, stream_id, final }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const chunk = stream_id ? message : message.trim();
    const isFinal = final ?? !stream_id;
    if (!chunk && !isFinal) {
      return { content: [{ type: "text", text: "Message chunk is empty." }], isError: true };
    }

    const supabase = supabaseForUser(ctx);
    const audit = (success: boolean, summary: string, targetId?: string | null, error?: string) =>
      recordToolCall(ctx, {
        tool: "reply_to_chat",
        action: "write",
        args: { conversation_id, stream_id, final: isFinal, chars: chunk.length },
        targetTable: "chat_messages",
        targetId: targetId ?? conversation_id,
        summary,
        success,
        error,
      });

    if (stream_id) {
      const { data: existing, error: findError } = await supabase
        .from("chat_messages")
        .select("id, message")
        .eq("conversation_id", conversation_id)
        .eq("stream_id", stream_id)
        .maybeSingle();
      if (findError) {
        await audit(false, "Failed to look up streamed message", null, findError.message);
        return { content: [{ type: "text", text: findError.message }], isError: true };
      }

      if (existing) {
        const merged = `${existing.message}${chunk}`;
        const { data, error } = await supabase
          .from("chat_messages")
          .update({ message: merged, is_streaming: !isFinal })
          .eq("id", existing.id)
          .select("id, sender, message, is_streaming, created_at")
          .maybeSingle();
        if (error) {
          await audit(false, "Failed to append stream chunk", existing.id, error.message);
          return { content: [{ type: "text", text: error.message }], isError: true };
        }
        await audit(
          true,
          isFinal ? "Completed streamed reply to visitor" : "Appended streamed reply chunk",
          existing.id,
        );
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
          structuredContent: { message: data, streaming: !isFinal },
        };
      }
    }

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        conversation_id,
        sender: "admin",
        name: "Themyth Agency",
        message: chunk,
        stream_id: stream_id ?? null,
        is_streaming: !isFinal,
      })
      .select("id, sender, message, is_streaming, created_at")
      .maybeSingle();
    if (error) {
      await audit(false, "Failed to send reply", null, error.message);
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    await audit(
      true,
      stream_id ? "Started streamed reply to visitor" : "Sent reply to visitor",
      data?.id ?? null,
    );
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { message: data, streaming: !isFinal },
    };
  },
});
