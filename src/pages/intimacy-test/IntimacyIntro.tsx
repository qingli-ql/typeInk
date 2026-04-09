import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function IntimacyIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow mb-8"
        >
          自我评估工具
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }}
        >
          亲密表达与<span className="text-accent">边界状态</span>评估
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg"
          style={{ marginBottom: '2.5rem' }}
        >
          用于理解当前的表达负担、关系安全感与边界状态。
          <br />
          不是诊断，不是评判，只是一次安静的自我对话。
        </motion.p>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          {[
            { label: '题量', value: '30 题' },
            { label: '预计', value: '8–12 分钟' },
            { label: '存储', value: '仅本地' },
            { label: '对象', value: '仅成年人' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: '1rem 1.25rem' }}>
              <div className="text-label" style={{ marginBottom: '0.25rem' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Scope & privacy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
            作答说明
          </div>
          <ul style={{ fontSize: '0.875rem', lineHeight: 2, color: 'var(--color-muted)', listStyle: 'none', padding: 0, margin: 0 }}>
            <li>· 优先根据最近 3 个月或最近一段典型亲密关系中的状态作答</li>
            <li>· 当前无关系经历时，可根据自己对亲密互动的一般反应作答</li>
            <li>· 所有答案仅保存在你的设备上，不会上传至任何服务器</li>
            <li>· 本测试仅用于自我理解，不替代心理咨询或医学建议</li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/intimacy-test/quiz')}
          className="w-full cursor-pointer rounded-xl py-4 text-center"
          style={{
            background: 'var(--color-accent)',
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            border: 'none',
          }}
        >
          开始评估
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            textAlign: 'center',
            fontSize: '0.7rem',
            color: 'var(--color-muted)',
            marginTop: '1rem',
          }}
        >
          建议在私密设备上作答 · 不建议将结果用于评判他人
        </motion.p>
      </div>
    </div>
  );
}
