export type DimensionKey =
  | 'expression_burden'
  | 'shame_burden'
  | 'relationship_vigilance'
  | 'communication_openness'
  | 'self_acceptance'
  | 'boundary_expression';

export type Layer = 'core' | 'protective';
export type ScoreDirection = 'burden' | 'resource';

export interface Question {
  id: string;
  text: string;
  dimension: DimensionKey;
  layer: Layer;
  reverse: boolean;
  isRiskTrigger: boolean;
  allowNA: true;
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5 | 'NA';

export interface RiskFlagRule {
  id: string;
  name: string;
  triggerQuestions: string[];
  threshold: number;
  message: string;
  recommendation: string;
  shareRecommendation: string;
  sharePolicy: 'minimal';
}

export type ShareLevel = 'none' | 'minimal' | 'neutral' | 'standard';
export type ResultValidity = 'valid' | 'partial' | 'insufficient';
export type RiskAssessmentStatus = 'triggered' | 'clear' | 'insufficient';

export interface DimensionResult {
  score: number | null;
  level: string | null;
  validCount: number;
  totalCount: number;
}

export interface RiskAssessment {
  id: string;
  status: RiskAssessmentStatus;
  validCount: number;
  totalCount: number;
}

export interface TestResult {
  questionnaireId: string;
  questionnaireVersion: string;
  validity: ResultValidity;
  validAnswerCount: number;
  dimensionResults: Record<DimensionKey, DimensionResult>;
  riskAssessments: RiskAssessment[];
  riskFlags: string[];
  riskAssessmentComplete: boolean;
  stateSummary: string;
  prioritySignals: string[];
  recommendations: string[];
  shareLevel: ShareLevel;
  shareRecommendation?: string;
  protectiveHighlights: string[];
  statePatterns: string[];
}

export interface DimensionMeta {
  key: DimensionKey;
  layer: Layer;
  direction: ScoreDirection;
  name: string;
  description: string;
  minValidRatio: number;
}

export interface StoredProgress {
  questionnaireId: string;
  version: string;
  currentIndex: number;
  answers: Record<string, AnswerValue>;
  startedAt: string;
  updatedAt: string;
}

export interface StoredResult {
  questionnaireId: string;
  version: string;
  answers: Record<string, AnswerValue>;
  completedAt: string;
}
