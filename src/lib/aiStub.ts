import type { Lead } from "@/data/types";

interface AIQualificationResult {
  ai_intent_level: "hot" | "warm" | "cold";
  ai_notes: string;
}

// Stub: Replace with real Claude/n8n webhook call in production
export async function qualifyLeadWithAI(lead: Partial<Lead>): Promise<AIQualificationResult> {
  // Mock scoring logic based on budget and BHK
  await new Promise((res) => setTimeout(res, 500)); // simulate async

  const budget = parseInt(lead.budget?.replace(/\D/g, "") || "0");
  const purpose = lead.purpose || "";

  let ai_intent_level: "hot" | "warm" | "cold" = "warm";
  let ai_notes = "Lead shows moderate interest based on profile.";

  if (budget >= 5000000 && purpose === "investment") {
    ai_intent_level = "hot";
    ai_notes = "High-budget investor profile. Priority follow-up recommended within 24 hours.";
  } else if (budget < 2500000 || purpose === "just-browsing") {
    ai_intent_level = "cold";
    ai_notes = "Low budget or browsing intent. Nurture via newsletter and periodic follow-ups.";
  }

  // Future: POST to webhook
  // await fetch("https://n8n.yourserver.com/webhook/qualify-lead", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ lead }),
  // });

  return { ai_intent_level, ai_notes };
}
