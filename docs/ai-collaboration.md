# AI Collaboration Log

This document details how AI tools were used during the development of this project. It serves as both a transparency report and a showcase of AI-native development practices.

---

## Philosophy

AI was treated as a **co-architect**, not just a code generator. Every significant decision was made by a human, with AI used to explore alternatives, validate reasoning, and accelerate implementation.

The goal was to demonstrate what a developer who deeply understands AI tooling can build — not to hide AI usage, but to show it as a genuine engineering skill.

---

## Tools Used

| Tool | Role |
|---|---|
| Claude (claude.ai) | Architecture planning, code review, documentation |
| Claude Code | Terminal-based implementation, file generation, refactoring |
| MSW | Realistic API simulation without a backend |

---

## Foundational Architecture (Day 1)

**Prompt strategy:**
Rather than asking "build me a Journey Builder", the first prompts focused on architecture:
1. "Review these tech stack choices for a Vue 3 B2B SaaS app and identify risks"
2. "Design a feature-driven folder structure that scales to 10+ features"
3. "What are the tradeoffs between Pinia Options Store vs Setup Store for this use case?"

**Why this mattered:**
AI-generated architecture is only as good as the questions asked. By front-loading architectural discussion, the resulting codebase reflects deliberate decisions, not defaults.

---

## Type System Design

The `src/types/journey.ts` file was co-designed with AI:

**Human contribution:** Domain knowledge — what concepts exist in a marketing automation platform (triggers, conditions, actions, channels, split testing)

**AI contribution:** TypeScript best practices — discriminated union patterns, interface vs type decisions, generic API response wrappers

**Result:** A type system that is both domain-accurate and TypeScript-idiomatic.

---

## Skill Files as AI Context

The `.skills/` directory is a deliberate technique for maintaining AI consistency across a project:

- Without skill files: AI produces inconsistent patterns each time it generates a component or store
- With skill files: AI references the established pattern and stays consistent

This is especially important in multi-session development where AI has no memory of previous sessions.

**Example:** When generating `InsButton.vue`, the prompt was:
> "Using `.skills/create-vue-component.md` as your guide, create an InsInput component with the following props..."

The AI produced a component that matched the existing codebase patterns exactly.

---

## Test Generation

Tests were written alongside code, not after:

1. Feature spec was written first (what should this do?)
2. Types were defined
3. Store logic was implemented
4. Vitest tests were generated with AI assistance, then reviewed
5. Edge cases were identified by asking AI: "What scenarios am I not testing here?"

The %30 → %80+ coverage improvement at Rapsodo used a similar methodology — AI is most effective when it has clear context about what's being tested and why.

---

## Where Human Judgment Overrode AI

| Situation | AI Suggestion | Human Decision | Reason |
|---|---|---|---|
| Mock data approach | Separate Express server | MSW (Mock Service Worker) | Industry standard, works in both dev and test environments |
| State management | Vuex | Pinia | Vue 3 official recommendation |
| E2E testing | Cypress | Playwright | Better parallelism, modern API, faster CI |

---

## Lessons Learned

1. **Context is everything.** AI with access to `CLAUDE.md` and `.skills/` files produces significantly better code than AI with no context.

2. **Skill files are reusable across projects.** The patterns established here can be adapted for any Vue 3 project.

3. **AI accelerates; humans direct.** Every component, store, and type in this project was reviewed, understood, and validated by a human before merging. AI removed friction, but engineering judgment remained human.

4. **Document AI usage openly.** Teams that treat AI as a secret tool miss the opportunity to build shared practices. This document is a template for how teams should approach AI-assisted development.
