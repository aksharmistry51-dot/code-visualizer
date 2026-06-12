function FlowChart({ steps, hasError }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="bg-gray-950 rounded-lg p-6">
      <h2 className="text-blue-400 font-mono font-bold text-lg mb-6 uppercase tracking-widest flex items-center gap-2">
        <span className="text-blue-500">▶</span> Execution Flow
      </h2>
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full max-w-md">
            {/* Node */}
            <div className={`w-full border font-mono text-sm px-4 py-3 text-center transition-all ${
              hasError && i === steps.length - 1
                ? 'border-red-500 text-red-400 bg-red-500/10 shadow-[0_0_15px_rgba(255,0,0,0.2)]'
                : 'border-blue-500 text-blue-300 bg-blue-500/10 shadow-[0_0_15px_rgba(0,149,255,0.15)]'
            }`}>
              <span className="text-gray-500 mr-2">#{i + 1}</span>
              {step.line}
            </div>
            {/* Arrow */}
            {i < steps.length - 1 && (
              <div className="flex flex-col items-center my-1">
                <div className="w-px h-4 bg-blue-700" />
                <div className="text-blue-700 text-xs">▼</div>
              </div>
            )}
          </div>
        ))}
        {/* End node */}
        <div className="flex flex-col items-center mt-1">
          <div className="w-px h-4 bg-blue-700" />
          <div className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border ${
            hasError
              ? 'border-red-500 text-red-400 bg-red-500/10'
              : 'border-green-500 text-green-400 bg-green-500/10'
          }`}>
            {hasError ? '✗ Error' : '✓ Done'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowChart