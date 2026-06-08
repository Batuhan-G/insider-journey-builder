<script setup lang="ts">
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: false,
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      {
        'px-2 py-0.5 text-xs': size === 'sm',
        'px-2.5 py-1 text-xs': size === 'md',
      },
      {
        'bg-gray-100 text-gray-700': variant === 'default',
        'bg-green-100 text-green-700': variant === 'success',
        'bg-yellow-100 text-yellow-700': variant === 'warning',
        'bg-red-100 text-red-700': variant === 'danger',
        'bg-blue-100 text-blue-700': variant === 'info',
      },
    ]"
  >
    <span
      v-if="dot"
      :class="[
        'h-1.5 w-1.5 rounded-full',
        {
          'bg-gray-500': variant === 'default',
          'bg-green-500': variant === 'success',
          'bg-yellow-500': variant === 'warning',
          'bg-red-500': variant === 'danger',
          'bg-blue-500': variant === 'info',
        },
      ]"
    />
    <slot />
  </span>
</template>
