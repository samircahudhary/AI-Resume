import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/header'
import API from '../services/api'
import './SelectTemplate.css'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean, traditional layout. Best for corporate & finance roles.',
    preview: '📋',
    color: '#2c3e50',
    accent: '#3498db',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek two-column design. Great for tech & startups.',
    preview: '💼',
    color: '#6c63ff',
    accent: '#a29bfe',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean whitespace, elegant typography. Perfect for design roles.',
    preview: '✨',
    color: '#2d3436',
    accent: '#00b894',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong colors and impactful layout. Ideal for creative fields.',
    preview: '🎨',
    color: '#d63031',
    accent: '#fdcb6e',
  },
]

export default function SelectTemplate() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('resumeId')

  const handleSelect = async (templateId) => {
    try {
      await API.put(`/resumes/${resumeId}`, { template: templateId })
    } catch (err) {
      console.warn('Could not save template, continuing anyway')
    }
    navigate(`/resume/${resumeId}`)
  }

  return (
    <div className="template-page">
      <Header />
      <div className="template-content">
        <div className="template-header">
          <h2>Choose Your Template</h2>
          <p>Pick a design to get started. You can change it later.</p>
        </div>

        <div className="templates-grid">
          {templates.map((tpl) => (
            <div key={tpl.id} className="template-card" onClick={() => handleSelect(tpl.id)}>
              <div
                className="template-preview"
                style={{ background: `linear-gradient(135deg, ${tpl.color}, ${tpl.accent})` }}
              >
                <span className="template-emoji">{tpl.preview}</span>
                <div className="preview-lines">
                  <div className="preview-line long" />
                  <div className="preview-line medium" />
                  <div className="preview-line short" />
                  <div className="preview-line medium" />
                </div>
              </div>
              <div className="template-info">
                <h3>{tpl.name}</h3>
                <p>{tpl.description}</p>
                <button className="use-template-btn" style={{ background: tpl.color }}>
                  Use This Template →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
