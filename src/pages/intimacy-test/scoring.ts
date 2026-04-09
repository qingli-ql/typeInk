import type { AnswerValue, DimensionKey, TestResult } from './types';
import { QUESTIONS, RISK_FLAGS } from './data';

function reverseScore(v: number): number {
  return 6 - v;
}

function calcDimensionScore(
  answers: Record<string, AnswerValue>,
  dimension: DimensionKey,
): number | null {
  const qs = QUESTIONS.filter((q) => q.dimension === dimension);
  const valid: number[] = [];
  for (const q of qs) {
    const a = answers[q.id];
    if (a === 'NA' || a === undefined) continue;
    valid.push(q.reverse ? reverseScore(a) : a);
  }
  if (valid.length < 3) return null;
  const avg = valid.reduce((s, v) => s + v, 0) / valid.length;
  return Math.round(((avg - 1) / 4) * 100);
}

function checkRiskFlags(answers: Record<string, AnswerValue>): string[] {
  const triggered: string[] = [];
  for (const rule of RISK_FLAGS) {
    let count = 0;
    for (const qid of rule.triggerQuestions) {
      const a = answers[qid];
      if (a !== 'NA' && a !== undefined && a >= 4) count++;
    }
    if (count >= rule.threshold) triggered.push(rule.id);
  }
  return triggered;
}

export function getScoreLevel(score: number): string {
  if (score < 20) return '较低';
  if (score < 40) return '偏低';
  if (score < 60) return '中等';
  if (score < 80) return '偏高';
  return '较高';
}

function generateStateSummary(
  scores: Record<DimensionKey, number | null>,
): string {
  const eb = scores.expression_burden;
  const sb = scores.shame_burden;
  const rs = scores.relationship_safety;
  const co = scores.communication_openness;
  const sa = scores.self_acceptance;
  const be = scores.boundary_expression;

  if (eb !== null && rs !== null && eb >= 60 && rs >= 60) {
    return '当前表达负担偏高，且你在关系中的安全感偏弱。';
  }
  if (sb !== null && sa !== null && sb >= 60 && sa <= 39) {
    return '当前羞耻负担偏高，自我接纳资源偏弱。';
  }
  if (be !== null && eb !== null && be <= 39 && eb >= 60) {
    return '当前边界表达较吃力，表达本身也在带来额外负担。';
  }
  if (co !== null && rs !== null && co <= 39 && rs >= 60) {
    return '当前更容易在不确定中回避表达，关系安全感也偏低。';
  }

  const coreKeys: DimensionKey[] = ['expression_burden', 'shame_burden', 'relationship_safety'];
  const protKeys: DimensionKey[] = ['communication_openness', 'self_acceptance', 'boundary_expression'];

  const allCoreLow = coreKeys.every((k) => scores[k] === null || scores[k]! < 60);
  const protHighCount = protKeys.filter((k) => scores[k] !== null && scores[k]! >= 60).length;

  if (allCoreLow && protHighCount >= 2) {
    return '当前整体状态相对稳定，你拥有一定的表达和调节资源。';
  }

  // Fallback: highest burden
  const coreScored = coreKeys
    .filter((k) => scores[k] !== null)
    .sort((a, b) => (scores[b]! - scores[a]!));
  if (coreScored.length > 0 && scores[coreScored[0]]! >= 60) {
    const names: Record<string, string> = {
      expression_burden: '表达负担',
      shame_burden: '羞耻负担',
      relationship_safety: '关系安全感方面的担忧',
    };
    return `当前${names[coreScored[0]]}偏高，建议关注这一方面的状态。`;
  }

  return '当前整体状态处于中等水平，可以继续观察和关注。';
}

function generateStatePatterns(scores: Record<DimensionKey, number | null>): string[] {
  const patterns: string[] = [];
  if (scores.expression_burden !== null && scores.expression_burden >= 60) patterns.push('当前表达负担偏高');
  if (scores.shame_burden !== null && scores.shame_burden >= 60) patterns.push('当前羞耻负担偏高');
  if (scores.relationship_safety !== null && scores.relationship_safety >= 60) patterns.push('当前关系警觉偏高');
  if (scores.communication_openness !== null && scores.communication_openness <= 39) patterns.push('当前沟通开放度偏低');
  if (scores.boundary_expression !== null && scores.boundary_expression <= 39) patterns.push('当前边界表达受阻');
  if (scores.self_acceptance !== null && scores.self_acceptance <= 39) patterns.push('当前自我接纳资源偏弱');
  return patterns;
}

function generateRecommendations(
  scores: Record<DimensionKey, number | null>,
  riskFlags: string[],
): string[] {
  const recs: string[] = [];

  // Risk-based first
  for (const flag of riskFlags) {
    const rule = RISK_FLAGS.find((r) => r.id === flag);
    if (rule) recs.push(rule.message);
  }

  // High burden
  if (scores.expression_burden !== null && scores.expression_burden >= 60) {
    recs.push('优先练习表达边界和不适，再逐步过渡到表达偏好和需要。');
  }
  if (scores.shame_burden !== null && scores.shame_burden >= 60) {
    recs.push('把注意力从"我这样正不正常"转向"这件事让我承受了什么负担"。');
  }
  if (scores.relationship_safety !== null && scores.relationship_safety >= 60) {
    recs.push('在更安全的情境中做低风险表达练习，不必从最难的话题开始。');
  }

  // Low protective
  if (scores.boundary_expression !== null && scores.boundary_expression <= 39) {
    recs.push('优先练习识别"不舒服但还没来得及说"的时刻，用一句简短表达先中止或放慢。');
  }
  if (scores.communication_openness !== null && scores.communication_openness <= 39) {
    recs.push('从描述感受而不是解释立场开始，例如先说"我现在有点紧张 / 不确定"。');
  }
  if (scores.self_acceptance !== null && scores.self_acceptance <= 39) {
    recs.push('先区分"我有这种反应"和"我就是有问题"这两件事，减少自动否定。');
  }

  // Deduplicate
  return [...new Set(recs)];
}

function determineShareLevel(
  scores: Record<DimensionKey, number | null>,
  riskFlags: string[],
): 'minimal' | 'neutral' | 'standard' {
  if (riskFlags.length > 0) return 'minimal';

  const coreKeys: DimensionKey[] = ['expression_burden', 'shame_burden', 'relationship_safety'];
  const hasHighCore = coreKeys.some((k) => scores[k] !== null && scores[k]! >= 60);
  if (hasHighCore) return 'neutral';

  return 'standard';
}

export function computeResult(answers: Record<string, AnswerValue>): TestResult {
  const dimensionKeys: DimensionKey[] = [
    'expression_burden', 'shame_burden', 'relationship_safety',
    'communication_openness', 'self_acceptance', 'boundary_expression',
  ];

  const dimensionScores = {} as Record<DimensionKey, number | null>;
  for (const key of dimensionKeys) {
    dimensionScores[key] = calcDimensionScore(answers, key);
  }

  const riskFlags = checkRiskFlags(answers);
  const stateSummary = generateStateSummary(dimensionScores);
  const statePatterns = generateStatePatterns(dimensionScores);
  const recommendations = generateRecommendations(dimensionScores, riskFlags);
  const shareLevel = determineShareLevel(dimensionScores, riskFlags);

  const prioritySignals: string[] = riskFlags.map((id) => {
    const rule = RISK_FLAGS.find((r) => r.id === id);
    return rule?.message ?? '';
  }).filter(Boolean);

  return {
    dimensionScores,
    riskFlags,
    stateSummary,
    prioritySignals,
    recommendations,
    shareLevel,
    statePatterns,
  };
}
