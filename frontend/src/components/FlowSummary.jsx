function FlowSummary({ summary }) {
  return (
    <div className="border border-blue-800 bg-blue-950/20 p-5 shadow-[0_0_20px_rgba(0,149,255,0.1)] animate-pulse-once">
      <h2 className="text-blue-400 font-mono font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
        <span>◈</span> What This Code Does
      </h2>
      <p className="text-white font-mono text-sm leading-relaxed">{summary}</p>
    </div>
  )
}
export default FlowSummary