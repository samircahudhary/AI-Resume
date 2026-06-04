import { Link } from 'react-router-dom'
import Header from '../components/header'
import './home.css'

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <div className="hero">
        <div className="hero-content">
          <h1>Build Your Perfect Resume <span>with AI</span></h1>
          <p>Create ATS-optimized resumes in minutes. AI-powered suggestions, beautiful templates, and instant PDF download.</p>
          <div className="hero-btns">
            <Link to="/auth/sign-in" className="btn-primary">Get Started Free →</Link>
            <Link to="/auth/sign-in" className="btn-secondary">View Templates</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
