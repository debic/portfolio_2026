import { Testimonial } from "../../types/testimonial";
import "./TestimonialCard.css";

const LINKEDIN_POST_URL =
  "https://www.linkedin.com/posts/debi-codriansky-834655179_after-almost-3-years-at-wix-last-week-was-ugcPost-7467946904006377472-bVaF/";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps): JSX.Element {
  return (
    <div className="tcard-testimonial">
      <div className="tcard-testimonial__header">
        {testimonial.avatar ? (
          <img
            src={`${import.meta.env.BASE_URL}${testimonial.avatar}`}
            alt={testimonial.name}
            className="tcard-testimonial__avatar"
          />
        ) : (
          <div className="tcard-testimonial__avatar" aria-hidden="true" />
        )}
        <div>
          <p className="tcard-testimonial__name">{testimonial.name}</p>
          <p className="tcard-testimonial__role">{testimonial.role}</p>
        </div>
      </div>

      <p className="tcard-testimonial__text">{testimonial.text}</p>

      <a
        href={LINKEDIN_POST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="tcard-testimonial__toggle"
      >
        See more <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export default TestimonialCard;
