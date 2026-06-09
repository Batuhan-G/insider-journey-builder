<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shrink-0">
    <RouterLink to="/" class="flex items-center gap-2.5">
      <span class="text-indigo-600 font-bold text-lg tracking-tight">insider</span>
      <span class="text-gray-300">|</span>
      <span class="text-gray-600 text-sm font-medium">Journey Builder</span>
    </RouterLink>
    <div class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </header>
</template>
