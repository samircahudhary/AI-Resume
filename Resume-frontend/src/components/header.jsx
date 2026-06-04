import { useState } from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>

        <div className="heading">AI-RESUME-BUILDER</div>

        <nav className={`header-nav ${isMobileOpen ? 'nav-active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" onClick={() => setIsMobileOpen(false)}>Home</Link></li>
            {isSignedIn && (
              <li className="nav-item">
                <Link to="/dashboard" onClick={() => setIsMobileOpen(false)}>Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="header-cta">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link to="/auth/sign-in" className="cta-button">Get Started</Link>
          )}
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          ☰
        </button>
      </div>
    </header>
  )
}

export default Header
