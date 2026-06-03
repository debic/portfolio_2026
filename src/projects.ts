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
      "A platform to connect pets up for adoption with families. Features filter-based search, detailed pet profiles, and an adoption request form.",
    sections: [
      {
        title: "What I Learned",
        text: "This was my first full-stack project, and the one I'm most proud of. Building both the frontend and backend from scratch — making them actually talk to each other, handling real data, and delivering a complete product — was a turning point for me as a developer. It proved I could own an entire project end to end.",
      },
    ],
    role: "Full Stack Developer",
    year: "2024",
    duration: "5 semanas",
    tags: ["React", "JavaScript", "Node.js", "Express", "MongoDB"],
    images: ["/Pet Adoption/petAdoption.jpg"], // portada card
    detailImages: [
      "/Pet Adoption/desktop.jpg",
      "/Pet Adoption/mobile.jpg",
      "/Pet Adoption/square.jpg",
      { src: "/Pet Adoption/video.mp4", type: "video" },
    ], // reemplazá con tus imágenes horizontales
    projectUrl: "",
    githubUrl: "https://github.com/debic/pet-adoption",
    featured: true,
    column: "right",
    imageHeight: "xl",
  },
  {
    id: 3,
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "Frontend · Personal Project",
    description:
      "My personal portfolio, designed and built from scratch to reflect who I am as a developer. It combines my UX/UI background with modern frontend development — a space to showcase my work, experiment with new tools, and document my growth.",
    sections: [
      {
        title: "The Challenge",
        text: "This was my first project working with Claude, and it was a completely different experience from anything I'd done before. I had to learn how to collaborate with AI — how to ask the right questions, when to trust it and when to push back. It shifted the way I approach development: faster iterations, less getting stuck, but always staying in control of the final product.",
      },
    ],
    role: "Full Stack Developer",
    year: "2024",
    duration: "5 semanas",
    tags: ["React", "JavaScript", "Vite", "Claude"],
    images: ["/Portfolio/portada.jpg"], // portada card
    detailImages: ["Portfolio/first.jpg", "Portfolio/iphone.jpg", "Portfolio/footer.jpg",{ src: "/Portfolio/screen.mp4", type: "video" },], // reemplazá con tus imágenes horizontales
    projectUrl: "https://debic.github.io/portfolio_2026/",
    githubUrl: "https://github.com/debic/portfolio_2026",
    featured: true,
    column: "right",
    imageHeight: "md",
  },
];
