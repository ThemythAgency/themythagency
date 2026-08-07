export interface PolicySection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface Policy {
  slug: string;
  title: string;
  label: string;
  description: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}

const CONTACT = "official.themythagency@gmail.com";
const UPDATED = "August 2026";

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    description:
      "How Themyth Agency collects, uses, stores and protects the personal information you share with us.",
    updated: UPDATED,
    intro:
      "Themyth Agency respects your privacy. This policy explains what information we collect when you use our website or engage our services, why we collect it, and the choices you have.",
    sections: [
      {
        heading: "Information we collect",
        body: ["We only collect information that helps us respond to you and deliver our services."],
        bullets: [
          "Details you submit through our contact, audit or live chat forms, such as your name, email address, store URL and project context.",
          "Messages you send us through the site chat, email or WhatsApp.",
          "Basic technical data such as browser type, device type and pages visited, used to keep the site working and improve it.",
        ],
      },
      {
        heading: "How we use your information",
        body: ["Your information is used strictly for the purposes below."],
        bullets: [
          "Responding to enquiries and preparing proposals or audits.",
          "Delivering, supporting and improving the services you engage us for.",
          "Sending service updates or, where you have opted in, occasional insights. You can opt out at any time.",
        ],
      },
      {
        heading: "How we store and protect it",
        body: [
          "Submissions are stored in access-controlled systems that only authorised team members can reach. We keep your data only as long as needed for the purpose it was collected, or as required by law.",
        ],
      },
      {
        heading: "Sharing with third parties",
        body: [
          "We do not sell your personal information. We share it only with the service providers required to run our business, for example hosting, email and analytics providers, and only to the extent needed for them to perform their function.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You may request access to, correction of, or deletion of the personal information we hold about you. Email ${CONTACT} and we will respond within a reasonable time.`,
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about this policy can be sent to ${CONTACT}.`],
      },
    ],
  },
  {
    slug: "terms-of-service",
    label: "Terms of Service",
    title: "Terms of Service",
    description:
      "The terms that govern the use of the Themyth Agency website and the engagements we deliver.",
    updated: UPDATED,
    intro:
      "By using this website or engaging Themyth Agency, you agree to the terms below. If you do not agree, please do not use the site or our services.",
    sections: [
      {
        heading: "Services",
        body: [
          "We provide Shopify strategy, design, development, optimization and growth services. The exact scope, timeline and deliverables of any engagement are defined in a written proposal or agreement, which takes precedence over general descriptions on this website.",
        ],
      },
      {
        heading: "Quotes and pricing",
        body: [
          "Prices shown on this site, including package prices and package builder totals, are indicative starting points in US dollars. Final pricing is confirmed in writing before work begins. Advertising budgets, third-party apps, themes and platform subscriptions are not included and remain the client's responsibility.",
        ],
      },
      {
        heading: "Client responsibilities",
        body: ["To deliver on time we rely on you to provide the following."],
        bullets: [
          "Timely access to the store, accounts and tools required for the work.",
          "Accurate brand, product and legal information.",
          "Reasonably prompt feedback and approvals at agreed checkpoints.",
        ],
      },
      {
        heading: "Results and disclaimers",
        body: [
          "We apply proven strategy and execution, but ecommerce outcomes depend on factors outside our control, including market demand, product quality, pricing and advertising budget. Nothing on this site is a guarantee of specific revenue, traffic or conversion results.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "Site content, frameworks and materials remain the property of Themyth Agency. On full payment, deliverables produced specifically for a client engagement transfer to that client, excluding our underlying tools, templates and know-how.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the extent permitted by law, our total liability arising from any engagement is limited to the fees paid for that engagement. We are not liable for indirect or consequential losses.",
        ],
      },
      {
        heading: "Contact",
        body: [`For questions about these terms, email ${CONTACT}.`],
      },
    ],
  },
  {
    slug: "cookie-policy",
    label: "Cookie Policy",
    title: "Cookie Policy",
    description: "How Themyth Agency uses cookies and similar technologies on this website.",
    updated: UPDATED,
    intro:
      "Cookies are small files stored on your device. We use a small number of them to keep the site working and to understand how it is used.",
    sections: [
      {
        heading: "Types of cookies we use",
        body: [],
        bullets: [
          "Essential: required for core functionality such as maintaining your live chat session.",
          "Preference: remember basic choices so the site behaves consistently on return visits.",
          "Analytics: help us understand which pages are useful, in aggregate and never to identify you personally.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can block or delete cookies in your browser settings at any time. Disabling essential cookies may prevent parts of the site, such as the live chat, from working correctly.",
        ],
      },
      {
        heading: "Third-party tools",
        body: [
          "Some embedded tools and analytics providers may set their own cookies. Their use of that data is governed by their own policies.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about cookies can be sent to ${CONTACT}.`],
      },
    ],
  },
  {
    slug: "refund-policy",
    label: "Refund Policy",
    title: "Refund and Cancellation Policy",
    description:
      "How payments, cancellations and refunds work for Themyth Agency projects and retainers.",
    updated: UPDATED,
    intro:
      "We want every engagement to be clear and fair on both sides. This policy explains how payments, cancellations and refunds are handled.",
    sections: [
      {
        heading: "Payments",
        body: [
          "Project engagements typically begin with a deposit, with the balance due at agreed milestones or on delivery. Retainers are billed monthly in advance. Work begins once the first payment is received.",
        ],
      },
      {
        heading: "Cancellations",
        body: [
          "You may cancel a project at any time in writing. You remain responsible for the work completed up to the cancellation date. Monthly retainers can be cancelled with 14 days written notice before the next billing date.",
        ],
      },
      {
        heading: "Refunds",
        body: ["Refunds are assessed against work already delivered."],
        bullets: [
          "Deposits become non-refundable once discovery, strategy or build work has started, since that time is reserved for you.",
          "If no work has started, a deposit is fully refundable.",
          "Amounts paid for milestones not yet started are refundable in full.",
          "Completed and delivered work is not refundable.",
        ],
      },
      {
        heading: "Third-party costs",
        body: [
          "Advertising spend, app subscriptions, themes, domains and platform fees are paid to third parties and are governed by their own refund terms. We cannot refund them on their behalf.",
        ],
      },
      {
        heading: "Requesting a refund",
        body: [
          `Send a written request to ${CONTACT} with your project details. We review every request and respond within 7 business days.`,
        ],
      },
    ],
  },
];

export const findPolicy = (slug: string) => policies.find((p) => p.slug === slug);
