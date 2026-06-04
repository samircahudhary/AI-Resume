import { useEffect, useState } from 'react'
import './Footer.css'

export default function Footer() {
  const quotes = [
    "Dream big, code bigger, and debug later.-",
    "Every expert was once a beginner who refused to quit.",
    "Coffee, code, gym, repeat until success appears.",
    "Talent starts the race; consistency wins it."
  ]

  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="footer">
      <div className="footer-content">

        <p className="footer-quote">
          "{quotes[quoteIndex]}"
        </p>

        <div className="footer-socials">

          <a href="https://github.com/samircahudhary" target="_blank" rel="noreferrer">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" alt="GitHub" />
          </a>

          <a href="www.linkedin.com/in/samir-chaudhary-77b42a321" target="_blank" rel="noreferrer">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" alt="LinkedIn" />
          </a>

          <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noreferrer">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" alt="Instagram" />
          </a>

        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Resume Builder
        </p>

      </div>
    </footer>
  )
}