<script setup lang="ts">
import InsIcon from '@/components/base/InsIcon.vue'
import InsButton from '@/components/base/InsButton.vue'
import type { IconName } from '@/assets/icons/icons'

interface Props {
  title: string
  description?: string
  icon?: IconName
  actionLabel?: string
}

defineProps<Props>()

defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div v-if="icon" class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <InsIcon :name="icon" size="lg" />
    </div>
    <h3 class="text-sm font-semibold text-gray-900">{{ title }}</h3>
    <p v-if="description" class="mt-1 text-sm text-gray-500">{{ description }}</p>
    <InsButton v-if="actionLabel" class="mt-4" size="sm" @click="$emit('action')">
      {{ actionLabel }}
    </InsButton>
  </div>
</template>
