# Skill: Create Vue Component

Use this guide when creating any Vue 3 component in this project.

---

## Checklist Before Writing Code

- [ ] Is this a base component (starts with `Ins`) or a feature component?
- [ ] Are all props typed with an interface?
- [ ] Does it need a Pinia store, or is local `ref` state enough?
- [ ] Does it need a Storybook story file?
- [ ] Does it need a Vitest test file?

---

## Base Component Template (InsXxx.vue)

```vue
<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'InsButton' })

interface Props {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => [
  // Base
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2',
  // Size
  {
    'px-3 py-1.5 text-sm': props.size === 'sm',
    'px-4 py-2 text-sm': props.size === 'md',
    'px-6 py-3 text-base': props.size === 'lg',
  },
  // Variant
  {
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500': props.variant === 'primary',
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500': props.variant === 'secondary',
    'text-gray-600 hover:bg-gray-100 focus:ring-gray-500': props.variant === 'ghost',
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': props.variant === 'danger',
  },
  // State
  {
    'opacity-50 cursor-not-allowed pointer-events-none': props.disabled || props.loading,
  },
])

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :class="classes"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
    <slot>{{ label }}</slot>
  </button>
</template>
```

---

## Feature Component Template

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useJourneyStore } from '../store/useJourneyStore'
import type { JourneyNode } from '../types/journey.types'

interface Props {
  journeyId: string
}

const props = defineProps<Props>()

const store = useJourneyStore()

const isReady = ref(false)

const activeNodes = computed(() =>
  store.nodes.filter((n) => n.journeyId === props.journeyId)
)

onMounted(async () => {
  await store.fetchNodes(props.journeyId)
  isReady.value = true
})
</script>

<template>
  <div class="...">
    <template v-if="!isReady">
      <LoadingSpinner />
    </template>
    <template v-else-if="!activeNodes.length">
      <EmptyState message="No nodes yet" />
    </template>
    <template v-else>
      <!-- content -->
    </template>
  </div>
</template>
```

---

## Storybook Story Template

```typescript
// InsButton.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import InsButton from './InsButton.vue'

const meta: Meta<typeof InsButton> = {
  title: 'Base/InsButton',
  component: InsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { label: 'Click me', variant: 'primary' },
}

export const Loading: Story = {
  args: { label: 'Saving...', loading: true },
}

export const Disabled: Story = {
  args: { label: 'Unavailable', disabled: true },
}
```
