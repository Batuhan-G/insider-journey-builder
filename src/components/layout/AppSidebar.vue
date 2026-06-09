<script setup lang="ts">
import { RouterLink } from 'vue-router'
import InsIcon from '@/components/base/InsIcon.vue'
import type { IconName } from '@/assets/icons/icons'

interface NavItem {
  label: string
  to: string
  icon: IconName
}

const navItems: NavItem[] = [
  { label: 'Journeys', to: '/journeys', icon: 'journeys' },
]
</script>

<template>
  <aside class="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
    <nav class="flex-1 p-3 space-y-0.5">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        active-class="bg-indigo-50 text-indigo-700 hover:bg-indigo-50"
      >
        <InsIcon :name="item.icon" />
        {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
