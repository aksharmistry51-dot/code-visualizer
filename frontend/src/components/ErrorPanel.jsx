function ErrorPanel({ result }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
      
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'rgba(239,68,68,0.12)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.2)' }}>
          <span style={{ color: '#EF4444', fontSize: '16px' }}>✗</span>
        </div>
        <div>
          <h2 className="text-sm font-semibold" style={{ color: '#EF4444' }}>Error Detected</h2>
          <p className="text-xs" style={{ color: 'rgba(239,68,68,0.7)' }}>Fix required before running</p>
        </div>
        <span className="ml-auto text-xs font-mono px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }}>
          {result.errorType}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4" style={{ background: 'rgba(239,68,68,0.04)' }}>
        
        {/* Error line */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(239,68,68,0.6)' }}>Error on line</p>
          <code className="block w-full px-4 py-3 rounded-xl text-sm" style={{ background: '#0F1623', color: '#F59E0B', fontFamily: 'JetBrains Mono', border: '1px solid #252C42' }}>
            {result.errorLine}
          </code>
        </div>

        {/* Explanation */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(239,68,68,0.6)' }}>What went wrong</p>
          <p className="text-sm leading-relaxed" style={{ color: '#E5E7EB' }}>{result.errorExplanation}</p>
        </div>

      </div>
    </div>
  )
}

export default ErrorPanel