import { useState } from 'react'

function FixSuggestion({ result, language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.fixedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(34,197,94,0.3)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'rgba(34,197,94,0.08)', borderBottom: '1px solid rgba(34,197,94,0.2)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,0.15)' }}>
          <span style={{ color: '#22C55E', fontSize: '16px' }}>✓</span>
        </div>
        <div>
          <h2 className="text-sm font-semibold" style={{ color: '#22C55E' }}>How To Fix It</h2>
          <p className="text-xs" style={{ color: 'rgba(34,197,94,0.7)' }}>Follow the steps below</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4" style={{ background: 'rgba(34,197,94,0.03)' }}>

        {/* Fix explanation */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(34,197,94,0.6)' }}>What to change</p>
          <p className="text-sm leading-relaxed" style={{ color: '#E5E7EB' }}>{result.howToFix}</p>
        </div>

        {/* Fixed code block */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(34,197,94,0.6)' }}>Fixed Code</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: '#111827', color: '#94A3B8', border: '1px solid #252C42' }}>
                {language || 'JavaScript'}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs px-3 py-1 rounded-lg transition-all duration-200"
                style={{
                  background: copied ? 'rgba(34,197,94,0.15)' : '#111827',
                  color: copied ? '#22C55E' : '#94A3B8',
                  border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : '#252C42'}`
                }}
              >
                {copied ? '✓ Copied!' : '⎘ Copy'}
              </button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ background: '#0F1623', border: '1px solid #252C42' }}>
            <pre className="p-4 text-sm overflow-x-auto" style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono', margin: 0 }}>
              {result.fixedCode}
            </pre>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FixSuggestion