import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PROJECTS } from "../../projects";
import Navbar from "../Navbar/Navbar";
import "./ProjectDetail.css";

// A dónde volver y qué texto mostrar, según desde dónde entró el usuario.
// Se guarda en location.state al navegar (ver ProjectsSection y ProjectsPage).
// Si no hay estado (ej. entró por un link directo), vuelve al home.
function useBackTarget(): { path: string; label: string } {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  if (from === "/projects") {
    return { path: "/projects", label: "Back to all projects" };
  }
  return { path: "/", label: "Back to home" };
}

function ProjectPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  const backTarget = useBackTarget();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="pdetail">
        <Navbar splashDone={true} />
        <div className="pdetail__body">
          <p>Project not found.</p>
          <button onClick={() => navigate(backTarget.path)}>← Back</button>
        </div>
      </div>
    );
  }

  const detailImages = (project.detailImages ?? project.images).map((item) =>
    typeof item === "string" ? { src: item } : item,
  );
  const heroImage = detailImages[0];
  const extraImages = detailImages.slice(1, 3);
  const bottomImage = detailImages[3] ?? null;

  return (
    <div className="pdetail">
      <Navbar splashDone={true} />

      <div className="pdetail__back-bar">
        <button
          className="pdetail__back"
          onClick={() => navigate(backTarget.path)}
          aria-label="Volver"
        >
          <span className="pdetail__back-icon" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="17" y1="12" x2="7" y2="12" />
              <polyline points="11 7 5 12 11 17" />
            </svg>
          </span>
          {backTarget.label}
        </button>
      </div>

      <div className="pdetail__body">
        <div className="pdetail__hero">
          <p className="pdetail__category">{project.subtitle}</p>
          <h1 className="pdetail__title">{project.title}</h1>
        </div>

        <div className="pdetail__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="pdetail__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="pdetail__desc-block">
          <p className="pdetail__desc-label">DESCRIPTION</p>
          <p className="pdetail__desc">{project.description}</p>
          {(project.projectUrl || project.githubUrl) && (
            <div className="pdetail__links">
              {project.projectUrl && (
                <a
                  className="pdetail__link"
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Project Link
                  <span className="pdetail__link-icon" aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  className="pdetail__link"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Link
                  <span className="pdetail__link-icon" aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              )}
            </div>
          )}
        </div>

        {heroImage && (
          <div className="pdetail__hero-image-wrap">
            {heroImage.type === "video" ? (
              <video
                className="pdetail__hero-image"
                src={`${import.meta.env.BASE_URL}${heroImage.src.replace(/^\//, "")}`}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img
                className="pdetail__hero-image"
                src={`${import.meta.env.BASE_URL}${heroImage.src.replace(/^\//, "")}`}
                alt={project.title}
              />
            )}
          </div>
        )}

        {extraImages.length > 0 && (
          <div className="pdetail__gallery">
            {extraImages.map((img, i) => (
              <div
                key={i}
                className="pdetail__gallery-wrap"
                style={{ aspectRatio: img.aspectRatio ?? undefined }}
              >
                {img.type === "video" ? (
                  <video
                    className="pdetail__gallery-img"
                    src={`${import.meta.env.BASE_URL}${img.src.replace(/^\//, "")}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img
                    className="pdetail__gallery-img"
                    src={`${import.meta.env.BASE_URL}${img.src.replace(/^\//, "")}`}
                    alt={`${project.title} ${i + 2}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {bottomImage && (
          <div className="pdetail__bottom-wrap">
            {bottomImage.type === "video" ? (
              <video
                className="pdetail__bottom-img"
                src={`${import.meta.env.BASE_URL}${bottomImage.src.replace(/^\//, "")}`}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img
                className="pdetail__bottom-img"
                src={`${import.meta.env.BASE_URL}${bottomImage.src.replace(/^\//, "")}`}
                alt={`${project.title} bottom`}
              />
            )}
          </div>
        )}

        {project.sections && project.sections.length > 0 && (
          <div className="pdetail__sections">
            {project.sections.map((section, i) => (
              <div key={i} className="pdetail__block">
                <h2 className="pdetail__block-title">{section.title}</h2>
                <p className="pdetail__block-text">{section.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
