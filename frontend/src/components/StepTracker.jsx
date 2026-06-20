function StepTracker({ steps }) {
  if (!steps || steps.length === 0) return null
  return (
    <div className="rounded-2xl p-5" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-5 flex items-center gap-2" style={{ color: '#F59E0B' }}>
        <span>⬡</span> Step-by-step Execution
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className={`rounded-xl p-4 step-animate-${i + 1}`} style={{ background: '#111827', border: '1px solid #252C42' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF', border: '1px solid rgba(79,140,255,0.2)' }}>
                STEP {step.step}
              </span>
              <code className="text-sm" style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono' }}>{step.line}</code>
            </div>
            <p className="text-xs mb-2" style={{ color: '#94A3B8' }}>{step.explanation}</p>
            {step.variables && Object.keys(step.variables).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(step.variables).map(([key, val]) => (
                  <span key={key} className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B', fontFamily: 'JetBrains Mono' }}>
                    {key} = {JSON.stringify(val)}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default StepTracker