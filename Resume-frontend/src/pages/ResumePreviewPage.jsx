import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/api'
import './ResumePreviewPage.css'

export default function ResumePreviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get(`/resumes/${id}`)
      .then(res => setResume(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  const downloadPDF = async () => {
    const { default: html2pdf } = await import('html2pdf.js')
    const element = document.querySelector('.preview-resume')
    html2pdf().set({
      margin: 0,
      filename: `${resume?.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    }).from(element).save()
  }

  if (loading) return <div className="preview-loading">Loading...</div>
  if (!resume) return <div className="preview-loading">Resume not found.</div>

  const tpl = resume.template || 'modern'

  return (
    <div className="preview-page">
      <div className="preview-toolbar">
        <button onClick={() => navigate(`/resume/${id}`)} className="back-btn">← Edit</button>
        <button onClick={() => navigate('/dashboard')} className="dashboard-btn">Dashboard</button>
        <button onClick={downloadPDF} className="download-btn">⬇ Download PDF</button>
      </div>

      <div className={`preview-resume template-${tpl}`}>
        <div className="resume-header">
          <h1>{resume.fullName}</h1>
          {resume.jobTitle && <h3 className="job-title">{resume.jobTitle}</h3>}
          <div className="contact-info">
            {resume.email && <span>{resume.email}</span>}
            {resume.phone && <><span className="sep">|</span><span>+91 {resume.phone}</span></>}
          </div>
          <div className="social-links">
            {resume.linkedin && <a href={resume.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {resume.github && <>{resume.linkedin && <span> | </span>}<a href={resume.github} target="_blank" rel="noreferrer">GitHub</a></>}
            {resume.portfolio && <><span> | </span><a href={resume.portfolio} target="_blank" rel="noreferrer">Portfolio</a></>}
          </div>
        </div>

        {resume.summary && (
          <div className="resume-section">
            <h2>Professional Summary</h2>
            <p>{resume.summary}</p>
          </div>
        )}

        {resume.skills && (
          <div className="resume-section">
            <h2>Skills</h2>
            <p>{resume.skills}</p>
          </div>
        )}

        {resume.experiences?.length > 0 && (
          <div className="resume-section">
            <h2>Experience</h2>
            {resume.experiences.map((exp, i) => (
              <div key={i} className="exp-item">
                <strong>{exp.position}</strong> at {exp.company}
                <span className="dur"> ({exp.duration})</span>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {(resume.college || resume.twelth || resume.tenth) && (
          <div className="resume-section">
            <h2>Education</h2>
            {resume.college && (
              <div>
                <strong>{resume.degree} in {resume.branch}</strong>
                <p>{resume.college}{resume.cgpa ? ` — CGPA: ${resume.cgpa}` : ''}</p>
              </div>
            )}
            {resume.twelth && <p><strong>Class XII:</strong> {resume.twelth}</p>}
            {resume.tenth && <p><strong>Class X:</strong> {resume.tenth}</p>}
          </div>
        )}

        {resume.projects?.length > 0 && (
          <div className="resume-section">
            <h2>Projects</h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="proj-item">
                <strong>{proj.title}</strong>
                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer"> [Link]</a>}
                <p>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {(resume.certifications || resume.achievements || resume.hobbies || resume.internships) && (
          <div className="resume-section">
            <h2>Additional Information</h2>
            {resume.internships && <p><strong>Internships:</strong> {resume.internships}</p>}
            {resume.certifications && <p><strong>Certifications:</strong> {resume.certifications}</p>}
            {resume.achievements && <p><strong>Achievements:</strong> {resume.achievements}</p>}
            {resume.hobbies && <p><strong>Hobbies:</strong> {resume.hobbies}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
