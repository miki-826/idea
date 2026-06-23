import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/gemini";
import { buildMockSpec, HAS_GEMINI_KEY } from "@/lib/mock";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const fallback = buildMockSpec({
    category: body?.category ?? "Webアプリ",
    purpose: body?.purpose ?? "全部",
    entries: Array.isArray(body?.entries) ? body.entries : [],
    questions: Array.isArray(body?.questions) ? body.questions : [],
  });

  if (!HAS_GEMINI_KEY) {
    return NextResponse.json({ mode: "mock", spec: fallback });
  }

  try {
    const spec = await analyzeWithGemini({
      category: body?.category ?? "Webアプリ",
      purpose: body?.purpose ?? "全部",
      entries: Array.isArray(body?.entries) ? body.entries : [],
      questions: Array.isArray(body?.questions) ? body.questions : [],
    });
    return NextResponse.json({ mode: "gemini", spec });
  } catch {
    return NextResponse.json({ mode: "mock-error-fallback", spec: fallback });
  }
}
