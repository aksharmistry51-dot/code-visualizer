function FlowSummary({ summary }) {
  return (
    <div className="bg-blue-950/30 rounded-lg p-5">
      <h2 className="text-blue-400 font-mono font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
        <span>◈</span> What This Code Does
      </h2>
      <p className="text-white font-mono text-sm leading-relaxed">{summary}</p>
    </div>
  )
}
export default FlowSummary