import { useEffect, useRef, useState } from 'react'
import './QuoteSection.css'

const WORDS: string[] = [
  'Lorem', 'Ipsum', 'is', 'simply', 'dummy',
  'text', 'of', 'the', 'printing', 'and',
  'typesetting', 'industry.',
]

function QuoteSection(): JSX.Element {
  const sectionRef              = useRef<HTMLElement>(null)
  const [revealCount, setRevealCount] = useState<number>(0)

  useEffect(() => {
    const handleScroll = (): void => {
      if (!sectionRef.current) return
      const rect    = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight
      const progress = Math.max(0, Math.min(1,
        (windowH - rect.top) / (rect.height + windowH * 0.3)
      ))
      setRevealCount(Math.floor(progress * WORDS.length))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="quote-section" ref={sectionRef}>
      <blockquote className="quote-section__text">
        {WORDS.map((word, i) => (
          <span
            key={i}
            className={`quote-section__word ${i < revealCount ? 'quote-section__word--revealed' : ''}`}
          >
            {word}{' '}
          </span>
        ))}
      </blockquote>
    </section>
  )
}

export default QuoteSection
