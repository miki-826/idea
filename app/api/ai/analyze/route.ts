import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/gemini";
import { analyzeWithOpenAI } from "@/lib/ai/openai";
import { AI_PROVIDER, buildMockSpec, HAS_AI_KEY, HAS_GEMINI_KEY } from "@/lib/mock";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const fallback = buildMockSpec({
    category: body?.category ?? "Webアプリ",
    purpose: body?.purpose ?? "全部",
    entries: Array.isArray(body?.entries) ? body.entries : [],
    questions: Array.isArray(body?.questions) ? body.questions : [],
  });

  const requestedProvider = AI_PROVIDER?.toLowerCase();
  const provider =
    requestedProvider === "gemini" || requestedProvider === "openai"
      ? requestedProvider
      : HAS_AI_KEY
        ? "openai"
        : HAS_GEMINI_KEY
          ? "gemini"
          : "mock";

  if (provider === "mock") {
    return NextResponse.json({ mode: "mock", spec: fallback });
  }

  try {
    const payload = {
      category: body?.category ?? "Webアプリ",
      purpose: body?.purpose ?? "全部",
      entries: Array.isArray(body?.entries) ? body.entries : [],
      questions: Array.isArray(body?.questions) ? body.questions : [],
    };
    const spec =
      provider === "openai" ? await analyzeWithOpenAI(payload) : await analyzeWithGemini(payload);
    return NextResponse.json({ mode: provider, spec });
  } catch {
    return NextResponse.json({ mode: "mock-error-fallback", spec: fallback });
  }
}
