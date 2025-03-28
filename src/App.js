import React, { useState, lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import ContentSection from "./components/ContentSection";
import ProjectCard from "./components/ProjectCard";
import Contact from "./components/Contact";
import { Github, Linkedin, Globe } from "lucide-react";
import { experiences } from "./data/experiences";
import { RESUME_FILENAME, SOCIAL_LINKS, PROJECTS } from "./constants";
import "./App.css";
import "./styles/main.scss";

// Lazy load the MatrixRain component
const MatrixRain = lazy(() => import("./components/MatrixRain"));
const BootSequence = lazy(() => import("./components/BootSequence"));

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BootSequence onComplete={() => setIsBooted(true)} />
      </Suspense>
    );
  }

  return (
    <div className={`terminal ${isDarkMode ? "dark" : "light"}`} role="application">
      <Suspense fallback={null}>
        <MatrixRain isDarkMode={isDarkMode} />
      </Suspense>

      <div className="terminal__container">
        <Navigation
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          aria-label="Main navigation"
        />

        <main className="terminal__content">
          {/* About Section */}
          <ContentSection id="about" title="about">
            <div className="about">
              <h1 className="about__name">Taisir Hassan</h1>
              <p className="about__role">
                Computer Engineering @ University of Waterloo
              </p>
              <p className="about__current">
                Currently @ Telesat - Embedded Software Engineer
              </p>

              <div className="about__links" role="list">
                <a
                  href={SOCIAL_LINKS.github}
                  className="about__link"
                  aria-label="Visit GitHub profile"
                >
                  <Github size={20} aria-hidden="true" /> GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  className="about__link"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={20} aria-hidden="true" /> LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.portfolio}
                  className="about__link"
                  aria-label="Visit portfolio website"
                >
                  <Globe size={20} aria-hidden="true" /> Portfolio
                </a>
              </div>

              <div className="about__buttons" role="list">
                <a
                  href={`/${RESUME_FILENAME}`}
                  className="about__button"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download resume"
                >
                  Download Resume
                </a>
                <a href="#contact" className="about__button" aria-label="Go to contact section">
                  Contact Me
                </a>
              </div>
            </div>
          </ContentSection>

          <ContentSection id="experience" title="experience">
            <div className="experience" role="list">
              {experiences.map((exp, index) => (
                <ProjectCard
                  key={index}
                  title={exp.title}
                  tech={`${exp.role} | ${exp.date} | ${exp.location}`}
                  description={exp.description}
                />
              ))}
            </div>
          </ContentSection>

          <ContentSection id="projects" title="projects">
            <div className="projects-grid">
              <h2 className="projects-grid__title" id="hardware">
                Hardware Projects
              </h2>
              <div className="projects-grid__section" role="list">
                {PROJECTS.hardware.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    tech={project.tech}
                    description={project.description}
                    repo={project.repo}
                  />
                ))}
              </div>

              <h2 className="projects-grid__title" id="software">
                Software Projects
              </h2>
              <div className="projects-grid__section" role="list">
                {PROJECTS.software.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    tech={project.tech}
                    description={project.description}
                    repo={project.repo}
                  />
                ))}
              </div>
            </div>
          </ContentSection>

          <Contact />
        </main>

        <footer className="terminal__footer">
          <p>
            Built with React & SASS •{" "}
            <a 
              href={SOCIAL_LINKS.sourceCode}
              aria-label="View source code on GitHub"
            >
              View source on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
