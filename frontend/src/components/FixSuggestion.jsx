function FixSuggestion({ result }) {
  return (
    <div className="bg-green-950 border border-green-600 rounded-xl p-4">
      <h2 className="text-green-400 font-bold text-lg mb-2">How to Fix It</h2>
      <p className="text-white mb-3">{result.howToFix}</p>
      <pre className="bg-gray-900 text-green-300 font-mono text-sm p-3 rounded-lg overflow-x-auto">
        {result.fixedCode}
      </pre>
    </div>
  )
}
export default FixSuggestion