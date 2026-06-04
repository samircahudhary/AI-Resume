import './PersonalDetails.css'

export default function PersonalDetails({ formData, setFormData, handleSave }) {
  const update = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="personal-details">
      <h2>Personal Details</h2>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          placeholder="e.g. Rahul Sharma"
          value={formData.fullName}
          onChange={update('fullName')}
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          placeholder="rahul@gmail.com"
          value={formData.email}
          onChange={update('email')}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          placeholder="9876543210"
          value={formData.phone}
          onChange={update('phone')}
        />
      </div>

      <div className="form-group">
        <label>LinkedIn URL</label>
        <input
          type="text"
          placeholder="linkedin.com/in/yourname"
          value={formData.linkedin}
          onChange={update('linkedin')}
        />
      </div>

      <div className="form-group">
        <label>GitHub URL</label>
        <input
          type="text"
          placeholder="github.com/yourname"
          value={formData.github}
          onChange={update('github')}
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save & Continue →
      </button>
    </div>
  )
}
