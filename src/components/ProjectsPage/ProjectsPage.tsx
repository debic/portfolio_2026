import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/project";
import { PROJECTS } from "../../projects";
import ProjectCard from "../ProjectCard/ProjectCard";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../ProjectsSection/ProjectsSection.css";
import "./ProjectsPage.css";

function useColumns(): number {
  const get = () => (window.innerWidth <= 640 ? 1 : 3);
  const [n, setN] = useState(get);
  useEffect(() => {
    const h = () => setN(get());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return n;
}

function buildColumns(projects: Project[], numCols: number): Project[][] {
  const cols: Project[][] = Array.from({ length: numCols }, () => []);
  projects.forEach((p, i) => cols[i % numCols].push(p));
  return cols;
}

function ProjectsPage(): JSX.Element {
  const navigate = useNavigate();
  const numCols = useColumns();
  const [activeTag, setActiveTag] = useState<string>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // El orden en el que aparecen los proyectos es siempre el orden
  // en el que están cargados en src/projects.ts (de arriba hacia abajo).
  // Para cambiar el orden de la página, reordená el array PROJECTS ahí.
  const tags = ["React", "UX/UI", "JavaScript"]


  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(activeTag)),
    [activeTag],
  );

  const columns = buildColumns(filtered, numCols);

  return (
    <div className="projects-page">
      <Navbar splashDone={true} />

      <div className="projects-page__header">
        <p className="projects-page__label">All Projects</p>
        <h1 className="projects-page__title">Everything I&rsquo;ve Built</h1>
        <p className="projects-page__subtitle">
          Explorá todos mis proyectos. Filtrá por tecnología para encontrar lo
          que estás buscando.
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
        <div
          className="projects-section__masonry projects-page__masonry"
          style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
        >
          {columns.map((col, ci) => (
            <div key={ci} className="projects-section__col">
              {col.map((p, pi) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={() =>
                    navigate(`/projects/${p.slug}`, {
                      state: { from: "/projects" },
                    })
                  }
                  index={ci + pi * numCols}
                />
              ))}
            </div>
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
