import { useState } from 'react'
import axios from 'axios'
import CodeInput from './components/CodeInput'
import StepTracker from './components/StepTracker'
import ErrorPanel from './components/ErrorPanel'
import FlowSummary from './components/FlowSummary'
import FixSuggestion from './components/FixSuggestion'

function App() {
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
      const res = await axios.post('http://localhost:5000/api/analyze', { code })
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-400">
          Code Visualizer
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Paste JavaScript code to analyze, debug and visualize execution
        </p>
        <CodeInput code={code} setCode={setCode} onAnalyze={handleAnalyze} loading={loading} />
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {result && (
          <div className="mt-8 space-y-6">
            <FlowSummary summary={result.flowSummary} />
            {result.hasError && <ErrorPanel result={result} />}
            {result.hasError && <FixSuggestion result={result} />}
            <StepTracker steps={result.steps} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App