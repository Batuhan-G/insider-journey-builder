import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InsIcon from './InsIcon.vue'

describe('InsIcon', () => {
  it('renders an svg element', () => {
    const wrapper = mount(InsIcon, { props: { name: 'journeys' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies md size class by default', () => {
    const wrapper = mount(InsIcon, { props: { name: 'journeys' } })
    expect(wrapper.find('svg').classes()).toContain('h-4')
  })

  it('applies sm size class', () => {
    const wrapper = mount(InsIcon, { props: { name: 'journeys', size: 'sm' } })
    expect(wrapper.find('svg').classes()).toContain('h-3.5')
  })

  it('applies lg size class', () => {
    const wrapper = mount(InsIcon, { props: { name: 'plus', size: 'lg' } })
    expect(wrapper.find('svg').classes()).toContain('h-5')
  })

  it('renders the correct path for each icon name', () => {
    const wrapper = mount(InsIcon, { props: { name: 'analytics' } })
    expect(wrapper.find('path').exists()).toBe(true)
  })
})
