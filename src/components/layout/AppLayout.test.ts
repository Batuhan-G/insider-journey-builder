import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppLayout from './AppLayout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div data-testid="page-content">Page</div>' } }],
})

describe('AppLayout', () => {
  it('renders AppHeader', async () => {
    const wrapper = mount(AppLayout, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('renders AppSidebar', async () => {
    const wrapper = mount(AppLayout, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.find('aside').exists()).toBe(true)
  })

  it('renders main content area', async () => {
    const wrapper = mount(AppLayout, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.find('main').exists()).toBe(true)
  })
})
