import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, DIMENSIONS, OPTION_LABELS, STORAGE_KEY } from './data';
import type { AnswerValue } from './types';

function loadAnswers(): Record<string, AnswerValue> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY + '-answers');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers: Record<string, AnswerValue>) {
  localStorage.setItem(STORAGE_KEY + '-answers', JSON.stringify(answers));
}

const optionValues: AnswerValue[] = [1, 2, 3, 4, 5, 'NA'];

export function IntimacyQuiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(loadAnswers);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const answered = Object.keys(answers).length;
  const currentAnswer = answers[question.id];
  const dim = DIMENSIONS.find((d) => d.key === question.dimension);

  // Count answered per dimension for progress hint
  const dimQuestions = QUESTIONS.filter((q) => q.dimension === question.dimension);
  const dimAnswered = dimQuestions.filter((q) => answers[q.id] !== undefined).length;

  useEffect(() => {
    saveAnswers(answers);
  }, [answers]);

  const selectAnswer = useCallback(
    (val: AnswerValue) => {
      setAnswers((prev) => ({ ...prev, [question.id]: val }));
      if (index < total - 1) {
        setTimeout(() => {
          setDirection(1);
          setIndex((i) => i + 1);
        }, 280);
      }
    },
    [question.id, index, total],
  );

  const goPrev = () => {
    if (index > 0) { setDirection(-1); setIndex((i) => i - 1); }
  };
  const goNext = () => {
    if (index < total - 1) { setDirection(1); setIndex((i) => i + 1); }
  };

  const submit = () => {
    localStorage.setItem(STORAGE_KEY + '-result-answers', JSON.stringify(answers));
    localStorage.removeItem(STORAGE_KEY + '-answers');
    navigate('/intimacy-test/result');
  };

  // Debug: fill all answers with a given value
  const debugFill = (val: 1 | 5) => {
    const filled: Record<string, AnswerValue> = {};
    for (const q of QUESTIONS) filled[q.id] = val;
    setAnswers(filled);
    setIndex(total - 1);
  };

  const progress = answered / total;
  const isLast = index === total - 1;
  const canSubmit = answered >= total;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <div className="max-w-xl mx-auto px-5 py-8 md:py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/intimacy-test')}
            className="btn-ghost"
            style={{ fontSize: '0.7rem' }}
          >
            ← 返回
          </button>
          <div className="flex items-center gap-3">
            {/* Debug toggle */}
            <button
              onClick={() => setShowDebug((v) => !v)}
              className="cursor-pointer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                color: 'var(--color-muted)', background: 'none', border: 'none',
                opacity: 0.4,
              }}
            >
              DEBUG
            </button>
            <span className="text-label">{answered}/{total}</span>
          </div>
        </div>

        {/* Debug panel */}
        <AnimatePresence>
          {showDebug && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div
                className="flex gap-2 p-3 rounded-lg"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <button
                  onClick={() => debugFill(1)}
                  className="cursor-pointer rounded-lg px-3 py-1.5"
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    background: '#fff', border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  全选 1（非常不同意）
                </button>
                <button
                  onClick={() => debugFill(5)}
                  className="cursor-pointer rounded-lg px-3 py-1.5"
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    background: '#fff', border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  全选 5（非常同意）
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div
          className="w-full h-1 rounded-full mb-6 overflow-hidden"
          style={{ background: 'var(--color-border)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--color-accent)' }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Dimension hint */}
        <motion.div
          key={question.dimension}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-2"
        >
          <span
            className="tag"
            style={
              dim?.layer === 'core'
                ? { color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }
                : { color: '#6b9e6b', borderColor: '#6b9e6b' }
            }
          >
            {dim?.layer === 'core' ? '核心维度' : '保护维度'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)' }}>
            {dim?.name} · {dimAnswered}/{dimQuestions.length}
          </span>
        </motion.div>

        {/* Question number */}
        <div className="section-eyebrow mb-3" style={{ marginBottom: '0.5rem' }}>
          问题 {index + 1}
        </div>

        {/* Question text */}
        <div className="min-h-[100px] mb-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.p
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                lineHeight: 1.7,
              }}
            >
              {question.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Options */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id + '-opts'}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col gap-2 mb-8"
          >
            {OPTION_LABELS.map((label, i) => {
              const val = optionValues[i];
              const selected = currentAnswer === val;
              const isNA = val === 'NA';

              return (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAnswer(val)}
                  className="w-full text-left rounded-lg px-4 py-3.5 cursor-pointer transition-all duration-150"
                  style={{
                    background: selected
                      ? isNA ? 'var(--color-surface)' : 'var(--color-accent)'
                      : '#fff',
                    border: `1px solid ${selected ? (isNA ? 'var(--color-muted)' : 'var(--color-accent)') : 'var(--color-border)'}`,
                    color: selected
                      ? isNA ? 'var(--color-ink)' : '#fff'
                      : isNA ? 'var(--color-muted)' : 'var(--color-ink)',
                    fontSize: '0.9rem',
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: selected ? (isNA ? 'var(--color-muted)' : '#fff') : 'var(--color-border)',
                        background: selected ? (isNA ? 'var(--color-muted)' : 'rgba(255,255,255,0.3)') : 'transparent',
                      }}
                    >
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: isNA ? '#fff' : '#fff' }}
                        />
                      )}
                    </span>
                    {label === '不适用' ? '不适用 / 没有经历 / 无法判断' : label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="cursor-pointer rounded-lg px-4 py-2"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: index === 0 ? 'var(--color-border)' : 'var(--color-muted)',
              background: 'transparent',
              border: `1px solid ${index === 0 ? 'var(--color-border)' : 'var(--color-border)'}`,
            }}
          >
            上一题
          </button>

          {isLast ? (
            <motion.button
              whileHover={canSubmit ? { scale: 1.03 } : {}}
              whileTap={canSubmit ? { scale: 0.97 } : {}}
              onClick={canSubmit ? submit : undefined}
              className="cursor-pointer rounded-lg px-5 py-2"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: canSubmit ? '#fff' : 'var(--color-border)',
                background: canSubmit ? 'var(--color-accent)' : 'transparent',
                border: canSubmit ? 'none' : '1px solid var(--color-border)',
              }}
            >
              查看结果
            </motion.button>
          ) : (
            <button
              onClick={goNext}
              className="cursor-pointer rounded-lg px-4 py-2"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: 'var(--color-muted)',
                background: 'transparent',
                border: '1px solid var(--color-border)',
              }}
            >
              下一题
            </button>
          )}
        </div>

        {/* Quick jump dots */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-8">
          {QUESTIONS.map((q, i) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = i === index;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}
