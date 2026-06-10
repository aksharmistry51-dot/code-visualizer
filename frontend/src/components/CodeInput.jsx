function CodeInput({ code, setCode, onAnalyze, loading }) {
  const lines = code.split('\n')

  return (
    <div className="border border-blue-900 bg-black shadow-[0_0_30px_rgba(0,149,255,0.1)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-blue-900 bg-blue-950/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
          <span className="ml-3 text-gray-500 font-mono text-xs uppercase tracking-widest">main.js</span>
        </div>
        <span className="text-blue-600 font-mono text-xs">JavaScript</span>
      </div>
      <div className="flex">
        <div className="select-none px-3 py-4 text-right border-r border-blue-900/50 min-w-12">
          {lines.map((_, i) => (
            <div key={i} className="text-blue-900 font-mono text-sm leading-6">{i + 1}</div>
          ))}
        </div>
        <textarea
          className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none resize-none p-4 leading-6 min-h-48"
          placeholder="// Paste your JavaScript code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>
      <div className="border-t border-blue-900 p-4">
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="w-full py-3 font-mono text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-black hover:bg-blue-400 shadow-[0_0_20px_rgba(0,149,255,0.4)]"
        >
          {loading ? 'Analyzing...' : '▶ Analyze Code'}
        </button>
      </div>
    </div>
  )
}

export default CodeInput