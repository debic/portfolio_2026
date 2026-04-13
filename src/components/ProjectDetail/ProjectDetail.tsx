import { useEffect, useState } from 'react'
import { Project } from '../../types/project'
import Button from '../Button/Button'
import './ProjectDetail.css'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

function ProjectDetail({ project, onClose }: ProjectDetailProps): JSX.Element {
  const [activeImg, setActiveImg] = useState<number>(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const hasImages = project.images.length > 0

  return (
    <div className="pdetail" role="dialog" aria-modal="true" aria-label={project.title}>

      {/* ── Sticky header ── */}
      <header className="pdetail__header">
        <button className="pdetail__back" onClick={onClose} aria-label="Volver">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <div className="pdetail__header-links">
          {project.liveUrl && (
            <Button variant="solid" size="md" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live →
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="md" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          )}
        </div>
      </header>

      <div className="pdetail__layout">

        {/* ── LEFT — sticky info panel ── */}
        <aside className="pdetail__sidebar">
          <p className="pdetail__subtitle">{project.subtitle}</p>
          <h1 className="pdetail__title">{project.title}</h1>

          {/* Quick stats */}
          <div className="pdetail__stats">
            {project.role && (
              <div className="pdetail__stat">
                <span className="pdetail__stat-label">Role</span>
                <span className="pdetail__stat-value">{project.role}</span>
              </div>
            )}
            {project.year && (
              <div className="pdetail__stat">
                <span className="pdetail__stat-label">Year</span>
                <span className="pdetail__stat-value">{project.year}</span>
              </div>
            )}
            {project.duration && (
              <div className="pdetail__stat">
                <span className="pdetail__stat-label">Duration</span>
                <span className="pdetail__stat-value">{project.duration}</span>
              </div>
            )}
          </div>

          {/* Tech stack */}
          <div className="pdetail__stack">
            <span className="pdetail__stack-label">Tech Stack</span>
            <div className="pdetail__tags">
              {project.tags.map(tag => (
                <span key={tag} className="pdetail__tag">{tag}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── RIGHT — scrollable content ── */}
        <main className="pdetail__content">

          {/* Hero image */}
          <div className="pdetail__hero-img">
            {hasImages
              ? <img src={project.images[activeImg]} alt={project.title} className="pdetail__img" />
              : <div className="pdetail__img-placeholder" />
            }
          </div>

          {/* Overview */}
          <section className="pdetail__section">
            <h2 className="pdetail__section-title">Overview</h2>
            <p className="pdetail__text">{project.description}</p>
          </section>

          {/* Challenge */}
          {project.challenge && (
            <section className="pdetail__section">
              <h2 className="pdetail__section-title">The Challenge</h2>
              <p className="pdetail__text">{project.challenge}</p>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section className="pdetail__section pdetail__section--highlight">
              <h2 className="pdetail__section-title">The Solution</h2>
              <p className="pdetail__text">{project.solution}</p>
            </section>
          )}

          {/* Image gallery — remaining images */}
          {project.images.length > 1 && (
            <section className="pdetail__section">
              <h2 className="pdetail__section-title">Screenshots</h2>
              <div className="pdetail__gallery">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pdetail__gallery-item ${i === activeImg ? 'pdetail__gallery-item--active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Tech stack — bottom */}
          <section className="pdetail__section">
            <h2 className="pdetail__section-title">Technologies Used</h2>
            <div className="pdetail__tags pdetail__tags--large">
              {project.tags.map(tag => (
                <span key={tag} className="pdetail__tag pdetail__tag--large">{tag}</span>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

export default ProjectDetail
