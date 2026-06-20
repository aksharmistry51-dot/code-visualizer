function FlowSummary({ summary }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: '#151B2D', border: '1px solid #252C42' }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#4F8CFF' }}>
        <span>◈</span> What This Code Does
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: '#E5E7EB' }}>{summary}</p>
    </div>
  )
}
export default FlowSummary