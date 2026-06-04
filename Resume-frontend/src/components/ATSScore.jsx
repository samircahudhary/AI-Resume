import { useState } from 'react'
import { getATSScore } from '../services/gemini'
import './ATSScore.css'

export default function ATSScore({ resumeData }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getATSScore(resumeData)
      setResult(data)
    } catch (err) {
      setError('ATS analysis failed. Check your Gemini API key.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60'
    if (score >= 60) return '#f39c12'
    return '#e74c3c'
  }

  return (
    <div className="ats-container">
      <div className="ats-header">
        <h3>🎯 ATS Score Analyzer</h3>
        <button className="analyze-btn" onClick={analyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {error && <p className="ats-error">{error}</p>}

      {result && (
        <div className="ats-result">
          <div className="score-circle" style={{ borderColor: getScoreColor(result.score) }}>
            <span className="score-number" style={{ color: getScoreColor(result.score) }}>
              {result.score}
            </span>
            <span className="score-label">/ 100</span>
          </div>

          <div className="breakdown">
            {Object.entries(result.breakdown).map(([key, val]) => (
              <div key={key} className="breakdown-item">
                <span className="breakdown-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{ width: `${(val / 25) * 100}%`, background: getScoreColor(val * 4) }}
                  />
                </div>
                <span className="breakdown-val">{val}/25</span>
              </div>
            ))}
          </div>

          <div className="ats-feedback">
            <div className="feedback-section">
              <h4>✅ Strengths</h4>
              <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="feedback-section">
              <h4>⚠️ Improvements</h4>
              <ul>{result.improvements.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
