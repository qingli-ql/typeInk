import {
  DIMENSIONS,
  QUESTIONNAIRE_ID,
  QUESTIONNAIRE_VERSION,
  QUESTIONS,
  RISK_FLAGS,
} from './data.ts';
import {
  PATTERN_RULES,
  PROTECTIVE_HIGHLIGHTS,
  RECOMMENDATION_RULES,
  SCORE_THRESHOLDS,
  SUMMARY_RULES,
} from './rules.ts';
import type {
  AnswerValue,
  DimensionKey,
  DimensionResult,
  ResultValidity,
  RiskAssessment,
  TestResult,
} from './types.ts';

const CORE_KEYS = DIMENSIONS.filter((dimension) => dimension.layer === 'core').map((dimension) => dimension.key);
const PROTECTIVE_KEYS = DIMENSIONS.filter((dimension) => dimension.layer === 'protective').map((dimension) => dimension.key);

function reverseScore(value: number): number {
  return 6 - value;
}

export function getScoreLevel(score: number): string {
  if (score < 20) return '较低';
  if (score < 40) return '偏低';
  if (score < 60) return '中等';
  if (score < 80) return '偏高';
  return '较高';
}

function calcDimensionResult(
  answers: Record<string, AnswerValue>,
  dimension: DimensionKey,
): DimensionResult {
  const meta = DIMENSIONS.find((item) => item.key === dimension);
  if (!meta) throw new Error(`Unknown dimension: ${dimension}`);

  const questions = QUESTIONS.filter((question) => question.dimension === dimension);
  const validScores: number[] = [];

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer === 'NA' || answer === undefined) continue;
    validScores.push(question.reverse ? reverseScore(answer) : answer);
  }

  const minimumValid = Math.ceil(questions.length * meta.minValidRatio);
  if (validScores.length < minimumValid) {
    return { score: null, level: null, validCount: validScores.length, totalCount: questions.length };
  }

  const average = validScores.reduce((sum, value) => sum + value, 0) / validScores.length;
  const score = Math.round(((average - 1) / 4) * 100);
  return {
    score,
    level: getScoreLevel(score),
    validCount: validScores.length,
    totalCount: questions.length,
  };
}

function checkRiskAssessments(answers: Record<string, AnswerValue>): RiskAssessment[] {
  return RISK_FLAGS.map((rule) => {
    const validAnswers = rule.triggerQuestions
      .map((questionId) => answers[questionId])
      .filter((answer): answer is Exclude<AnswerValue, 'NA'> => answer !== undefined && answer !== 'NA');
    const triggerCount = validAnswers.filter((answer) => answer >= 4).length;
    const missingCount = rule.triggerQuestions.length - validAnswers.length;

    let status: RiskAssessment['status'] = 'clear';
    if (triggerCount >= rule.threshold) status = 'triggered';
    else if (triggerCount + missingCount >= rule.threshold) status = 'insufficient';

    return {
      id: rule.id,
      status,
      validCount: validAnswers.length,
      totalCount: rule.triggerQuestions.length,
    };
  });
}

function getValidity(
  dimensionResults: Record<DimensionKey, DimensionResult>,
  riskAssessments: RiskAssessment[],
): ResultValidity {
  const computedCore = CORE_KEYS.filter((key) => dimensionResults[key].score !== null).length;
  const computedProtective = PROTECTIVE_KEYS.filter((key) => dimensionResults[key].score !== null).length;
  const riskComplete = riskAssessments.every((assessment) => assessment.status !== 'insufficient');

  if (computedCore === CORE_KEYS.length && computedProtective === PROTECTIVE_KEYS.length && riskComplete) {
    return 'valid';
  }
  if (computedCore >= 2 && computedProtective >= 2) return 'partial';
  return 'insufficient';
}

function scoreMatches(
  dimensionResults: Record<DimensionKey, DimensionResult>,
  dimension: DimensionKey,
  operator: 'gte' | 'lte',
  value: number,
): boolean {
  const score = dimensionResults[dimension].score;
  if (score === null) return false;
  return operator === 'gte' ? score >= value : score <= value;
}

function generateStateSummary(
  dimensionResults: Record<DimensionKey, DimensionResult>,
  validity: ResultValidity,
  riskFlags: string[],
): string {
  if (validity === 'insufficient') {
    return '当前有效信息不足，暂时无法生成可靠的状态摘要。';
  }

  const hasLowProtectiveResource = PROTECTIVE_KEYS.some((key) => {
    const score = dimensionResults[key].score;
    return score !== null && score <= SCORE_THRESHOLDS.lowMaximum;
  });
  if (riskFlags.length > 0 && hasLowProtectiveResource) {
    return '当前出现了需要优先关注的边界或表达信号，同时可用的保护资源相对有限。';
  }

  for (const rule of SUMMARY_RULES) {
    const matches = rule.conditions.every((condition) =>
      scoreMatches(dimensionResults, condition.dimension, condition.operator, condition.value),
    );
    if (matches) return rule.text;
  }

  const highProtectiveCount = PROTECTIVE_KEYS.filter((key) => {
    const score = dimensionResults[key].score;
    return score !== null && score >= SCORE_THRESHOLDS.highMinimum;
  }).length;
  const hasHighCore = CORE_KEYS.some((key) => {
    const score = dimensionResults[key].score;
    return score !== null && score >= SCORE_THRESHOLDS.highMinimum;
  });

  if (!hasHighCore && highProtectiveCount >= 2) {
    return validity === 'partial'
      ? '基于当前可计算的维度，你拥有一定的表达和调节资源。'
      : '当前整体状态相对稳定，你拥有一定的表达和调节资源。';
  }

  const highestBurden = CORE_KEYS
    .filter((key) => dimensionResults[key].score !== null)
    .sort((left, right) => dimensionResults[right].score! - dimensionResults[left].score!)[0];
  if (highestBurden && dimensionResults[highestBurden].score! >= SCORE_THRESHOLDS.highMinimum) {
    const name = DIMENSIONS.find((dimension) => dimension.key === highestBurden)?.name ?? '某项负担';
    return `当前${name}偏高，建议优先关注这一方面的状态。`;
  }

  return validity === 'partial'
    ? '当前仅有部分维度信息可用，建议结合具体情境理解结果。'
    : '当前各维度大多处于中等范围，可以继续观察具体情境中的变化。';
}

function generateRecommendations(
  dimensionResults: Record<DimensionKey, DimensionResult>,
  riskFlags: string[],
  validity: ResultValidity,
): string[] {
  if (validity === 'insufficient') {
    return ['如你愿意，可以补充更多可判断的题目后再次查看结果。'];
  }

  const recommendations = riskFlags
    .map((id) => RISK_FLAGS.find((rule) => rule.id === id)?.recommendation)
    .filter((recommendation): recommendation is string => Boolean(recommendation));

  for (const rule of RECOMMENDATION_RULES) {
    if (scoreMatches(dimensionResults, rule.dimension, rule.operator, rule.value)) {
      recommendations.push(rule.text);
    }
  }

  return [...new Set(recommendations)].slice(0, 5);
}

function generatePatterns(
  dimensionResults: Record<DimensionKey, DimensionResult>,
  hasRisk: boolean,
): string[] {
  const patterns = PATTERN_RULES
    .filter((rule) => scoreMatches(dimensionResults, rule.dimension, rule.operator, rule.value))
    .map((rule) => rule.text);
  return hasRisk ? patterns.slice(0, 2) : patterns;
}

function generateProtectiveHighlights(
  dimensionResults: Record<DimensionKey, DimensionResult>,
): string[] {
  return PROTECTIVE_KEYS
    .filter((key) => {
      const score = dimensionResults[key].score;
      return score !== null && score >= SCORE_THRESHOLDS.highMinimum;
    })
    .map((key) => PROTECTIVE_HIGHLIGHTS[key])
    .filter((highlight): highlight is string => Boolean(highlight));
}

function determineShareLevel(
  dimensionResults: Record<DimensionKey, DimensionResult>,
  validity: ResultValidity,
  riskFlags: string[],
): TestResult['shareLevel'] {
  if (validity === 'insufficient') return 'none';
  if (riskFlags.length > 0) return 'minimal';

  const hasHighCore = CORE_KEYS.some((key) => {
    const score = dimensionResults[key].score;
    return score !== null && score >= SCORE_THRESHOLDS.highMinimum;
  });
  if (hasHighCore || validity === 'partial') return 'neutral';

  const highProtectiveCount = PROTECTIVE_KEYS.filter((key) => {
    const score = dimensionResults[key].score;
    return score !== null && score >= SCORE_THRESHOLDS.highMinimum;
  }).length;
  return highProtectiveCount >= 2 ? 'standard' : 'neutral';
}

export function computeResult(answers: Record<string, AnswerValue>): TestResult {
  const dimensionResults = {} as Record<DimensionKey, DimensionResult>;
  for (const dimension of DIMENSIONS) {
    dimensionResults[dimension.key] = calcDimensionResult(answers, dimension.key);
  }

  const riskAssessments = checkRiskAssessments(answers);
  const riskFlags = riskAssessments
    .filter((assessment) => assessment.status === 'triggered')
    .map((assessment) => assessment.id);
  const validity = getValidity(dimensionResults, riskAssessments);
  const stateSummary = generateStateSummary(dimensionResults, validity, riskFlags);
  const recommendations = generateRecommendations(dimensionResults, riskFlags, validity);
  const protectiveHighlights = generateProtectiveHighlights(dimensionResults);
  const shareLevel = determineShareLevel(dimensionResults, validity, riskFlags);
  const shareRecommendation = riskFlags
    .map((id) => RISK_FLAGS.find((rule) => rule.id === id)?.shareRecommendation)
    .find((recommendation): recommendation is string => Boolean(recommendation));

  return {
    questionnaireId: QUESTIONNAIRE_ID,
    questionnaireVersion: QUESTIONNAIRE_VERSION,
    validity,
    validAnswerCount: QUESTIONS.filter((question) => {
      const answer = answers[question.id];
      return answer !== undefined && answer !== 'NA';
    }).length,
    dimensionResults,
    riskAssessments,
    riskFlags,
    riskAssessmentComplete: riskAssessments.every((assessment) => assessment.status !== 'insufficient'),
    stateSummary,
    prioritySignals: riskFlags
      .map((id) => RISK_FLAGS.find((rule) => rule.id === id)?.message)
      .filter((message): message is string => Boolean(message)),
    recommendations,
    shareLevel,
    shareRecommendation,
    protectiveHighlights,
    statePatterns: validity === 'insufficient' ? [] : generatePatterns(dimensionResults, riskFlags.length > 0),
  };
}
