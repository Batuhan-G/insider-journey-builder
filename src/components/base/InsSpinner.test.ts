import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InsSpinner from './InsSpinner.vue'

describe('InsSpinner', () => {
  it('renders an svg with animate-spin', () => {
    const wrapper = mount(InsSpinner)
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })

  it('applies md size by default', () => {
    const wrapper = mount(InsSpinner)
    expect(wrapper.find('svg').classes()).toContain('h-4')
  })

  it('applies sm size class', () => {
    const wrapper = mount(InsSpinner, { props: { size: 'sm' } })
    expect(wrapper.find('svg').classes()).toContain('h-3')
  })

  it('applies lg size class', () => {
    const wrapper = mount(InsSpinner, { props: { size: 'lg' } })
    expect(wrapper.find('svg').classes()).toContain('h-5')
  })
})
