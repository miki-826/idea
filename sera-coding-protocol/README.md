# SERA Coding Protocol (Experimental PoC)

**Maximum reasoning, minimum communication.**

SERA is an experimental protocol for reducing the I/O token cost of LLM coding agents by replacing verbose natural-language instructions, full-file rewrites, and long feedback logs with a compact, machine-executable intermediate representation (IR).

> Status: research prototype, not a proven replacement for existing coding-agent interfaces.

## Core idea

Traditional coding-agent loop:

```text
human -> natural language -> LLM -> full source code -> tests -> long logs -> LLM
```

SERA loop:

```text
human
  -> compact task spec (SERA-C)
  -> reasoning LLM
  -> compact patch IR (SERA-IR)
  -> local executor/transpiler (SERA-X)
  -> code/test/lint
  -> compressed result
  -> reasoning LLM
```

The goal is **not** to make the model's hidden reasoning shorter. The goal is to remove unnecessary communication so the same budget can fund better models, higher reasoning settings, or more repair/verification loops.

## Example

Instead of asking the model to regenerate a whole file after changing one HTTP status:

```text
R login status 500>401
```

The local executor resolves the target and applies the change.

In the included demo, the patch IR uses **6 proxy lexical tokens** versus **130 proxy lexical tokens** for regenerating the patched file (~95.4% reduction). This is only a portable proxy, **not a claim about any specific LLM tokenizer**. Real evaluation must use each target model's tokenizer and task-success metrics.

## Compact code generation

The PoC also includes a tiny compressed code IR:

```text
f isAdult(age:n)>b{r age>=18;}
```

which expands to:

```ts
export function isAdult(age: number): boolean {
  return age>=18;
}
```

An early result is important: compacting source syntax alone produced only modest proxy-token savings in this PoC. The strongest opportunity appears to be **minimal semantic patches rather than compressed full-code generation**.

## Run the PoC

Requires Node.js 22+.

```bash
npm test
npm run demo
npm run patch
npm run bench
```

## Proposed production architecture

- **SERA-C** — compressed task/constraint representation
- **SERA-IR** — compact LLM output actions
- **SERA-X** — local parser, validator, AST executor and transpiler
- **Project Symbol Table** — short IDs for files/symbols/types
- **Semantic retrieval** — send only functions/types/tests needed for the current action
- **Compressed feedback** — return test/lint/type errors as structured deltas, not raw logs
- **Tokenizer-aware opcode search** — choose encodings from measured token cost for the target model

## Research hypothesis

> Can the entire coding-agent communication loop—task specification, code actions, and execution feedback—use a single token-minimized, semantics-preserving protocol, while local deterministic tooling expands the protocol back into normal source code?

The proposed contribution is the **bidirectional protocol boundary**, not simply another prompt compressor or AST editor.

## Related work

SERA should be evaluated against strong existing approaches rather than marketed as if compression itself were new:

- **LLMLingua** — general prompt compression: https://aclanthology.org/2023.emnlp-main.825/
- **CODESTRUCT (ACL 2026)** — structured AST action spaces for coding agents: https://aclanthology.org/2026.acl-long.607/
- **CoACT (2026)** — action-preserving observation compression: https://github.com/THU-Agent/CoACT
- **Compact Constraint Encoding (2026)** — compact constraint headers for code generation: https://arxiv.org/abs/2604.07192

## Evaluation plan

Compare:

1. Natural language + full-file generation
2. Natural language + minimal diff
3. JSON action schema
4. Structured AST actions
5. SERA-C + SERA-IR + local executor
6. SERA with tokenizer-optimized opcodes

Measure:

- input/output/cached/reasoning tokens where available
- total API cost
- latency
- task success / test pass rate
- repair-loop count
- malformed action rate

Primary metric:

```text
successful tasks / total inference cost
```

Token reduction counts only if task success is preserved.

## Current PoC limitations

- The patch resolver is intentionally minimal and is **not** a production TypeScript AST adapter.
- The benchmark uses a lexical proxy, not provider tokenizers.
- There is no LLM integration or SWE-bench evaluation yet.
- Security and transactional rollback are design items, not complete implementations.

## Next milestone

**v0.2: TypeScript AST executor**

- function/symbol indexing
- semantic AST paths
- R/A/D/I/N patch operations
- transaction + rollback
- test/lint/typecheck result compressor
- model-specific tokenizer benchmark

---

### 日本語概要

SERAは、AIコーディングで大量の自然言語・ソース全文・ログ全文をLLMへ送る代わりに、**意味を保った極小IRだけをLLMとローカル実行環境の間で交換する**実験的手法です。

狙いは「内部思考を圧縮する」ことではなく、不要な入出力を減らし、同じ料金でより強い推論設定やより多い検証ループを使えるようにすることです。
