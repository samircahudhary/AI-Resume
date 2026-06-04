const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

async function callGemini(prompt) {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })
  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}



// Get AI suggestions for a specific resume section
export async function getAISuggestion(section, currentValue, jobTitle) {
  const prompt = `You are a professional resume writer. 
  Job Title: ${jobTitle || 'Software Engineer'}
  Section: ${section}
  Current content: "${currentValue}"
  
  Provide a better, more professional version of this resume section in 2-3 sentences. 
  Be specific, use action verbs, and include measurable achievements where possible.
  Return ONLY the improved text, nothing else.`

  return callGemini(prompt)
}



// Calculate ATS score for the resume
export async function getATSScore(resumeData) {
  const resumeText = `
    Name: ${resumeData.fullName}
    Job Title: ${resumeData.jobTitle}
    Summary: ${resumeData.summary}
    Skills: ${resumeData.skills}
    Experience: ${JSON.stringify(resumeData.experiences)}
    Education: ${resumeData.college} - ${resumeData.degree}
    Projects: ${JSON.stringify(resumeData.projects)}
  `

  const prompt = `You are an ATS (Applicant Tracking System) expert.
  Analyze this resume and provide a JSON response with exactly this format:
  {
    "score": <number between 0-100>,
    "breakdown": {
      "keywords": <score 0-25>,
      "formatting": <score 0-25>,
      "completeness": <score 0-25>,
      "readability": <score 0-25>
    },
    "strengths": ["strength1", "strength2", "strength3"],
    "improvements": ["improvement1", "improvement2", "improvement3"]
  }
  
  Resume: ${resumeText}
  
  Return ONLY valid JSON, nothing else.`

  const result = await callGemini(prompt)
  try {
    const clean = result.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return {
      score: 65,
      breakdown: { keywords: 15, formatting: 18, completeness: 16, readability: 16 },
      strengths: ['Good structure', 'Clear contact info'],
      improvements: ['Add more keywords', 'Quantify achievements', 'Expand skills section']
    }
  }
}
