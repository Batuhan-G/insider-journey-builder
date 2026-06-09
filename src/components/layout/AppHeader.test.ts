import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import AppHeader from './AppHeader.vue'

describe('AppHeader', () => {
  const wrapper = mount(AppHeader, {
    global: { stubs: { RouterLink: RouterLinkStub } },
  })

  it('renders brand name', () => {
    expect(wrapper.text()).toContain('insider')
  })

  it('renders app title', () => {
    expect(wrapper.text()).toContain('Journey Builder')
  })

  it('renders actions slot content', () => {
    const withSlot = mount(AppHeader, {
      global: { stubs: { RouterLink: RouterLinkStub } },
      slots: { actions: '<button data-testid="action-btn">Create</button>' },
    })
    expect(withSlot.find('[data-testid="action-btn"]').exists()).toBe(true)
  })

  it('logo links to root', () => {
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toBe('/')
  })
})
