import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Journey, JourneyNode, JourneyEdge } from '@/types/journey'

interface JourneyStoreState {
  journeys: Journey[]
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

  function setJourneys(data: Journey[]) {
    journeys.value = data
  }

  function setActiveJourney(id: string | null) {
    activeJourneyId.value = id
  }

  function addNode(node: JourneyNode) {
    const journey = journeys.value.find((j) => j.id === activeJourneyId.value)
    if (!journey) return
    journey.nodes.push(node)
    journey.nodeCount = journey.nodes.length
  }

  function removeNode(nodeId: string) {
    const journey = journeys.value.find((j) => j.id === activeJourneyId.value)
    if (!journey) return
    journey.nodes = journey.nodes.filter((n) => n.id !== nodeId)
    journey.edges = journey.edges.filter(
      (e) => e.sourceId !== nodeId && e.targetId !== nodeId,
    )
    journey.nodeCount = journey.nodes.length
  }

  function addEdge(edge: JourneyEdge) {
    const journey = journeys.value.find((j) => j.id === activeJourneyId.value)
    if (!journey) return
    journey.edges.push(edge)
  }

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function setError(message: string | null) {
    error.value = message
  }

  return {
    journeys,
    activeJourneyId,
    isLoading,
    error,
    activeJourney,
    journeyCount,
    setJourneys,
    setActiveJourney,
    addNode,
    removeNode,
    addEdge,
    setLoading,
    setError,
  }
})
