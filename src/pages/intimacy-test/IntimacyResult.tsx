import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STORAGE_KEY, DIMENSIONS, RISK_FLAGS } from './data';
import { computeResult, getScoreLevel } from './scoring';
import type { AnswerValue, TestResult, DimensionKey } from './types';

const dimensionColors: Record<DimensionKey, string> = {
  expression_burden: '#D97757',
  shame_burden: '#b45e8a',
  relationship_safety: '#7c8db5',
  communication_openness: '#5a9e8f',
  self_acceptance: '#8aad6b',
  boundary_expression: '#c4944a',
};

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

function ShareCard({ result }: { result: TestResult }) {
  const [show, setShow] = useState(false);
  if (!show) {
    return (
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShow(true)}
        className="w-full cursor-pointer rounded-xl py-3 text-center"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-muted)',
          fontSize: '0.85rem',
        }}
      >
        生成分享卡片
      </motion.button>
    );
  }
  const isMinimal = result.shareLevel === 'minimal';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card relative"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
        亲密表达与边界状态评估
      </div>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
        {result.stateSummary}
      </p>
      {!isMinimal && result.recommendations.length > 0 && (
        <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          {result.recommendations[0]}
        </p>
      )}
      <div className="divider mt-4 pt-3" style={{ fontSize: '0.65rem', color: 'var(--color-muted)' }}>
        仅反映最近状态 · 不替代专业支持
      </div>
      <button
        onClick={() => setShow(false)}
        className="absolute top-4 right-4 cursor-pointer"
        style={{ background: 'none', border: 'none', color: 'var(--color-muted)', fontSize: '0.75rem' }}
      >
        ✕
      </button>
    </motion.div>
  );
}

export function IntimacyResult() {
  const navigate = useNavigate();

  // Read answers synchronously from localStorage on mount — no navigate in useEffect
  const result = useMemo<TestResult | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY + '-result-answers');
      if (!raw) return null;
      const answers: Record<string, AnswerValue> = JSON.parse(raw);
      return computeResult(answers);
    } catch {
      return null;
    }
  }, []);

  // Redirect only if no result
  useEffect(() => {
    if (!result) navigate('/intimacy-test', { replace: true });
  }, [result, navigate]);

  const restart = () => {
    localStorage.removeItem(STORAGE_KEY + '-result-answers');
    localStorage.removeItem(STORAGE_KEY + '-answers');
    navigate('/intimacy-test');
  };

  if (!result) return null;

  const hasRisk = result.riskFlags.length > 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <div className="max-w-2xl mx-auto px-5 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-eyebrow mb-6"
        >
          评估结果
        </motion.div>

        {/* 1. State Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="section-title" style={{ marginBottom: '0.75rem' }}>
            当前状态摘要
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-ink)' }}>
            {result.stateSummary}
          </p>
        </motion.div>

        {/* 2. Risk signals */}
        {hasRisk && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-5 mb-8"
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
            }}
          >
            <div className="text-label" style={{ color: '#dc2626', marginBottom: '0.75rem' }}>
              需要优先关注的信号
            </div>
            {result.riskFlags.map((flagId) => {
              const rule = RISK_FLAGS.find((r) => r.id === flagId);
              if (!rule) return null;
              return (
                <div key={flagId} className="mb-3 last:mb-0">
                  <div style={{ fontSize: '0.85rem', color: '#b91c1c', fontWeight: 500, marginBottom: '0.2rem' }}>
                    {rule.name}
                  </div>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555' }}>
                    {rule.message}
                  </p>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* 3. Dimension Results */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="section-title" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
            六维度结果
          </h2>
          <div className="flex flex-col gap-3">
            {DIMENSIONS.map((dim, i) => {
              const score = result.dimensionScores[dim.key];
              const isNull = score === null;
              const color = dimensionColors[dim.key];
              return (
                <motion.div
                  key={dim.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="card"
                  style={{ padding: '1.25rem' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: color }}
                      />
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        {dim.name}
                      </span>
                      <span
                        className="tag"
                        style={
                          dim.layer === 'core'
                            ? { color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }
                            : { color: '#6b9e6b', borderColor: '#6b9e6b' }
                        }
                      >
                        {dim.layer === 'core' ? '核心' : '保护'}
                      </span>
                    </div>
                    <span className="text-mono-xs" style={{ color: isNull ? 'var(--color-muted)' : 'var(--color-ink)' }}>
                      {isNull ? '信息不足' : `${score} · ${getScoreLevel(score)}`}
                    </span>
                  </div>
                  {!isNull && <ScoreBar score={score} color={color} />}
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.5rem' }}>
                    {dim.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 4. Recommendations */}
        {result.recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card mb-8"
            style={{ background: 'var(--color-surface)' }}
          >
            <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              行动建议
            </h2>
            <div className="flex flex-col gap-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      background: 'rgba(217,119,87,0.12)',
                      fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555' }}>{rec}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 5. State Patterns */}
        {result.statePatterns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: '1.1rem',
              color: 'var(--color-muted)', marginBottom: '0.75rem',
            }}>
              次级状态模式
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.statePatterns.map((p) => (
                <span key={p} className="tag">{p}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <ShareCard result={result} />
        </motion.div>

        {/* Restart & disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <button onClick={restart} className="btn-ghost">
            重新测试
          </button>
          <p style={{ fontSize: '0.65rem', color: 'var(--color-muted)', textAlign: 'center', lineHeight: 1.6 }}>
            本结果仅反映最近状态，可随关系情境和支持资源变化
            <br />
            建议在私密设备上查看 · 不建议将结果用于评判他人 · 不替代专业支持
          </p>
        </motion.div>
      </div>
    </div>
  );
}
