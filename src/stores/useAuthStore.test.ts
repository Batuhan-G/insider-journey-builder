import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './useAuthStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with no user and no token', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
  })

  it('isAuthenticated is false when no token', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
  })

  it('setUser populates user and token', () => {
    const store = useAuthStore()
    store.setUser({ id: '1', email: 'a@b.com', name: 'Alice', role: 'admin' }, 'tok-123')
    expect(store.user?.email).toBe('a@b.com')
    expect(store.token).toBe('tok-123')
  })

  it('isAuthenticated is true after setUser', () => {
    const store = useAuthStore()
    store.setUser({ id: '1', email: 'a@b.com', name: 'Alice', role: 'admin' }, 'tok-123')
    expect(store.isAuthenticated).toBe(true)
  })

  it('isAdmin is true when role is admin', () => {
    const store = useAuthStore()
    store.setUser({ id: '1', email: 'a@b.com', name: 'Alice', role: 'admin' }, 'tok')
    expect(store.isAdmin).toBe(true)
  })

  it('isAdmin is false when role is not admin', () => {
    const store = useAuthStore()
    store.setUser({ id: '2', email: 'b@c.com', name: 'Bob', role: 'editor' }, 'tok')
    expect(store.isAdmin).toBe(false)
  })

  it('logout clears user and token', () => {
    const store = useAuthStore()
    store.setUser({ id: '1', email: 'a@b.com', name: 'Alice', role: 'admin' }, 'tok-123')
    store.logout()
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
  })

  it('isAuthenticated is false after logout', () => {
    const store = useAuthStore()
    store.setUser({ id: '1', email: 'a@b.com', name: 'Alice', role: 'admin' }, 'tok-123')
    store.logout()
    expect(store.isAuthenticated).toBe(false)
  })
})
