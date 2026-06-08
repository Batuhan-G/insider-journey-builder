<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md'
  hoverable?: boolean
  clickable?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: 'sm',
  hoverable: false,
  clickable: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <div
    :class="[
      'bg-white rounded-xl border border-gray-200 transition-all',
      {
        'p-0': padding === 'none',
        'p-3': padding === 'sm',
        'p-5': padding === 'md',
        'p-7': padding === 'lg',
      },
      {
        'shadow-none': shadow === 'none',
        'shadow-sm': shadow === 'sm',
        'shadow-md': shadow === 'md',
      },
      {
        'hover:shadow-md hover:border-gray-300': hoverable,
        'cursor-pointer': clickable,
      },
    ]"
    @click="clickable ? $emit('click', $event) : undefined"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-100">
      <slot name="footer" />
    </div>
  </div>
</template>
