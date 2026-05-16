import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/project";
import { PROJECTS } from "../../projects";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./ProjectsSection.css";

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

function ProjectsSection(): JSX.Element {
  const navigate = useNavigate();
  const numCols = useColumns();
  const columns = buildColumns(PROJECTS, numCols);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-section__header">
        <div className="projects-section__header-left">
          <p className="projects-section__label">Featured Projects</p>
          <h2 className="projects-section__title">What I've Been Working On</h2>
        </div>
        <div className="projects-section__header-right">
          <p className="projects-section__subtitle">
            Over the years, I've worked on a variety of projects ranging from
            user interfaces and mobile apps to full digital experiences. This
            portfolio reflects not just what I've built, but how I think.
          </p>
          <a href="#" className="projects-section__view-all">
            View All Works ↗
          </a>
        </div>
      </div>

      <div
        className="projects-section__masonry"
        style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
      >
        {columns.map((col, ci) => (
          <div key={ci} className="projects-section__col">
            {col.map((p, pi) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => navigate(`/projects/${p.slug}`)}
                index={ci + pi * numCols}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
