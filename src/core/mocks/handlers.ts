import { http, HttpResponse, passthrough } from 'msw'
import type { Journey } from '@/types/journey'

const mockJourneys: Journey[] = [
  {
    id: '1',
    name: 'Welcome Flow',
    status: 'active',
    nodes: [],
    edges: [],
    nodeCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Cart Abandonment',
    status: 'draft',
    nodes: [],
    edges: [],
    nodeCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const handlers = [
  http.all('https://*.sentry.io/*', () => passthrough()),

  http.get('/api/journeys', () => {
    return HttpResponse.json(mockJourneys)
  }),

  http.get('/api/journeys/:id', ({ params }) => {
    const journey = mockJourneys.find((j) => j.id === params.id)
    if (!journey) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(journey)
  }),

  http.post('/api/journeys', async ({ request }) => {
    const body = (await request.json()) as Omit<Journey, 'id' | 'createdAt' | 'updatedAt'>
    const newJourney: Journey = {
      ...body,
      id: crypto.randomUUID(),
      nodeCount: body.nodes?.length ?? 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockJourneys.push(newJourney)
    return HttpResponse.json(newJourney, { status: 201 })
  }),

  http.put('/api/journeys/:id', async ({ params, request }) => {
    const index = mockJourneys.findIndex((j) => j.id === params.id)
    if (index === -1) return new HttpResponse(null, { status: 404 })
    const body = (await request.json()) as Partial<Journey>
    mockJourneys[index] = {
      ...mockJourneys[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    return HttpResponse.json(mockJourneys[index])
  }),

  http.delete('/api/journeys/:id', ({ params }) => {
    const index = mockJourneys.findIndex((j) => j.id === params.id)
    if (index === -1) return new HttpResponse(null, { status: 404 })
    mockJourneys.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
