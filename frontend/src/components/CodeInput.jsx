function CodeInput({ code, setCode, onAnalyze, loading, language }) {
  const lines = code.split('\n')

  const fileName = language === 'Python' ? 'main.py' : language === 'Java' ? 'Main.java' : 'main.js'

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#111827', borderBottom: '1px solid #252C42' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }}></div>
          <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }}></div>
          <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }}></div>
          <span className="ml-3 text-xs font-medium" style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono' }}>{fileName}</span>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF', border: '1px solid rgba(79,140,255,0.2)' }}>
          {language || 'JavaScript'}
        </span>
      </div>

      {/* Editor */}
      <div className="flex">
        <div className="select-none px-4 py-4 text-right" style={{ background: '#0F1623', borderRight: '1px solid #252C42', minWidth: '3rem' }}>
          {lines.map((_, i) => (
            <div key={i} className="text-xs leading-6" style={{ color: '#4B5563', fontFamily: 'JetBrains Mono' }}>{i + 1}</div>
          ))}
        </div>
        <textarea
          className="flex-1 bg-transparent outline-none resize-none p-4 leading-6 text-sm min-h-48"
          placeholder={`// Paste your ${language || 'JavaScript'} code here...`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono' }}
        />
      </div>

      {/* Button */}
      <div className="px-4 py-4" style={{ background: '#111827', borderTop: '1px solid #252C42' }}>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading ? '#252C42' : 'linear-gradient(135deg, #4F8CFF, #00D4FF)',
            color: loading ? '#94A3B8' : '#0B0F19'
          }}
        >
          {loading ? 'Analyzing...' : '▶ Analyze Code'}
        </button>
      </div>
    </div>
  )
}

export default CodeInput