import { useState } from 'react'
import './ATSScore.css'

export default function ATSScore({ resumeData }) {
  const [result, setResult] = useState(null)

  const analyze = () => {
    const isEmpty =
      !resumeData.fullName &&
      !resumeData.email &&
      !resumeData.phone &&
      !resumeData.summary &&
      !resumeData.skills &&
      (!resumeData.projects || resumeData.projects.length === 0) &&
      (!resumeData.experiences || resumeData.experiences.length === 0) &&
      !resumeData.college &&
      !resumeData.degree &&
      !resumeData.cgpa

    if (isEmpty) {
      setResult({
        score: 0,
        breakdown: {
          keywords: 0,
          formatting: 0,
          completeness: 0,
          readability: 0
        },
        strengths: [],
        improvements: [
          'Add personal details',
          'Add technical skills',
          'Add education details',
          'Add projects',
          'Add internship or work experience'
        ]
      })
      return
    }

    const skillsCount = resumeData.skills
      ? resumeData.skills.split(',').filter(skill => skill.trim()).length
      : 0

    const projectsCount =
      resumeData.projects?.filter(
        p => p.title || p.description
      ).length || 0

    const experienceCount =
      resumeData.experiences?.filter(
        e => e.company || e.position || e.description
      ).length || 0

    const cgpa = parseFloat(resumeData.cgpa) || 0

    const breakdown = {
      keywords: 0,
      formatting: 0,
      completeness: 0,
      readability: 0
    }

    // KEYWORDS (25)
    breakdown.keywords += Math.min(skillsCount * 2, 15)
    breakdown.keywords += Math.min(projectsCount * 2, 5)
    breakdown.keywords += Math.min(experienceCount * 2, 5)

    // FORMATTING (25)
    if (resumeData.summary) breakdown.formatting += 8
    if (resumeData.skills) breakdown.formatting += 5
    if (projectsCount > 0) breakdown.formatting += 6
    if (experienceCount > 0) breakdown.formatting += 6

    // COMPLETENESS (25)
    if (resumeData.fullName) breakdown.completeness += 3
    if (resumeData.email) breakdown.completeness += 3
    if (resumeData.phone) breakdown.completeness += 3
    if (resumeData.college) breakdown.completeness += 3
    if (resumeData.degree) breakdown.completeness += 3
    if (resumeData.branch) breakdown.completeness += 2
    if (resumeData.linkedin) breakdown.completeness += 3
    if (resumeData.github) breakdown.completeness += 3
    if (resumeData.portfolio) breakdown.completeness += 2

    // READABILITY (25)
    if (cgpa >= 9) breakdown.readability += 10
    else if (cgpa >= 8) breakdown.readability += 8
    else if (cgpa >= 7) breakdown.readability += 6
    else if (cgpa >= 6) breakdown.readability += 4

    if (resumeData.summary?.length > 50)
      breakdown.readability += 5

    if (skillsCount >= 5)
      breakdown.readability += 5

    if (projectsCount >= 2)
      breakdown.readability += 5

    Object.keys(breakdown).forEach(key => {
      breakdown[key] = Math.min(breakdown[key], 25)
    })

    const score = Math.min(
      breakdown.keywords +
      breakdown.formatting +
      breakdown.completeness +
      breakdown.readability,
      100
    )

    const strengths = []

    if (skillsCount >= 5)
      strengths.push('Strong technical skill set')

    if (projectsCount >= 2)
      strengths.push('Multiple projects demonstrate practical experience')

    if (experienceCount > 0)
      strengths.push('Relevant work or internship experience included')

    if (cgpa >= 8)
      strengths.push('Good academic performance')

    if (resumeData.linkedin)
      strengths.push('Professional LinkedIn profile included')

    if (resumeData.github)
      strengths.push('GitHub profile showcases technical work')

    if (resumeData.portfolio)
      strengths.push('Portfolio website improves recruiter visibility')

    if (resumeData.summary)
      strengths.push('Professional summary included')

    const improvements = []

    if (skillsCount < 5)
      improvements.push('Add more technical and job-relevant skills')

    if (projectsCount < 2)
      improvements.push('Include at least 2 detailed projects')

    if (experienceCount === 0)
      improvements.push('Add internship or work experience')

    if (!resumeData.summary)
      improvements.push('Add a professional summary')

    if (!resumeData.linkedin)
      improvements.push('Add LinkedIn profile')

    if (!resumeData.github)
      improvements.push('Add GitHub profile')

    if (!resumeData.portfolio)
      improvements.push('Add portfolio or personal website')

    if (!resumeData.certifications)
      improvements.push('Include certifications to strengthen your profile')

    setResult({
      score,
      breakdown,
      strengths,
      improvements
    })
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
        <button className="analyze-btn" onClick={analyze}>
          Analyze Resume
        </button>
      </div>

      {result && (
        <div className="ats-result">
          <div
            className="score-circle"
            style={{
              borderColor: getScoreColor(result.score)
            }}
          >
            <span
              className="score-number"
              style={{
                color: getScoreColor(result.score)
              }}
            >
              {result.score}
            </span>
            <span className="score-label">/100</span>
          </div>

          <div className="breakdown">
            {Object.entries(result.breakdown).map(([key, val]) => (
              <div key={key} className="breakdown-item">
                <span className="breakdown-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>

                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{
                      width: `${(val / 25) * 100}%`,
                      background: getScoreColor(val * 4)
                    }}
                  />
                </div>

                <span className="breakdown-val">
                  {val}/25
                </span>
              </div>
            ))}
          </div>

          <div className="ats-feedback">
            <div className="feedback-section">
              <h4>✅ Strengths</h4>
              <ul>
                {result.strengths.length > 0 ? (
                  result.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No major strengths detected yet.</li>
                )}
              </ul>
            </div>

            <div className="feedback-section">
              <h4>⚠️ Improvements</h4>
              <ul>
                {result.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}