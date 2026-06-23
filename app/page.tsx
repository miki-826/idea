"use client";

import {
  ArrowDownToLine,
  Camera,
  Check,
  CircleStop,
  Database,
  FileJson,
  FileText,
  GitBranch,
  Hand,
  ImagePlus,
  Lightbulb,
  Link,
  Lock,
  Mic,
  PenLine,
  RefreshCw,
  Rocket,
  Save,
  Sparkles,
  Unlock,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { saveProject } from "@/lib/store";

type Category =
  | "Webアプリ"
  | "ゲーム"
  | "商品・サービス"
  | "キャラクター"
  | "世界観・ストーリー"
  | "プレゼン企画"
  | "まだ決まっていない";

type Purpose =
  | "アイデア整理"
  | "見た目作成"
  | "動く画面"
  | "要件定義"
  | "説明資料"
  | "全部";

type Entry = {
  id: string;
  type: "text" | "voice" | "image" | "gesture";
  label: string;
  content: string;
  createdAt: string;
};

type Question = {
  id: string;
  prompt: string;
  why: string;
  answer: string;
  options: string[];
};

type Locked = Record<"title" | "concept" | "visual" | "prototype", boolean>;

type IdeaSpec = {
  title: string;
  oneLine: string;
  users: string;
  problem: string;
  core: string;
  features: string[];
  visual: string;
  tech: string[];
  unknown: string[];
  inferred: string[];
};

const categories: Category[] = [
  "Webアプリ",
  "ゲーム",
  "商品・サービス",
  "キャラクター",
  "世界観・ストーリー",
  "プレゼン企画",
  "まだ決まっていない",
];

const purposes: Purpose[] = [
  "アイデア整理",
  "見た目作成",
  "動く画面",
  "要件定義",
  "説明資料",
  "全部",
];

const seedQuestions: Question[] = [
  {
    id: "audience",
    prompt: "最初に喜ばせたい相手は誰ですか？",
    why: "画面、言葉、機能の優先順位がここで決まります。",
    answer: "",
    options: ["初心者", "チームメンバー", "発表の審査員"],
  },
  {
    id: "moment",
    prompt: "使った瞬間に「これは便利」と感じる場面は？",
    why: "コア体験を1つに絞るための質問です。",
    answer: "",
    options: ["迷っている時", "説明したい時", "すぐ作りたい時"],
  },
  {
    id: "tone",
    prompt: "見た目の温度感はどちらに寄せますか？",
    why: "生成画像とUIの方向性を固定します。",
    answer: "",
    options: ["紙の設計台", "観察端末", "手描き工房"],
  },
];

const defaultLocked: Locked = {
  title: false,
  concept: false,
  visual: false,
  prototype: false,
};

const handoffItems = [
  {
    icon: GitBranch,
    title: "GitHub URL",
    detail: "未確定なら推測せず、push前にユーザーへ確認する。",
  },
  {
    icon: Rocket,
    title: "Vercel Import",
    detail: "GitHub repoをImportし、環境変数を入れた後にRedeployする。",
  },
  {
    icon: Database,
    title: "Supabase",
    detail: "supabase.sqlを実行し、anon keyだけを公開envへ設定する。",
  },
];

const nowLabel = () =>
  new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

const emptySpec: IdeaSpec = {
  title: "？ → ！スタジオ",
  oneLine: "言葉になる前のアイデアを、質問と素材から発表可能な仕様へ変換する。",
  users: "作りたいものはあるが、整理・デザイン・実装の入口で止まっている人。",
  problem: "説明できない、描けない、どこから作ればよいか分からない。",
  core: "声・メモ・画像・ジェスチャーを集め、AI質問で不足を埋め、成果物ボードへ固定する。",
  features: [
    "入力履歴の自動保存",
    "3問の追加質問",
    "コンセプト画像とUI案",
    "クリック可能なミニプロトタイプ",
    "Markdown / JSON出力",
  ],
  visual: "方眼紙の設計台、黒い計測パネル、朱色の判定印、鉛筆のラフ線。",
  tech: [
    "Next.js App Router",
    "MediaRecorder / getUserMedia",
    "LocalStorage fallback",
    "任意のSupabase保存",
  ],
  unknown: ["実API provider", "本番Supabase URL", "最終ブランド名"],
  inferred: ["初回デモではMock生成を既定にする", "外部送信前に確認画面を挟む"],
};

function makeEntry(type: Entry["type"], label: string, content: string): Entry {
  return {
    id: crypto.randomUUID(),
    type,
    label,
    content,
    createdAt: nowLabel(),
  };
}

function exportFile(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildMarkdown(
  spec: IdeaSpec,
  entries: Entry[],
  questions: Question[],
  githubUrl: string,
) {
  return `# ${spec.title}

${spec.oneLine}

## 想定ユーザー
${spec.users}

## 解決する課題
${spec.problem}

## コア体験
${spec.core}

## 主要機能
${spec.features.map((item) => `- ${item}`).join("\n")}

## ビジュアル方向
${spec.visual}

## 技術構成
${spec.tech.map((item) => `- ${item}`).join("\n")}

## 入力履歴
${entries.map((entry) => `- ${entry.createdAt} ${entry.label}: ${entry.content}`).join("\n")}

## 追加質問
${questions.map((q) => `- ${q.prompt}: ${q.answer || "未回答"}`).join("\n")}

## 公開準備
- GitHub URL: ${githubUrl || "未確定。作業者がユーザーへ確認する。"}
- Vercel: GitHub Import後、GEMINI_API_KEY / Supabase envを設定してRedeploy
- Supabase: supabase.sqlをSQL Editorで実行し、RLS policyを確認
`;
}

export default function Home() {
  const [category, setCategory] = useState<Category>("Webアプリ");
  const [purpose, setPurpose] = useState<Purpose>("全部");
  const [ideaText, setIdeaText] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [questions, setQuestions] = useState(seedQuestions);
  const [spec, setSpec] = useState(emptySpec);
  const [locked, setLocked] = useState<Locked>(defaultLocked);
  const [recording, setRecording] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [status, setStatus] = useState("Mock Mode: APIキーなしでも1周できます");
  const [saving, setSaving] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const progress = useMemo(() => {
    const answered = questions.filter((q) => q.answer).length;
    return Math.min(100, 24 + entries.length * 9 + answered * 13);
  }, [entries.length, questions]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem("idea-visible-project");
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved);
        setCategory(parsed.category ?? "Webアプリ");
        setPurpose(parsed.purpose ?? "全部");
        setEntries(parsed.entries ?? []);
        setQuestions(parsed.questions ?? seedQuestions);
        setSpec(parsed.spec ?? emptySpec);
        setLocked(parsed.locked ?? defaultLocked);
        setGithubUrl(parsed.githubUrl ?? "");
        setStatus("保存済みの工程から再開しました");
      } catch {
        setStatus("保存データを読めなかったため、新規工程で開始します");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "idea-visible-project",
      JSON.stringify({ category, purpose, entries, questions, spec, locked, githubUrl }),
    );
  }, [category, purpose, entries, questions, spec, locked, githubUrl]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const addText = () => {
    if (!ideaText.trim()) return;
    setEntries((items) => [
      makeEntry("text", "手入力メモ", ideaText.trim()),
      ...items,
    ]);
    setIdeaText("");
    setStatus("メモを入力履歴へ固定しました");
  };

  const toggleRecording = async () => {
    if (recording) {
      recorderRef.current?.stop();
      setRecording(false);
      setStatus("録音を停止しました。Mock文字起こしを追加します");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunks.current = [];
      recorder.ondataavailable = (event) => audioChunks.current.push(event.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setEntries((items) => [
          makeEntry(
            "voice",
            "音声メモ",
            "音声からのMock文字起こし: 作りたいものの断片を仕様へ変換したい。",
          ),
          ...items,
        ]);
      };
      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);
      setStatus("録音中です。映像や音声は自動送信しません");
    } catch {
      setEntries((items) => [
        makeEntry("voice", "音声代替", "マイク不可のため、手入力で代替しました。"),
        ...items,
      ]);
      setStatus("マイク権限がないため代替入力を追加しました");
    }
  };

  const toggleCamera = async () => {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setCameraOn(false);
      setStatus("カメラを停止しました");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
      setStatus("カメラプレビュー中です。撮影操作をするまで保存しません");
    } catch {
      setEntries((items) => [
        makeEntry("image", "カメラ代替", "カメラ不可のため、画像アップロード待ちにしました。"),
        ...items,
      ]);
      setStatus("カメラ権限がないため代替操作へ切り替えました");
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    setEntries((items) => [
      makeEntry("image", "静止画メモ", "カメラプレビューから構図・ラフ・物体の参考を取得しました。"),
      ...items,
    ]);
    setStatus("撮影画像を送信前メモとして固定しました");
  };

  const uploadImage = (file?: File) => {
    if (!file) return;
    setEntries((items) => [
      makeEntry("image", "画像アップロード", `${file.name} を手描きラフとして解釈`),
      ...items,
    ]);
    setStatus("画像の利用目的をラフ解釈として追加しました");
  };

  const setAnswer = (id: string, answer: string) => {
    setQuestions((items) =>
      items.map((item) => (item.id === id ? { ...item, answer } : item)),
    );
  };

  const gesture = (content: string) => {
    setEntries((items) => [makeEntry("gesture", "ジェスチャー", content), ...items]);
    setStatus("ジェスチャー代替入力を追加しました");
  };

  const generate = async () => {
    setStatus("入力を構造化しています");
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, purpose, entries, questions, locked, spec }),
      });
      const data = await res.json();
      setSpec((prev) => ({
        title: locked.title ? prev.title : data.spec.title,
        oneLine: locked.concept ? prev.oneLine : data.spec.oneLine,
        users: data.spec.users,
        problem: data.spec.problem,
        core: locked.concept ? prev.core : data.spec.core,
        features: data.spec.features,
        visual: locked.visual ? prev.visual : data.spec.visual,
        tech: data.spec.tech,
        unknown: data.spec.unknown,
        inferred: data.spec.inferred,
      }));
      setStatus(data.mode === "mock" ? "Mock生成が完了しました" : "AI生成が完了しました");
    } catch {
      setSpec(emptySpec);
      setStatus("API失敗時のMock結果へフォールバックしました");
    }
  };

  const cloudSave = async () => {
    setSaving(true);
    const result = await saveProject({ category, purpose, entries, questions, spec, githubUrl });
    setSaving(false);
    setStatus(result);
  };

  const toggleLock = (key: keyof Locked) => {
    setLocked((value) => ({ ...value, [key]: !value[key] }));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#181511] text-[#27231d]">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/ui/idea-workbench.png"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[rgba(255,248,232,0.62)]" />
      </div>

      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-5 px-4 py-4 lg:grid-cols-[300px_1fr_340px] lg:px-6">
        <aside className="panel-surface flex flex-col gap-4">
          <div>
            <p className="kicker">IDEA VISIBLE?</p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-[#20170f]">
              ？を、触れる
              <br />
              仕様へ。
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#5e5140]">
              声、メモ、写真、身振りを材料箱へ入れると、質問で輪郭を出し、発表できる企画ボードへ固定します。
            </p>
          </div>

          <div className="meter">
            <span>具体化率</span>
            <strong>{progress}%</strong>
            <div aria-hidden className="meter-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="field-group">
            <label>作りたいもの</label>
            <div className="chip-grid">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "chip active" : "chip"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>出力目的</label>
            <div className="chip-grid two">
              {purposes.map((item) => (
                <button
                  key={item}
                  className={purpose === item ? "chip active" : "chip"}
                  onClick={() => setPurpose(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="primary-action" onClick={generate}>
            <Wand2 size={18} />
            可視化する
          </button>
          <p className="status-line">{status}</p>
        </aside>

        <section className="workspace">
          <div className="input-board">
            <div className="section-head">
              <div>
                <p className="kicker">INPUT STUDIO</p>
                <h2>材料を集める</h2>
              </div>
              <button className="tool-button" onClick={addText} title="メモを固定">
                <PenLine size={18} />
              </button>
            </div>
            <textarea
              value={ideaText}
              onChange={(event) => setIdeaText(event.target.value)}
              placeholder="例: 子どもでも使える、思いつきを絵と画面にしてくれるWebアプリ。紙のラフや声も使いたい。"
            />
            <div className="tool-row">
              <button className="tool-button label" onClick={toggleRecording}>
                {recording ? <CircleStop size={18} /> : <Mic size={18} />}
                {recording ? "停止" : "録音"}
              </button>
              <button className="tool-button label" onClick={toggleCamera}>
                <Camera size={18} />
                {cameraOn ? "カメラ停止" : "カメラ"}
              </button>
              <label className="tool-button label file-control">
                <ImagePlus size={18} />
                画像
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => uploadImage(event.target.files?.[0])}
                />
              </label>
              <button className="tool-button label" onClick={() => gesture("親指を立てる: 決定")}>
                <Hand size={18} />
                決定
              </button>
            </div>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={cameraOn ? "camera-preview show" : "camera-preview"}
            />
            {cameraOn && (
              <button className="secondary-action" onClick={captureFrame}>
                撮影して材料へ追加
              </button>
            )}
          </div>

          <div className="questions">
            <div className="section-head">
              <div>
                <p className="kicker">3 QUESTIONS</p>
                <h2>足りない輪郭だけ聞く</h2>
              </div>
              <span className="stamp">推定は推定</span>
            </div>
            {questions.map((q) => (
              <article key={q.id} className="question-card">
                <div>
                  <h3>{q.prompt}</h3>
                  <p>{q.why}</p>
                </div>
                <div className="answer-row">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      className={q.answer === option ? "mini active" : "mini"}
                      onClick={() => setAnswer(q.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <input
                  value={q.answer}
                  onChange={(event) => setAnswer(q.id, event.target.value)}
                  placeholder="自由に答える / 分からない / AIへ任せる"
                />
              </article>
            ))}
          </div>

          <div className="history-strip">
            {entries.length === 0 ? (
              <p>まだ材料がありません。まず一言だけ置いてみてください。</p>
            ) : (
              entries.slice(0, 6).map((entry) => (
                <span key={entry.id}>
                  {entry.createdAt} / {entry.label}
                </span>
              ))
            )}
          </div>
        </section>

        <aside className="result-board">
          <div className="section-head">
            <div>
              <p className="kicker">OUTPUT BOARD</p>
              <h2>生成結果</h2>
            </div>
            <button className="tool-button" onClick={generate} title="再生成">
              <RefreshCw size={18} />
            </button>
          </div>

          <ResultBlock
            title="タイトル"
            locked={locked.title}
            onLock={() => toggleLock("title")}
          >
            <h3 className="result-title">{spec.title}</h3>
          </ResultBlock>

          <ResultBlock
            title="コンセプト"
            locked={locked.concept}
            onLock={() => toggleLock("concept")}
          >
            <p>{spec.oneLine}</p>
            <p className="small">{spec.core}</p>
          </ResultBlock>

          <ResultBlock
            title="ビジュアル"
            locked={locked.visual}
            onLock={() => toggleLock("visual")}
          >
            <p>{spec.visual}</p>
          </ResultBlock>

          <ResultBlock
            title="触れるプロトタイプ"
            locked={locked.prototype}
            onLock={() => toggleLock("prototype")}
          >
            <div className="prototype">
              <button>
                <Lightbulb size={16} />
                材料を入れる
              </button>
              <button>
                <Sparkles size={16} />
                質問で絞る
              </button>
              <button>
                <Check size={16} />
                仕様へ固定
              </button>
            </div>
          </ResultBlock>

          <article className="handoff-panel">
            <div className="result-head">
              <span>公開準備</span>
              <Rocket size={15} />
            </div>
            <label className="repo-field">
              <span>GitHub Repository URL</span>
              <div>
                <Link size={16} />
                <input
                  value={githubUrl}
                  onChange={(event) => setGithubUrl(event.target.value)}
                  placeholder="https://github.com/owner/repo"
                />
              </div>
            </label>
            <div className="handoff-list">
              {handoffItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <Icon size={17} />
                    <p>
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </article>

          <div className="export-row">
            <button className="tool-button label" onClick={cloudSave} disabled={saving}>
              <Save size={17} />
              {saving ? "保存中" : "保存"}
            </button>
            <button
              className="tool-button label"
              onClick={() =>
                exportFile(
                  "idea-visible-spec.md",
                  buildMarkdown(spec, entries, questions, githubUrl),
                  "text/markdown",
                )
              }
            >
              <FileText size={17} />
              MD
            </button>
            <button
              className="tool-button label"
              onClick={() =>
                exportFile(
                  "idea-visible-spec.json",
                  JSON.stringify(
                    { category, purpose, entries, questions, spec, githubUrl },
                    null,
                    2,
                  ),
                  "application/json",
                )
              }
            >
              <FileJson size={17} />
              JSON
            </button>
          </div>

          <div className="download-note">
            <ArrowDownToLine size={16} />
            API未許可時もLocalStorageで復帰できます。
          </div>
        </aside>
      </section>
    </main>
  );
}

function ResultBlock({
  title,
  locked,
  onLock,
  children,
}: {
  title: string;
  locked: boolean;
  onLock: () => void;
  children: React.ReactNode;
}) {
  return (
    <article className="result-block">
      <div className="result-head">
        <span>{title}</span>
        <button className="lock-button" onClick={onLock} title={locked ? "固定を解除" : "固定"}>
          {locked ? <Lock size={15} /> : <Unlock size={15} />}
        </button>
      </div>
      {children}
    </article>
  );
}
