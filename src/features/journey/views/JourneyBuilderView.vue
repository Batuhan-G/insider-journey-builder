<script setup lang="ts">
import { onMounted } from 'vue'
import { useJourneyStore } from '../store/useJourneyStore'

const journeyStore = useJourneyStore()

onMounted(async () => {
  await journeyStore.fetchJourneys()
})
</script>

<template>
  <div class="flex h-screen flex-col">
    <div class="flex flex-1 overflow-hidden">
      <main class="flex-1 overflow-auto bg-gray-50 p-6">
        <div v-if="journeyStore.isLoading" class="flex h-full items-center justify-center">
          <span class="text-gray-500">Loading journeys...</span>
        </div>
        <div v-else-if="journeyStore.error" class="text-red-600">
          {{ journeyStore.error }}
        </div>
        <div v-else>
          <h1 class="mb-4 text-2xl font-bold text-gray-900">Journey Builder</h1>
          <p class="text-gray-600">{{ journeyStore.journeyCount }} journeys</p>
        </div>
      </main>
    </div>
  </div>
</template>
