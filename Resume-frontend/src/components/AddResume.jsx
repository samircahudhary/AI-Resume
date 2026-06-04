import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import API from '../services/api'
import './AddResume.css'

function AddResume({ onCreated }) {
  const [showModal, setShowModal] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('')
  const navigate = useNavigate()
  const { user } = useUser()

  const handleCreate = async () => {
    if (!resumeTitle.trim()) {
      alert('Please enter a resume title')
      return
    }

    try {
      const response = await API.post('/resumes', {
        title: resumeTitle,
        userId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress,
        userName: user.fullName,
      })

      const resumeId = response.data.id
      setShowModal(false)
      setResumeTitle('')
      onCreated?.()
      // Go to template selection first
      navigate(`/select-template?resumeId=${resumeId}`)
    } catch (error) {
      console.error(error)
      alert('Failed to create resume. Make sure backend is running.')
    }
  }

  return (
    <div className="resume-container">
      <div className="notepad-card" onClick={() => setShowModal(true)}>
        <div className="notepad-header">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />
        </div>
        <div className="paper">
          <h2>Create Resume</h2>
          <div className="line" /><div className="line" /><div className="line short" />
          <div className="plus-circle">+</div>
          <p>Click to create a new resume</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Create New Resume</h3>
            <input
              type="text"
              placeholder="Enter Resume Title (e.g. Software Engineer Resume)"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              className="resume-input"
              autoFocus
            />
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="create-btn" onClick={handleCreate}>Create →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddResume
