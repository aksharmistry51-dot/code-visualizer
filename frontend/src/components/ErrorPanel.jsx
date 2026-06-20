function ErrorPanel({ result }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.3)' }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#EF4444' }}>
        <span>✗</span> Error Detected
      </h2>
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold" style={{ color: '#EF4444' }}>TYPE: </span><span style={{ color: '#E5E7EB' }}>{result.errorType}</span></p>
        <p><span className="font-semibold" style={{ color: '#EF4444' }}>LINE: </span><code className="px-2 py-0.5 rounded text-xs" style={{ background: '#111827', color: '#F59E0B', fontFamily: 'JetBrains Mono' }}>{result.errorLine}</code></p>
        <p><span className="font-semibold" style={{ color: '#EF4444' }}>WHY: </span><span style={{ color: '#94A3B8' }}>{result.errorExplanation}</span></p>
      </div>
    </div>
  )
}
export default ErrorPanel