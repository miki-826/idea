import type { Category, Purpose } from "@/lib/types";

export const HAS_AI_KEY = !!process.env.OPENAI_API_KEY;
export const HAS_GEMINI_KEY = !!process.env.GEMINI_API_KEY;
export const AI_PROVIDER = process.env.AI_PROVIDER;

export function buildMockSpec(input: {
  category: Category;
  purpose: Purpose;
  entries: { content: string }[];
  questions: { id: string; answer: string }[];
}) {
  const audience =
    input.questions.find((q) => q.id === "audience")?.answer || "初回利用者";
  const tone = input.questions.find((q) => q.id === "tone")?.answer || "紙の設計台";
  const summary =
    input.entries[0]?.content ||
    "曖昧なアイデアを、質問と素材から具体的な成果物へ変換したい。";

  return {
    title: input.category === "ゲーム" ? "ひらめき作戦盤" : "カタチニ・ボード",
    oneLine: `${audience}の「まだ言葉にならない構想」を、${input.purpose}に使える仕様へ変換する。`,
    users: `${audience}。特に、絵やコードより先に構想を共有したい人。`,
    problem: "説明・整理・見た目作り・実装範囲決めが別々に分断され、制作開始まで進めない。",
    core: `入力断片「${summary.slice(0, 42)}」を材料として、AIが推定と未確定を分け、重要質問だけで輪郭を出す。`,
    features: [
      "声・テキスト・画像・ジェスチャーの材料箱",
      "根拠付きIdeaSpec生成",
      "3問から始まる追加質問",
      "ロック付き部分再生成",
      "Markdown / JSON / プロトタイプ出力",
    ],
    visual: `${tone}を基調に、方眼紙、計測パネル、朱色の判定印で「？が固定される」瞬間を見せる。`,
    tech: [
      "Next.js App Router + TypeScript",
      "MediaRecorder / getUserMedia",
      "server-side AI adapter with Mock fallback",
      "Supabase optional persistence",
      "LocalStorage autosave",
    ],
    unknown: ["実運用AI provider", "画像生成の本番許可", "共有・共同編集の範囲"],
    inferred: [
      "初期デモは1人で完結する",
      "外部送信前にユーザー確認を挟む",
      "推定事項は確定事項として扱わない",
    ],
  };
}
