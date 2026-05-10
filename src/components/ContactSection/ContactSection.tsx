import Button from "../Button/Button";
import "./ContactSection.css";

interface SocialLink {
  label: string;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/debic" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/debi-codriansky-834655179/",
  },
  { label: "Email", href: "mailto:debicps@gmail.com" },
];

function ContactSection(): JSX.Element {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__inner">
        <p className="contact-section__eyebrow">Want to work together?</p>
        <h2 className="contact-section__heading">LET'S TALK</h2>
        <div className="contact-section__links">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <Button
              key={label}
              variant="outline-light"
              size="md"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
