import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../services/api'
import PersonalDetails from '../components/PersonalDetails'
import UserDetails from '../pages/UserDetails'
import ATSScore from '../components/ATSScore'
import Header from '../components/header'
import './EditResume.css'

function EditResume() {
  const { id } = useParams()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [template, setTemplate] = useState('modern')

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', linkedin: '', github: '',
  })

  const [userData, setUserData] = useState({
    jobTitle: '', summary: '', skills: '',
    experiences: [], college: '', degree: '', branch: '',
    cgpa: '', twelth: '', tenth: '', projects: [],
    linkedin: '', github: '', portfolio: '',
    certifications: '', achievements: '', hobbies: '', internships: '',
  })

  useEffect(() => { fetchResume() }, [])

  const fetchResume = async () => {
    try {
      const res = await API.get(`/resumes/${id}`)
      const d = res.data
      setTemplate(d.template || 'modern')
      setFormData({
        fullName: d.fullName || '', email: d.email || '',
        phone: d.phone || '', linkedin: d.linkedIn || '', github: d.github || '',
      })
      setUserData({
        jobTitle: d.jobTitle || '', summary: d.summary || '',
        skills: d.skills || '', experiences: d.experiences || [],
        college: d.college || '', degree: d.degree || '', branch: d.branch || '',
        cgpa: d.cgpa || '', twelth: d.twelth || '', tenth: d.tenth || '',
        projects: d.projects || [], linkedin: d.linkedin || '',
        github: d.github || '', portfolio: d.portfolio || '',
        certifications: d.certifications || '', achievements: d.achievements || '',
        hobbies: d.hobbies || '', internships: d.internships || '',
      })
    } catch (err) {
      console.error('Error fetching resume:', err)
    }
  }

  const handleSave = async () => {
    try {
      await API.put(`/resumes/${id}`, { ...formData, template })
      setStep(2)
    } catch {
      alert('Failed to save. Make sure backend is running.')
    }
  }

  const handleUserSave = async () => {
    try {
      await API.put(`/resumes/${id}`, { ...formData, ...userData, template })
      navigate(`/resume-preview/${id}`)
    } catch {
      alert('Failed to save resume.')
    }
  }

  const allData = { ...formData, ...userData }

  return (
    <div className="editor-wrapper">
      <Header />
      <div className="editor-container">
        <div className="editor-layout">

          {/* LEFT FORM */}
          <div className="editor-form">
            <div className="step-indicator">
              <button className={`step-btn ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1. Personal</button>
              <button className={`step-btn ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>2. Details</button>
              <button className={`step-btn ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}>3. ATS Score</button>
            </div>

            {step === 1 && (
              <PersonalDetails formData={formData} setFormData={setFormData} handleSave={handleSave} />
            )}
            {step === 2 && (
              <UserDetails userData={userData} setUserData={setUserData} handleUserSave={handleUserSave} />
            )}
            {step === 3 && (
              <ATSScore resumeData={allData} />
            )}
          </div>

          {/* RIGHT PREVIEW */}
          <div className={`editor-preview template-${template}`}>
            <div className="resume-header">
              <h1>{formData.fullName || 'Your Name'}</h1>
              <h3 className="job-title">{userData.jobTitle || ''}</h3>
              <div className="contact-info">
                <span>{formData.email || 'email@example.com'}</span>
                <span className="separator">|</span>
                <span>{formData.phone ? `+91 ${formData.phone}` : '+91 XXXXX XXXXX'}</span>
              </div>
             <div className="social-links">
  {userData.linkedin && (
    <a
      href={
        userData.linkedin.startsWith("http")
          ? userData.linkedin
          : `https://${userData.linkedin}`
      }
      target="_blank"
      rel="noreferrer"
    >
      LinkedIn
    </a>
  )}

  {userData.github && (
    <>
      {userData.linkedin && <span> | </span>}
      <a
        href={
          userData.github.startsWith("http")
            ? userData.github
            : `https://${userData.github}`
        }
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </>
  )}

  {userData.portfolio && (
    <>
      {(userData.linkedin || userData.github) && <span> | </span>}
      <a
        href={
          userData.portfolio.startsWith("http")
            ? userData.portfolio
            : `https://${userData.portfolio}`
        }
        target="_blank"
        rel="noreferrer"
      >
        Portfolio
      </a>
    </>
  )}
</div>
            </div>

            {userData.summary && (
              <div className="resume-section">
                <h2>Professional Summary</h2>
                <p>{userData.summary}</p>
              </div>
            )}

            {userData.skills && (
  <div className="resume-section">
    <h2>Skills</h2>

    <div className="skills-container">
      {userData.skills
        .split(',')
        .filter(skill => skill.trim() !== '')
        .map((skill, index) => (
          <span key={index} className="skill-item">
            • {skill.trim()}
          </span>
        ))}
    </div>
  </div>
)}

            {userData.experiences?.length > 0 && (
              <div className="resume-section">
                <h2>Experience</h2>
                {userData.experiences.map((exp, i) => (
                  <div key={i} className="experience-item">
                    <strong>{exp.position}</strong> at <span>{exp.company}</span>
                    <span className="duration-text"> ({exp.duration})</span>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {(userData.college || userData.twelth || userData.tenth) && (
              <div className="resume-section">
                <h2>Education</h2>
                {userData.college && (
                  <div>
                    <strong>{userData.degree} in {userData.branch}</strong>
                    <p>{userData.college} {userData.cgpa && `- CGPA: ${userData.cgpa}`}</p>
                  </div>
                )}
                {userData.twelth && <p><strong>Class XII:</strong> {userData.twelth}</p>}
                {userData.tenth && <p><strong>Class X:</strong> {userData.tenth}</p>}
              </div>
            )}

            {userData.projects?.length > 0 && (
              <div className="resume-section">
                <h2>Projects</h2>
                {userData.projects.map((proj, i) => (
                  <div key={i} className="project-item">
                    <strong>{proj.title}</strong>
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer"> [Link]</a>}
                    <p>{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {(userData.certifications || userData.achievements || userData.hobbies || userData.internships) && (
              <div className="resume-section">
                <h2>Additional Information</h2>
                {userData.internships && <p><strong>Internships:</strong> {userData.internships}</p>}
                {userData.certifications && <p><strong>Certifications:</strong> {userData.certifications}</p>}
                {userData.achievements && <p><strong>Achievements:</strong> {userData.achievements}</p>}
                {userData.hobbies && <p><strong>Hobbies:</strong> {userData.hobbies}</p>}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditResume
