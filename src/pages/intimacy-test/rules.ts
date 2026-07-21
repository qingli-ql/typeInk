import type { DimensionKey } from './types.ts';

export const SCORE_THRESHOLDS = {
  lowMaximum: 39,
  highMinimum: 60,
} as const;

export interface ScoreCondition {
  dimension: DimensionKey;
  operator: 'gte' | 'lte';
  value: number;
}

export interface SummaryRule {
  id: string;
  conditions: ScoreCondition[];
  text: string;
}

export interface DimensionCopyRule {
  dimension: DimensionKey;
  operator: 'gte' | 'lte';
  value: number;
  text: string;
}

export const SUMMARY_RULES: SummaryRule[] = [
  {
    id: 'expression-and-vigilance',
    conditions: [
      { dimension: 'expression_burden', operator: 'gte', value: 60 },
      { dimension: 'relationship_vigilance', operator: 'gte', value: 60 },
    ],
    text: '当前表达负担偏高，同时你在关系中的警觉也较明显。',
  },
  {
    id: 'shame-and-self-acceptance',
    conditions: [
      { dimension: 'shame_burden', operator: 'gte', value: 60 },
      { dimension: 'self_acceptance', operator: 'lte', value: 39 },
    ],
    text: '当前羞耻负担偏高，自我接纳资源相对有限。',
  },
  {
    id: 'boundary-and-expression',
    conditions: [
      { dimension: 'boundary_expression', operator: 'lte', value: 39 },
      { dimension: 'expression_burden', operator: 'gte', value: 60 },
    ],
    text: '当前边界表达较吃力，表达本身也在带来额外负担。',
  },
  {
    id: 'openness-and-vigilance',
    conditions: [
      { dimension: 'communication_openness', operator: 'lte', value: 39 },
      { dimension: 'relationship_vigilance', operator: 'gte', value: 60 },
    ],
    text: '当前更容易在不确定中回避表达，同时对关系反应保持较高警觉。',
  },
];

export const RECOMMENDATION_RULES: DimensionCopyRule[] = [
  { dimension: 'boundary_expression', operator: 'lte', value: 39, text: '优先练习识别“不舒服但还没来得及说”的时刻，用一句简短表达先中止或放慢。' },
  { dimension: 'communication_openness', operator: 'lte', value: 39, text: '从描述感受而不是解释立场开始，例如先说“我现在有点紧张或不确定”。' },
  { dimension: 'self_acceptance', operator: 'lte', value: 39, text: '先区分“我有这种反应”和“我就是有问题”，减少自动否定。' },
  { dimension: 'relationship_vigilance', operator: 'gte', value: 60, text: '在更安全的情境中做低风险表达练习，不必从最难的话题开始。' },
  { dimension: 'shame_burden', operator: 'gte', value: 60, text: '把注意力从“我这样正不正常”转向“这件事让我承受了什么负担”。' },
  { dimension: 'expression_burden', operator: 'gte', value: 60, text: '优先练习表达边界和不适，再逐步过渡到表达偏好和需要。' },
];

export const PATTERN_RULES: DimensionCopyRule[] = [
  { dimension: 'expression_burden', operator: 'gte', value: 60, text: '当前表达负担偏高' },
  { dimension: 'shame_burden', operator: 'gte', value: 60, text: '当前羞耻负担偏高' },
  { dimension: 'relationship_vigilance', operator: 'gte', value: 60, text: '当前关系警觉偏高' },
  { dimension: 'communication_openness', operator: 'lte', value: 39, text: '当前沟通开放度偏低' },
  { dimension: 'boundary_expression', operator: 'lte', value: 39, text: '当前边界表达受阻' },
  { dimension: 'self_acceptance', operator: 'lte', value: 39, text: '当前自我接纳资源偏弱' },
];

export const PROTECTIVE_HIGHLIGHTS: Partial<Record<DimensionKey, string>> = {
  communication_openness: '你拥有一定的沟通开放资源。',
  self_acceptance: '你能够在一定程度上接纳自己的节奏与差异。',
  boundary_expression: '你拥有一定的边界识别与表达资源。',
};
