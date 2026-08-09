import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../projects";
import ProjectCard from "../ProjectCard/ProjectCard";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./ProjectsPage.css";

function ProjectsPage(): JSX.Element {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState<string>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // El orden en el que aparecen los proyectos es siempre el orden
  // en el que están cargados en src/projects.ts (de arriba hacia abajo).
  // Para cambiar el orden de la página, reordená el array PROJECTS ahí.
  const tags = ["All", "React", "UX/UI", "CMS/Website Builders", "JavaScript", "Branding"];

  // Plataformas que cuentan como "CMS/Website Builders". Para que un proyecto
  // aparezca en ese filtro, alcanza con que tenga alguno de estos tags
  // (no hace falta agregar el tag literal "CMS/Website Builders").
  const CMS_PLATFORMS = ["Shopify", "Wix", "Wordpress", "Squarespace", "Webflow"];

  const filtered = useMemo(() => {
    if (activeTag === "All") return PROJECTS;
    if (activeTag === "CMS/Website Builders") {
      return PROJECTS.filter((p) =>
        p.tags.some((t) =>
          CMS_PLATFORMS.some((c) => c.toLowerCase() === t.toLowerCase()),
        ),
      );
    }
    return PROJECTS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="projects-page">
      <Navbar splashDone={true} />

      <div className="projects-page__header">
        <p className="projects-page__label">All Projects</p>
        <h1 className="projects-page__title">Everything I&rsquo;ve Built</h1>
        <p className="projects-page__subtitle">
          Explore all my projects. Filter by technology to find what you're looking for.
        </p>
      </div>

      <div className="projects-page__filters">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`projects-page__filter ${
              activeTag === tag ? "projects-page__filter--active" : ""
            }`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="projects-page__grid">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              aspectRatio="4 / 3"
              titleOnHover
              onClick={() =>
                navigate(`/projects/${p.slug}`, {
                  state: { from: "/projects" },
                })
              }
              index={i}
            />
          ))}
        </div>
      ) : (
        <p className="projects-page__empty">
          No hay proyectos con este filtro.
        </p>
      )}

      <Footer />
    </div>
  );
}

export default ProjectsPage;
