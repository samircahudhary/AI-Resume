import { useEffect, useState } from 'react'
import './Footer.css'

export default function Footer() {
  const quotes = [
  "Dream big, code bigger, and debug later.",
  "Every expert was once a beginner who refused to quit.",
  "Coffee, code, gym, repeat until success appears.",
  "Talent starts the race; consistency wins it."
]

const [quoteIndex, setQuoteIndex] = useState(0)
const [displayText, setDisplayText] = useState("")

useEffect(() => {
  let charIndex = 0
  const currentQuote = quotes[quoteIndex]

  setDisplayText("")

  const typing = setInterval(() => {
    setDisplayText(currentQuote.slice(0, charIndex + 1))
    charIndex++

    if (charIndex === currentQuote.length) {
      clearInterval(typing)

      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length)
      }, 2000) // wait before next quote
    }
  }, 60) // typing speed

  return () => clearInterval(typing)
}, [quoteIndex])
  return (
    <footer className="footer">
      <div className="footer-content">

        <p className="footer-quote">
  "{displayText}"
  <span className="cursor">|</span>
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