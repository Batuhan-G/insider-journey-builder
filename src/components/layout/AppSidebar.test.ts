import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import AppSidebar from './AppSidebar.vue'

describe('AppSidebar', () => {
  const wrapper = mount(AppSidebar, {
    global: { stubs: { RouterLink: RouterLinkStub } },
  })

  it('renders nav items', () => {
    expect(wrapper.text()).toContain('Journeys')
  })

  it('Journeys link points to /journeys', () => {
    const links = wrapper.findAllComponents(RouterLinkStub)
    const journeysLink = links.find((l) => l.props('to') === '/journeys')
    expect(journeysLink).toBeDefined()
  })

  it('renders a nav element', () => {
    expect(wrapper.find('nav').exists()).toBe(true)
  })
})
