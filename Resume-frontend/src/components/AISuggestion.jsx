import { useState } from 'react'
import { getAISuggestion } from '../services/gemini'
import './AISuggestion.css'

export default function AISuggestion({ section, currentValue, jobTitle, onApply }) {
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)

  const getSuggestion = async () => {
    setLoading(true)
    setSuggestion('')
    try {
      const result = await getAISuggestion(section, currentValue, jobTitle)
      setSuggestion(result)
    } catch {
      setSuggestion('Failed to get suggestion. Check your Gemini API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-suggestion-wrapper">
      <button className="ai-btn" onClick={getSuggestion} disabled={loading} type="button">
        {loading ? '✨ Thinking...' : '✨ AI Suggest'}
      </button>

      {suggestion && (
        <div className="suggestion-box">
          <p className="suggestion-text">{suggestion}</p>
          <div className="suggestion-actions">
            <button
              className="apply-btn"
              onClick={() => { onApply(suggestion); setSuggestion('') }}
              type="button"
            >
              Apply ✓
            </button>
            <button
              className="dismiss-btn"
              onClick={() => setSuggestion('')}
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
