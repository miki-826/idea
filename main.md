# IDEA VISIBLE？ 要件定義書

- 文書名: IDEA VISIBLE？ 要件定義書
- バージョン: 1.0
- 作成日: 2026-06-23
- 開発方針: 実動するWebアプリとして実装
- 想定リポジトリ内ファイル名: `main.md`

---

## 1. プロダクト概要

### 1.1 プロダクト名

**IDEA VISIBLE？**

別名候補:

- `？ → ！`
- カタチニ
- できる化
- WHAT IF STUDIO

### 1.2 キャッチコピー

> **あなたの頭の中にある「？」を、目の前の「！」へ。**

補助コピー:

> 分からないを、ひらめきに。  
> できないを、見える形に。

### 1.3 コンセプト

ユーザーが、声・文章・写真・手描きラフ・ジェスチャーを使って曖昧なアイデアを伝えると、AIが不足情報を質問しながら内容を具体化し、以下の成果物へ変換するWebアプリ。

- アイデア概要
- 課題と想定ユーザー
- コンセプト画像
- UIデザイン案
- キャラクター・背景案
- 必要機能
- 画面構成
- 技術構成
- クリック可能なWebプロトタイプ
- 要件定義書
- 開発用データ

本サービスは単なる画像生成ツールではなく、**言葉になっていない想像を、AIとの対話によって共有・編集・実装できる仕様へ変換する「アイデア具体化スタジオ」**とする。

---

## 2. 背景と解決する課題

多くのユーザーは、アイデアそのものがないのではなく、次のいずれかで止まっている。

- 頭の中の内容をうまく説明できない
- 絵やUIを描けない
- アイデアを整理できない
- 実現方法や必要技術が分からない
- コードを書けない
- 他者に企画を伝えられない
- 何を決めれば制作を始められるか分からない

IDEA VISIBLE？は、これらの「できない」を、質問・構造化・画像生成・プロトタイプ生成によって目に見える成果物へ変換する。

---

## 3. 目的

### 3.1 プロダクト目的

1. 曖昧なアイデアを、文章力やデザイン力に依存せず入力できるようにする
2. AIが不足情報を特定し、重要度の高い質問だけを行う
3. 入力内容を、画像・仕様・画面・動くプロトタイプへ変換する
4. 生成結果をユーザー自身が修正・再生成できるようにする
5. 最終成果を開発やプレゼンに利用できる形式で出力する

### 3.2 成功条件

- 初回利用者が説明を読まずに入力を開始できる
- 音声入力から最初の企画案まで一連の操作を完了できる
- 最低3件の追加質問によってアイデアが具体化される
- 結果画面に、文章・画像・触れる画面が同時に表示される
- 生成結果を部分ごとに修正・固定・再生成できる
- カメラまたはマイクが利用できない場合も代替手段で完了できる
- 途中でAPIエラーが発生しても、入力内容が失われない
- APIキーがない開発環境でもMockモードで動作確認できる

---

## 4. 対象ユーザー

### 4.1 メインターゲット

- アイデアはあるが開発経験がない人
- 絵やデザインが苦手な人
- ハッカソン参加者
- 個人開発者
- 学生
- 企画職・営業職
- 自分の構想をチームへ伝えたい人

### 4.2 利用シーン

- Webサービスの企画
- ゲーム案の具体化
- 商品・キャラクターのデザイン
- 世界観やストーリーの作成
- プレゼン用の企画ボード作成
- 開発前の要件整理
- ハッカソンの短時間プロトタイプ作成

---

## 5. スコープ

### 5.1 初期リリースで実装する範囲

- テキスト入力
- マイク録音
- 音声文字起こし
- カメラ静止画撮影
- 画像・手描きラフのアップロード
- 手のジェスチャー検出
- 入力内容のAI分析
- アイデア仕様のJSON構造化
- AIによる追加質問
- 回答による仕様更新
- コンセプト画像生成
- UIイメージ生成
- 制限付きコンポーネントによるプロトタイプ生成
- 結果編集
- ローカル保存
- Supabase保存
- Markdown・JSON・画像の出力
- Mockモード

### 5.2 初期リリースで対象外とする範囲

- 完全な商用サービスを自動完成させること
- 任意のAI生成コードを無制限に実行すること
- 表情から心理状態や人格を断定すること
- 動画全体を常時クラウドへ送信すること
- 生成物の著作権・商標・法的利用可否を保証すること
- 複雑なバックエンドや外部決済を含む完成アプリの自動デプロイ
- 複数人によるリアルタイム共同編集

---

## 6. ユーザー体験

### 6.1 基本フロー

```text
トップ画面
  ↓
作りたいものを選択
  ↓
カメラ・マイクの利用設定
  ↓
声・文章・画像・ジェスチャーでアイデア入力
  ↓
AIが内容を整理
  ↓
AIが不足情報を3〜5問質問
  ↓
ユーザーが音声・ボタン・ジェスチャーで回答
  ↓
アイデア仕様を確定
  ↓
文章・画像・UI・プロトタイプを生成
  ↓
結果を編集・再生成
  ↓
Markdown・JSON・画像・コード雛形として出力
```

### 6.2 作成カテゴリ

開始時に以下から選択する。

- Webアプリ
- ゲーム
- 商品・サービス
- キャラクター
- 世界観・ストーリー
- プレゼン企画
- まだ決まっていない

### 6.3 出力目的

- アイデアを整理したい
- 見た目を作りたい
- 動く画面を作りたい
- 要件定義書を作りたい
- 人へ説明する資料を作りたい
- すべて作りたい

---

## 7. 機能要件

## 7.1 プロジェクト管理

### FR-001 プロジェクト新規作成

ユーザーは新しいアイデアプロジェクトを作成できること。

保存項目:

- プロジェクト名
- 作成カテゴリ
- 出力目的
- 作成日時
- 更新日時
- 現在の工程
- 生成済み成果物
- 利用した入力データ

### FR-002 自動保存

入力・回答・生成結果は工程ごとに自動保存すること。

### FR-003 再開

ブラウザーを閉じた場合でも、保存済み工程から再開できること。

### FR-004 ローカルフォールバック

Supabaseへ接続できない場合は、LocalStorageまたはIndexedDBへ保存すること。

---

## 7.2 デバイス設定

### FR-010 カメラ・マイク事前確認

開始時に以下を確認すること。

- カメラ利用可否
- マイク利用可否
- 利用可能な入力デバイス
- 録音テスト
- カメラプレビュー
- 権限拒否時の代替操作

### FR-011 権限説明

権限要求の前に、利用目的を画面へ明示すること。

表示例:

- マイク: アイデアを自由に話すため
- カメラ: ラフ・物体・ジェスチャーを入力するため
- 映像は常時保存しない
- 送信対象をユーザーが確認できる

### FR-012 代替入力

カメラまたはマイクが利用できない場合、以下を提供すること。

- テキスト入力
- 画像ファイルアップロード
- ボタン選択
- マウス・タッチによるジェスチャー代替

---

## 7.3 アイデア入力スタジオ

### FR-020 音声録音

ユーザーはマイクボタンを押してアイデアを録音できること。

必要UI:

- 録音開始・停止
- 経過時間
- 音量波形
- 一時停止
- 録り直し
- 再生
- 送信前確認

### FR-021 音声文字起こし

録音音声をサーバーへ送信し、日本語を中心に文字起こしすること。

文字起こし結果はユーザーが編集できること。

### FR-022 音声特徴の補助利用

Web Audio APIで以下の単純な特徴量をローカル取得できること。

- 平均音量
- 発話時間
- 無音区間
- 強調された区間

心理状態や人格の推定には利用しないこと。

### FR-023 テキスト入力

音声と併用できる自由記述欄を提供すること。

### FR-024 入力履歴

複数回の録音・テキスト追加を時系列で保持すること。

---

## 7.4 カメラ・画像入力

### FR-030 カメラプレビュー

ユーザーのカメラ映像をリアルタイム表示すること。

### FR-031 静止画撮影

ユーザー操作時のみ映像から静止画を取得すること。

撮影対象例:

- 紙に描いたラフ
- 身近な物体
- 部屋・風景
- 手で示した形
- 表情
- レイアウトの指差し

### FR-032 画像アップロード

PNG、JPEG、WebP形式の画像をアップロードできること。

### FR-033 撮影画像の確認

AIへ送信する前に以下を行えること。

- プレビュー
- トリミング
- 回転
- 削除
- 再撮影
- 画像の説明追加

### FR-034 画像の利用目的指定

画像ごとに意味を指定できること。

- この形を参考にする
- この色を参考にする
- この雰囲気を参考にする
- この配置を参考にする
- この物体を別のデザインへ変換する
- 手描きラフとして解釈する

---

## 7.5 ジェスチャー入力

### FR-040 手の検出

MediaPipe Hand LandmarkerまたはGesture Recognizerを利用し、ブラウザー上で手の位置・向き・ジェスチャーを検出すること。

### FR-041 初期対応ジェスチャー

初期リリースでは以下に限定する。

| ジェスチャー | 操作 |
|---|---|
| 親指を立てる | 決定・次へ |
| 手を左右へ動かす | 候補の切り替え |
| 両手を広げる | 大きい・広いイメージ |
| 両手を近づける | 小さい・狭いイメージ |
| 指差し | 画面上の対象選択 |
| 手のひらを見せる | 停止・キャンセル |

### FR-042 誤検出対策

ジェスチャーは以下を満たした場合のみ確定する。

- 一定時間以上同じ状態
- 信頼度が閾値以上
- 画面上に検出結果を表示
- ユーザーがキャンセル可能

### FR-043 ジェスチャー無効化

設定から完全に無効化できること。

---

## 7.6 AIによる入力分析

### FR-050 入力統合

以下の入力を一つの分析単位へ統合すること。

- 文字起こし
- 手入力テキスト
- 画像
- 画像の利用目的
- ジェスチャー情報
- ユーザーが選択したカテゴリ
- ユーザーが選択した出力目的

### FR-051 構造化

AIは入力を自由文だけで返さず、定義されたJSON Schemaに従って構造化すること。

### FR-052 確定・推定・不明の分離

生成仕様では各情報を以下へ分けること。

- `confirmed`: ユーザーが明示した内容
- `inferred`: AIが推定した内容
- `unknown`: 未確定の内容
- `conflicts`: 入力間で矛盾している内容

### FR-053 入力根拠の保持

生成した各項目について、どの入力を根拠にしたか追跡できること。

### FR-054 勝手な確定の禁止

AIが推定した内容を、ユーザーが決定した内容として扱わないこと。

---

## 7.7 追加質問

### FR-060 質問生成

AIは、成果物への影響が大きい不明点から3〜5問を生成すること。

優先順位:

1. 誰のためのものか
2. 何を解決するか
3. 何をすると楽しい・便利か
4. どのような見た目か
5. どの端末で利用するか
6. 必須機能は何か
7. 実現範囲はどこまでか

### FR-061 質問形式

質問ごとに適切な回答形式を選択すること。

- 選択肢
- 自由記述
- 音声回答
- 画像選択
- 5段階スライダー
- ジェスチャー
- 分からない
- AIへ任せる

### FR-062 質問理由

「なぜこの質問が必要か」を短く表示すること。

### FR-063 追加質問ラウンド

回答後も重要な不明点が残る場合、最大2回まで追加質問を行えること。

### FR-064 質問スキップ

ユーザーは質問をスキップできること。スキップした項目は推定として明示すること。

---

## 7.8 アイデア仕様生成

### FR-070 IdeaSpec生成

最終的に以下を含むIdeaSpecを生成すること。

- タイトル候補
- 一行説明
- 解決する課題
- 想定ユーザー
- 利用シーン
- コンセプト
- コア体験
- 主要機能
- 操作方法
- 世界観
- ビジュアル方向性
- 色・光・質感
- 必須要素
- 追加候補
- 技術要件
- 制約
- 未確定事項
- AIの推定事項

### FR-071 複数案

タイトル・デザイン方向・主要体験について、最大3案を比較表示できること。

### FR-072 要素固定

ユーザーは気に入った項目をロックし、再生成時に変更されないようにできること。

### FR-073 部分再生成

以下を個別に再生成できること。

- タイトル
- コンセプト
- 文章
- 画像
- UI
- プロトタイプ
- 技術構成

---

## 7.9 画像生成

### FR-080 コンセプト画像

IdeaSpecから、企画全体を表す1枚のコンセプト画像を生成すること。

### FR-081 UIイメージ

Webアプリまたはゲームの場合、画面イメージを生成すること。

### FR-082 追加画像

カテゴリに応じて以下を生成できること。

- キャラクター
- 背景
- アイテム
- ロゴ
- 配色ボード
- ストーリーボード
- 商品外観

### FR-083 プロンプト表示

画像生成に利用したプロンプトをユーザーが確認・修正できること。

### FR-084 再生成

構図・雰囲気・色・対象を部分指定して再生成できること。

### FR-085 生成失敗時フォールバック

画像生成に失敗した場合は、以下を提供すること。

- 再試行
- 別プロンプト生成
- CSSとSVGによる簡易ビジュアル
- 画像なしで他工程を継続

---

## 7.10 プロトタイプ生成

### FR-090 PrototypeSpec生成

AIは任意コードではなく、許可されたUI部品のみを使用する`PrototypeSpec`を生成すること。

### FR-091 コンポーネントレジストリ

初期対応部品:

- Header
- Hero
- Section
- Card
- Button
- TextInput
- TextArea
- Select
- Slider
- Tabs
- Modal
- Gallery
- Timeline
- Progress
- CameraPreview
- AudioRecorder
- Waveform
- ResultPanel
- ImagePanel
- CanvasStage
- Navigation
- Footer

### FR-092 画面遷移

以下のアクションをJSONで定義できること。

- ページ移動
- モーダル表示
- 入力値更新
- 表示・非表示
- スコア加算
- モック結果表示
- 音声再生
- アニメーション開始

### FR-093 安全なプレビュー

生成仕様はアプリ側のレンダラーで表示し、AIが生成した任意JavaScriptを直接実行しないこと。

### FR-094 レスポンシブ

デスクトップ・タブレット・スマートフォンでプレビューを切り替えられること。

### FR-095 コード雛形出力

PrototypeSpecから、テンプレートベースのReactコンポーネントを出力できること。

### FR-096 高度なコード生成

将来機能として、生成コードを隔離環境で検証し、TypeScript・ESLint・テストを通過した場合のみプレビューする。

---

## 7.11 結果ワークスペース

### FR-100 結果表示

以下を同一ワークスペースで確認できること。

- 企画概要
- 画像
- UI案
- プロトタイプ
- 要件
- 技術構成
- 元入力
- AIの推定
- 未確定事項

### FR-101 編集

各文章項目を直接編集できること。

### FR-102 バージョン履歴

生成・編集ごとにバージョンを保存し、以前の状態へ戻せること。

### FR-103 比較

画像・仕様・プロトタイプの新旧を横並びで比較できること。

### FR-104 進捗表示

生成中の工程を以下のように表示すること。

```text
入力を整理中
→ 不明点を確認中
→ 企画を構造化中
→ ビジュアルを生成中
→ プロトタイプを組み立て中
→ 最終確認中
```

---

## 7.12 出力・共有

### FR-110 Markdown出力

以下を含む`main.md`を出力すること。

- 概要
- 課題
- ターゲット
- 機能要件
- 非機能要件
- 画面一覧
- 技術構成
- データ構造
- API
- 開発タスク
- 画像一覧

### FR-111 JSON出力

以下をJSONとして出力すること。

- IdeaSpec
- PrototypeSpec
- 質問と回答
- 生成メタデータ

### FR-112 画像出力

生成画像を個別またはZIPで保存できること。

### FR-113 企画ボード

企画概要・主要画像・キャッチコピーを1枚のPNGとして出力できること。

### FR-114 共有リンク

ログインユーザーは閲覧専用URLを発行できること。

### FR-115 公開範囲

共有リンクは以下から選択できること。

- 非公開
- URLを知っている人のみ
- 公開

---

## 8. AI処理パイプライン

## 8.1 全体フロー

```text
Input Capture
  ↓
Preprocess
  ↓
Transcription
  ↓
Multimodal Analysis
  ↓
Draft IdeaSpec
  ↓
Uncertainty Scoring
  ↓
Clarification Questions
  ↓
Final IdeaSpec
  ↓
Asset Prompt Generation
  ↓
Image Generation
  ↓
PrototypeSpec Generation
  ↓
Schema Validation
  ↓
Prototype Rendering
  ↓
Quality Check
  ↓
Export
```

## 8.2 前処理

### 音声

- MediaRecorderで録音
- 対応MIMEタイプを実行時判定
- 録音時間とサイズを制限
- サーバーへBlob送信
- 文字起こし後、原音は原則削除

### 画像

- Canvasで再エンコード
- 長辺を適切なサイズへ縮小
- 不要なメタデータを除去
- MIMEタイプとファイルサイズを検証
- ユーザーの説明文を紐付け

### ジェスチャー

- ブラウザー内で検出
- 生映像ではなく、確定したジェスチャー名・座標・時間のみ利用
- 必要な静止画だけユーザー確認後に送信

---

## 8.3 構造化出力

AI出力はZodとJSON Schemaで検証する。

```ts
type Certainty = "confirmed" | "inferred" | "unknown";

type IdeaField<T> = {
  value: T;
  certainty: Certainty;
  sourceIds: string[];
  confidence: number;
};

type IdeaSpec = {
  version: "1.0";
  category: IdeaField<
    "web_app" | "game" | "product" | "character" | "world" | "presentation" | "unknown"
  >;
  titleCandidates: string[];
  oneLine: IdeaField<string>;
  problem: IdeaField<string>;
  targetUsers: IdeaField<string[]>;
  usageScenes: IdeaField<string[]>;
  concept: IdeaField<string>;
  coreExperience: IdeaField<string>;
  features: IdeaField<string[]>;
  interactions: IdeaField<string[]>;
  visualDirection: {
    mood: IdeaField<string[]>;
    colors: IdeaField<string[]>;
    lighting: IdeaField<string>;
    texture: IdeaField<string>;
    references: string[];
  };
  technicalRequirements: string[];
  constraints: string[];
  assumptions: string[];
  unknowns: string[];
  conflicts: string[];
};
```

### 検証ルール

- Schema不一致時は一度自動修復
- 自動修復後も不正な場合はエラーとして扱う
- 欠落項目を空文字で埋めない
- 不明な情報は`unknown`として返す
- 推定内容には必ず`inferred`を付ける
- ユーザー入力にない固有名詞を勝手に確定しない

---

## 8.4 質問選定ロジック

質問候補へ以下のスコアを付け、上位3〜5問を採用する。

```text
質問重要度 =
  成果物への影響度
  × 不確実性
  × ユーザーが答えやすい度合い
  - 重複度
  - 既回答度
```

質問は同じ内容を言い換えて繰り返さない。

---

## 8.5 プロンプト方針

### システムプロンプトの原則

- ユーザーの意図を勝手に変更しない
- 事実と推定を分離する
- 不明点は質問へ変換する
- 実装不可能な案は、意図を残した実現可能案へ変換する
- 見た目だけでなく、利用体験を定義する
- AI生成にありがちな汎用ダッシュボードを避ける
- テーマ・対象・世界観からUIルールを作る
- JSON Schema以外の文字列を返さない工程を分ける

### プロンプト分割

一回の巨大な指示で全成果物を生成せず、以下に分離する。

1. 入力分析
2. 質問生成
3. IdeaSpec確定
4. ビジュアルプロンプト生成
5. PrototypeSpec生成
6. 品質レビュー

---

## 8.6 品質レビュー

最終生成後に別工程で以下を検査する。

- 元入力と矛盾していないか
- 必須要素が欠けていないか
- 推定を確定扱いしていないか
- 画面操作が成立しているか
- PrototypeSpecが許可部品のみ使用しているか
- モバイルで破綻しないか
- 画像と文章の世界観が一致しているか
- 出力に個人情報が残っていないか

---

## 9. プロトタイプ生成方式

## 9.1 採用方式

初期リリースでは、**Schema-driven UI**を採用する。

AIはReactコードを直接返すのではなく、以下のようなJSONを返す。

```json
{
  "version": "1.0",
  "theme": {
    "style": "dark-cinematic",
    "radius": "medium",
    "density": "comfortable"
  },
  "pages": [
    {
      "id": "home",
      "title": "Echoes of the Night",
      "components": [
        {
          "type": "Hero",
          "props": {
            "title": "声が、道を照らす。",
            "description": "音を出すほど敵に近づかれる探索ゲーム"
          }
        },
        {
          "type": "Button",
          "props": {
            "label": "探索を開始"
          },
          "action": {
            "type": "navigate",
            "target": "play"
          }
        }
      ]
    }
  ]
}
```

## 9.2 採用理由

- AI生成コードによる危険な処理を防げる
- JSON Schemaで妥当性検証できる
- UI崩れを抑えられる
- 生成結果を安定して再現できる
- スマートフォン表示を統一できる
- コード書き出しへ変換しやすい
- Mockデータだけでも動く体験を作れる

## 9.3 レンダラー

`PrototypeRenderer`は以下を行う。

1. PrototypeSpecをZodで検証
2. 許可されたコンポーネント名か確認
3. propsをコンポーネント別Schemaで検証
4. ActionをAction Runnerへ登録
5. アセットIDを実URLへ解決
6. プレビューを表示
7. エラー箇所のみフォールバック表示

---

## 10. システム構成

```text
┌────────────────────────────────────┐
│ Browser                            │
│                                    │
│ Next.js Client UI                  │
│ ├─ MediaRecorder                   │
│ ├─ getUserMedia                    │
│ ├─ Web Audio API                   │
│ ├─ MediaPipe Vision Tasks          │
│ ├─ Zustand                         │
│ └─ Prototype Renderer              │
└────────────────┬───────────────────┘
                 │ HTTPS
┌────────────────▼───────────────────┐
│ Next.js Route Handlers             │
│ ├─ Authentication check            │
│ ├─ Input validation                │
│ ├─ Rate limiting                   │
│ ├─ OpenAI API calls                │
│ ├─ Export generation               │
│ └─ Server-side secrets             │
└───────────┬────────────────┬───────┘
            │                │
┌───────────▼────────┐ ┌─────▼─────────────┐
│ OpenAI API         │ │ Supabase          │
│ ├─ Transcription   │ │ ├─ Auth           │
│ ├─ Responses       │ │ ├─ Postgres       │
│ ├─ Vision input    │ │ └─ Storage        │
│ └─ Image generation│ └───────────────────┘
└────────────────────┘
```

---

## 11. 技術スタック

### 11.1 フロントエンド

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Radix UIまたは必要最小限の独自UI部品
- Zustand
- React Hook Form
- Zod
- Framer Motion
- Lucide Icons

### 11.2 メディア入力

- `navigator.mediaDevices.getUserMedia`
- MediaRecorder API
- Web Audio API
- Canvas API
- MediaPipe Tasks Vision
  - Hand Landmarker
  - Gesture Recognizer
  - Face Landmarkerは必要最小限で利用

### 11.3 AI

- OpenAI Node SDK
- Responses API
- Structured Outputs
- 画像入力対応モデル
- 音声文字起こしAPI
- 画像生成API

モデル名はコードへ固定せず、環境変数で切り替えられるようにする。

### 11.4 バックエンド

- Next.js Route Handlers
- Supabase
  - Auth
  - Postgres
  - Storage
  - Row Level Security

### 11.5 テスト

- Vitest
- React Testing Library
- Playwright
- MSWまたは独自Mock Handler

### 11.6 デプロイ

- Vercel
- Supabase
- GitHub Actions

---

## 12. データモデル

## 12.1 projects

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | プロジェクトID |
| user_id | uuid | 所有者 |
| title | text | プロジェクト名 |
| category | text | 作成カテゴリ |
| status | text | 現在工程 |
| current_version_id | uuid | 最新バージョン |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |

## 12.2 project_versions

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | バージョンID |
| project_id | uuid | プロジェクトID |
| version_number | integer | 連番 |
| idea_spec | jsonb | IdeaSpec |
| prototype_spec | jsonb | PrototypeSpec |
| created_at | timestamptz | 作成日時 |

## 12.3 input_sources

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | 入力ID |
| project_id | uuid | プロジェクトID |
| type | text | text/audio/image/gesture |
| text_content | text | テキスト内容 |
| storage_path | text | 保存ファイル |
| metadata | jsonb | 時間・サイズ・目的など |
| consented_to_store | boolean | 保存同意 |
| created_at | timestamptz | 作成日時 |

## 12.4 clarification_answers

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | 回答ID |
| project_id | uuid | プロジェクトID |
| question_id | text | 質問ID |
| question | text | 質問文 |
| answer | jsonb | 回答 |
| input_mode | text | voice/text/select/gesture |
| created_at | timestamptz | 回答日時 |

## 12.5 artifacts

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | 成果物ID |
| project_id | uuid | プロジェクトID |
| version_id | uuid | バージョンID |
| type | text | image/markdown/json/code/board |
| storage_path | text | 保存場所 |
| prompt | text | 利用プロンプト |
| metadata | jsonb | サイズ・モデル等 |
| created_at | timestamptz | 作成日時 |

## 12.6 generation_runs

| カラム | 型 | 内容 |
|---|---|---|
| id | uuid | 実行ID |
| project_id | uuid | プロジェクトID |
| step | text | analyze/questions/image/prototype/review |
| status | text | pending/running/succeeded/failed |
| request_hash | text | 重複防止 |
| error_code | text | エラー種別 |
| error_message | text | エラー概要 |
| model | text | 利用モデル |
| usage | jsonb | トークン・画像数等 |
| started_at | timestamptz | 開始日時 |
| finished_at | timestamptz | 完了日時 |

---

## 13. API設計

## 13.1 `POST /api/transcribe`

音声ファイルを受け取り、文字起こしを返す。

入力:

- audio file
- language
- projectId

出力:

```json
{
  "transcript": "夜の海を歩くゲームを作りたい",
  "durationMs": 8200,
  "sourceId": "uuid"
}
```

## 13.2 `POST /api/analyze`

テキスト・画像・入力メタデータを受け取り、Draft IdeaSpecを返す。

## 13.3 `POST /api/questions`

Draft IdeaSpecから追加質問を返す。

## 13.4 `POST /api/refine`

質問回答を反映し、Final IdeaSpecを返す。

## 13.5 `POST /api/images`

IdeaSpecと画像種別から生成画像を返す。

## 13.6 `POST /api/prototype`

IdeaSpecとアセットIDからPrototypeSpecを返す。

## 13.7 `POST /api/review`

IdeaSpec・PrototypeSpec・元入力の整合性を検査する。

## 13.8 `POST /api/export`

指定形式の成果物を生成する。

対応形式:

- markdown
- json
- png
- zip

## 13.9 `GET /api/projects/:id`

プロジェクトと最新バージョンを取得する。

## 13.10 `PATCH /api/projects/:id`

編集内容を保存する。

---

## 14. ディレクトリ構成

```text
src/
├─ app/
│  ├─ page.tsx
│  ├─ studio/
│  │  └─ [projectId]/
│  │     └─ page.tsx
│  ├─ result/
│  │  └─ [projectId]/
│  │     └─ page.tsx
│  └─ api/
│     ├─ transcribe/route.ts
│     ├─ analyze/route.ts
│     ├─ questions/route.ts
│     ├─ refine/route.ts
│     ├─ images/route.ts
│     ├─ prototype/route.ts
│     ├─ review/route.ts
│     └─ export/route.ts
├─ components/
│  ├─ media/
│  │  ├─ AudioRecorder.tsx
│  │  ├─ CameraCapture.tsx
│  │  ├─ Waveform.tsx
│  │  └─ GestureController.tsx
│  ├─ studio/
│  ├─ results/
│  └─ prototype/
│     ├─ PrototypeRenderer.tsx
│     ├─ componentRegistry.ts
│     ├─ actionRunner.ts
│     └─ components/
├─ features/
│  ├─ projects/
│  ├─ capture/
│  ├─ clarification/
│  ├─ generation/
│  └─ export/
├─ lib/
│  ├─ ai/
│  │  ├─ client.ts
│  │  ├─ prompts/
│  │  ├─ schemas/
│  │  └─ pipelines/
│  ├─ media/
│  ├─ mediapipe/
│  ├─ supabase/
│  ├─ validation/
│  └─ security/
├─ stores/
│  └─ studioStore.ts
├─ types/
└─ tests/
```

---

## 15. UI・デザイン要件

## 15.1 デザインコンセプト

AIチャット画面ではなく、**アイデアを組み立てる作業台・スタジオ**として設計する。

避けるもの:

- 紫と青のグラデーション中心のAI風デザイン
- すべてが同じ角丸カード
- チャットだけで全操作を行う構成
- 情報量の多い管理画面
- 不要な発光エフェクト
- どのサービスにも見える汎用UI

採用するもの:

- 紙・付箋・ラフ・キャンバスを連想する構成
- オフホワイトと墨色を基本とする
- アクセント色はプロジェクトの世界観から生成する
- 入力した断片がキャンバスへ集まる演出
- 「？」が質問へ変わり、最終的に「！」へ変わる進行演出
- 生成結果を編集できるワークベンチ型レイアウト

## 15.2 主要画面

### 画面1: トップ

- キャッチコピー
- 作成開始
- サンプルを見る
- 以前のプロジェクト
- カメラ・マイクを使う理由

### 画面2: セットアップ

- 作成カテゴリ
- 出力目的
- カメラ確認
- マイク確認
- プライバシー設定
- 代替入力の案内

### 画面3: アイデア入力スタジオ

三領域構成:

1. カメラ・マイク
2. 入力の断片一覧
3. AIが整理した仮説

### 画面4: 質問

- 1画面1問
- 質問理由
- 音声・選択・ジェスチャー
- 残り質問数
- 分からない
- AIへ任せる

### 画面5: 生成

- 工程表示
- 完成した成果物から順次表示
- 失敗工程だけ再試行
- 入力を失わず中断可能

### 画面6: 結果ワークスペース

左:

- 企画
- 要件
- 技術
- 未確定事項

中央:

- コンセプト画像
- UI画像
- プロトタイプ

右:

- 編集
- 再生成
- ロック
- 履歴
- 出力

---

## 16. 非機能要件

### NFR-001 対応端末

- PC
- タブレット
- スマートフォン

### NFR-002 対応ブラウザー

- 最新安定版Chrome
- 最新安定版Edge
- 最新安定版Safari
- iOS Safari

ブラウザー差異がある機能には代替手段を用意する。

### NFR-003 レスポンシブ

横幅320px以上で主要機能を利用できること。

### NFR-004 操作継続性

生成待機中・API失敗時・画面再読み込み時に入力済みデータを失わないこと。

### NFR-005 アクセシビリティ

- キーボード操作
- フォーカス表示
- ラベル
- 色以外による状態表示
- 音声入力の文字表示
- カメラ・マイクなしでの完了
- WCAG 2.2 AAを目標

### NFR-006 ファイル制限

- 画像: 1ファイル10MB以下
- 音声: 1回5分以下
- 対応形式は実行環境で検証
- 上限超過時は送信前に警告

### NFR-007 API耐障害性

- タイムアウト
- 429
- 5xx
- 空出力
- Schema不正
- 画像生成拒否

上記を個別に扱い、再試行またはフォールバックを提供する。

### NFR-008 ログ

個人情報や原音をログへ出力しないこと。

### NFR-009 コスト制御

- プロジェクトごとの生成回数制限
- 画像枚数上限
- モデル切り替え
- 使用量記録
- 二重送信防止

---

## 17. セキュリティ・プライバシー

### 17.1 APIキー

- OpenAI APIキーはサーバー側のみで保持
- クライアントへ公開しない
- Supabase Service Role Keyもサーバー側のみで保持

### 17.2 カメラ・マイク

- 明示操作なしで録音・撮影を開始しない
- 撮影中・録音中を常時表示
- 停止時にMediaStream Trackを終了
- 生映像を標準では保存しない
- 送信前にユーザー確認を行う

### 17.3 データ保存

初期設定:

- 文字起こし: 保存
- IdeaSpec: 保存
- 生成画像: 保存
- 原音: 保存しない
- カメラ動画: 保存しない
- 選択した静止画: 保存確認を行う

### 17.4 Supabase RLS

- 全ユーザーデータにRLSを有効化
- 原則として`user_id = auth.uid()`のみ許可
- 公開リンクは専用の公開用ビューまたはトークンで制御
- クライアントからService Roleを利用しない

### 17.5 生成コンテンツ

- 出力文字列をHTMLとして直接挿入しない
- 任意スクリプトを実行しない
- iframeを利用する場合はsandbox属性を設定
- URLスキームを検証
- PrototypeSpecのコンポーネントとActionを許可リスト方式にする

### 17.6 削除

ユーザーは以下を削除できること。

- 個別入力
- 原画像
- 生成画像
- プロジェクト
- アカウント関連データ

---

## 18. エラー・フォールバック設計

| 状況 | 対応 |
|---|---|
| マイク権限拒否 | テキスト入力へ切り替え |
| カメラ権限拒否 | 画像アップロードまたはスキップ |
| SpeechRecognition非対応 | MediaRecorderとサーバー文字起こしを利用 |
| MediaPipe初期化失敗 | ジェスチャーボタンへ切り替え |
| 音声文字起こし失敗 | 再送、手入力、音声再録音 |
| AI分析失敗 | Mock結果、再試行、入力保持 |
| Schema不正 | 自動修復1回、失敗時は再生成 |
| 画像生成失敗 | 再試行、SVG/CSS代替 |
| プロトタイプ不正 | 問題部品だけFallbackComponent表示 |
| Supabase障害 | LocalStorageへ保存 |
| 429 | 待機案内、段階的再試行 |
| 5xx | 再試行、別工程の継続 |
| ネットワーク切断 | オフライン状態表示、再接続後に再送 |

---

## 19. Mockモード

APIキーやSupabaseがない状態でも、デモを完了できること。

### Mock対象

- 文字起こし
- AI分析
- 質問
- IdeaSpec
- 画像
- PrototypeSpec
- 保存

### Mockモード要件

- 画面上にMock利用中であることを小さく表示
- 本番と同じ型のデータを返す
- エラーケースを切り替えられる
- 固定サンプルを最低3種類用意する
- 本番処理とUIロジックを分離する

---

## 20. テスト要件

## 20.1 単体テスト

- IdeaSpec Schema
- PrototypeSpec Schema
- 質問優先度計算
- Action Runner
- ファイル検証
- エラー変換
- LocalStorage保存
- プロンプト組み立て

## 20.2 コンポーネントテスト

- AudioRecorder
- CameraCapture
- QuestionCard
- ResultEditor
- PrototypeRenderer
- ExportDialog

## 20.3 API統合テスト

- 正常なAI応答
- Schema不正応答
- 空応答
- 429
- 500
- タイムアウト
- 不正ファイル
- 未認証アクセス

## 20.4 E2Eテスト

### E2E-001 テキストのみ

1. 新規作成
2. テキスト入力
3. 質問回答
4. 企画生成
5. プロトタイプ表示
6. Markdown出力

### E2E-002 音声利用

1. マイク許可
2. 録音
3. 文字起こし
4. 編集
5. AI分析

### E2E-003 権限拒否

1. カメラ・マイク拒否
2. テキスト・アップロードへ切り替え
3. 最後まで完了

### E2E-004 API失敗

1. 画像生成を失敗させる
2. 他成果物が保持される
3. 画像だけ再試行する

### E2E-005 再開

1. 質問回答途中で再読み込み
2. 同じ工程から復元

---

## 21. 受入基準

### AC-001

ユーザーが音声またはテキストで曖昧なアイデアを入力できる。

### AC-002

入力後、AIが3件以上の具体化質問を生成する。

### AC-003

質問への回答によってIdeaSpecが更新される。

### AC-004

IdeaSpecには確定・推定・不明が区別されている。

### AC-005

コンセプト画像を1枚以上生成または代替表示できる。

### AC-006

PrototypeSpecから操作可能な単一画面以上を表示できる。

### AC-007

PrototypeSpecが不正でもアプリ全体が停止しない。

### AC-008

生成結果の一部をロックして再生成できる。

### AC-009

MarkdownとJSONを出力できる。

### AC-010

カメラとマイクを拒否しても全工程を完了できる。

### AC-011

再読み込み後に進行状態を復元できる。

### AC-012

APIキーをクライアントへ露出しない。

### AC-013

ユーザーが許可しない限り、原音や連続映像を永続保存しない。

---

## 22. 実装フェーズ

## Phase 0: 基盤

- Next.jsプロジェクト作成
- TypeScript・Lint・Format
- Tailwind導入
- 共通レイアウト
- 環境変数検証
- Mock Provider
- Supabaseクライアント
- CI

完了条件:

- ローカル起動
- Vercelプレビュー
- Mockでトップから結果画面まで遷移

## Phase 1: 入力スタジオ

- テキスト入力
- MediaRecorder
- 波形
- CameraCapture
- 画像アップロード
- IndexedDBまたはLocalStorage保存
- 権限拒否UI

完了条件:

- 音声・画像・文章を一つのプロジェクトへ追加可能

## Phase 2: AI分析

- 文字起こしAPI
- 画像分析
- IdeaSpec Schema
- Structured Output
- 入力根拠
- 推定・不明分離
- 自動修復

完了条件:

- 入力から妥当なDraft IdeaSpecが返る

## Phase 3: 質問

- 質問Schema
- QuestionCard
- 回答保存
- 音声回答
- 質問優先度
- Final IdeaSpec

完了条件:

- 3〜5問の回答で仕様が更新される

## Phase 4: 画像生成

- 画像プロンプト生成
- コンセプト画像
- UI画像
- 再生成
- Storage保存
- CSS/SVGフォールバック

完了条件:

- 結果画面へ最低1画像を表示

## Phase 5: プロトタイプ

- PrototypeSpec Schema
- componentRegistry
- PrototypeRenderer
- actionRunner
- レスポンシブプレビュー
- 不正部品Fallback
- テンプレートコード出力

完了条件:

- AI生成JSONから操作可能な画面を表示

## Phase 6: 結果・出力

- 結果ワークスペース
- 直接編集
- ロック
- 部分再生成
- バージョン履歴
- Markdown生成
- JSON生成
- PNG企画ボード
- ZIP出力

## Phase 7: 本番品質

- Supabase Auth
- RLS
- Rate Limit
- 使用量計測
- E2E
- アクセシビリティ
- エラーログ
- データ削除
- プライバシーポリシー

---

## 23. ハッカソン用MVP

短時間で見せる場合でも、以下は実装する。

### 必須

- マイク録音
- 音声文字起こし
- カメラ静止画またはラフ画像
- AIによる入力整理
- 3問の追加質問
- IdeaSpec生成
- コンセプト画像1枚
- Schema-drivenプロトタイプ1画面
- 結果ボード
- LocalStorage
- Mockモード

### 削る項目

- ログイン
- 複数ページ
- 共有リンク
- 高度なジェスチャー
- 複数画像生成
- ZIPコード出力
- 詳細なバージョン比較

### デモシナリオ

1. 紙に描いた簡単なラフをカメラで撮る
2. 「夜の海を歩いて、声を出すと道が見えるゲーム」と話す
3. AIが3問質問する
4. 音声または選択肢で回答する
5. タイトル・企画・画像が生成される
6. 生成されたゲーム開始画面を実際にクリックする
7. 最初の曖昧な入力と完成後を並べて表示する
8. 画面中央の「？」が「！」へ変化する

---

## 24. 環境変数

```env
OPENAI_API_KEY=
OPENAI_TEXT_MODEL=
OPENAI_VISION_MODEL=
OPENAI_TRANSCRIBE_MODEL=
OPENAI_IMAGE_MODEL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_ENABLE_MEDIAPIPE=true

MAX_AUDIO_SECONDS=300
MAX_IMAGE_SIZE_MB=10
MAX_IMAGES_PER_PROJECT=8
MAX_GENERATIONS_PER_PROJECT=20
```

注意:

- `OPENAI_API_KEY`はサーバー専用
- `SUPABASE_SERVICE_ROLE_KEY`はサーバー専用
- `NEXT_PUBLIC_`を付けた値へ秘密情報を入れない

---

## 25. 開発ルール

- AI出力は必ずSchema検証する
- API呼び出しはRoute Handler経由にする
- モデル名は環境変数化する
- 画像・音声の送信前にサイズとMIMEを検証する
- 生成工程を一つの巨大APIへまとめない
- 各工程を再実行可能にする
- 入力と生成結果を工程ごとに保存する
- 原音・映像を標準では永続保存しない
- 任意JavaScriptを直接実行しない
- Mockと本番で同一の型を利用する
- UIはテーマに基づいて生成し、汎用AIダッシュボードにしない
- PCだけでなくスマートフォン実機で確認する

---

## 26. Definition of Done

以下をすべて満たした場合、初期リリース完了とする。

- [ ] テキスト・音声・画像を入力できる
- [ ] カメラとマイクの許可・拒否を処理できる
- [ ] 文字起こし結果を編集できる
- [ ] Draft IdeaSpecを生成できる
- [ ] 確定・推定・不明を区別できる
- [ ] 3〜5件の質問を生成できる
- [ ] 回答からFinal IdeaSpecを生成できる
- [ ] コンセプト画像を生成できる
- [ ] PrototypeSpecを生成・検証できる
- [ ] PrototypeRendererで操作可能な画面を表示できる
- [ ] 個別再生成とロックができる
- [ ] Markdown・JSONを出力できる
- [ ] LocalStorageフォールバックが動く
- [ ] Supabase RLSが設定されている
- [ ] Mockモードで一連のデモが完了する
- [ ] 主要E2Eテストが成功する
- [ ] APIキーがクライアントへ含まれていない
- [ ] 原音と連続映像が無断保存されない
- [ ] Vercel本番環境でスマートフォンから利用できる

---

## 27. 将来拡張

- 複数AIによる案の比較
- 画像上への音声指示による部分修正
- ホワイトボード入力
- 3Dモデル生成
- WebXRプレビュー
- 複数人共同編集
- GitHubリポジトリ出力
- Codex・Claude Codeへの実装指示書出力
- Vercelへの自動デプロイ
- プレゼンスライド生成
- ユーザーの過去作品から好みを学習
- 音声会話による継続的な企画レビュー
- 完成後のユーザーテスト質問生成
- 開発工数・API費用・実現難易度の推定

---

## 28. 最終的なプロダクト定義

> IDEA VISIBLE？は、ユーザーの曖昧な発話・文章・画像・ジェスチャーを受け取り、AIが重要な「？」を問い返しながら、アイデアを文章・画像・設計・操作可能なWebプロトタイプへ変換するサービスである。  
>  
> 目標は、AIにすべてを任せることではない。ユーザー自身もまだ説明できない想像を、質問によって発見し、編集可能な形へ変えることである。  
>  
> 「できない」は、能力がない状態ではなく、まだ形にする手段がない状態である。本サービスは、その手段を提供する。
