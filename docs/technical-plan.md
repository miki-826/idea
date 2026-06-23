# Technical Plan

| Role | Files | Done |
|---|---|---|
| technology-researcher | `docs/technology-research.md`, `docs/api-permissions.md` | Official sources recorded, OpenAI/Gemini provider routing and fallback defined |
| frontend-engineer | `app/page.tsx`, `app/globals.css`, `app/layout.tsx` | Single-screen 45s flow implemented |
| ai-engineer | `app/api/ai/analyze/route.ts`, `lib/ai/openai.ts`, `lib/ai/gemini.ts`, `lib/mock.ts` | Server-only OpenAI/Gemini adapters and Mock fallback |
| vision-engineer | `app/page.tsx` | Camera preview, capture action, permission fallback |
| audio-engineer | `app/page.tsx` | MediaRecorder flow, stop handling, permission fallback |
| backend-engineer | `lib/supabase.ts`, `lib/store.ts`, `supabase.sql` | Optional Supabase, LocalStorage fallback |
| qa-engineer | scripts in `package.json` | lint/build/manual browser verification |
| release-engineer | `.env.example`, `.gitignore`, `docs/deployment-handoff.md` | no secret commit, GitHub URL confirmation rule, Vercel/Supabase handoff |
| demo-producer | `docs/demo-check.md` | 45s demo script and risks |
