import {
  ANSWER_VALUES,
  PROGRESS_STORAGE_KEY,
  QUESTIONNAIRE_ID,
  QUESTIONNAIRE_VERSION,
  QUESTIONS,
  RESULT_STORAGE_KEY,
} from './data.ts';
import type { AnswerValue, StoredProgress, StoredResult } from './types.ts';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const questionIds = new Set(QUESTIONS.map((question) => question.id));
const answerValues = new Set<unknown>(ANSWER_VALUES);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

export function sanitizeAnswers(value: unknown): Record<string, AnswerValue> {
  if (!isRecord(value)) return {};
  const answers: Record<string, AnswerValue> = {};
  for (const [questionId, answer] of Object.entries(value)) {
    if (questionIds.has(questionId) && answerValues.has(answer)) {
      answers[questionId] = answer as AnswerValue;
    }
  }
  return answers;
}

export function parseStoredProgress(raw: string | null): StoredProgress | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) return null;
    if (value.questionnaireId !== QUESTIONNAIRE_ID || value.version !== QUESTIONNAIRE_VERSION) return null;
    if (!Number.isInteger(value.currentIndex)) return null;
    if (!isIsoDate(value.startedAt) || !isIsoDate(value.updatedAt)) return null;

    return {
      questionnaireId: QUESTIONNAIRE_ID,
      version: QUESTIONNAIRE_VERSION,
      currentIndex: Math.min(Math.max(value.currentIndex as number, 0), QUESTIONS.length - 1),
      answers: sanitizeAnswers(value.answers),
      startedAt: value.startedAt,
      updatedAt: value.updatedAt,
    };
  } catch {
    return null;
  }
}

export function parseStoredResult(raw: string | null): StoredResult | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) return null;
    if (value.questionnaireId !== QUESTIONNAIRE_ID || value.version !== QUESTIONNAIRE_VERSION) return null;
    if (!isIsoDate(value.completedAt)) return null;
    const answers = sanitizeAnswers(value.answers);
    if (!QUESTIONS.every((question) => answers[question.id] !== undefined)) return null;

    return {
      questionnaireId: QUESTIONNAIRE_ID,
      version: QUESTIONNAIRE_VERSION,
      answers,
      completedAt: value.completedAt,
    };
  } catch {
    return null;
  }
}

export function loadProgress(storage: StorageLike = window.localStorage): StoredProgress | null {
  try {
    return parseStoredProgress(storage.getItem(PROGRESS_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function loadResult(storage: StorageLike = window.localStorage): StoredResult | null {
  try {
    return parseStoredResult(storage.getItem(RESULT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveProgress(
  progress: Omit<StoredProgress, 'questionnaireId' | 'version' | 'updatedAt'>,
  storage: StorageLike = window.localStorage,
): boolean {
  try {
    const value: StoredProgress = {
      questionnaireId: QUESTIONNAIRE_ID,
      version: QUESTIONNAIRE_VERSION,
      ...progress,
      updatedAt: new Date().toISOString(),
    };
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function saveResult(
  answers: Record<string, AnswerValue>,
  storage: StorageLike = window.localStorage,
): boolean {
  try {
    const value: StoredResult = {
      questionnaireId: QUESTIONNAIRE_ID,
      version: QUESTIONNAIRE_VERSION,
      answers: sanitizeAnswers(answers),
      completedAt: new Date().toISOString(),
    };
    if (!QUESTIONS.every((question) => value.answers[question.id] !== undefined)) return false;
    storage.setItem(RESULT_STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress(storage: StorageLike = window.localStorage): void {
  try {
    storage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

export function clearResult(storage: StorageLike = window.localStorage): void {
  try {
    storage.removeItem(RESULT_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

export function clearAssessmentData(storage: StorageLike = window.localStorage): void {
  clearProgress(storage);
  clearResult(storage);
}
