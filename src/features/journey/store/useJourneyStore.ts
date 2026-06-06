import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { journeyRepository } from '@/core/api/journeyRepository'
import type { JourneyListItem } from '../types/journey.types'

interface JourneyStoreState {
  journeys: JourneyListItem[]
  activeJourneyId: string | null
  isLoading: boolean
  error: string | null
}

export const useJourneyStore = defineStore('journey', () => {
  const journeys = ref<JourneyStoreState['journeys']>([])
  const activeJourneyId = ref<JourneyStoreState['activeJourneyId']>(null)
  const isLoading = ref<JourneyStoreState['isLoading']>(false)
  const error = ref<JourneyStoreState['error']>(null)

  const activeJourney = computed(() =>
    journeys.value.find((j) => j.id === activeJourneyId.value) ?? null,
  )

  const journeyCount = computed(() => journeys.value.length)

  function setActiveJourney(id: string | null): void {
    activeJourneyId.value = id
  }

  async function fetchJourneys(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      journeys.value = await journeyRepository.getAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load journeys'
    } finally {
      isLoading.value = false
    }
  }

  function $reset(): void {
    journeys.value = []
    activeJourneyId.value = null
    error.value = null
  }

  return {
    journeys,
    activeJourneyId,
    isLoading,
    error,
    activeJourney,
    journeyCount,
    setActiveJourney,
    fetchJourneys,
    $reset,
  }
})
