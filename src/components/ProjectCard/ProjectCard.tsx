import { useEffect, useRef } from "react";
import { Project } from "../../types/project";
import DistortImage from "../DistortImage/DistortImage";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
  aspectRatio?: string;
  titleOnHover?: boolean;
}

const IMAGE_ASPECT_RATIOS: Record<NonNullable<Project["imageHeight"]>, string> = {
  sm: "2.095 / 1",
  md: "1.44 / 1",
  lg: "1.047 / 1",
  xl: "0.794 / 1",
};

function ProjectCard({
  project,
  onClick,
  index,
  aspectRatio,
  titleOnHover = false,
}: ProjectCardProps): JSX.Element {
  const { title, tags, images, imageHeight = "md" } = project;
  const ref = useRef<HTMLElement>(null);
  const imgAspectRatio = aspectRatio ?? IMAGE_ASPECT_RATIOS[imageHeight];

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
      <div
        className="pcard__image-wrapper"
        style={{ aspectRatio: imgAspectRatio }}
      >
        {images.length > 0 ? (
          <DistortImage
            className="pcard__image"
            src={`${import.meta.env.BASE_URL}${images[0].replace(/^\//, "")}`}
            alt={title}
          />
        ) : (
          <div className="pcard__image--placeholder" />
        )}

        <div className="pcard__overlay">
          {titleOnHover && (
            <h3 className="pcard__title-hover">{title}</h3>
          )}
          <div className="pcard__tags">
            {tags.map((tag) => (
              <span key={tag} className="pcard__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!titleOnHover && (
        <div className="pcard__body">
          <h3 className="pcard__title">{title}</h3>
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
