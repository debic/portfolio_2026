import { Project } from '../../types/project'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

function ProjectCard({ project, onClick }: ProjectCardProps): JSX.Element {
  const { title, description, images } = project

  return (
    <article
      className="pcard"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(project)}
      aria-label={`Ver proyecto: ${title}`}
    >
      <div
        className="pcard__inner"
        style={images.length > 0 ? { backgroundImage: `url(${images[0]})` } : {}}
      >
        {/* Gradient overlay for readability */}
        <div className="pcard__overlay" />

        {/* Text content on top */}
        <div className="pcard__content">
          <h3 className="pcard__title">{title}</h3>
          <p className="pcard__description">{description}</p>
          <span className="pcard__btn">See more →</span>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
