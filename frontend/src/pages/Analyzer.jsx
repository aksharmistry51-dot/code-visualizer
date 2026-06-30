import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import CodeInput from '../components/CodeInput'
import StepTracker from '../components/StepTracker'
import ErrorPanel from '../components/ErrorPanel'
import FlowSummary from '../components/FlowSummary'
import FixSuggestion from '../components/FixSuggestion'
import FlowChart from '../components/FlowChart'

function Analyzer() {
  const navigate = useNavigate()
  const location = useLocation()
  const language = location.state?.language || 'javascript'

  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const langLabels = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java'
  }

  const langAccents = {
    javascript: '#F7DF1E',
    python: '#3776AB',
    java: '#F89820'
  }

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await axios.post('https://code-visualizer-backend-1cp1.onrender.com/api/analyze', {
        code,
        language: langLabels[language]
      })
      setResult(res.data)
    } catch (e) {
      setError('Something went wrong. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen text-white" style={{ background: '#0B0F19' }}>
      {/* Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #252C42', background: '#111827' }}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F8CFF, #00D4FF)' }}>
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ color: '#E5E7EB' }}>
            CodeVision
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22C55E' }}></div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: langAccents[language] }}>
            {langLabels[language]} Mode
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <CodeInput
          code={code}
          setCode={setCode}
          onAnalyze={handleAnalyze}
          loading={loading}
          language={langLabels[language]}
        />

        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444', color: '#EF4444' }}>
            <span>⚠</span> {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 rounded-2xl p-6" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: '#252C42', borderTopColor: '#4F8CFF' }}></div>
              <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Analyzing your code...</p>
            </div>
            <div className="space-y-3">
              {['Parsing Code', 'Detecting Issues', 'Understanding Logic', 'Building Execution Flow', 'Generating Fixes'].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4F8CFF', animationDelay: `${i * 0.2}s` }}></div>
                  <span className="text-sm" style={{ color: '#94A3B8' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-4">

            {/* Success banner when no error */}
            {!result.hasError && (
              <div
                className="rounded-2xl px-5 py-4 flex items-center gap-3 fade-slide-in"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,0.15)' }}>
                  <span style={{ color: '#22C55E', fontSize: '16px' }}>✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#22C55E' }}>No errors found</p>
                  <p className="text-xs" style={{ color: 'rgba(34,197,94,0.7)' }}>Your code runs cleanly — see the breakdown below</p>
                </div>
              </div>
            )}

            <div className="fade-slide-in" style={{ animationDelay: '0.05s' }}>
              <FlowSummary summary={result.flowSummary} />
            </div>

            {result.hasError && (
              <div className="fade-slide-in" style={{ animationDelay: '0.1s' }}>
                <ErrorPanel result={result} />
              </div>
            )}

            {result.hasError && (
              <div className="fade-slide-in" style={{ animationDelay: '0.15s' }}>
                <FixSuggestion result={result} language={langLabels[language]} />
              </div>
            )}

            <div className="fade-slide-in" style={{ animationDelay: '0.2s' }}>
              <FlowChart steps={result.steps} hasError={result.hasError} />
            </div>

            <div className="fade-slide-in" style={{ animationDelay: '0.25s' }}>
              <StepTracker steps={result.steps} />
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Analyzer