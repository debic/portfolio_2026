export interface ProjectSection {
  title: string;
  text: string;
}

export interface ProjectDetailImage {
  src: string;
  aspectRatio?: string; // por ejemplo "4/3" o "3/4", para controlar altura en la galería
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  sections?: ProjectSection[];
  role?: string;
  year?: string;
  duration?: string;
  tags: string[];
  images: string[]; // imágenes de la card (portada)
  detailImages?: Array<string | ProjectDetailImage>; // imágenes de la página de detalle
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  column: "left" | "right";
  imageHeight?: "sm" | "md" | "lg" | "xl";
}
