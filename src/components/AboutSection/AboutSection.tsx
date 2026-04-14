import Button from '../Button/Button'
import './AboutSection.css'

function AboutSection(): JSX.Element {
  return (
    <section className="about-section" id="about">
      <div className="about-section__inner">
        <h2 className="about-section__title">About Me</h2>
        <p className="about-section__bio">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <Button variant="outline" size="md" href="#contact">
          Let's work together →
        </Button>
        <div className="about-section__photo-wrap">
          <div className="about-section__photo-frame">
            <img
              src={`${import.meta.env.BASE_URL}debi.png`}
              alt="Debi Perez"
              className="about-section__photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
