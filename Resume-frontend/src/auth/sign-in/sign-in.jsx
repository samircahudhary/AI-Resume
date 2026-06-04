import { SignIn } from '@clerk/clerk-react'
import './sign-in.css'

export default function SignInPage() {
  return (
    <div className="signin-container">
      <div className="signin-left">
        <h1>AI Resume Builder</h1>
        <p>Create professional resumes in minutes with AI-powered suggestions, ATS scoring, and beautiful templates.</p>
        <ul className="feature-list">
          <li>✦ 4 Professional Templates</li>
          <li>✦ AI-Powered Suggestions (Gemini)</li>
          <li>✦ ATS Score Analyzer</li>
          <li>✦ One-click PDF Download</li>
        </ul>
      </div>
      <div className="signin-right">
        <SignIn
  routing="path"
  path="/auth/sign-in"
  forceRedirectUrl="/dashboard"
/>
      </div>
    </div>
  )
}
