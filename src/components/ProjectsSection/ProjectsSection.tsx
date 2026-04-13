import { useState } from 'react'
import { Project } from '../../types/project'
import ProjectCard   from '../ProjectCard/ProjectCard'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import './ProjectsSection.css'

const PROJECTS: Project[] = [
  {
    id:          1,
    title:       'To Do List App',
    subtitle:    'Productivity · Web App',
    description: 'Una aplicación de gestión de tareas construida con React y TypeScript. Permite crear, editar, eliminar y marcar tareas como completadas, con persistencia de datos y filtros por estado.',
    challenge:   'El principal reto fue diseñar una arquitectura de estado que fuera escalable y fácil de mantener, mientras se mantenía una experiencia de usuario fluida sin recargas innecesarias.',
    solution:    'Implementé un sistema de estado centralizado con Context API y useReducer, separando la lógica de negocio de la UI. Usé localStorage para persistencia y optimicé los re-renders con useMemo y useCallback.',
    role:        'Frontend Developer & Designer',
    year:        '2024',
    duration:    '3 semanas',
    tags:        ['React', 'TypeScript', 'SASS', 'Context API', 'LocalStorage'],
    images:      [],
    liveUrl:     'https://tu-proyecto.vercel.app',
    githubUrl:   'https://github.com/tu-usuario/todo-app',
    featured:    false,
    column:      'left',
  },
  {
    id:          2,
    title:       'Pet Adoption',
    subtitle:    'Social Impact · Web Platform',
    description: 'Plataforma para conectar mascotas en adopción con familias. Incluye búsqueda por filtros, perfiles detallados de cada mascota y formulario de solicitud de adopción.',
    challenge:   'Crear una experiencia que generara conexión emocional con el usuario mientras mantenía la información organizada y accesible para cientos de mascotas distintas.',
    solution:    'Diseñé un sistema de cards con filtros dinámicos en tiempo real. Cada perfil de mascota incluye galería de fotos, características y un formulario de adopción con validaciones.',
    role:        'Full Stack Developer',
    year:        '2024',
    duration:    '5 semanas',
    tags:        ['React', 'JavaScript', 'SASS', 'Node.js', 'REST API'],
    images:      [],
    liveUrl:     'https://tu-proyecto.vercel.app',
    githubUrl:   'https://github.com/tu-usuario/pet-adoption',
    featured:    true,
    column:      'right',
  },
  {
    id:          3,
    title:       'E-Commerce Store',
    subtitle:    'E-Commerce · UX Design',
    description: 'Diseño y desarrollo de una tienda online con carrito de compras, pasarela de pagos y panel de administración para gestión de inventario.',
    challenge:   'Integrar una pasarela de pagos segura y diseñar un flujo de checkout que redujera el abandono del carrito, manteniendo la experiencia simple para el usuario final.',
    solution:    'Implementé Stripe para los pagos y rediseñé el flujo de checkout a 3 pasos claros. El panel de administración permite gestionar productos, órdenes e inventario en tiempo real.',
    role:        'Frontend Developer & UX Designer',
    year:        '2023',
    duration:    '8 semanas',
    tags:        ['React', 'TypeScript', 'Stripe', 'Node.js', 'MongoDB'],
    images:      [],
    liveUrl:     'https://tu-proyecto.vercel.app',
    githubUrl:   'https://github.com/tu-usuario/ecommerce',
    featured:    false,
    column:      'left',
  },
  {
    id:          4,
    title:       'Analytics Dashboard',
    subtitle:    'Dashboard · Data Viz',
    description: 'Dashboard de visualización de datos con gráficas interactivas, filtros dinámicos y exportación de reportes. Diseñado para equipos de marketing.',
    challenge:   'Presentar grandes volúmenes de datos de forma clara e intuitiva, permitiendo al usuario encontrar insights rápidamente sin ser abrumado por la información.',
    solution:    'Utilicé Recharts para las visualizaciones y diseñé un sistema de filtros encadenados. Los reportes se generan en PDF con un solo clic usando jsPDF.',
    role:        'Frontend Developer',
    year:        '2023',
    duration:    '6 semanas',
    tags:        ['React', 'TypeScript', 'Recharts', 'jsPDF', 'REST API'],
    images:      [],
    liveUrl:     'https://tu-proyecto.vercel.app',
    githubUrl:   'https://github.com/tu-usuario/dashboard',
    featured:    false,
    column:      'right',
  },
]

function ProjectsSection(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const leftProjects  = PROJECTS.filter(p => p.column === 'left')
  const rightProjects = PROJECTS.filter(p => p.column === 'right')

  return (
    <>
      <section className="projects-section" id="projects">
        <div className="projects-section__header">
          <h2 className="projects-section__title">Selected Projects</h2>
          <p className="projects-section__subtitle">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="projects-section__grid">
          <div className="projects-section__column projects-section__column--left">
            {leftProjects.map(p => (
              <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
            ))}
          </div>
          <div className="projects-section__column projects-section__column--right">
            {rightProjects.map(p => (
              <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Project detail — renders on top when a project is selected */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

export default ProjectsSection
