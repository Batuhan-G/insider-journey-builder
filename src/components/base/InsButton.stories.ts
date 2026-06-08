import type { Meta, StoryObj } from '@storybook/vue3'
import InsButton from './InsButton.vue'

const meta: Meta<typeof InsButton> = {
  title: 'Base/InsButton',
  component: InsButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
}

export default meta

type Story = StoryObj<typeof InsButton>

export const Primary: Story = {
  args: { variant: 'primary' },
  render: (args) => ({
    components: { InsButton },
    setup: () => ({ args }),
    template: '<InsButton v-bind="args">Create Journey</InsButton>',
  }),
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => ({
    components: { InsButton },
    setup: () => ({ args }),
    template: '<InsButton v-bind="args">Cancel</InsButton>',
  }),
}

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    components: { InsButton },
    setup: () => ({ args }),
    template: '<InsButton v-bind="args">Delete</InsButton>',
  }),
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => ({
    components: { InsButton },
    setup: () => ({ args }),
    template: '<InsButton v-bind="args">More options</InsButton>',
  }),
}

export const Loading: Story = {
  args: { loading: true },
  render: (args) => ({
    components: { InsButton },
    setup: () => ({ args }),
    template: '<InsButton v-bind="args">Saving...</InsButton>',
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { InsButton },
    setup: () => ({ args }),
    template: '<InsButton v-bind="args">Unavailable</InsButton>',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { InsButton },
    template: `
      <div class="flex items-center gap-4">
        <InsButton size="sm">Small</InsButton>
        <InsButton size="md">Medium</InsButton>
        <InsButton size="lg">Large</InsButton>
      </div>
    `,
  }),
}
