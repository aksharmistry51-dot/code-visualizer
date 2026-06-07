function StepTracker({ steps }) {
  if (!steps || steps.length === 0) return null
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
      <h2 className="text-yellow-400 font-bold text-lg mb-4">Step-by-step Execution</h2>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-3">
            <p className="text-blue-400 font-semibold mb-1">Step {step.step}</p>
            <code className="text-green-300 text-sm block mb-1">{step.line}</code>
            <p className="text-gray-300 text-sm">{step.explanation}</p>
            {step.variables && Object.keys(step.variables).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(step.variables).map(([key, val]) => (
                  <span key={key} className="bg-gray-800 text-yellow-300 text-xs px-2 py-1 rounded">
                    {key} = {JSON.stringify(val)}
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