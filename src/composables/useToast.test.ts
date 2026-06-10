import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const { toasts } = useToast()
    toasts.value = []
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('show adds a toast to the list', () => {
    const { toasts, show } = useToast()
    show('Hello', 'info')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('Hello')
    expect(toasts.value[0].type).toBe('info')
  })

  it('dismiss removes the toast by id', () => {
    const { toasts, show, dismiss } = useToast()
    show('Hello', 'success')
    const id = toasts.value[0].id
    dismiss(id)
    expect(toasts.value).toHaveLength(0)
  })

  it('auto-dismisses after the duration', () => {
    const { toasts, show } = useToast()
    show('Bye', 'info', 1000)
    expect(toasts.value).toHaveLength(1)
    vi.advanceTimersByTime(1000)
    expect(toasts.value).toHaveLength(0)
  })

  it('success helper adds a success toast', () => {
    const { toasts, success } = useToast()
    success('Saved!')
    expect(toasts.value[0].type).toBe('success')
  })

  it('error helper adds an error toast', () => {
    const { toasts, error } = useToast()
    error('Something went wrong')
    expect(toasts.value[0].type).toBe('error')
  })

  it('warning helper adds a warning toast', () => {
    const { toasts, warning } = useToast()
    warning('Check this')
    expect(toasts.value[0].type).toBe('warning')
  })

  it('info helper adds an info toast', () => {
    const { toasts, info } = useToast()
    info('FYI')
    expect(toasts.value[0].type).toBe('info')
  })

  it('each toast has a unique id', () => {
    const { toasts, show } = useToast()
    show('First', 'info')
    show('Second', 'info')
    const ids = toasts.value.map((t) => t.id)
    expect(new Set(ids).size).toBe(2)
  })
})
