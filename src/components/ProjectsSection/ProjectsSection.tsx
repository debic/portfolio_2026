import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/project";
import { PROJECTS } from "../../projects";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./ProjectsSection.css";

function useColumns(): number {
  const get = () => (window.innerWidth <= 640 ? 1 : 2);
  //  const get = () => window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
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
        <h2 className="projects-section__title">Selected Projects</h2>
        <p className="projects-section__subtitle">
          A selection of projects where design meets functionality — built with
          attention to detail and user experience in mind.
        </p>
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
