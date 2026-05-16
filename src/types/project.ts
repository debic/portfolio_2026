export interface ProjectSection {
  title: string;
  text: string;
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
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  column: "left" | "right";
  imageHeight?: "sm" | "md" | "lg" | "xl"; // altura de la imagen de la card
}
