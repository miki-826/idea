# API Permissions

| API / Provider | Status | Purpose | Sent Data | Env Vars | Cost | Fallback |
|---|---|---|---|---|---|---|
| Google Gemini API | PLANNED_BY_USER | IdeaSpec structured generation from project inputs | category, purpose, text entries, question answers; future image/audio only after explicit UI confirmation | `GEMINI_API_KEY`, optional `GEMINI_MODEL` | Can incur Gemini API usage cost depending on account/model | Mock structured spec |
| Supabase | OPTIONAL | Save generated project payload | generated project JSON | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase plan dependent | LocalStorage |
| Browser camera/mic | LOCAL_ONLY | Capture preview, recording state, local demo input | not sent automatically | none | none | text/file/button input |
| OpenAI API | DENIED_FOR_APP | Not used for app runtime | none | none | none | n/a |

Gemini is implemented but only called when `GEMINI_API_KEY` exists on the server. No API key value should be pasted into chat or committed.
