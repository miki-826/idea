# Deployment Handoff

## GitHub

- Repository URL: https://github.com/miki-826/idea.git
- Rule: URLが `main.md`、`git remote get-url origin`、`gh repo view --json url` のいずれでも確認できない場合は、推測せずユーザーへ質問する。
- Do not run `gh repo create` automatically unless the user explicitly asks for new repository creation.

## Vercel

1. Import the confirmed GitHub repository in Vercel.
2. Set environment variables:
   - `AI_PROVIDER=openai`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` if overriding the default
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL` if overriding the default
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy after changing environment variables.

## Supabase

1. Create a project.
2. Run `supabase.sql` in the SQL Editor.
3. Copy Project URL and anon public key only.
4. Never expose a `service_role` key in client or repository files.

## Local Check Before Push

- `npm run lint`
- `npm run build`
- `node C:\Users\micke\.codex\skills\hackathon-build\scripts\validate-ui-assets.mjs C:\Users\micke\OneDrive\Desktop\claude専用ファイル\Idea`
