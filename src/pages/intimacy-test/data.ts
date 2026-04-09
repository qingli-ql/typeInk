import type { Question, DimensionMeta, RiskFlagRule } from './types';

export const DIMENSIONS: DimensionMeta[] = [
  { key: 'expression_burden', layer: 'core', name: '表达负担', description: '表达前后的回避、压抑、犹豫、后悔和内耗' },
  { key: 'shame_burden', layer: 'core', name: '羞耻负担', description: '对亲密需求、表达和想法的羞耻、自责、自我否定' },
  { key: 'relationship_safety', layer: 'core', name: '关系安全感', description: '表达后被误解、拒绝、疏远的担忧' },
  { key: 'communication_openness', layer: 'protective', name: '沟通开放度', description: '是否能进入对话，讨论偏好、边界、不适和需要' },
  { key: 'self_acceptance', layer: 'protective', name: '自我接纳', description: '是否能接住自己的差异、节奏和不确定感' },
  { key: 'boundary_expression', layer: 'protective', name: '边界表达能力', description: '是否能在当下识别不适并明确表达' },
];

export const QUESTIONS: Question[] = [
  { id: 'q1', layer: 'core', dimension: 'expression_burden', text: '过去一段时间里，即使我有明确的亲密需要，我也常常选择不说。', reverse: false, isRiskTrigger: true },
  { id: 'q2', layer: 'core', dimension: 'expression_burden', text: '在关系中，我会因为担心说出来后的反应，而把自己的需要压回去。', reverse: false, isRiskTrigger: false },
  { id: 'q3', layer: 'core', dimension: 'expression_burden', text: '当我想表达偏好或期待时，我常常拖到最后还是不说。', reverse: false, isRiskTrigger: false },
  { id: 'q4', layer: 'core', dimension: 'expression_burden', text: '表达自己的亲密需要，对我来说通常会带来明显的心理负担。', reverse: false, isRiskTrigger: false },
  { id: 'q5', layer: 'protective', dimension: 'communication_openness', text: '在关系中，当我感到不舒服时，我通常能在当下说出来。', reverse: true, isRiskTrigger: false },
  { id: 'q6', layer: 'core', dimension: 'shame_burden', text: '过去一段时间里，我会因为自己的亲密需要或想法而感到羞耻。', reverse: false, isRiskTrigger: false },
  { id: 'q7', layer: 'core', dimension: 'shame_burden', text: '当我意识到自己有某种需要时，我会担心自己显得不够体面。', reverse: false, isRiskTrigger: false },
  { id: 'q8', layer: 'core', dimension: 'shame_burden', text: '表达这类需要后，我常会反复回想自己是不是说错了。', reverse: false, isRiskTrigger: true },
  { id: 'q9', layer: 'protective', dimension: 'self_acceptance', text: '即使我的节奏或偏好和别人不同，我通常也能接受。', reverse: true, isRiskTrigger: false },
  { id: 'q10', layer: 'core', dimension: 'shame_burden', text: '我会因为自己的亲密反应而暗自否定自己。', reverse: false, isRiskTrigger: true },
  { id: 'q11', layer: 'core', dimension: 'relationship_safety', text: '在关系中，我担心真实表达后会被误解。', reverse: false, isRiskTrigger: false },
  { id: 'q12', layer: 'core', dimension: 'relationship_safety', text: '我会因为害怕被拒绝或被疏远，而尽量少表达。', reverse: false, isRiskTrigger: true },
  { id: 'q13', layer: 'core', dimension: 'relationship_safety', text: '当关系不够确定时，我会更倾向于收回自己的真实反应。', reverse: false, isRiskTrigger: false },
  { id: 'q14', layer: 'core', dimension: 'relationship_safety', text: '如果我表达边界或偏好，我会担心关系变差。', reverse: false, isRiskTrigger: false },
  { id: 'q15', layer: 'protective', dimension: 'communication_openness', text: '在关系中，我通常愿意讨论彼此的偏好、边界和不适。', reverse: true, isRiskTrigger: false },
  { id: 'q16', layer: 'protective', dimension: 'communication_openness', text: '需要谈这类话题时，我通常能开口，而不是明显回避。', reverse: true, isRiskTrigger: false },
  { id: 'q17', layer: 'protective', dimension: 'communication_openness', text: '即使有点紧张，我也能把自己的感受表达成一句清楚的话。', reverse: true, isRiskTrigger: false },
  { id: 'q18', layer: 'protective', dimension: 'communication_openness', text: '面对这类话题时，我常常不知道怎么开口，最后干脆不谈。', reverse: false, isRiskTrigger: true },
  { id: 'q19', layer: 'protective', dimension: 'communication_openness', text: '即使有必要，我也会尽量回避和亲密相关的表达。', reverse: false, isRiskTrigger: true },
  { id: 'q20', layer: 'protective', dimension: 'boundary_expression', text: '当我感觉节奏不对或不舒服时，我通常能及时表达。', reverse: true, isRiskTrigger: false },
  { id: 'q21', layer: 'protective', dimension: 'boundary_expression', text: '即使我已经不太舒服，我也可能顺着对方继续下去。', reverse: false, isRiskTrigger: true },
  { id: 'q22', layer: 'protective', dimension: 'boundary_expression', text: '当我不想继续某件互动时，我通常能明确停下来。', reverse: true, isRiskTrigger: false },
  { id: 'q23', layer: 'protective', dimension: 'boundary_expression', text: '我常常是在事后才意识到，自己其实并不愿意。', reverse: false, isRiskTrigger: true },
  { id: 'q24', layer: 'protective', dimension: 'boundary_expression', text: '在关系中，我会优先照顾对方感受，而把自己的界限放在后面。', reverse: false, isRiskTrigger: true },
  { id: 'q25', layer: 'protective', dimension: 'boundary_expression', text: '我能分辨"我不想继续"和"我只是有点紧张"之间的区别。', reverse: true, isRiskTrigger: false },
  { id: 'q26', layer: 'protective', dimension: 'self_acceptance', text: '我基本能接纳自己在亲密表达上的节奏和方式。', reverse: true, isRiskTrigger: false },
  { id: 'q27', layer: 'protective', dimension: 'self_acceptance', text: '我常觉得自己在亲密表达上不太正常。', reverse: false, isRiskTrigger: false },
  { id: 'q28', layer: 'protective', dimension: 'self_acceptance', text: '即使我还不完全确定自己的需要，我也允许自己慢慢理解。', reverse: true, isRiskTrigger: false },
  { id: 'q29', layer: 'protective', dimension: 'self_acceptance', text: '我会因为自己太保守、太主动或太敏感而反复苛责自己。', reverse: false, isRiskTrigger: true },
  { id: 'q30', layer: 'core', dimension: 'relationship_safety', text: '在关系中，如果我不确定对方会不会接住我，我通常会更谨慎甚至沉默。', reverse: false, isRiskTrigger: false },
];

export const RISK_FLAGS: RiskFlagRule[] = [
  {
    id: 'boundary_pressure',
    name: '边界受压',
    triggerQuestions: ['q21', 'q23', 'q24'],
    threshold: 2,
    message: '过去一段时间里，你可能更容易在不舒服的情况下继续配合。建议优先关注自己的不适信号，并练习及时停下或表达。',
    sharePolicy: 'minimal',
  },
  {
    id: 'rumination_load',
    name: '持续内耗',
    triggerQuestions: ['q1', 'q8', 'q10', 'q29'],
    threshold: 2,
    message: '过去一段时间里，你可能承受了较明显的表达内耗或自责。建议先减少反复自我评判，再处理表达本身。',
    sharePolicy: 'minimal',
  },
  {
    id: 'avoidance_freeze',
    name: '明显回避 / 冻结',
    triggerQuestions: ['q12', 'q18', 'q19'],
    threshold: 2,
    message: '过去一段时间里，你在面对相关话题时可能更容易回避或卡住。建议从低风险、低暴露的表达开始练习。',
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

export const STORAGE_KEY = 'intimacy-test-v1';
