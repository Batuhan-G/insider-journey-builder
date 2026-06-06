# Skill: MSW Mock Handlers

Mock Service Worker intercepts HTTP requests at the network level. This means your components and stores behave identically in development, test, and production — only the data source changes.

---

## Setup

```typescript
// src/core/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw'
import type { Journey, JourneyNode } from '@/types'

export const handlers = [
  // GET /api/journeys — list all journeys
  http.get('/api/journeys', async () => {
    await delay(400) // Simulate realistic network latency
    return HttpResponse.json([
      {
        id: 'journey-1',
        name: 'Welcome Campaign',
        status: 'active',
        nodeCount: 4,
        createdAt: '2026-01-15T10:00:00Z',
      },
      {
        id: 'journey-2',
        name: 'Cart Abandonment Recovery',
        status: 'draft',
        nodeCount: 3,
        createdAt: '2026-02-20T14:30:00Z',
      },
    ])
  }),

  // GET /api/journeys/:id — single journey with nodes
  http.get('/api/journeys/:id', async ({ params }) => {
    await delay(300)
    return HttpResponse.json({
      id: params.id,
      name: 'Welcome Campaign',
      nodes: [
        { id: 'n1', type: 'trigger', label: 'User signs up', position: { x: 100, y: 100 } },
        { id: 'n2', type: 'condition', label: 'Has mobile app?', position: { x: 300, y: 100 } },
        { id: 'n3', type: 'action', label: 'Send WhatsApp', position: { x: 500, y: 50 } },
        { id: 'n4', type: 'action', label: 'Send Email', position: { x: 500, y: 200 } },
      ],
      edges: [
        { id: 'e1', sourceId: 'n1', targetId: 'n2' },
        { id: 'e2', sourceId: 'n2', targetId: 'n3', label: 'Yes' },
        { id: 'e3', sourceId: 'n2', targetId: 'n4', label: 'No' },
      ],
    })
  }),

  // POST /api/journeys — create journey
  http.post('/api/journeys', async ({ request }) => {
    await delay(600)
    const body = await request.json() as Partial<Journey>
    return HttpResponse.json(
      { id: `journey-${Date.now()}`, ...body, status: 'draft' },
      { status: 201 }
    )
  }),

  // Error simulation example
  http.delete('/api/journeys/:id', async () => {
    await delay(200)
    return new HttpResponse(null, { status: 204 })
  }),
]
```

```typescript
// src/core/mocks/browser.ts (for development)
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

```typescript
// src/main.ts — activate MSW in development only
async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./core/mocks/browser')
    await worker.start({ onUnhandledRequest: 'warn' })
  }
}

prepare().then(() => {
  createApp(App).use(pinia).use(router).mount('#app')
})
```

---

## Error Scenario Handlers (for testing edge cases)

```typescript
// Override a handler to return an error in a specific test
server.use(
  http.get('/api/journeys', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  })
)
```
