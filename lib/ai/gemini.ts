import { GoogleGenAI } from "@google/genai";
import { buildMockSpec } from "@/lib/mock";
import type { Category, Purpose } from "@/lib/types";

type AnalyzePayload = {
  category: Category;
  purpose: Purpose;
  entries: { label: string; content: string; type: string }[];
  questions: { id: string; prompt: string; answer: string }[];
};

const responseSchema = {
  type: "object",
  required: [
    "title",
    "oneLine",
    "users",
    "problem",
    "core",
    "features",
    "visual",
    "tech",
    "unknown",
    "inferred",
  ],
  properties: {
    title: { type: "string" },
    oneLine: { type: "string" },
    users: { type: "string" },
    problem: { type: "string" },
    core: { type: "string" },
    features: { type: "array", items: { type: "string" } },
    visual: { type: "string" },
    tech: { type: "array", items: { type: "string" } },
    unknown: { type: "array", items: { type: "string" } },
    inferred: { type: "array", items: { type: "string" } },
  },
};

export async function analyzeWithGemini(payload: AnalyzePayload) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return buildMockSpec(payload);
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = [
    "You are the structuring engine for IDEA VISIBLE, a Japanese idea concretization studio.",
    "Return only JSON matching the schema.",
    "Separate confirmed facts from inferred assumptions. Never claim uncertain details as confirmed.",
    "Write natural Japanese microcopy. Keep each field concise enough for a demo board.",
    JSON.stringify(payload, null, 2),
  ].join("\n\n");

  const request = ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Gemini timeout")), 9000);
  });

  const response = await Promise.race([request, timeout]);
  const text = response.text;
  if (!text) throw new Error("Gemini returned empty text");

  return JSON.parse(text);
}
