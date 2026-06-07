function FlowSummary({ summary }) {
  return (
    <div className="bg-blue-900 border border-blue-600 rounded-xl p-4">
      <h2 className="text-blue-300 font-bold text-lg mb-1">What this code does</h2>
      <p className="text-white">{summary}</p>
    </div>
  )
}
export default FlowSummary
