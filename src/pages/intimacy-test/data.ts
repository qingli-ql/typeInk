import type { DimensionMeta, Question, RiskFlagRule } from './types.ts';

export const QUESTIONNAIRE_ID = 'intimacy-boundary-state-assessment';
export const QUESTIONNAIRE_VERSION = 'v2';
export const STORAGE_PREFIX = `${QUESTIONNAIRE_ID}:${QUESTIONNAIRE_VERSION}`;
export const PROGRESS_STORAGE_KEY = `${STORAGE_PREFIX}:progress`;
export const RESULT_STORAGE_KEY = `${STORAGE_PREFIX}:result`;

export const DIMENSIONS: DimensionMeta[] = [
  { key: 'expression_burden', layer: 'core', direction: 'burden', name: '表达负担', description: '表达前后的回避、压抑、犹豫、后悔和内耗', minValidRatio: 0.7 },
  { key: 'shame_burden', layer: 'core', direction: 'burden', name: '羞耻负担', description: '对亲密需要、表达和想法的羞耻、自责与自我否定', minValidRatio: 0.7 },
  { key: 'relationship_vigilance', layer: 'core', direction: 'burden', name: '关系警觉', description: '对表达后被误解、拒绝或疏远的担忧', minValidRatio: 0.7 },
  { key: 'communication_openness', layer: 'protective', direction: 'resource', name: '沟通开放度', description: '进入对话并讨论偏好、边界、不适和需要的能力', minValidRatio: 0.7 },
  { key: 'self_acceptance', layer: 'protective', direction: 'resource', name: '自我接纳', description: '接住自己的差异、节奏和不确定感的能力', minValidRatio: 0.7 },
  { key: 'boundary_expression', layer: 'protective', direction: 'resource', name: '边界表达能力', description: '在当下识别不适并清楚表达的能力', minValidRatio: 0.7 },
];

export const QUESTIONS: Question[] = [
  { id: 'q1', layer: 'core', dimension: 'expression_burden', text: '过去一段时间里，即使我有明确的亲密需要，我也常常选择不说。', reverse: false, isRiskTrigger: true, allowNA: true },
  { id: 'q2', layer: 'core', dimension: 'expression_burden', text: '在关系中，我会因为担心说出来后的反应，而把自己的需要压回去。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q3', layer: 'core', dimension: 'expression_burden', text: '当我想表达偏好或期待时，我常常拖到最后还是不说。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q4', layer: 'core', dimension: 'expression_burden', text: '表达自己的亲密需要，对我来说通常会带来明显的心理负担。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q5', layer: 'protective', dimension: 'communication_openness', text: '在关系中，当我感到不舒服时，我通常能在当下说出来。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q6', layer: 'core', dimension: 'shame_burden', text: '过去一段时间里，我会因为自己的亲密需要或想法而感到羞耻。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q7', layer: 'core', dimension: 'shame_burden', text: '当我意识到自己有某种需要时，我会担心自己显得不够体面。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q8', layer: 'core', dimension: 'shame_burden', text: '表达这类需要后，我常会反复回想自己是不是说错了。', reverse: false, isRiskTrigger: true, allowNA: true },
  { id: 'q9', layer: 'protective', dimension: 'self_acceptance', text: '即使我的节奏或偏好和别人不同，我通常也能接受。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q10', layer: 'core', dimension: 'shame_burden', text: '我会因为自己的亲密反应而暗自否定自己。', reverse: false, isRiskTrigger: true, allowNA: true },
  { id: 'q11', layer: 'core', dimension: 'relationship_vigilance', text: '在关系中，我担心真实表达后会被误解。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q12', layer: 'core', dimension: 'relationship_vigilance', text: '我会因为害怕被拒绝或被疏远，而尽量少表达。', reverse: false, isRiskTrigger: true, allowNA: true },
  { id: 'q13', layer: 'core', dimension: 'relationship_vigilance', text: '当关系不够确定时，我会更倾向于收回自己的真实反应。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q14', layer: 'core', dimension: 'relationship_vigilance', text: '如果我表达边界或偏好，我会担心关系变差。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q15', layer: 'protective', dimension: 'communication_openness', text: '在关系中，我通常愿意讨论彼此的偏好、边界和不适。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q16', layer: 'protective', dimension: 'communication_openness', text: '需要谈这类话题时，我通常能开口，而不是明显回避。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q17', layer: 'protective', dimension: 'communication_openness', text: '即使有点紧张，我也能把自己的感受表达成一句清楚的话。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q18', layer: 'protective', dimension: 'communication_openness', text: '面对这类话题时，我常常不知道怎么开口，最后干脆不谈。', reverse: true, isRiskTrigger: true, allowNA: true },
  { id: 'q19', layer: 'protective', dimension: 'communication_openness', text: '即使有必要，我也会尽量回避和亲密相关的表达。', reverse: true, isRiskTrigger: true, allowNA: true },
  { id: 'q20', layer: 'protective', dimension: 'boundary_expression', text: '当我感觉节奏不对或不舒服时，我通常能及时表达。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q21', layer: 'protective', dimension: 'boundary_expression', text: '即使我已经不太舒服，我也可能顺着对方继续下去。', reverse: true, isRiskTrigger: true, allowNA: true },
  { id: 'q22', layer: 'protective', dimension: 'boundary_expression', text: '当我不想继续某件互动时，我通常能明确停下来。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q23', layer: 'protective', dimension: 'boundary_expression', text: '我常常是在事后才意识到，自己其实并不愿意。', reverse: true, isRiskTrigger: true, allowNA: true },
  { id: 'q24', layer: 'protective', dimension: 'boundary_expression', text: '在关系中，我会优先照顾对方感受，而把自己的界限放在后面。', reverse: true, isRiskTrigger: true, allowNA: true },
  { id: 'q25', layer: 'protective', dimension: 'boundary_expression', text: '我能分辨“我不想继续”和“我只是有点紧张”之间的区别。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q26', layer: 'protective', dimension: 'self_acceptance', text: '我基本能接纳自己在亲密表达上的节奏和方式。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q27', layer: 'protective', dimension: 'self_acceptance', text: '我常觉得自己在亲密表达上不太正常。', reverse: true, isRiskTrigger: false, allowNA: true },
  { id: 'q28', layer: 'protective', dimension: 'self_acceptance', text: '即使我还不完全确定自己的需要，我也允许自己慢慢理解。', reverse: false, isRiskTrigger: false, allowNA: true },
  { id: 'q29', layer: 'protective', dimension: 'self_acceptance', text: '我会因为自己太保守、太主动或太敏感而反复苛责自己。', reverse: true, isRiskTrigger: true, allowNA: true },
  { id: 'q30', layer: 'core', dimension: 'relationship_vigilance', text: '在关系中，如果我不确定对方会不会接住我，我通常会更谨慎甚至沉默。', reverse: false, isRiskTrigger: false, allowNA: true },
];

export const RISK_FLAGS: RiskFlagRule[] = [
  {
    id: 'boundary_pressure',
    name: '边界受压信号',
    triggerQuestions: ['q21', 'q23', 'q24'],
    threshold: 2,
    message: '过去一段时间里，你可能更容易在不舒服的情况下继续配合。这个信号值得优先关注，但不能单独说明具体原因。',
    recommendation: '优先识别身体或情绪中的不适信号，用一句简短表达先中止、离开或放慢；如果现实处境让你感到不安全，及时联系可信赖的人或当地支持服务。',
    shareRecommendation: '优先照顾自己的安全与边界，允许自己停下或放慢。',
    sharePolicy: 'minimal',
  },
  {
    id: 'rumination_load',
    name: '持续内耗信号',
    triggerQuestions: ['q1', 'q8', 'q10', 'q29'],
    threshold: 2,
    message: '过去一段时间里，你可能承受了较明显的表达内耗或自责。这个结果反映当前负担，不是对你的定性。',
    recommendation: '先减少反复自我评判，记录触发内耗的具体情境，再选择一个低风险、可信赖的支持对象讨论。',
    shareRecommendation: '先减少自我评判，再处理表达本身。',
    sharePolicy: 'minimal',
  },
  {
    id: 'expression_avoidance',
    name: '表达回避信号',
    triggerQuestions: ['q12', 'q18', 'q19'],
    threshold: 2,
    message: '过去一段时间里，你在面对相关话题时可能更容易回避或卡住。回避可能是一种保护反应，也可能让需要更难被看见。',
    recommendation: '从低风险、低暴露的表达开始，例如先描述当下感受，而不必一次说明全部立场或需要。',
    shareRecommendation: '从低风险、低暴露的表达开始练习。',
    sharePolicy: 'minimal',
  },
];

export const OPTION_LABELS = [
  '非常不同意',
  '不同意',
  '一般',
  '同意',
  '非常同意',
  '不适用',
] as const;

export const ANSWER_VALUES = [1, 2, 3, 4, 5, 'NA'] as const;
