import { useState, useRef } from 'react'

function CodeInput({ code, setCode, onAnalyze, loading, language }) {
  const [copied, setCopied] = useState(false)
  const lineNumbersRef = useRef(null)
  const textareaRef = useRef(null)
  const lines = code.split('\n')

  const fileName = language === 'Python' ? 'main.py' : language === 'Java' ? 'Main.java' : 'main.js'

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const handleCopy = () => {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setCode('')
  }

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

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!code}
            className="text-xs px-3 py-1 rounded-lg transition-all duration-200 disabled:opacity-40"
            style={{
              background: copied ? 'rgba(34,197,94,0.15)' : '#151B2D',
              color: copied ? '#22C55E' : '#94A3B8',
              border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : '#252C42'}`
            }}
          >
            {copied ? '✓ Copied' : '⎘ Copy'}
          </button>
          <button
            onClick={handleClear}
            disabled={!code}
            className="text-xs px-3 py-1 rounded-lg transition-all duration-200 disabled:opacity-40"
            style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
          >
            ✕ Clear
          </button>
          <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF', border: '1px solid rgba(79,140,255,0.2)' }}>
            {language || 'JavaScript'}
          </span>
        </div>
      </div>

      {/* Editor */}
      <div className="flex">
        <div
          ref={lineNumbersRef}
          className="select-none px-4 py-4 text-right overflow-hidden"
          style={{ background: '#0F1623', borderRight: '1px solid #252C42', minWidth: '3rem', maxHeight: 'calc(100vh - 280px)' }}
        >
          {lines.map((_, i) => (
            <div key={i} className="text-xs leading-6" style={{ color: '#4B5563', fontFamily: 'JetBrains Mono' }}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          onScroll={handleScroll}
          className="flex-1 bg-transparent outline-none resize-none p-4 leading-6 text-sm min-h-48"
          style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono', maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}
          placeholder={`// Paste your ${language || 'JavaScript'} code here...`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Button */}
      <div className="px-4 py-4" style={{ background: '#111827', borderTop: '1px solid #252C42' }}>
        <button
          onClick={onAnalyze}
          disabled={loading || !code.trim()}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99]"
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