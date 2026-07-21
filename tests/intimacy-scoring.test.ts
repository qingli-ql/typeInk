import assert from 'node:assert/strict';
import test from 'node:test';

import { QUESTIONS } from '../src/pages/intimacy-test/data.ts';
import { computeResult, getScoreLevel } from '../src/pages/intimacy-test/scoring.ts';
import type { AnswerValue, Layer } from '../src/pages/intimacy-test/types.ts';

function answersForLayerScores(coreScore: 1 | 5, protectiveScore: 1 | 5) {
  const answers: Record<string, AnswerValue> = {};
  for (const question of QUESTIONS) {
    const desiredScore = question.layer === 'core' ? coreScore : protectiveScore;
    answers[question.id] = question.reverse ? (6 - desiredScore) as AnswerValue : desiredScore;
  }
  return answers;
}

function answersForSelectedLayers(layers: Layer[]) {
  const answers = Object.fromEntries(QUESTIONS.map((question) => [question.id, 'NA'])) as Record<string, AnswerValue>;
  for (const question of QUESTIONS) {
    if (!layers.includes(question.layer)) continue;
    const desiredScore = question.layer === 'core' ? 1 : 5;
    answers[question.id] = question.reverse ? (6 - desiredScore) as AnswerValue : desiredScore;
  }
  return answers;
}

test('healthy response pattern yields low burdens, high resources, and standard sharing', () => {
  const result = computeResult(answersForLayerScores(1, 5));

  assert.equal(result.questionnaireVersion, 'v2');
  assert.equal(result.validity, 'valid');
  assert.deepEqual(result.riskFlags, []);
  assert.equal(result.dimensionResults.expression_burden.score, 0);
  assert.equal(result.dimensionResults.relationship_vigilance.score, 0);
  assert.equal(result.dimensionResults.communication_openness.score, 100);
  assert.equal(result.dimensionResults.self_acceptance.score, 100);
  assert.equal(result.dimensionResults.boundary_expression.score, 100);
  assert.equal(result.shareLevel, 'standard');
  assert.ok(result.protectiveHighlights.length >= 2);
});

test('strained response pattern yields high burdens, low resources, and all risk signals', () => {
  const result = computeResult(answersForLayerScores(5, 1));

  assert.equal(result.validity, 'valid');
  assert.equal(result.dimensionResults.expression_burden.score, 100);
  assert.equal(result.dimensionResults.communication_openness.score, 0);
  assert.deepEqual(result.riskFlags, ['boundary_pressure', 'rumination_load', 'expression_avoidance']);
  assert.equal(result.shareLevel, 'minimal');
  assert.ok(result.shareRecommendation);
  assert.ok(result.statePatterns.length <= 2);
});

test('all NA responses are insufficient and cannot be shared', () => {
  const answers = Object.fromEntries(QUESTIONS.map((question) => [question.id, 'NA'])) as Record<string, AnswerValue>;
  const result = computeResult(answers);

  assert.equal(result.validity, 'insufficient');
  assert.equal(result.validAnswerCount, 0);
  assert.equal(result.shareLevel, 'none');
  assert.deepEqual(result.statePatterns, []);
  assert.equal(result.riskAssessmentComplete, false);
});

test('missing an entire layer is insufficient rather than a normal result', () => {
  const result = computeResult(answersForSelectedLayers(['core']));
  assert.equal(result.validity, 'insufficient');
  assert.equal(result.shareLevel, 'none');
});

test('risk signals trigger exactly at the configured threshold', () => {
  const answers = answersForLayerScores(1, 5);
  answers.q21 = 5;
  let result = computeResult(answers);
  assert.equal(result.riskFlags.includes('boundary_pressure'), false);

  answers.q23 = 5;
  result = computeResult(answers);
  assert.equal(result.riskFlags.includes('boundary_pressure'), true);
});

test('risk assessment reports insufficient coverage instead of clear', () => {
  const answers = answersForLayerScores(1, 5);
  answers.q21 = 'NA';
  answers.q23 = 'NA';
  answers.q24 = 'NA';
  const result = computeResult(answers);
  const boundaryRisk = result.riskAssessments.find((assessment) => assessment.id === 'boundary_pressure');

  assert.equal(boundaryRisk?.status, 'insufficient');
  assert.equal(result.riskAssessmentComplete, false);
});

test('risk assessment stays insufficient when a missing answer could change the outcome', () => {
  const answers = answersForLayerScores(1, 5);
  answers.q21 = 5;
  answers.q23 = 1;
  answers.q24 = 'NA';
  const result = computeResult(answers);
  const boundaryRisk = result.riskAssessments.find((assessment) => assessment.id === 'boundary_pressure');

  assert.equal(boundaryRisk?.status, 'insufficient');
  assert.equal(result.riskAssessmentComplete, false);
  assert.equal(result.riskFlags.includes('boundary_pressure'), false);
});

test('risk assessment is clear when missing answers cannot reach the threshold', () => {
  const answers = answersForLayerScores(1, 5);
  answers.q21 = 1;
  answers.q23 = 1;
  answers.q24 = 'NA';
  const result = computeResult(answers);
  const boundaryRisk = result.riskAssessments.find((assessment) => assessment.id === 'boundary_pressure');

  assert.equal(boundaryRisk?.status, 'clear');
});

test('score level boundaries remain stable', () => {
  assert.equal(getScoreLevel(19), '较低');
  assert.equal(getScoreLevel(20), '偏低');
  assert.equal(getScoreLevel(39), '偏低');
  assert.equal(getScoreLevel(40), '中等');
  assert.equal(getScoreLevel(59), '中等');
  assert.equal(getScoreLevel(60), '偏高');
  assert.equal(getScoreLevel(79), '偏高');
  assert.equal(getScoreLevel(80), '较高');
});
