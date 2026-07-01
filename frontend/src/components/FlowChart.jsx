function detectStepType(line) {
  const trimmed = line.trim().toLowerCase()
  if (/^(break|return|exit|system\.exit)/.test(trimmed)) return 'exit'
  if (/^(while|for|do\s*{)/.test(trimmed)) return 'loop'
  if (/^(}\s*)?(if|else|switch|case)\b/.test(trimmed)) return 'condition'
  if (/(scanner|console\.log|system\.out|print\(|input\(|cin|cout|printf|scanf)/.test(trimmed)) return 'io'
  return 'default'
}

const STYLES = {
  loop: {
    bg: 'rgba(79,140,255,0.1)',
    border: 'rgba(79,140,255,0.4)',
    text: '#4F8CFF',
    numBg: 'rgba(79,140,255,0.2)',
    label: 'LOOP',
    icon: '↻'
  },
  condition: {
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.4)',
    text: '#F59E0B',
    numBg: 'rgba(245,158,11,0.2)',
    label: 'CONDITION',
    icon: '◆'
  },
  io: {
    bg: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.4)',
    text: '#22C55E',
    numBg: 'rgba(34,197,94,0.2)',
    label: 'INPUT/OUTPUT',
    icon: '⇄'
  },
  exit: {
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.4)',
    text: '#EF4444',
    numBg: 'rgba(239,68,68,0.2)',
    label: 'EXIT',
    icon: '⏹'
  },
  default: {
    bg: 'rgba(148,163,184,0.06)',
    border: '#252C42',
    text: '#94A3B8',
    numBg: 'rgba(148,163,184,0.12)',
    label: 'STEP',
    icon: '•'
  }
}

function FlowChart({ steps, hasError }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="rounded-2xl p-5" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: '#4F8CFF' }}>
          <span>▶</span> Execution Flow
        </h2>
        <div className="hidden sm:flex items-center gap-3 flex-wrap">
          {Object.entries(STYLES).filter(([key]) => key !== 'default').map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: style.text }}>{style.icon}</span>
              <span className="text-xs" style={{ color: '#4B5563' }}>{style.label.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-0">
        <div className="px-6 py-2 text-xs font-semibold uppercase tracking-widest rounded-full mb-1" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.4)', color: '#00D4FF' }}>
          ▶ Start
        </div>
        <div className="w-px h-4" style={{ background: '#252C42' }}></div>

        {steps.map((step, i) => {
          const type = detectStepType(step.line)
          const style = STYLES[type]
          const isLast = i === steps.length - 1
          const isErrorNode = hasError && isLast

          return (
            <div key={i} className="flex flex-col items-center w-full max-w-lg">
              <div
                className="w-full px-4 py-3 rounded-xl transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  background: isErrorNode ? 'rgba(239,68,68,0.1)' : style.bg,
                  border: `1px solid ${isErrorNode ? 'rgba(239,68,68,0.4)' : style.border}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: isErrorNode ? 'rgba(239,68,68,0.2)' : style.numBg, color: isErrorNode ? '#EF4444' : style.text }}
                  >
                    #{i + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: isErrorNode ? '#EF4444' : style.text, opacity: 0.7 }}>
                    {isErrorNode ? 'error here' : style.label}
                  </span>
                </div>
                <code className="text-sm block text-center" style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono' }}>
                  {step.line}
                </code>
              </div>

              {!isLast && (
                <div className="flex flex-col items-center my-1">
                  <div className="w-px h-4" style={{ background: '#252C42' }}></div>
                  <div className="text-xs" style={{ color: '#252C42' }}>▼</div>
                </div>
              )}
            </div>
          )
        })}

        <div className="flex flex-col items-center mt-1">
          <div className="w-px h-4" style={{ background: '#252C42' }}></div>
          <div
            className="px-6 py-2 text-xs font-semibold uppercase tracking-widest rounded-full"
            style={{
              background: hasError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${hasError ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)'}`,
              color: hasError ? '#EF4444' : '#22C55E'
            }}
          >
            {hasError ? '✗ Error' : '✓ Done'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowChart