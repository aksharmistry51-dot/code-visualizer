function FlowChart({ steps, hasError }) {
  if (!steps || steps.length === 0) return null
  return (
    <div className="rounded-2xl p-5" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: '#4F8CFF' }}>
        <span>▶</span> Execution Flow
      </h2>
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full max-w-lg">
            <div className="w-full text-sm px-4 py-3 text-center rounded-xl" style={{
              background: hasError && i === steps.length - 1 ? 'rgba(239,68,68,0.1)' : 'rgba(79,140,255,0.08)',
              border: `1px solid ${hasError && i === steps.length - 1 ? 'rgba(239,68,68,0.4)' : '#252C42'}`,
              color: hasError && i === steps.length - 1 ? '#EF4444' : '#94A3B8',
              fontFamily: 'JetBrains Mono'
            }}>
              <span className="mr-2" style={{ color: '#4F8CFF' }}>#{i + 1}</span>
              {step.line}
            </div>
            {i < steps.length - 1 && (
              <div className="flex flex-col items-center my-1">
                <div className="w-px h-4" style={{ background: '#252C42' }}></div>
                <div className="text-xs" style={{ color: '#252C42' }}>▼</div>
              </div>
            )}
          </div>
        ))}
        <div className="flex flex-col items-center mt-1">
          <div className="w-px h-4" style={{ background: '#252C42' }}></div>
          <div className="px-6 py-2 text-xs font-semibold uppercase tracking-widest rounded-lg" style={{
            background: hasError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
            border: `1px solid ${hasError ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)'}`,
            color: hasError ? '#EF4444' : '#22C55E'
          }}>
            {hasError ? '✗ Error' : '✓ Done'}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FlowChart