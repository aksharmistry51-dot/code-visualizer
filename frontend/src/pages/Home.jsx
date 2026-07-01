import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [selectedLang, setSelectedLang] = useState(null)

  const fullText = 'Analyze Code. Understand Execution. Fix Bugs Faster.'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) {
        clearInterval(interval)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [])

  const languages = [
    { id: 'javascript', label: 'JavaScript', accent: '#F7DF1E' },
    { id: 'python', label: 'Python', accent: '#3776AB' },
    { id: 'java', label: 'Java', accent: '#F89820' },
    { id: 'cpp', label: 'C++', accent: '#00599C' }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#0B0F19' }}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: '#4F8CFF' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#00D4FF' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F8CFF 0%, #00D4FF 100%)' }}>
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight" style={{ color: '#E5E7EB' }}>
            CodeVision
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight" style={{ color: '#E5E7EB', minHeight: '150px' }}>
          {text}
          <span className="animate-pulse" style={{ color: '#4F8CFF' }}>I</span>
        </h1>

        <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
          AI-powered code analysis with visual execution tracking.
        </p>

        <p className="text-xs mb-4 font-semibold uppercase" style={{ color: '#94A3B8', letterSpacing: '0.25em' }}>
          Select Language
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.id
            const bg = isSelected ? 'rgba(79,140,255,0.12)' : '#151B2D'
            const bd = isSelected ? '1px solid #4F8CFF' : '1px solid #252C42'
            const col = isSelected ? '#E5E7EB' : '#94A3B8'
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:-translate-y-1"
                style={{ background: bg, border: bd, color: col }}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: lang.accent }}></span>
                {lang.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => selectedLang && navigate('/analyze', { state: { language: selectedLang } })}
            disabled={!selectedLang}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed hover:scale-105"
            style={{
              background: selectedLang ? 'linear-gradient(135deg, #4F8CFF, #00D4FF)' : '#252C42',
              color: selectedLang ? '#0B0F19' : '#94A3B8'
            }}
          >
            Start Analyzing
          </button>

          <button
            onClick={() => window.open('https://github.com/aksharmistry51-dot/code-visualizer', '_blank')}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
            style={{ background: '#151B2D', border: '1px solid #252C42', color: '#E5E7EB' }}
          >
            View GitHub
          </button>
        </div>

        <p className="mt-12 text-sm" style={{ color: '#64748B' }}>
          JavaScript • Python • Java • C++
        </p>
      </div>
    </div>
  )
}

export default Home