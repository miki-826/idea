import type { Category, Purpose } from "@/lib/types";

export type AnalyzePayload = {
  category: Category;
  purpose: Purpose;
  entries: { label: string; content: string; type: string }[];
  questions: { id: string; prompt: string; answer: string }[];
};

export const ideaSpecJsonSchema = {
  type: "object",
  additionalProperties: false,
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
} as const;
