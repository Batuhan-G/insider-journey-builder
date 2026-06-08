import type { Meta, StoryObj } from '@storybook/vue3'
import InsBadge from './InsBadge.vue'

const meta: Meta<typeof InsBadge> = {
  title: 'Base/InsBadge',
  component: InsBadge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dot: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof InsBadge>

export const Default: Story = {
  args: { variant: 'default' },
  render: (args) => ({
    components: { InsBadge },
    setup: () => ({ args }),
    template: '<InsBadge v-bind="args">Draft</InsBadge>',
  }),
}

export const Success: Story = {
  args: { variant: 'success' },
  render: (args) => ({
    components: { InsBadge },
    setup: () => ({ args }),
    template: '<InsBadge v-bind="args">Active</InsBadge>',
  }),
}

export const Warning: Story = {
  args: { variant: 'warning' },
  render: (args) => ({
    components: { InsBadge },
    setup: () => ({ args }),
    template: '<InsBadge v-bind="args">Paused</InsBadge>',
  }),
}

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    components: { InsBadge },
    setup: () => ({ args }),
    template: '<InsBadge v-bind="args">Failed</InsBadge>',
  }),
}

export const Info: Story = {
  args: { variant: 'info' },
  render: (args) => ({
    components: { InsBadge },
    setup: () => ({ args }),
    template: '<InsBadge v-bind="args">Scheduled</InsBadge>',
  }),
}

export const WithDot: Story = {
  args: { variant: 'success', dot: true },
  render: (args) => ({
    components: { InsBadge },
    setup: () => ({ args }),
    template: '<InsBadge v-bind="args">Live</InsBadge>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { InsBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <InsBadge variant="default" dot>Draft</InsBadge>
        <InsBadge variant="success" dot>Active</InsBadge>
        <InsBadge variant="warning" dot>Paused</InsBadge>
        <InsBadge variant="danger" dot>Failed</InsBadge>
        <InsBadge variant="info" dot>Scheduled</InsBadge>
      </div>
    `,
  }),
}
