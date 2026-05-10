import { useEffect, useRef } from "react";
import { Project } from "../../types/project";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

function ProjectCard({
  project,
  onClick,
  index,
}: ProjectCardProps): JSX.Element {
  const { title, description, tags, images } = project;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (index < 2) {
      el.classList.add("pcard--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("pcard--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={ref}
      className="pcard"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
      aria-label={`Ver proyecto: ${title}`}
    >
      {images.length > 0 && (
        <div className="pcard__image-wrapper">
          <img
            className="pcard__image"
            src={`${import.meta.env.BASE_URL}${images[0].replace(/^\//, "")}`}
            alt={title}
            loading="lazy"
          />
        </div>
      )}
      {images.length === 0 && <div className="pcard__image--placeholder" />}

      <div className="pcard__body">
        <h3 className="pcard__title">{title}</h3>
        <p className="pcard__description">{description}</p>

        <div className="pcard__footer">
          <div className="pcard__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="pcard__tag">
                #{tag}
              </span>
            ))}
          </div>
          <span className="pcard__btn">See more →</span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
