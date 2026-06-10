import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial source value immediately', () => {
    const source = ref('initial')
    const debounced = useDebounce(source)
    expect(debounced.value).toBe('initial')
  })

  it('does not update before the delay elapses', async () => {
    const source = ref('a')
    const debounced = useDebounce(source, 300)
    source.value = 'b'
    await nextTick()
    vi.advanceTimersByTime(200)
    expect(debounced.value).toBe('a')
  })

  it('updates after the delay elapses', async () => {
    const source = ref('a')
    const debounced = useDebounce(source, 300)
    source.value = 'b'
    await nextTick()
    vi.advanceTimersByTime(300)
    expect(debounced.value).toBe('b')
  })

  it('resets the timer on rapid changes', async () => {
    const source = ref('a')
    const debounced = useDebounce(source, 300)
    source.value = 'b'
    await nextTick()
    vi.advanceTimersByTime(200)
    source.value = 'c'
    await nextTick()
    vi.advanceTimersByTime(200)
    expect(debounced.value).toBe('a')
    vi.advanceTimersByTime(100)
    expect(debounced.value).toBe('c')
  })

  it('uses 300ms as default delay', async () => {
    const source = ref(0)
    const debounced = useDebounce(source)
    source.value = 1
    await nextTick()
    vi.advanceTimersByTime(299)
    expect(debounced.value).toBe(0)
    vi.advanceTimersByTime(1)
    expect(debounced.value).toBe(1)
  })
})
