import { Routes, Route } from 'react-router-dom'
import Navbar          from './components/Navbar/Navbar'
import HeroSection      from './components/HeroSection/HeroSection'
import QuoteSection     from './components/QuoteSection/QuoteSection'
import ProjectsSection  from './components/ProjectsSection/ProjectsSection'
import ToolsSection     from './components/ToolsSection/ToolsSection'
import AboutSection     from './components/AboutSection/AboutSection'
import ContactSection   from './components/ContactSection/ContactSection'
import Footer           from './components/Footer/Footer'
import ProjectPage      from './components/ProjectDetail/ProjectPage'

function Home(): JSX.Element {
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

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}

export default App
