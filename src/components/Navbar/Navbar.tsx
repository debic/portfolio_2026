import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner">

        {/* Links — solo visibles al hacer scroll */}
        <ul className={`navbar__links ${scrolled ? 'navbar__links--visible' : ''}`}>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Logo — siempre visible */}
        <a href="#hero" className="navbar__logo" aria-label="Debi Perez logo">
          <svg
            className="navbar__logo-svg"
            viewBox="0 0 299 241.9"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M259.5,89.8c-8.6-15-24.7-24.4-42-24.4c0,0,0,0,0,0l-44.3,0c-16.1,0-31.1,8.1-40.1,21.3l-0.1-69.1h-8.2L125,87
                c-6.4-9.7-16-16.6-27.3-19.8c-12.4-3.5-25.5-1.9-36.8,4.4C49.8,78,41.7,88.4,38.2,100.8s-1.9,25.5,4.4,36.8
                c13.1,23.2,42.7,31.5,65.9,18.4c9.1-5.1,16.3-13.1,20.5-22.7c7.1,16.1,22.6,27.2,40.2,28.7l0.1,55.5h8.2l-0.1-76.7
                c14,20.8,42,27.6,64.1,15c11.2-6.4,19.3-16.8,22.7-29.2S265.9,101,259.5,89.8z M124.9,113.8c0,10.7-4.2,20.8-11.7,28.4
                s-17.7,11.8-28.4,11.8h0c-22.2,0-40.2-18-40.2-40.2c0-22.2,18-40.2,40.2-40.2S124.9,91.6,124.9,113.8z M169.2,153.8
                c-19.9-2-35.5-18.8-36.1-38.7h0.1l0-4.3c1.7-20.7,19.2-37,40-37h17.4c-13.3,8.9-21.4,24-21.4,40.2L169.2,153.8z M188.6,85.6
                c7.5-7.6,17.6-11.9,28.3-12l0.7,0c0.1,0,0.2,0,0.3,0c22,0,40,17.8,40.2,39.9c0.1,10.7-4,20.8-11.5,28.5
                c-7.5,7.6-17.6,11.9-28.3,12c-0.2,0-0.4,0-0.6,0h0h0c-10.8,0.1-20.8-4-28.5-11.5c-7.6-7.5-11.9-17.6-12-28.3
                S181.1,93.3,188.6,85.6z"
            />
          </svg>
        </a>

      </nav>
    </header>
  )
}

export default Navbar
