import { useState } from 'react'

function detectStepType(line) {
  const trimmed = line.trim().toLowerCase()
  if (/^(break|return|exit|system\.exit)/.test(trimmed)) return 'exit'
  if (/^(while|for|do\s*{)/.test(trimmed)) return 'loop'
  if (/^(}\s*)?(if|else|switch|case)\b/.test(trimmed)) return 'condition'
  if (/(scanner|console\.log|system\.out|print\(|input\(|cin|cout|printf|scanf)/.test(trimmed)) return 'io'
  return 'default'
}

const TYPE_STYLES = {
  loop:      { label: 'LOOP',         icon: '↻', color: '#4F8CFF', bg: 'rgba(79,140,255,0.1)',  border: 'rgba(79,140,255,0.3)'  },
  condition: { label: 'CONDITION',    icon: '◆', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  io:        { label: 'INPUT/OUTPUT', icon: '⇄', color: '#22C55E', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)'  },
  exit:      { label: 'EXIT',         icon: '⏹', color: '#EF4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)'  },
  default:   { label: 'STEP',         icon: '•', color: '#4F8CFF', bg: 'rgba(79,140,255,0.08)', border: 'rgba(79,140,255,0.2)' }
}

function StepTracker({ steps }) {
  const [current, setCurrent] = useState(0)

  if (!steps || steps.length === 0) return null

  const step = steps[current]
  const type = detectStepType(step.line)
  const style = TYPE_STYLES[type]
  const hasVars = step.variables && Object.keys(step.variables).length > 0
  const progress = Math.round(((current + 1) / steps.length) * 100)

  const goNext = () => setCurrent(i => Math.min(i + 1, steps.length - 1))
  const goPrev = () => setCurrent(i => Math.max(i - 1, 0))

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#151B2D', border: '1px solid #252C42' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: '#111827', borderBottom: '1px solid #252C42' }}>
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
            ⬡ Step-by-step
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}>
            step {current + 1} of {steps.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
          >
            ← prev
          </button>
          <button
            onClick={goNext}
            disabled={current === steps.length - 1}
            className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF', border: '1px solid rgba(79,140,255,0.3)' }}
          >
            next →
          </button>
        </div>
      </div>

      {/* Current line */}
      <div className="px-5 py-4" style={{ background: '#0F1623', borderBottom: '1px solid #252C42' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#4B5563' }}>current line</span>
          <span className="text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
            {style.icon} {style.label}
          </span>
        </div>
        <code
          className="block text-sm px-4 py-3 rounded-xl"
          style={{ fontFamily: 'JetBrains Mono', color: style.color, background: style.bg, borderLeft: `3px solid ${style.color}` }}
        >
          {step.line}
        </code>
      </div>

      {/* Variables */}
      {hasVars && (
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #252C42' }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#4B5563' }}>live variables</div>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(step.variables).map(([key, val], i) => {
              const isLast = i === Object.keys(step.variables).length - 1
              return (
                <div
                  key={key}
                  className="rounded-xl px-4 py-3 text-center min-w-16"
                  style={{
                    background: isLast ? 'rgba(34,197,94,0.08)' : '#111827',
                    border: `1px solid ${isLast ? 'rgba(34,197,94,0.3)' : '#252C42'}`
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: isLast ? 'rgba(34,197,94,0.7)' : '#4B5563', fontFamily: 'JetBrains Mono' }}>{key}</div>
                  <div className="text-lg font-semibold" style={{ color: isLast ? '#22C55E' : '#E5E7EB', fontFamily: 'JetBrains Mono' }}>
                    {typeof val === 'string' ? val : JSON.stringify(val)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid #252C42' }}>
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#4B5563' }}>what's happening</div>
        <p className="text-sm leading-relaxed" style={{ color: '#E5E7EB' }}>{step.explanation}</p>
      </div>

      {/* Progress bar */}
      <div className="px-5 py-3 flex items-center gap-3" style={{ background: '#111827' }}>
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: '4px', background: '#252C42' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4F8CFF, #00D4FF)' }}
          ></div>
        </div>
        <span className="text-xs" style={{ color: '#4B5563' }}>{progress}%</span>
      </div>

    </div>
  )
}

export default StepTracker