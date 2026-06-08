import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InsCard from './InsCard.vue'

describe('InsCard', () => {
  it('renders default slot content', () => {
    const wrapper = mount(InsCard, { slots: { default: 'Card body' } })
    expect(wrapper.text()).toContain('Card body')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(InsCard, {
      slots: { header: '<h2>Title</h2>', default: 'Body' },
    })
    expect(wrapper.find('h2').exists()).toBe(true)
  })

  it('does not render header wrapper when header slot is absent', () => {
    const wrapper = mount(InsCard, { slots: { default: 'Body' } })
    expect(wrapper.findAll('div').length).toBe(1)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(InsCard, {
      slots: { default: 'Body', footer: '<button>Save</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies md padding by default', () => {
    const wrapper = mount(InsCard)
    expect(wrapper.find('div').classes()).toContain('p-5')
  })

  it('applies sm padding', () => {
    const wrapper = mount(InsCard, { props: { padding: 'sm' } })
    expect(wrapper.find('div').classes()).toContain('p-3')
  })

  it('applies shadow-sm by default', () => {
    const wrapper = mount(InsCard)
    expect(wrapper.find('div').classes()).toContain('shadow-sm')
  })

  it('applies shadow-md when specified', () => {
    const wrapper = mount(InsCard, { props: { shadow: 'md' } })
    expect(wrapper.find('div').classes()).toContain('shadow-md')
  })

  it('applies hoverable classes when hoverable is true', () => {
    const wrapper = mount(InsCard, { props: { hoverable: true } })
    expect(wrapper.find('div').classes()).toContain('hover:shadow-md')
  })

  it('applies cursor-pointer class when clickable', () => {
    const wrapper = mount(InsCard, { props: { clickable: true } })
    expect(wrapper.find('div').classes()).toContain('cursor-pointer')
  })

  it('emits click event when clickable and clicked', async () => {
    const wrapper = mount(InsCard, { props: { clickable: true } })
    await wrapper.find('div').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when not clickable', async () => {
    const wrapper = mount(InsCard, { props: { clickable: false } })
    await wrapper.find('div').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
