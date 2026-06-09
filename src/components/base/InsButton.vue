<script setup lang="ts">
import InsSpinner from './InsSpinner.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
      },
      {
        'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300': variant === 'primary',
        'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 disabled:opacity-50': variant === 'secondary',
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300': variant === 'danger',
        'text-gray-600 hover:bg-gray-100 focus:ring-gray-400 disabled:opacity-50': variant === 'ghost',
      },
      { 'opacity-60 cursor-not-allowed': disabled || loading },
    ]"
    @click="$emit('click', $event)"
  >
    <InsSpinner v-if="loading" class="-ml-1 mr-2" />
    <slot />
  </button>
</template>
