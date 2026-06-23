# API Permissions

| API / Provider | Status | Purpose | Sent Data | Env Vars | Cost | Fallback |
|---|---|---|---|---|---|---|
| OpenAI API | APPROVED_BY_USER | IdeaSpec structured generation from project inputs using an OpenAI / ChatGPT API key | category, purpose, text entries, question answers; future image/audio only after explicit UI confirmation | `AI_PROVIDER=openai`, `OPENAI_API_KEY`, optional `OPENAI_MODEL` | Can incur OpenAI API usage cost depending on account/model | Mock structured spec |
| Google Gemini API | OPTIONAL | IdeaSpec structured generation from project inputs | category, purpose, text entries, question answers; future image/audio only after explicit UI confirmation | `AI_PROVIDER=gemini`, `GEMINI_API_KEY`, optional `GEMINI_MODEL` | Can incur Gemini API usage cost depending on account/model | Mock structured spec |
| Supabase | OPTIONAL | Save generated project payload | generated project JSON | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase plan dependent | LocalStorage |
| Browser camera/mic | LOCAL_ONLY | Capture preview, recording state, local demo input | not sent automatically | none | none | text/file/button input |

OpenAI is preferred when `OPENAI_API_KEY` exists or `AI_PROVIDER=openai` is set. Gemini is still available when `AI_PROVIDER=gemini` and `GEMINI_API_KEY` exists. No API key value should be pasted into chat or committed.
