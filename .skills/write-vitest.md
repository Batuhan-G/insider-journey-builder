# Skill: Write Vitest Tests

Use this guide when writing unit or component tests in this project.

---

## Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      threshold: { lines: 80, functions: 80, branches: 80 },
    },
  },
})
```

---

## Component Test Pattern

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InsButton from './InsButton.vue'

describe('InsButton', () => {
  it('renders the label prop', () => {
    const wrapper = mount(InsButton, {
      props: { label: 'Submit' }
    })
    expect(wrapper.text()).toContain('Submit')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(InsButton, {
      props: { label: 'Submit' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(InsButton, {
      props: { label: 'Submit', disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(InsButton, {
      props: { label: 'Submit', loading: true }
    })
    expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true)
  })
})
```

---

## Pinia Store Test Pattern

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useJourneyStore } from './useJourneyStore'
import type { JourneyNode } from '../types/journey.types'

describe('useJourneyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty nodes', () => {
    const store = useJourneyStore()
    expect(store.nodes).toEqual([])
  })

  it('adds a node with addNode action', () => {
    const store = useJourneyStore()
    const node: JourneyNode = {
      id: 'node-1',
      type: 'trigger',
      label: 'User visits page',
      position: { x: 0, y: 0 },
    }

    store.addNode(node)

    expect(store.nodes).toHaveLength(1)
    expect(store.nodes[0].id).toBe('node-1')
  })

  it('removes a node by id', () => {
    const store = useJourneyStore()
    store.addNode({ id: 'node-1', type: 'trigger', label: 'Test', position: { x: 0, y: 0 } })
    store.removeNode('node-1')

    expect(store.nodes).toHaveLength(0)
  })

  it('invalidates journey when no trigger node exists', () => {
    const store = useJourneyStore()
    store.addNode({ id: 'node-1', type: 'action', label: 'Send SMS', position: { x: 0, y: 0 } })

    const result = store.validateJourney()

    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Journey must start with a trigger')
  })
})
```

---

## Composable Test Pattern

```typescript
import { describe, it, expect } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  it('returns debounced value after delay', async () => {
    vi.useFakeTimers()
    const { debouncedValue, update } = useDebounce('', 300)

    update('hello')
    expect(debouncedValue.value).toBe('')

    vi.advanceTimersByTime(300)
    expect(debouncedValue.value).toBe('hello')

    vi.useRealTimers()
  })
})
```

---

## MSW Mock in Tests

```typescript
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const server = setupServer(
  http.get('/api/journeys', () => {
    return HttpResponse.json([
      { id: '1', name: 'Welcome flow', status: 'active' }
    ])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('fetches journeys from the API', async () => {
  const store = useJourneyStore()
  await store.fetchJourneys()
  expect(store.journeys).toHaveLength(1)
})
```
