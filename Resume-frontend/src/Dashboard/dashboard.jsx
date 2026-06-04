import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import AddResume from '../components/AddResume'
import API from '../services/api'
import './dashboard.css'
import Footer from '../components/Footer'

export default function Dashboard() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserResumes()
  }, [user])

  const fetchUserResumes = async () => {
    if (!user) return
    try {
      const response = await API.get(`/resumes/user/${user.id}`)
      setResumes(response.data)
    } catch (err) {
      console.error('Failed to load resumes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteResume = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('Delete this resume?')) return
    try {
      await API.delete(`/resumes/${id}`)
      setResumes(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      alert('Failed to delete resume')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="dashboard-page">
      <Header />

      {/* User Info Banner */}
      <div className="user-banner">
        <img
          src={user?.imageUrl}
          alt={user?.fullName}
          className="user-avatar"
        />
        <div className="user-info">
          <h2>Welcome back, {user?.firstName}! 👋</h2>
          <p>{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section-header">
          <h3>My Resumes</h3>
          <span className="resume-count">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="resumes-grid">
          {/* Create new resume card */}
          <AddResume onCreated={fetchUserResumes} />

          {/* Existing resumes */}
          {loading ? (
            <div className="loading-card">Loading...</div>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className="resume-card"
                onClick={() => navigate(`/resume/${resume.id}`)}
              >
                <div className="resume-card-header">
                  <div className="resume-icon">📄</div>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteResume(resume.id, e)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
                <div className="resume-card-body">
                  <h4>{resume.title || 'Untitled Resume'}</h4>
                  <p className="resume-name">{resume.fullName || 'No name yet'}</p>
                  <p className="resume-date">Updated: {formatDate(resume.updatedAt)}</p>
                </div>
                <div className="resume-card-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/resume/${resume.id}`) }}
                  >
                    Edit
                  </button>
                  <button
                    className="preview-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/resume-preview/${resume.id}`) }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
