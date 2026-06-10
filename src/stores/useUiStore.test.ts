import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUiStore } from './useUiStore'

describe('useUiStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sidebarOpen defaults to true', () => {
    const store = useUiStore()
    expect(store.sidebarOpen).toBe(true)
  })

  it('theme defaults to light', () => {
    const store = useUiStore()
    expect(store.theme).toBe('light')
  })

  it('toggleSidebar closes an open sidebar', () => {
    const store = useUiStore()
    store.toggleSidebar()
    expect(store.sidebarOpen).toBe(false)
  })

  it('toggleSidebar reopens a closed sidebar', () => {
    const store = useUiStore()
    store.toggleSidebar()
    store.toggleSidebar()
    expect(store.sidebarOpen).toBe(true)
  })

  it('setTheme updates the theme to dark', () => {
    const store = useUiStore()
    store.setTheme('dark')
    expect(store.theme).toBe('dark')
  })

  it('setTheme updates the theme back to light', () => {
    const store = useUiStore()
    store.setTheme('dark')
    store.setTheme('light')
    expect(store.theme).toBe('light')
  })
})
