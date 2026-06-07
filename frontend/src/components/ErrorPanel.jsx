function ErrorPanel({ result }) {
  return (
    <div className="bg-red-950 border border-red-600 rounded-xl p-4">
      <h2 className="text-red-400 font-bold text-lg mb-2">Error Detected</h2>
      <p className="text-white"><span className="text-red-300 font-semibold">Type: </span>{result.errorType}</p>
      <p className="text-white mt-1"><span className="text-red-300 font-semibold">Line: </span><code className="text-yellow-300">{result.errorLine}</code></p>
      <p className="text-white mt-1"><span className="text-red-300 font-semibold">Why: </span>{result.errorExplanation}</p>
    </div>
  )
}
export default ErrorPanel