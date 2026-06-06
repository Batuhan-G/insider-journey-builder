export type {
  NodeType,
  TriggerEvent,
  ConditionOperator,
  ActionChannel,
  NodePosition,
  TriggerConfig,
  ConditionConfig,
  ActionConfig,
  WaitConfig,
  SplitConfig,
  NodeConfig,
  JourneyNode,
  JourneyEdge,
  Journey,
  JourneyStatus,
  ValidationError,
  ValidationResult,
  PaginatedResponse,
  ApiError,
  JourneyMetrics,
} from '@/types/journey'

export interface JourneyListItem {
  id: string
  name: string
  status: import('@/types/journey').JourneyStatus
  nodeCount: number
  createdAt: string
  updatedAt: string
}
