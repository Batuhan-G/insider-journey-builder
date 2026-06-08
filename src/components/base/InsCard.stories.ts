import type { Meta, StoryObj } from '@storybook/vue3'
import InsCard from './InsCard.vue'

const meta: Meta<typeof InsCard> = {
  title: 'Base/InsCard',
  component: InsCard,
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md'],
    },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof InsCard>

export const Default: Story = {
  render: () => ({
    components: { InsCard },
    template: '<InsCard>This is card content.</InsCard>',
  }),
}

export const WithHeader: Story = {
  render: () => ({
    components: { InsCard },
    template: `
      <InsCard>
        <template #header>
          <h3 class="text-sm font-semibold text-gray-900">Journey Stats</h3>
        </template>
        Enrolled: 12,400 users
      </InsCard>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  render: () => ({
    components: { InsCard },
    template: `
      <InsCard>
        <template #header>
          <h3 class="text-sm font-semibold text-gray-900">Welcome Email</h3>
        </template>
        Trigger: User Sign Up
        <template #footer>
          <span class="text-xs text-gray-500">Last edited 2 hours ago</span>
        </template>
      </InsCard>
    `,
  }),
}

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => ({
    components: { InsCard },
    setup: () => ({ args }),
    template: '<InsCard v-bind="args">Hover over me</InsCard>',
  }),
}

export const Clickable: Story = {
  args: { clickable: true, hoverable: true },
  render: (args) => ({
    components: { InsCard },
    setup: () => ({ args }),
    template: '<InsCard v-bind="args">Click me</InsCard>',
  }),
}

export const NoPadding: Story = {
  args: { padding: 'none' },
  render: (args) => ({
    components: { InsCard },
    setup: () => ({ args }),
    template: '<InsCard v-bind="args"><img src="https://via.placeholder.com/400x200" class="rounded-xl w-full" /></InsCard>',
  }),
}
