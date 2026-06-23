import OpenAI from "openai";
import { buildMockSpec } from "@/lib/mock";
import { ideaSpecJsonSchema, type AnalyzePayload } from "@/lib/ai/types";

export async function analyzeWithOpenAI(payload: AnalyzePayload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return buildMockSpec(payload);
  }

  const client = new OpenAI({ apiKey });
  const prompt = [
    "You are the structuring engine for IDEA VISIBLE, a Japanese idea concretization studio.",
    "Return concise, natural Japanese that exactly matches the JSON schema.",
    "Separate confirmed facts from inferred assumptions. Never claim uncertain details as confirmed.",
    "If the input is too thin, keep unknown fields explicit instead of inventing details.",
    JSON.stringify(payload, null, 2),
  ].join("\n\n");

  const request = client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: "Structure rough product ideas into a demo-ready IdeaSpec.",
      },
      { role: "user", content: prompt },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "idea_spec",
        strict: true,
        schema: ideaSpecJsonSchema,
      },
    },
  });

  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("OpenAI timeout")), 9000);
  });

  const response = await Promise.race([request, timeout]);
  const text = response.output_text;
  if (!text) throw new Error("OpenAI returned empty text");

  return JSON.parse(text);
}
