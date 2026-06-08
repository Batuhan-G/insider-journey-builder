import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InsBadge from './InsBadge.vue'

describe('InsBadge', () => {
  it('renders slot content', () => {
    const wrapper = mount(InsBadge, { slots: { default: 'Active' } })
    expect(wrapper.text()).toContain('Active')
  })

  it('applies default variant classes by default', () => {
    const wrapper = mount(InsBadge)
    expect(wrapper.find('span').classes()).toContain('bg-gray-100')
  })

  it('applies success variant classes', () => {
    const wrapper = mount(InsBadge, { props: { variant: 'success' } })
    expect(wrapper.find('span').classes()).toContain('bg-green-100')
  })

  it('applies warning variant classes', () => {
    const wrapper = mount(InsBadge, { props: { variant: 'warning' } })
    expect(wrapper.find('span').classes()).toContain('bg-yellow-100')
  })

  it('applies danger variant classes', () => {
    const wrapper = mount(InsBadge, { props: { variant: 'danger' } })
    expect(wrapper.find('span').classes()).toContain('bg-red-100')
  })

  it('applies info variant classes', () => {
    const wrapper = mount(InsBadge, { props: { variant: 'info' } })
    expect(wrapper.find('span').classes()).toContain('bg-blue-100')
  })

  it('renders dot indicator when dot prop is true', () => {
    const wrapper = mount(InsBadge, { props: { dot: true } })
    expect(wrapper.findAll('span').length).toBeGreaterThan(1)
  })

  it('does not render dot when dot prop is false', () => {
    const wrapper = mount(InsBadge, { props: { dot: false }, slots: { default: 'Label' } })
    expect(wrapper.findAll('span').length).toBe(1)
  })

  it('applies sm size classes', () => {
    const wrapper = mount(InsBadge, { props: { size: 'sm' } })
    expect(wrapper.find('span').classes()).toContain('px-2')
  })

  it('applies md size classes', () => {
    const wrapper = mount(InsBadge, { props: { size: 'md' } })
    expect(wrapper.find('span').classes()).toContain('px-2.5')
  })
})
