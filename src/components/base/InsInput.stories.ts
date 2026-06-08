import type { Meta, StoryObj } from '@storybook/vue3'
import InsInput from './InsInput.vue'

const meta: Meta<typeof InsInput> = {
  title: 'Base/InsInput',
  component: InsInput,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'url'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof InsInput>

export const Default: Story = {
  args: { label: 'Journey Name', placeholder: 'Enter journey name', id: 'journey-name' },
  render: (args) => ({
    components: { InsInput },
    setup: () => ({ args }),
    template: '<InsInput v-bind="args" />',
  }),
}

export const WithError: Story = {
  args: {
    label: 'Email',
    modelValue: 'invalid',
    error: 'Please enter a valid email address',
    id: 'email',
  },
  render: (args) => ({
    components: { InsInput },
    setup: () => ({ args }),
    template: '<InsInput v-bind="args" />',
  }),
}

export const WithHint: Story = {
  args: {
    label: 'Description',
    hint: 'Max 200 characters',
    id: 'description',
  },
  render: (args) => ({
    components: { InsInput },
    setup: () => ({ args }),
    template: '<InsInput v-bind="args" />',
  }),
}

export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    modelValue: 'Cannot edit this',
    disabled: true,
    id: 'readonly',
  },
  render: (args) => ({
    components: { InsInput },
    setup: () => ({ args }),
    template: '<InsInput v-bind="args" />',
  }),
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    id: 'password',
  },
  render: (args) => ({
    components: { InsInput },
    setup: () => ({ args }),
    template: '<InsInput v-bind="args" />',
  }),
}
