<script setup lang="ts">
import { icons, type IconName } from '@/assets/icons/icons'

interface Props {
  name: IconName
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<template>
  <svg
    :class="[
      'shrink-0',
      { 'h-3.5 w-3.5': size === 'sm', 'h-4 w-4': size === 'md', 'h-5 w-5': size === 'lg' },
    ]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path stroke-linecap="round" stroke-linejoin="round" :d="icons[name]" />
  </svg>
</template>
