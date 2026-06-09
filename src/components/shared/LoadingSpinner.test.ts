import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from './LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders with default label', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.text()).toContain('Loading…')
  })

  it('renders with custom label', () => {
    const wrapper = mount(LoadingSpinner, { props: { label: 'Fetching data…' } })
    expect(wrapper.text()).toContain('Fetching data…')
  })

  it('has role="status" for accessibility', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.attributes('role')).toBe('status')
  })

  it('has aria-label matching label prop', () => {
    const wrapper = mount(LoadingSpinner, { props: { label: 'Saving…' } })
    expect(wrapper.attributes('aria-label')).toBe('Saving…')
  })

  it('does not apply fixed positioning by default', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.classes()).not.toContain('fixed')
  })

  it('applies fixed positioning when fullPage is true', () => {
    const wrapper = mount(LoadingSpinner, { props: { fullPage: true } })
    expect(wrapper.classes()).toContain('fixed')
  })
})
