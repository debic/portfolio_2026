import Navbar          from './components/Navbar/Navbar'
import HeroSection      from './components/HeroSection/HeroSection'
import QuoteSection     from './components/QuoteSection/QuoteSection'
import ProjectsSection  from './components/ProjectsSection/ProjectsSection'
import ToolsSection     from './components/ToolsSection/ToolsSection'
import AboutSection     from './components/AboutSection/AboutSection'
import ContactSection   from './components/ContactSection/ContactSection'
import Footer           from './components/Footer/Footer'

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <div className="hero-reveal-wrapper">
          <HeroSection />
          <QuoteSection />
        </div>
        <ProjectsSection />
        <ToolsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
