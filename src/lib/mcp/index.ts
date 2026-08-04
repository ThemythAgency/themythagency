import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listInquiries from "./tools/list-inquiries";
import updateInquiryStatus from "./tools/update-inquiry-status";
import listConversations from "./tools/list-conversations";
import listChatMessages from "./tools/list-chat-messages";
import replyToChat from "./tools/reply-to-chat";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "themyth-growth-studio",
  title: "Themyth Growth Studio",
  version: "0.1.0",
  instructions:
    "Tools for the Themyth Agency site. Read and triage contact-form inquiries, read live chat conversations, and reply to visitors. All tools act as the signed-in admin user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listInquiries, updateInquiryStatus, listConversations, listChatMessages, replyToChat],
});
