import assert from 'node:assert/strict';
import test from 'node:test';

import { QUESTIONNAIRE_ID, QUESTIONNAIRE_VERSION, QUESTIONS } from '../src/pages/intimacy-test/data.ts';
import { parseStoredProgress, parseStoredResult, sanitizeAnswers } from '../src/pages/intimacy-test/storage.ts';

const timestamp = '2026-07-21T00:00:00.000Z';

test('answer sanitization keeps only known questions and valid values', () => {
  assert.deepEqual(sanitizeAnswers({ q1: 4, q2: 'NA', q3: 9, unknown: 2 }), { q1: 4, q2: 'NA' });
});

test('progress parser clamps index and rejects old questionnaire versions', () => {
  const validProgress = JSON.stringify({
    questionnaireId: QUESTIONNAIRE_ID,
    version: QUESTIONNAIRE_VERSION,
    currentIndex: 999,
    answers: { q1: 3 },
    startedAt: timestamp,
    updatedAt: timestamp,
  });
  assert.equal(parseStoredProgress(validProgress)?.currentIndex, QUESTIONS.length - 1);

  const oldProgress = JSON.stringify({
    questionnaireId: QUESTIONNAIRE_ID,
    version: 'v1',
    currentIndex: 2,
    answers: { q1: 3 },
    startedAt: timestamp,
    updatedAt: timestamp,
  });
  assert.equal(parseStoredProgress(oldProgress), null);
});

test('completed result requires one legal answer for every current question', () => {
  const incompleteResult = JSON.stringify({
    questionnaireId: QUESTIONNAIRE_ID,
    version: QUESTIONNAIRE_VERSION,
    answers: { q1: 3 },
    completedAt: timestamp,
  });
  assert.equal(parseStoredResult(incompleteResult), null);

  const completeResult = JSON.stringify({
    questionnaireId: QUESTIONNAIRE_ID,
    version: QUESTIONNAIRE_VERSION,
    answers: Object.fromEntries(QUESTIONS.map((question) => [question.id, 'NA'])),
    completedAt: timestamp,
  });
  assert.ok(parseStoredResult(completeResult));
});

test('malformed JSON never escapes the parser', () => {
  assert.equal(parseStoredProgress('{not-json'), null);
  assert.equal(parseStoredResult('{not-json'), null);
});
