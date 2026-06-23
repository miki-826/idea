# IDEA VISIBLE?

声、メモ、画像、ジェスチャーから、曖昧なアイデアを発表可能な仕様・UI案・ミニプロトタイプへ変換するハッカソンMVPです。

## Local Development

```bash
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Environment Variables

Copy `.env.example` to `.env.local` when using live services.

```bash
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

No environment variables are required for Mock Mode. Gemini and Supabase failures fall back to local Mock/LocalStorage behavior.

## Deploy

- GitHub repository: https://github.com/miki-826/idea.git
- Vercel: import the GitHub repository, set env vars, then redeploy after changes.
- Supabase: run `supabase.sql` in SQL Editor and use only the anon public key in client env.

## Checks

```bash
npm run lint
npm run build
```
