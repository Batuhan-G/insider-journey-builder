import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Journey, ValidationResult } from '@/types/journey'

export function useJourneyValidation(journey: Ref<Journey | null>) {
  const hasTrigger = computed(() =>
    journey.value?.nodes.some((n) => n.type === 'trigger') ?? false,
  )

  const hasAction = computed(() =>
    journey.value?.nodes.some((n) => n.type === 'action') ?? false,
  )

  const result = computed<ValidationResult>(() => {
    const errors: string[] = []
    if (!hasTrigger.value) errors.push('Journey must have at least one trigger node')
    if (!hasAction.value) errors.push('Journey must have at least one action node')
    return { isValid: errors.length === 0, errors }
  })

  return { isValid: computed(() => result.value.isValid), hasTrigger, hasAction, result }
}
