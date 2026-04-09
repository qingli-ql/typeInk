export type DimensionKey =
  | 'expression_burden'
  | 'shame_burden'
  | 'relationship_safety'
  | 'communication_openness'
  | 'self_acceptance'
  | 'boundary_expression';

export type Layer = 'core' | 'protective';

export interface Question {
  id: string;
  text: string;
  dimension: DimensionKey;
  layer: Layer;
  reverse: boolean;
  isRiskTrigger: boolean;
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5 | 'NA';

export interface RiskFlagRule {
  id: string;
  name: string;
  triggerQuestions: string[];
  threshold: number;
  message: string;
  sharePolicy: 'minimal' | 'neutral' | 'standard';
}

export type ShareLevel = 'minimal' | 'neutral' | 'standard';

export interface TestResult {
  dimensionScores: Record<DimensionKey, number | null>;
  riskFlags: string[];
  stateSummary: string;
  secondarySummary?: string;
  prioritySignals: string[];
  recommendations: string[];
  shareLevel: ShareLevel;
  statePatterns: string[];
}

export interface DimensionMeta {
  key: DimensionKey;
  layer: Layer;
  name: string;
  description: string;
}
