function FixSuggestion({ result }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.3)' }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#22C55E' }}>
        <span>✓</span> How To Fix It
      </h2>
      <p className="text-sm mb-4" style={{ color: '#94A3B8' }}>{result.howToFix}</p>
      <div className="rounded-xl p-4" style={{ background: '#111827', border: '1px solid #252C42' }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#22C55E' }}>Fixed Code</p>
        <pre className="text-sm overflow-x-auto" style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono' }}>{result.fixedCode}</pre>
      </div>
    </div>
  )
}
export default FixSuggestion