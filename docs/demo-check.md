# Demo Check

## 45 Second Flow

1. Open the app and point to the left setup rail.
2. Choose a category and purpose.
3. Type one rough idea, then press the pen button.
4. Press recording or camera; deny permission if needed to show fallback.
5. Answer the three questions with chips.
6. Click `可視化する`.
7. Fill GitHub Repository URL if known.
8. Lock one result, regenerate, then export Markdown or JSON.

## Mock Requirements

- No API key required for one complete play.
- Inputs autosave to LocalStorage.
- OpenAI/Gemini timeout or error returns Mock spec.
- Supabase missing still saves locally.
- GitHub URL missing is represented as an explicit handoff item, not guessed.

## Known Risks

- Browser camera/mic need localhost or HTTPS.
- Gemini model name may need adjustment for the target account.
- Generated image is a background asset only; live image generation is not in the runtime MVP.
- Actual GitHub push, Vercel deploy, and Supabase project linking require user account context and confirmed repository URL.
