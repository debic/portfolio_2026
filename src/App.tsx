import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import QuoteSection from "./components/QuoteSection/QuoteSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ToolsSection from "./components/ToolsSection/ToolsSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";
import ProjectPage from "./components/ProjectDetail/ProjectPage";
import SplashScreen from "./components/SplashScreen/SlpashScreen";

interface HomeProps {
  splashDone: boolean;
}

function Home({ splashDone }: HomeProps): JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <div className="hero-reveal-wrapper">
          <HeroSection splashDone={splashDone} />
          <QuoteSection />
        </div>
        <ProjectsSection />
        <ToolsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function App(): JSX.Element {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Routes>
        <Route path="/" element={<Home splashDone={splashDone} />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

export default App;
