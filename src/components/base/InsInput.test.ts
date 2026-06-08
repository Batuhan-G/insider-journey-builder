import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InsInput from './InsInput.vue'

describe('InsInput', () => {
  it('renders input element', () => {
    const wrapper = mount(InsInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(InsInput, { props: { label: 'Email', id: 'email' } })
    expect(wrapper.find('label').text()).toBe('Email')
    expect(wrapper.find('label').attributes('for')).toBe('email')
  })

  it('does not render label when omitted', () => {
    const wrapper = mount(InsInput)
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(InsInput, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('reflects modelValue in input value', () => {
    const wrapper = mount(InsInput, { props: { modelValue: 'test value' } })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('test value')
  })

  it('shows placeholder', () => {
    const wrapper = mount(InsInput, { props: { placeholder: 'Enter email' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter email')
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(InsInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('renders error message and applies error styling', () => {
    const wrapper = mount(InsInput, { props: { error: 'Required field' } })
    expect(wrapper.find('p').text()).toBe('Required field')
    expect(wrapper.find('input').classes()).toContain('border-red-400')
  })

  it('renders hint when no error', () => {
    const wrapper = mount(InsInput, { props: { hint: 'Max 100 chars' } })
    expect(wrapper.find('p').text()).toBe('Max 100 chars')
  })

  it('error takes priority over hint', () => {
    const wrapper = mount(InsInput, { props: { error: 'Bad input', hint: 'Some hint' } })
    expect(wrapper.find('p').text()).toBe('Bad input')
  })

  it('sets input type attribute', () => {
    const wrapper = mount(InsInput, { props: { type: 'password' } })
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })
})
