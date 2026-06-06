import { apiClient } from './client'
import type { Journey } from '@/types/journey'
import type { JourneyListItem } from '@/features/journey/types/journey.types'

export const journeyRepository = {
  getAll(): Promise<JourneyListItem[]> {
    return apiClient.get<JourneyListItem[]>('/api/journeys')
  },

  getById(id: string): Promise<Journey> {
    return apiClient.get<Journey>(`/api/journeys/${id}`)
  },

  create(payload: Pick<Journey, 'name' | 'description'>): Promise<Journey> {
    return apiClient.post<Journey>('/api/journeys', payload)
  },

  remove(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/journeys/${id}`)
  },
}
