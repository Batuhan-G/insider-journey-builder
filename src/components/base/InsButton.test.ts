import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InsButton from './InsButton.vue'

describe('InsButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(InsButton, { slots: { default: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(InsButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(InsButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('disables the button when loading', () => {
    const wrapper = mount(InsButton, { props: { loading: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('renders loading spinner when loading', () => {
    const wrapper = mount(InsButton, { props: { loading: true } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies primary variant classes by default', () => {
    const wrapper = mount(InsButton)
    expect(wrapper.find('button').classes()).toContain('bg-indigo-600')
  })

  it('applies danger variant classes', () => {
    const wrapper = mount(InsButton, { props: { variant: 'danger' } })
    expect(wrapper.find('button').classes()).toContain('bg-red-600')
  })

  it('applies secondary variant classes', () => {
    const wrapper = mount(InsButton, { props: { variant: 'secondary' } })
    expect(wrapper.find('button').classes()).toContain('border')
  })

  it('applies sm size classes', () => {
    const wrapper = mount(InsButton, { props: { size: 'sm' } })
    expect(wrapper.find('button').classes()).toContain('px-3')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(InsButton, { props: { size: 'lg' } })
    expect(wrapper.find('button').classes()).toContain('px-6')
  })

  it('sets button type attribute', () => {
    const wrapper = mount(InsButton, { props: { type: 'submit' } })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })
})
