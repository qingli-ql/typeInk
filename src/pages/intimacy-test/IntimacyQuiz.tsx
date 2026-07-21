import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ANSWER_VALUES, OPTION_LABELS, QUESTIONS } from './data.ts';
import { clearProgress, loadProgress, saveProgress, saveResult } from './storage.ts';
import type { AnswerValue } from './types.ts';

export function IntimacyQuiz() {
  const navigate = useNavigate();
  const [initialProgress] = useState(() => loadProgress());
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(initialProgress?.answers ?? {});
  const [index, setIndex] = useState(initialProgress?.currentIndex ?? 0);
  const [direction, setDirection] = useState(0);
  const [storageError, setStorageError] = useState(false);
  const startedAt = useRef(initialProgress?.startedAt ?? new Date().toISOString());

  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const answered = QUESTIONS.filter((item) => answers[item.id] !== undefined).length;
  const currentAnswer = answers[question.id];
  const progress = answered / total;
  const isLast = index === total - 1;
  const canSubmit = QUESTIONS.every((item) => answers[item.id] !== undefined);
  const missingCount = total - answered;
  const firstUnansweredIndex = QUESTIONS.findIndex((item) => answers[item.id] === undefined);

  useEffect(() => {
    const saved = saveProgress({
      currentIndex: index,
      answers,
      startedAt: startedAt.current,
    });
    setStorageError(!saved);
  }, [answers, index]);

  const selectAnswer = (value: AnswerValue) => {
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
  };

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  const submit = () => {
    if (!canSubmit) return;
    if (!saveResult(answers)) {
      setStorageError(true);
      return;
    }
    clearProgress();
    navigate('/intimacy-test/result');
  };

  const variants = {
    enter: (value: number) => ({ x: value > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (value: number) => ({ x: value > 0 ? -48 : 48, opacity: 0 }),
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-xl px-5 pb-32 pt-8 md:py-14">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/intimacy-test')}
            className="btn-ghost"
            style={{ fontSize: '0.7rem' }}
          >
            返回
          </button>
          <span className="text-label" aria-live="polite">{answered}/{total}</span>
        </div>

        <div
          className="mb-8 h-1 w-full overflow-hidden rounded-full"
          style={{ background: 'var(--color-border)' }}
          role="progressbar"
          aria-label="答题进度"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answered}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--color-accent)' }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        <div className="section-eyebrow" style={{ marginBottom: '0.5rem' }}>
          问题 {index + 1}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <p
              id={`${question.id}-text`}
              className="mb-6 min-h-[100px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                lineHeight: 1.7,
              }}
            >
              {question.text}
            </p>

            <fieldset aria-labelledby={`${question.id}-text`} className="mb-8 flex flex-col gap-2">
              <legend className="sr-only">请选择最符合当前情况的选项</legend>
              {OPTION_LABELS.map((label, optionIndex) => {
                const value = ANSWER_VALUES[optionIndex];
                const selected = currentAnswer === value;
                const isNA = value === 'NA';
                const visibleLabel = label === '不适用' ? '不适用 / 没有经历 / 无法判断' : label;

                return (
                  <motion.label
                    key={label}
                    whileTap={{ scale: 0.99 }}
                    className="w-full cursor-pointer rounded-lg px-4 py-3.5 text-left transition-colors duration-150 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2"
                    style={{
                      background: selected
                        ? isNA ? 'var(--color-surface)' : 'var(--color-accent)'
                        : '#fff',
                      border: `1px solid ${selected ? (isNA ? 'var(--color-muted)' : 'var(--color-accent)') : 'var(--color-border)'}`,
                      color: selected
                        ? isNA ? 'var(--color-ink)' : '#fff'
                        : isNA ? 'var(--color-muted)' : 'var(--color-ink)',
                      fontSize: '0.9rem',
                      outlineColor: 'var(--color-accent)',
                    }}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={String(value)}
                      checked={selected}
                      onChange={() => selectAnswer(value)}
                      className="sr-only"
                    />
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                        style={{
                          borderColor: selected ? (isNA ? 'var(--color-muted)' : '#fff') : 'var(--color-border)',
                          background: selected ? (isNA ? 'var(--color-muted)' : 'rgba(255,255,255,0.3)') : 'transparent',
                        }}
                      >
                        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      {visibleLabel}
                    </span>
                  </motion.label>
                );
              })}
            </fieldset>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="rounded-lg px-4 py-2 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: index === 0 ? 'var(--color-border)' : 'var(--color-muted)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
            }}
          >
            上一题
          </button>

          {isLast ? (
            <motion.button
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              onClick={submit}
              disabled={!canSubmit}
              className="rounded-lg px-5 py-2 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: canSubmit ? '#fff' : 'var(--color-border)',
                background: canSubmit ? 'var(--color-accent)' : 'transparent',
                border: canSubmit ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              }}
            >
              查看结果
            </motion.button>
          ) : (
            <button
              onClick={() => goTo(index + 1)}
              className="cursor-pointer rounded-lg px-4 py-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-muted)',
                background: 'transparent',
                border: '1px solid var(--color-border)',
              }}
            >
              下一题
            </button>
          )}
        </div>

        {isLast && !canSubmit && (
          <div className="mt-3 flex flex-wrap items-center justify-end gap-2" style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
            <span>还有 {missingCount} 题未作答</span>
            {firstUnansweredIndex >= 0 && (
              <button
                onClick={() => goTo(firstUnansweredIndex)}
                className="cursor-pointer rounded-lg px-2 py-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-accent)',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                }}
              >
                跳到第一道未完成题
              </button>
            )}
          </div>
        )}

        {storageError && (
          <p className="mt-4 text-center text-xs" role="alert" style={{ color: '#b91c1c' }}>
            当前浏览器无法保存进度，请保持此页面开启后继续作答。
          </p>
        )}

        <nav className="mt-8 flex flex-wrap justify-center gap-1.5" aria-label="题目导航">
          {QUESTIONS.map((item, questionIndex) => {
            const isAnswered = answers[item.id] !== undefined;
            const isCurrent = questionIndex === index;
            return (
              <button
                key={item.id}
                onClick={() => goTo(questionIndex)}
                className="cursor-pointer"
                aria-label={`第 ${questionIndex + 1} 题${isAnswered ? '，已作答' : '，未作答'}`}
                aria-current={isCurrent ? 'step' : undefined}
                style={{
                  width: isCurrent ? '18px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  border: 'none',
                  background: isCurrent
                    ? 'var(--color-accent)'
                    : isAnswered
                      ? 'rgba(217,119,87,0.35)'
                      : 'var(--color-border)',
                  transition: 'all 0.2s ease',
                }}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}
