import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CodeInput from '../components/CodeInput'
import StepTracker from '../components/StepTracker'
import ErrorPanel from '../components/ErrorPanel'
import FlowSummary from '../components/FlowSummary'
import FixSuggestion from '../components/FixSuggestion'
import FlowChart from '../components/FlowChart'

function Analyzer() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await axios.post('https://code-visualizer-backend-1cp1.onrender.com/api/analyze', { code })
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-blue-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-6 h-6 border-2 border-blue-400 rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-400 rotate-45" />
          </div>
          <span className="text-white font-bold tracking-widest uppercase font-mono">
            Code<span className="text-blue-400">Vision</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 font-mono text-xs uppercase tracking-widest">JavaScript Mode</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <CodeInput code={code} setCode={setCode} onAnalyze={handleAnalyze} loading={loading} />
        {error && (
          <p className="text-red-400 text-center mt-4 font-mono border border-red-900 py-2 px-4">
            ⚠ {error}
          </p>
        )}
        {result && (
          <div className="mt-8 space-y-6">
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