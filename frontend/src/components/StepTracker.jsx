function detectStepType(line) {
  const trimmed = line.trim().toLowerCase()

  if (/^(break|return|exit|system\.exit)/.test(trimmed)) {
    return 'exit'
  }
  if (/^(while|for|do\s*{)/.test(trimmed)) {
    return 'loop'
  }
  if (/^(}\s*)?(if|else|switch|case)\b/.test(trimmed)) {
    return 'condition'
  }
  if (/(scanner|console\.log|system\.out|print\(|input\(|cin|cout)/.test(trimmed)) {
    return 'io'
  }
  return 'default'
}

const STYLES = {
  loop: { text: '#4F8CFF', bg: 'rgba(79,140,255,0.12)', border: 'rgba(79,140,255,0.3)', label: 'LOOP', icon: '↻' },
  condition: { text: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', label: 'CONDITION', icon: '◆' },
  io: { text: '#22C55E', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', label: 'INPUT/OUTPUT', icon: '⇄' },
  exit: { text: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', label: 'EXIT', icon: '⏹' },
  default: { text: '#4F8CFF', bg: 'rgba(79,140,255,0.1)', border: 'rgba(79,140,255,0.2)', label: 'STEP', icon: '•' }
}

function StepTracker({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="rounded-2xl p-5" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-5 flex items-center gap-2" style={{ color: '#F59E0B' }}>
        <span>⬡</span> Step-by-step Execution
      </h2>

      <div className="relative space-y-3">
        {steps.map((step, i) => {
          const type = detectStepType(step.line)
          const style = STYLES[type]

          return (
            <div key={i} className={`relative rounded-xl p-4 step-animate-${i + 1}`} style={{ background: '#111827', border: `1px solid ${style.border}` }}>

              {/* Connector line to next step */}
              {i < steps.length - 1 && (
                <div className="absolute left-7 top-full w-px h-3" style={{ background: '#252C42' }}></div>
              )}

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF', border: '1px solid rgba(79,140,255,0.2)' }}>
                  STEP {step.step}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1" style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}>
                  <span>{style.icon}</span>{style.label}
                </span>
              </div>

              <code className="text-sm block mb-2" style={{ color: '#E5E7EB', fontFamily: 'JetBrains Mono' }}>{step.line}</code>
              <p className="text-xs leading-relaxed mb-2" style={{ color: '#94A3B8' }}>{step.explanation}</p>

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
          )
        })}
      </div>
    </div>
  )
}

export default StepTracker