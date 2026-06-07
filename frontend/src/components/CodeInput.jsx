function CodeInput({ code, setCode, onAnalyze, loading }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <textarea
        className="w-full h-48 bg-transparent text-green-400 font-mono text-sm outline-none resize-none"
        placeholder="// Paste your JavaScript code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Analyzing...' : 'Analyze Code'}
      </button>
    </div>
  )
}
export default CodeInput