// src/types/journey.ts
// Core TypeScript definitions for the Marketing Journey Builder
// These types model the domain of Insider One's automation platform

// ─── Node Types ────────────────────────────────────────────────────────────

export type NodeType = 'trigger' | 'condition' | 'action' | 'wait' | 'split'

export type TriggerEvent =
  | 'user_signed_up'
  | 'page_visited'
  | 'product_added_to_cart'
  | 'purchase_completed'
  | 'app_opened'
  | 'custom_event'

export type ConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'contains'
  | 'not_contains'

export type ActionChannel = 'whatsapp' | 'sms' | 'email' | 'push_notification' | 'in_app'

export interface NodePosition {
  x: number
  y: number
}

// ─── Node Configs (discriminated union by type) ────────────────────────────

export interface TriggerConfig {
  event: TriggerEvent
  filters?: Record<string, unknown>
}

export interface ConditionConfig {
  attribute: string
  operator: ConditionOperator
  value: string | number | boolean
}

export interface ActionConfig {
  channel: ActionChannel
  templateId: string
  personalizations?: Record<string, string>
}

export interface WaitConfig {
  duration: number
  unit: 'minutes' | 'hours' | 'days'
}

export interface SplitConfig {
  splitType: 'percentage' | 'attribute'
  branches: Array<{ label: string; percentage?: number; condition?: ConditionConfig }>
}

export type NodeConfig =
  | TriggerConfig
  | ConditionConfig
  | ActionConfig
  | WaitConfig
  | SplitConfig

// ─── Journey Node ──────────────────────────────────────────────────────────

export interface JourneyNode {
  id: string
  type: NodeType
  label: string
  position: NodePosition
  config?: NodeConfig
  isValid?: boolean
  validationErrors?: string[]
}

// ─── Journey Edge ──────────────────────────────────────────────────────────

export interface JourneyEdge {
  id: string
  sourceId: string
  targetId: string
  label?: string
  condition?: string
}

// ─── Journey ───────────────────────────────────────────────────────────────

export type JourneyStatus = 'draft' | 'active' | 'paused' | 'archived'

export interface Journey {
  id: string
  name: string
  description?: string
  status: JourneyStatus
  nodes: JourneyNode[]
  edges: JourneyEdge[]
  nodeCount: number
  createdAt: string
  updatedAt: string
  createdBy?: string
}

// ─── Validation ────────────────────────────────────────────────────────────

export interface ValidationError {
  nodeId?: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

// ─── API Responses ─────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasNextPage: boolean
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

// ─── Analytics (for dashboard view) ───────────────────────────────────────

export interface JourneyMetrics {
  journeyId: string
  totalEntered: number
  totalCompleted: number
  totalExited: number
  conversionRate: number
  channelBreakdown: Record<ActionChannel, number>
  dailyStats: Array<{
    date: string
    entered: number
    completed: number
  }>
}
