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
          <div className="mt-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444', color: '#EF4444' }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 rounded-2xl p-6" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
            <p className="text-sm font-medium mb-4" style={{ color: '#94A3B8' }}>Analyzing your code...</p>
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
            <FlowSummary summary={result.flowSummary} />
            {result.hasError && <ErrorPanel result={result} />}
            {result.hasError && <FixSuggestion result={result} />}
            <FlowChart steps={result.steps} hasError={result.hasError} />
            <StepTracker steps={result.steps} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Analyzer