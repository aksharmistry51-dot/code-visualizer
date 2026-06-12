function StepTracker({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="bg-gray-950 rounded-lg p-5">
      <h2 className="text-yellow-400 font-mono font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
        <span className="animate-pulse">⬡</span> Step-by-step Execution
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`border border-blue-900/50 bg-blue-950/10 p-4 step-animate-${i + 1}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs border border-blue-800 text-blue-500 px-2 py-0.5">
                STEP {step.step}
              </span>
              <code className="text-green-400 font-mono text-sm">{step.line}</code>
            </div>
            <p className="text-gray-400 font-mono text-xs mb-2">{step.explanation}</p>
            {step.variables && Object.keys(step.variables).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(step.variables).map(([key, val]) => (
                  <span key={key} className="font-mono text-xs px-2 py-1 border border-blue-800 bg-blue-900/20 text-blue-300">
                    {key} <span className="text-gray-500">=</span> <span className="text-yellow-300">{JSON.stringify(val)}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepTracker