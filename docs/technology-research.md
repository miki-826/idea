# Technology Research

- Date: 2026-06-23 JST
- Installed versions: Next.js 16.2.9, React 19.2.4, TypeScript 5, `@google/genai`, `@supabase/supabase-js` 2.108.2

## Official Sources

- Next.js App Router and environment variables: https://nextjs.org/docs/app and https://nextjs.org/docs/app/guides/environment-variables
- Gemini API docs, generate content, structured output, release notes: https://ai.google.dev/gemini-api/docs, https://ai.google.dev/api/generate-content, https://ai.google.dev/gemini-api/docs/structured-output, https://ai.google.dev/gemini-api/docs/changelog
- Supabase JS initialization and insert: https://supabase.com/docs/reference/javascript/initializing and https://supabase.com/docs/reference/javascript/insert
- Browser media APIs: MDN `getUserMedia`, MediaRecorder are used through native browser support.

## Decisions

| Tech | Decision | Reason | Fallback | Test |
|---|---|---|---|---|
| Next.js App Router | ADOPT | Server route can hide Gemini key and UI ships quickly. | Static Mock UI still renders. | `npm run build` |
| Gemini API via `@google/genai` | ADOPT | Planned provider; structured JSON fits IdeaSpec. | `buildMockSpec` on no key, timeout, invalid JSON, or API error. | POST `/api/ai/analyze` with and without key |
| Browser media APIs | ADOPT | Camera/mic demo without backend upload. | Text, file upload, and gesture buttons. | Manual browser check |
| MediaPipe gesture | SPIKE | Good fit, but not needed for 45s MVP. | Gesture buttons simulate accepted commands. | Future task |
| Supabase JS | KEEP optional | Useful for saved projects. | LocalStorage persistence. | Save button with no env |
| Image generation | ADOPT for UI asset | Required by skill; generated workbench asset integrated. | CSS motifs if generation unavailable. | asset validator |

## Gemini Notes

Gemini external calls are server-only and gated by `GEMINI_API_KEY`. The UI never receives the key. The route uses JSON response mode with a schema and falls back after 9 seconds. Model defaults to `gemini-2.5-flash` and can be overridden by `GEMINI_MODEL`.

## Risk And Exit

- If Gemini quota, model availability, or schema behavior changes, keep Mock mode enabled and preserve the same response shape.
- If Supabase is not configured, no user flow should fail.
- If media permission is denied, the app must still complete using text and buttons.
