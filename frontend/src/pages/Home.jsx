import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [langSelected, setLangSelected] = useState(false)
  const fullText = 'Visualize. Debug. Understand.'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,149,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,149,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl" />

      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="w-10 h-10 border-2 border-blue-400 rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-400 rotate-45" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
            Code<span className="text-blue-400">Vision</span>
          </h1>
        </div>

        {/* Typing animation */}
        <p className="text-blue-300 text-xl font-mono mb-2 h-8">
          {text}<span className="animate-pulse">|</span>
        </p>
        <p className="text-gray-500 text-sm mb-12 font-mono">
          AI-powered JavaScript execution visualizer
        </p>

        {/* Language selector */}
        <p className="text-gray-400 text-sm mb-4 font-mono uppercase tracking-widest">
          Select Language
        </p>
        <div className="flex gap-4 justify-center mb-10">
          <button
            onClick={() => setLangSelected(true)}
            className={`px-6 py-3 border font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
              langSelected
                ? 'border-blue-400 text-blue-400 bg-blue-400/10 shadow-[0_0_20px_rgba(0,149,255,0.3)]'
                : 'border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400'
            }`}
          >
            JavaScript
          </button>
          <button className="px-6 py-3 border border-gray-800 text-gray-600 font-mono text-sm uppercase tracking-wider cursor-not-allowed">
            Python (soon)
          </button>
          <button className="px-6 py-3 border border-gray-800 text-gray-600 font-mono text-sm uppercase tracking-wider cursor-not-allowed">
            Java (soon)
          </button>
        </div>

        {/* Launch button */}
        <button
          onClick={() => langSelected && navigate('/analyze')}
          className={`px-12 py-4 font-mono text-sm uppercase tracking-widest transition-all duration-300 ${
            langSelected
              ? 'bg-blue-500 text-black hover:bg-blue-400 shadow-[0_0_30px_rgba(0,149,255,0.5)] cursor-pointer'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          Launch Visualizer →
        </button>
      </div>
    </div>
  )
}

export default Home