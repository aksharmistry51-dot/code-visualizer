function FixSuggestion({ result }) {
  return (
    <div className="bg-green-950/30 rounded-lg p-5">
      <h2 className="text-green-400 font-mono font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
        <span>Fix</span> How To Fix It
      </h2>
      <p className="text-gray-300 font-mono text-sm mb-4">{result.howToFix}</p>
      <div className="border border-green-900 bg-black p-4">
        <p className="text-green-600 font-mono text-xs uppercase tracking-widest mb-2">Fixed Code</p>
        <pre className="text-green-300 font-mono text-sm overflow-x-auto">{result.fixedCode}</pre>
      </div>
    </div>
  )
}
export default FixSuggestion