import { TESTIMONIALS } from "../../testimonials";
import { Testimonial } from "../../types/testimonial";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import "./TestimonialsSection.css";

function splitRows(items: Testimonial[]): [Testimonial[], Testimonial[]] {
  const row1 = items.filter((_, i) => i % 2 === 0);
  const row2 = items.filter((_, i) => i % 2 !== 0);
  return [row1, row2];
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: Testimonial[];
  reverse?: boolean;
}): JSX.Element {
  // Se duplica la fila para lograr un loop infinito sin cortes
  const loopItems = [...items, ...items];

  return (
    <div className="testimonials-marquee__row">
      <div
        className={`testimonials-marquee__track${reverse ? " testimonials-marquee__track--reverse" : ""}`}
      >
        {loopItems.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection(): JSX.Element {
  const [row1, row2] = splitRows(TESTIMONIALS);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-section__header">
        <h2 className="testimonials-section__title">
          What The People I
          <br />
          Work With Say
        </h2>
      </div>

      <div className="testimonials-marquee">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}

export default TestimonialsSection;
