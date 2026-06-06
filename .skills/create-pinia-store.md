# Skill: Create Pinia Store

Use this guide when creating any Pinia store in this project.

---

## Store Template

```typescript
// src/features/journey/store/useJourneyStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { journeyRepository } from '@/core/api/journeyRepository'
import type { JourneyNode, JourneyEdge, ValidationResult } from '../types/journey.types'

// Always define the state interface before the store
interface JourneyState {
  nodes: JourneyNode[]
  edges: JourneyEdge[]
  selectedNodeId: string | null
  isLoading: boolean
  error: string | null
}

export const useJourneyStore = defineStore('journey', () => {
  // --- State ---
  const nodes = ref<JourneyState['nodes']>([])
  const edges = ref<JourneyState['edges']>([])
  const selectedNodeId = ref<JourneyState['selectedNodeId']>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters ---
  const nodeCount = computed(() => nodes.value.length)
  const selectedNode = computed(() =>
    nodes.value.find((n) => n.id === selectedNodeId.value) ?? null
  )
  const triggerNodes = computed(() =>
    nodes.value.filter((n) => n.type === 'trigger')
  )
  const hasValidStructure = computed(() =>
    triggerNodes.value.length > 0 && nodes.value.length >= 2
  )

  // --- Actions ---
  function addNode(node: JourneyNode): void {
    nodes.value.push(node)
  }

  function removeNode(nodeId: string): void {
    nodes.value = nodes.value.filter((n) => n.id !== nodeId)
    // Also remove connected edges
    edges.value = edges.value.filter(
      (e) => e.sourceId !== nodeId && e.targetId !== nodeId
    )
  }

  function updateNode(nodeId: string, updates: Partial<JourneyNode>): void {
    const index = nodes.value.findIndex((n) => n.id === nodeId)
    if (index === -1) return
    nodes.value[index] = { ...nodes.value[index], ...updates }
  }

  function connectNodes(sourceId: string, targetId: string): void {
    const edge: JourneyEdge = {
      id: `edge-${sourceId}-${targetId}`,
      sourceId,
      targetId,
    }
    edges.value.push(edge)
  }

  function selectNode(nodeId: string | null): void {
    selectedNodeId.value = nodeId
  }

  function validateJourney(): ValidationResult {
    const errors: string[] = []

    if (triggerNodes.value.length === 0) {
      errors.push('Journey must start with a trigger')
    }

    if (nodes.value.length < 2) {
      errors.push('Journey must have at least one action')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  async function fetchJourneys(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await journeyRepository.getAll()
      nodes.value = data.nodes
      edges.value = data.edges
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load journeys'
    } finally {
      isLoading.value = false
    }
  }

  function $reset(): void {
    nodes.value = []
    edges.value = []
    selectedNodeId.value = null
    error.value = null
  }

  return {
    // State (expose as readonly where possible)
    nodes,
    edges,
    selectedNodeId,
    isLoading,
    error,
    // Getters
    nodeCount,
    selectedNode,
    triggerNodes,
    hasValidStructure,
    // Actions
    addNode,
    removeNode,
    updateNode,
    connectNodes,
    selectNode,
    validateJourney,
    fetchJourneys,
    $reset,
  }
})
```

---

## Rules Summary

- Use Setup Store (function syntax), never Options Store
- Always define a `State` interface
- Every async action needs `isLoading`, `error`, and `try/catch/finally`
- Always expose a `$reset()` function for cleanup
- Getters are `computed()` — never derive state in components
