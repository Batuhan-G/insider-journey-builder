import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from './EmptyState.vue'

describe('EmptyState', () => {
  it('renders the title', () => {
    const wrapper = mount(EmptyState, { props: { title: 'No journeys yet' } })
    expect(wrapper.text()).toContain('No journeys yet')
  })

  it('renders description when provided', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Empty', description: 'Create your first journey to get started.' },
    })
    expect(wrapper.text()).toContain('Create your first journey to get started.')
  })

  it('does not render description when omitted', () => {
    const wrapper = mount(EmptyState, { props: { title: 'Empty' } })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders action button when actionLabel is provided', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Empty', actionLabel: 'Create Journey' },
    })
    expect(wrapper.text()).toContain('Create Journey')
  })

  it('does not render action button when actionLabel is omitted', () => {
    const wrapper = mount(EmptyState, { props: { title: 'Empty' } })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('emits action event when button is clicked', async () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Empty', actionLabel: 'Create' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('renders icon when icon prop is provided', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Empty', icon: 'journeys' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('does not render icon container when icon is omitted', () => {
    const wrapper = mount(EmptyState, { props: { title: 'Empty' } })
    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
