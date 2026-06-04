import AISuggestion from '../components/AISuggestion'
import './UserDetails.css'

export default function UserDetails({ userData, setUserData, handleUserSave }) {
  const update = (field) => (e) => setUserData(prev => ({ ...prev, [field]: e.target.value }))
  const applyAI = (field) => (value) => setUserData(prev => ({ ...prev, [field]: value }))

  const addExperience = () => setUserData(prev => ({
    ...prev,
    experiences: [...prev.experiences, { company: '', position: '', duration: '', description: '' }]
  }))

  const updateExp = (i, field, val) => setUserData(prev => ({
    ...prev,
    experiences: prev.experiences.map((e, idx) => idx === i ? { ...e, [field]: val } : e)
  }))

  const removeExp = (i) => setUserData(prev => ({
    ...prev,
    experiences: prev.experiences.filter((_, idx) => idx !== i)
  }))

  const addProject = () => setUserData(prev => ({
    ...prev,
    projects: [...prev.projects, { title: '', description: '', link: '' }]
  }))

  const updateProj = (i, field, val) => setUserData(prev => ({
    ...prev,
    projects: prev.projects.map((p, idx) => idx === i ? { ...p, [field]: val } : p)
  }))

  const removeProj = (i) => setUserData(prev => ({
    ...prev,
    projects: prev.projects.filter((_, idx) => idx !== i)
  }))

  return (
    <div className="user-details">
      <h2>Resume Details</h2>

      <div className="form-group">
        <label>Job Title / Desired Role</label>
        <input type="text" placeholder="e.g. Software Engineer" value={userData.jobTitle} onChange={update('jobTitle')} />
      </div>

<div className="form-group">
  <label>LinkedIn Profile</label>
  <input
    type="text"
    placeholder="https://linkedin.com/in/yourprofile"
    value={userData.linkedin || ''}
    onChange={update('linkedin')}
  />
</div>

<div className="form-group">
  <label>GitHub Profile</label>
  <input
    type="text"
    placeholder="https://github.com/yourusername"
    value={userData.github || ''}
    onChange={update('github')}
  />
</div>


      <div className="form-group">
        <label>Professional Summary</label>
        <textarea rows="3" placeholder="Brief professional summary..." value={userData.summary} onChange={update('summary')} />
        <AISuggestion
          section="Professional Summary"
          currentValue={userData.summary}
          jobTitle={userData.jobTitle}
          onApply={applyAI('summary')}
        />
      </div>

      <div className="form-group">
        <label>Skills (comma-separated)</label>
        <textarea rows="2" placeholder="React, Java, MongoDB, Python..." value={userData.skills} onChange={update('skills')} />
        <AISuggestion
          section="Technical Skills"
          currentValue={userData.skills}
          jobTitle={userData.jobTitle}
          onApply={applyAI('skills')}
        />
      </div>

      {/* EXPERIENCE */}
      <div className="section-block">
        <div className="section-block-header">
          <h3>Experience</h3>
          <button type="button" className="add-btn" onClick={addExperience}>+ Add</button>
        </div>
        {userData.experiences.map((exp, i) => (
          <div key={i} className="dynamic-item">
            <button className="remove-btn" onClick={() => removeExp(i)}>✕</button>
            <input placeholder="Company Name" value={exp.company} onChange={(e) => updateExp(i, 'company', e.target.value)} />
            <input placeholder="Position / Role" value={exp.position} onChange={(e) => updateExp(i, 'position', e.target.value)} />
            <input placeholder="Duration (e.g. Jun 2023 – Present)" value={exp.duration} onChange={(e) => updateExp(i, 'duration', e.target.value)} />
            <textarea rows="2" placeholder="Describe your responsibilities..." value={exp.description} onChange={(e) => updateExp(i, 'description', e.target.value)} />
            <AISuggestion
              section="Work Experience Description"
              currentValue={exp.description}
              jobTitle={userData.jobTitle}
              onApply={(val) => updateExp(i, 'description', val)}
            />
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="section-block">
        <h3>Education</h3>
        <input placeholder="College / University Name" value={userData.college} onChange={update('college')} />
        <input placeholder="Degree (e.g. B.Tech)" value={userData.degree} onChange={update('degree')} />
        <input placeholder="Branch (e.g. Computer Science)" value={userData.branch} onChange={update('branch')} />
        <input placeholder="CGPA (e.g. 8.5)" value={userData.cgpa} onChange={update('cgpa')} />
        <input placeholder="Class XII (e.g. CBSE - 85%)" value={userData.twelth} onChange={update('twelth')} />
        <input placeholder="Class X (e.g. CBSE - 90%)" value={userData.tenth} onChange={update('tenth')} />
      </div>

      {/* PROJECTS */}
      <div className="section-block">
        <div className="section-block-header">
          <h3>Projects</h3>
          <button type="button" className="add-btn" onClick={addProject}>+ Add</button>
        </div>
        {userData.projects.map((proj, i) => (
          <div key={i} className="dynamic-item">
            <button className="remove-btn" onClick={() => removeProj(i)}>✕</button>
            <input placeholder="Project Title" value={proj.title} onChange={(e) => updateProj(i, 'title', e.target.value)} />
            <input placeholder="Project Link / GitHub URL" value={proj.link} onChange={(e) => updateProj(i, 'link', e.target.value)} />
            <textarea rows="2" placeholder="Describe the project..." value={proj.description} onChange={(e) => updateProj(i, 'description', e.target.value)} />
            <AISuggestion
              section="Project Description"
              currentValue={proj.description}
              jobTitle={userData.jobTitle}
              onApply={(val) => updateProj(i, 'description', val)}
            />
          </div>
        ))}
      </div>

      {/* ADDITIONAL */}
      <div className="section-block">
        <h3>Additional Information</h3>
        <input placeholder="Internships / Training" value={userData.internships} onChange={update('internships')} />
        <input placeholder="Certifications" value={userData.certifications} onChange={update('certifications')} />
        <input placeholder="Achievements / Awards" value={userData.achievements} onChange={update('achievements')} />
        <input placeholder="Hobbies & Interests" value={userData.hobbies} onChange={update('hobbies')} />
        <input placeholder="Portfolio URL" value={userData.portfolio} onChange={update('portfolio')} />
        <input
  placeholder="Additional Link"
  value={userData.additionalLink || ''}
  onChange={update('additionalLink')}
/>
      </div>

      <button className="save-btn-user" onClick={handleUserSave}>
        Save & Preview Resume →
      </button>
    </div>
  )
}
