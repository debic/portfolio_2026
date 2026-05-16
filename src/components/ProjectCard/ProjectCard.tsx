import { useEffect, useRef } from "react";
import { Project } from "../../types/project";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

const IMAGE_HEIGHTS: Record<NonNullable<Project["imageHeight"]>, string> = {
  sm: "220px",
  md: "320px",
  lg: "440px",
  xl: "580px",
};

function ProjectCard({
  project,
  onClick,
  index,
}: ProjectCardProps): JSX.Element {
  const { title, tags, images, imageHeight = "md" } = project;
  const ref = useRef<HTMLElement>(null);
  const imgHeight = IMAGE_HEIGHTS[imageHeight];

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
      aria-label={`View project: ${title}`}
    >
      <div className="pcard__image-wrapper" style={{ height: imgHeight }}>
        {images.length > 0 ? (
          <img
            className="pcard__image"
            src={`${import.meta.env.BASE_URL}${images[0].replace(/^\//, "")}`}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="pcard__image--placeholder" />
        )}

        <div className="pcard__tags">
          {tags.map((tag) => (
            <span key={tag} className="pcard__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">{title}</h3>
      </div>
    </article>
  );
}

export default ProjectCard;
