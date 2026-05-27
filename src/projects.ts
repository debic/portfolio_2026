import { Project } from "./types/project";

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "todo-list",
    title: "To Do List App",
    subtitle: "Productivity · Web App",
    description:
      "A task management app built with React, Bootstrap, and Material UI. Allows users to create, edit, and delete tasks with priority levels, drag-and-drop between status columns, and persistent data across sessions. Fully responsive across desktop, tablet, and mobile.",
    sections: [],
    role: "Frontend Developer & Designer",
    year: "2024",
    duration: "3 semanas",
    tags: ["React", "Bootstrap", "React DnD", "CSS"],
    images: ["/To Do List/toDoList.jpg"], // portada card
    detailImages: [
      "/To Do List/todo.jpg",
      "/To Do List/todo-iphone.jpg",
      "/To Do List/todo_desktop.jpg",
    ], // reemplazá con tus imágenes horizontales
    projectUrl: "https://debic.github.io/todo-list-2024/",
    githubUrl: "https://github.com/debic/todo-list-2024",
    featured: false,
    column: "left",
    imageHeight: "lg",
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
        title: "What I Learned",
        text: "Crear una experiencia que generara conexión emocional con el usuario mientras mantenía la información organizada y accesible para cientos de mascotas distintas.",
      },
    ],
    role: "Full Stack Developer",
    year: "2024",
    duration: "5 semanas",
    tags: ["React", "JavaScript", "Node.js"],
    images: ["petAdoption.jpg"], // portada card
    detailImages: ["petAdoption.jpg", "petAdoption.jpg", "petAdoption.jpg"], // reemplazá con tus imágenes horizontales
    projectUrl: "https://tu-proyecto.vercel.app",
    githubUrl: "https://github.com/tu-usuario/pet-adoption",
    featured: true,
    column: "right",
    imageHeight: "xl",
  },
  {
    id: 3,
    slug: "pet-adoption-2",
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
    images: ["petAdoption.jpg"], // portada card
    detailImages: ["petAdoption.jpg"], // reemplazá con tus imágenes horizontales
    projectUrl: "https://tu-proyecto.vercel.app",
    githubUrl: "https://github.com/tu-usuario/pet-adoption",
    featured: true,
    column: "right",
    imageHeight: "sm",
  },
];
