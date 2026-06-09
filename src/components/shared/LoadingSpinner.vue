<script setup lang="ts">
import InsSpinner from '@/components/base/InsSpinner.vue'

interface Props {
  label?: string
  fullPage?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'Loading…',
  fullPage: false,
})
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center gap-3',
      fullPage ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'py-16',
    ]"
    role="status"
    :aria-label="label"
  >
    <InsSpinner size="lg" class="text-indigo-600" />
    <span class="text-sm text-gray-500">{{ label }}</span>
  </div>
</template>
