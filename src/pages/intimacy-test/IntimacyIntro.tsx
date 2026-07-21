import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QUESTIONS } from './data.ts';
import { clearAssessmentData, clearProgress, loadProgress, loadResult } from './storage.ts';

export function IntimacyIntro() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(() => loadProgress());
  const [recentResult, setRecentResult] = useState(() => loadResult());
  const answeredCount = progress
    ? QUESTIONS.filter((question) => progress.answers[question.id] !== undefined).length
    : 0;

  const restart = () => {
    clearProgress();
    setProgress(null);
    navigate('/intimacy-test/quiz');
  };

  const clearAll = () => {
    if (!window.confirm('清除后将无法恢复当前进度和最近一次结果。确定继续吗？')) return;
    clearAssessmentData();
    setProgress(null);
    setRecentResult(null);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-eyebrow mb-8"
        >
          当前状态自我觉察
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.2,
            marginBottom: '1.25rem',
          }}
        >
          亲密表达与<span className="text-accent">边界状态</span>自我觉察
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-body-lg"
          style={{ marginBottom: '2.5rem' }}
        >
          帮助你梳理当前的表达负担、关系警觉和可用的边界资源。
          <br />
          这不是诊断，也不能判断一段关系的对错。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 grid grid-cols-2 gap-3"
        >
          {[
            { label: '题量', value: '30 题' },
            { label: '预计', value: '8-12 分钟' },
            { label: '存储', value: '仅本地' },
            { label: '对象', value: '仅成年人' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: '1rem 1.25rem' }}>
              <div className="text-label" style={{ marginBottom: '0.25rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-8"
          style={{ background: 'var(--color-surface)' }}
          aria-labelledby="answer-guidance"
        >
          <h2 id="answer-guidance" className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
            作答说明
          </h2>
          <ul className="space-y-2" style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--color-muted)' }}>
            <li>亲密表达包括情感需要、身体边界、互动节奏和相关沟通，不要求你披露具体经历。</li>
            <li>请选择最近 3 个月；如果这段时间没有相关经历，再参考最近一段典型关系。</li>
            <li>无法判断时可以选择“不适用”，信息不足的维度不会生成强结论。</li>
            <li>所有答案仅保存在当前浏览器中，不会上传到服务器。</li>
          </ul>
        </motion.section>

        {answeredCount > 0 && (
          <div className="mb-4 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
            已保存上次进度：完成 {answeredCount}/{QUESTIONS.length} 题。
          </div>
        )}

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/intimacy-test/quiz')}
            className="w-full cursor-pointer rounded-lg py-4 text-center"
            style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', fontWeight: 500 }}
          >
            {answeredCount > 0 ? '继续上次进度' : '开始自我觉察'}
          </motion.button>

          {answeredCount > 0 && (
            <button onClick={restart} className="w-full cursor-pointer rounded-lg py-3 text-sm" style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
              重新开始
            </button>
          )}

          {recentResult && (
            <button onClick={() => navigate('/intimacy-test/result')} className="w-full cursor-pointer rounded-lg py-3 text-sm" style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
              查看最近一次结果
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs leading-6" style={{ color: 'var(--color-muted)' }}>
          点击开始即表示你已年满 18 岁，并理解本工具只用于自我觉察。
          <br />
          如果相关处境让你感到不安全，请优先联系可信赖的人或当地支持服务。
        </p>

        {(progress || recentResult) && (
          <div className="mt-8 text-center">
            <button onClick={clearAll} className="cursor-pointer text-xs underline underline-offset-4" style={{ background: 'none', border: 'none', color: 'var(--color-muted)' }}>
              清除当前设备上的评估数据
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
