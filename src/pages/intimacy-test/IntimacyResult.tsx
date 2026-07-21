import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DIMENSIONS, RISK_FLAGS } from './data.ts';
import { computeResult } from './scoring.ts';
import { clearAssessmentData, loadResult } from './storage.ts';
import type { DimensionKey, TestResult } from './types.ts';

const dimensionColors: Record<DimensionKey, string> = {
  expression_burden: '#D97757',
  shame_burden: '#b45e8a',
  relationship_vigilance: '#7c8db5',
  communication_openness: '#5a9e8f',
  self_acceptance: '#8aad6b',
  boundary_expression: '#c4944a',
};

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--color-border)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  );
}

function ShareCard({ result }: { result: TestResult }) {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState('');
  if (result.shareLevel === 'none') return null;

  const supportLine = result.shareLevel === 'minimal'
    ? result.shareRecommendation
    : result.protectiveHighlights[0] ?? result.recommendations[0];
  const shareText = [
    '亲密表达与边界状态自我觉察',
    result.stateSummary,
    supportLine,
    '仅反映最近状态，不替代专业支持。',
  ].filter(Boolean).join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setFeedback('已复制中性摘要');
    } catch {
      setFeedback('当前浏览器无法复制，请手动选择文字');
    }
  };

  const share = async () => {
    if (!navigator.share) {
      await copy();
      return;
    }
    try {
      await navigator.share({ title: '亲密表达与边界状态自我觉察', text: shareText });
      setFeedback('已打开系统分享');
    } catch {
      setFeedback('已取消分享');
    }
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full cursor-pointer rounded-lg py-3 text-center"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontSize: '0.85rem' }}
      >
        查看可分享摘要
      </button>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ background: 'var(--color-surface)' }}>
      <div className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
        亲密表达与边界状态自我觉察
      </div>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>{result.stateSummary}</p>
      {supportLine && <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--color-muted)' }}>{supportLine}</p>}
      <div className="divider mt-4 flex flex-wrap gap-2 pt-4">
        <button onClick={copy} className="cursor-pointer rounded-md px-3 py-2 text-xs" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
          复制摘要
        </button>
        <button onClick={share} className="cursor-pointer rounded-md px-3 py-2 text-xs" style={{ background: 'var(--color-accent)', border: '1px solid var(--color-accent)', color: '#fff' }}>
          系统分享
        </button>
        <button onClick={() => setExpanded(false)} className="ml-auto cursor-pointer px-2 text-xs" style={{ background: 'none', border: 'none', color: 'var(--color-muted)' }}>
          收起
        </button>
      </div>
      {feedback && <p className="mt-3 text-xs" role="status" style={{ color: 'var(--color-muted)' }}>{feedback}</p>}
    </motion.div>
  );
}

export function IntimacyResult() {
  const navigate = useNavigate();
  const [storedResult] = useState(() => loadResult());
  const result = useMemo(() => storedResult ? computeResult(storedResult.answers) : null, [storedResult]);

  useEffect(() => {
    if (!result) navigate('/intimacy-test', { replace: true });
  }, [result, navigate]);

  if (!result) return null;

  const hasRisk = result.riskFlags.length > 0;
  const isInsufficient = result.validity === 'insufficient';
  const restart = () => {
    clearAssessmentData();
    navigate('/intimacy-test/quiz');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-2xl px-5 pb-32 pt-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="section-eyebrow mb-6">
          自我觉察结果 · v2
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <h1 className="section-title" style={{ marginBottom: '0.75rem' }}>
            {isInsufficient ? '暂时无法生成完整结果' : '当前状态摘要'}
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-ink)' }}>{result.stateSummary}</p>
        </motion.section>

        {(result.validity === 'partial' || !result.riskAssessmentComplete) && (
          <div className="mb-8 rounded-lg border px-4 py-3 text-sm leading-6" style={{ borderColor: '#e7c98d', background: '#fffaf0', color: '#705b32' }}>
            {result.validity === 'partial' && '部分维度因有效答案不足未生成分数。'}
            {!result.riskAssessmentComplete && '部分风险题信息不足，“未触发”不等于已经排除相关情况。'}
          </div>
        )}

        {hasRisk && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 rounded-lg p-5" style={{ background: '#fef5f3', border: '1px solid #f2c7bc' }} aria-labelledby="priority-signals">
            <h2 id="priority-signals" className="text-label" style={{ color: '#b64f3c', marginBottom: '0.9rem' }}>需要优先关注的信号</h2>
            <div className="space-y-4">
              {result.riskFlags.map((flagId) => {
                const rule = RISK_FLAGS.find((item) => item.id === flagId);
                if (!rule) return null;
                return (
                  <div key={flagId}>
                    <h3 style={{ fontSize: '0.9rem', color: '#943f31', fontWeight: 600, marginBottom: '0.25rem' }}>{rule.name}</h3>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555' }}>{rule.message}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t pt-4 text-sm leading-6" style={{ borderColor: '#f2c7bc', color: '#555' }}>
              如果现实中的互动让你感到受威胁、无法拒绝或不安全，请优先离开危险情境，并联系可信赖的人、当地紧急服务或专业支持。
            </div>
          </motion.section>
        )}

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8" aria-labelledby="dimension-results">
          <h2 id="dimension-results" className="section-title" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>六维度结果</h2>
          <p className="mb-4 text-xs leading-5" style={{ color: 'var(--color-muted)' }}>
            负担维度分数越高表示当前负担越明显；保护维度分数越高表示可用资源越充分。
          </p>
          <div className="flex flex-col gap-3">
            {DIMENSIONS.map((dimension, dimensionIndex) => {
              const dimensionResult = result.dimensionResults[dimension.key];
              const color = dimensionColors[dimension.key];
              return (
                <motion.article key={dimension.key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + dimensionIndex * 0.04 }} className="card" style={{ padding: '1.25rem' }}>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: color }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{dimension.name}</span>
                      <span className="tag" style={dimension.direction === 'burden' ? { color: 'var(--color-accent)', borderColor: 'var(--color-accent)' } : { color: '#557f58', borderColor: '#6b9e6b' }}>
                        {dimension.direction === 'burden' ? '负担' : '资源'}
                      </span>
                    </div>
                    <span className="text-mono-xs" style={{ color: dimensionResult.score === null ? 'var(--color-muted)' : 'var(--color-ink)' }}>
                      {dimensionResult.score === null ? '信息不足' : `${dimensionResult.score} · ${dimensionResult.level}`}
                    </span>
                  </div>
                  {dimensionResult.score !== null && <ScoreBar score={dimensionResult.score} color={color} />}
                  <p className="mt-2 text-xs leading-5" style={{ color: 'var(--color-muted)' }}>
                    {dimension.description} · 有效题 {dimensionResult.validCount}/{dimensionResult.totalCount}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        {result.recommendations.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card mb-8" style={{ background: 'var(--color-surface)' }} aria-labelledby="recommendations">
            <h2 id="recommendations" className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>下一步建议</h2>
            <div className="flex flex-col gap-3">
              {result.recommendations.map((recommendation, index) => (
                <div key={recommendation} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(217,119,87,0.12)', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-accent)' }}>{index + 1}</span>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555' }}>{recommendation}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {result.statePatterns.length > 0 && (
          <section className="mb-8">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>辅助理解</h2>
            <div className="flex flex-wrap gap-2">
              {result.statePatterns.map((pattern) => <span key={pattern} className="tag">{pattern}</span>)}
            </div>
          </section>
        )}

        <div className="mb-6"><ShareCard result={result} /></div>

        <div className="flex flex-col items-center gap-4">
          <button onClick={restart} className="btn-ghost">重新作答</button>
          <button onClick={() => navigate('/intimacy-test')} className="cursor-pointer text-xs underline underline-offset-4" style={{ background: 'none', border: 'none', color: 'var(--color-muted)' }}>返回说明页</button>
          <p className="text-center text-xs leading-5" style={{ color: 'var(--color-muted)' }}>
            本结果仅反映最近状态，可随关系情境和支持资源变化。
            <br />
            不建议用于评判他人、判断关系对错或替代专业支持。
          </p>
        </div>
      </div>
    </div>
  );
}
