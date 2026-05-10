import { Project } from "./types/project";

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "todo-list",
    title: "To Do List App",
    subtitle: "Productivity · Web App",
    description:
      "Una aplicación de gestión de tareas construida con React y TypeScript. Permite crear, editar, eliminar y marcar tareas como completadas, con persistencia de datos y filtros por estado.",
    sections: [
      {
        title: "The Challenge",
        text: "El principal reto fue diseñar una arquitectura de estado que fuera escalable y fácil de mantener, mientras se mantenía una experiencia de usuario fluida sin recargas innecesarias.",
      },
      {
        title: "The Solution",
        text: "Implementé un sistema de estado centralizado con Context API y useReducer, separando la lógica de negocio de la UI. Usé localStorage para persistencia y optimicé los re-renders con useMemo y useCallback.",
      },
    ],
    role: "Frontend Developer & Designer",
    year: "2024",
    duration: "3 semanas",
    tags: ["React", "TypeScript", "SASS"],
    images: ["/toDoList.jpg"],
    liveUrl: "https://tu-proyecto.vercel.app",
    githubUrl: "https://github.com/tu-usuario/todo-app",
    featured: false,
    column: "left",
  },
  {
    id: 2,
    slug: "pet-adoption",
    title: "Pet Adoption",
    subtitle: "Social Impact · Web Platform",
    description:
      "Plataforma para conectar mascotas en adopción con familias. Incluye búsqueda por filtros, perfiles detallados de cada mascota y formulario de solicitud de adopción.",
    sections: [
      {
        title: "The Challenge",
        text: "Crear una experiencia que generara conexión emocional con el usuario mientras mantenía la información organizada y accesible para cientos de mascotas distintas.",
      },
      {
        title: "The Solution",
        text: "Diseñé un sistema de cards con filtros dinámicos en tiempo real. Cada perfil de mascota incluye galería de fotos, características y un formulario de adopción con validaciones.",
      },
    ],
    role: "Full Stack Developer",
    year: "2024",
    duration: "5 semanas",
    tags: ["React", "JavaScript", "Node.js"],
    images: [`petAdoption.jpg`],
    liveUrl: "https://tu-proyecto.vercel.app",
    githubUrl: "https://github.com/tu-usuario/pet-adoption",
    featured: true,
    column: "right",
  },
];
