function ErrorPanel({ result }) {
  return (
    <div className="bg-red-950/30 rounded-lg p-5">
      <h2 className="text-red-400 font-mono font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
        <span>✗</span> Error Detected
      </h2>
      <div className="space-y-2 font-mono text-sm">
        <p><span className="text-red-500">TYPE:</span> <span className="text-white">{result.errorType}</span></p>
        <p><span className="text-red-500">LINE:</span> <code className="text-yellow-300 bg-yellow-900/20 px-2 py-0.5">{result.errorLine}</code></p>
        <p><span className="text-red-500">WHY :</span> <span className="text-gray-300">{result.errorExplanation}</span></p>
      </div>
    </div>
  )
}
export default ErrorPanel