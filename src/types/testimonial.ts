export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar?: string; // nombre de archivo dentro de /public, ej: "juan.jpg"
}
