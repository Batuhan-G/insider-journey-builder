# CLAUDE.md — Insider One Case Study: Marketing Journey Builder

> This file is the single source of truth for any AI assistant (Claude, Cursor, Copilot) working on this codebase. Read it fully before generating any code.

---

## Project Overview

A production-ready **Marketing Journey Builder** that simulates Insider One's core automation platform. Users create cross-channel marketing flows (Trigger → Condition → Action) across channels like WhatsApp, SMS, and Email. The system is designed to reflect the scale and architectural maturity expected of a platform handling **2.2 billion daily requests**.

---

## Commands

```bash
pnpm dev              # Start dev server (Vite)
pnpm build            # Production build
pnpm preview          # Preview production build locally

pnpm test             # Run Vitest (unit + component)
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:coverage    # Coverage report

pnpm lint             # ESLint
pnpm typecheck        # vue-tsc --noEmit (zero errors allowed)
pnpm format           # Prettier

pnpm storybook        # Launch Storybook component explorer
pnpm build-storybook  # Build Storybook for deployment
```

---

## Tech Stack

| Layer          | Tool                         | Version     |
| -------------- | ---------------------------- | ----------- |
| Build          | Vite + pnpm                  | Latest      |
| Framework      | Vue 3 (Composition API)      | ^3.5        |
| Language       | TypeScript                   | Strict mode |
| State          | Pinia                        | ^2          |
| Routing        | Vue Router                   | ^4          |
| Styling        | Tailwind CSS                 | ^3          |
| Testing (unit) | Vitest + @vue/test-utils     | Latest      |
| Testing (E2E)  | Playwright                   | Latest      |
| Mocking        | MSW (Mock Service Worker)    | ^2          |
| Components     | VueUse composables           | ^10         |
| Docs           | Storybook                    | ^8          |
| Monitoring     | Sentry                       | @sentry/vue |
| CI/CD          | GitHub Actions + AWS Amplify | —           |

---

## Architecture Principles

### 1. Feature-Driven Structure

Every feature is a self-contained module under `src/features/`. A feature owns its components, store, types, composables, and tests. Nothing leaks outside its boundary without becoming a shared `src/components/` or `src/composables/` utility.

### 2. Strict TypeScript — Zero `any`

- All props, emits, store state, API responses, and composable return types must be fully typed.
- Use `interface` for object shapes, `type` for unions/aliases.
- Never use `as any`, `@ts-ignore`, or `@ts-expect-error` without a written comment explaining why.

### 3. Composition API Only

- Always use `<script setup>` syntax.
- Never use Options API.
- Extract reusable logic into composables under `src/composables/` or feature-level `composables/`.

### 4. Component Naming

- Base UI components: `Ins` prefix → `InsButton.vue`, `InsInput.vue`
- Feature components: descriptive → `JourneyCanvas.vue`, `NodeSidebar.vue`
- Views (pages): `View` suffix → `DashboardView.vue`, `JourneyBuilderView.vue`

### 5. Pinia Store Rules

- One store per feature domain.
- Store files named: `useJourneyStore.ts`, `useAuthStore.ts`
- State must be typed with an `interface`, never inferred from an object literal.
- No direct state mutation outside actions.

### 6. API / Data Layer

- All API calls go through `src/core/api/` clients.
- In development, MSW intercepts requests — no real backend needed.
- Never call `fetch()` or `axios` directly from a component or store. Always use a repository function.

---

## Folder Structure

```
├── .cursor/rules/          # Cursor AI rule files (per concern)
├── .github/workflows/      # CI/CD pipeline
├── .skills/                # AI skill guides for specific tasks
├── .husky/                 # Git hooks (lint + typecheck on commit)
├── docs/
│   └── ai-collaboration.md # How AI was used in this project
├── src/
│   ├── assets/             # Global styles, fonts, images
│   ├── components/
│   │   ├── base/           # InsButton, InsInput, InsBadge, InsCard
│   │   ├── layout/         # AppHeader, AppSidebar, AppLayout
│   │   └── shared/         # DataTable, EmptyState, LoadingSpinner
│   ├── composables/        # useDebounce, useBreakpoint, useToast
│   ├── core/
│   │   ├── api/            # HTTP client, repositories
│   │   ├── mocks/          # MSW handlers
│   │   └── monitoring/     # Sentry setup
│   ├── features/
│   │   ├── journey/
│   │   │   ├── components/ # JourneyCanvas, NodeCard, EdgeConnector
│   │   │   ├── composables/# useJourneyDrag, useJourneyValidation
│   │   │   ├── store/      # useJourneyStore.ts
│   │   │   ├── types/      # journey.types.ts
│   │   │   └── views/      # JourneyBuilderView.vue
│   │   └── analytics/
│   ├── router/             # index.ts with lazy-loaded routes
│   ├── stores/             # Global stores (auth, ui)
│   ├── types/              # Global shared types
│   ├── App.vue
│   └── main.ts
├── tests/
│   └── e2e/                # Playwright specs
├── .env.example            # Required env vars (never commit .env)
├── llms.txt                # AI context file (like robots.txt for LLMs)
├── CLAUDE.md               # This file
└── vitest.config.ts
```

---

## Environment Variables

```bash
# Copy .env.example to .env and fill in values
VITE_SENTRY_DSN=         # From sentry.io project settings
VITE_APP_ENV=development # development | staging | production
VITE_API_BASE_URL=       # Mock or real API base
```

---

## Testing Standards

- **Every component** in `src/components/base/` must have a Vitest test.
- **Every Pinia store** must have action and getter tests.
- **Every critical user flow** must have a Playwright E2E spec.
- Minimum coverage target: **80%** (enforced in CI).
- Tests live next to the code they test: `InsButton.vue` → `InsButton.test.ts`

---

## AI Collaboration Notes

See `docs/ai-collaboration.md` for a detailed log of how AI tools were used throughout this project — including prompt strategies, architectural decisions made with AI assistance, and where human judgment overrode AI suggestions.

## Code Style

- No code comments. Code must be self-documenting through clear naming.
- Exception: genuinely non-obvious business logic only.
