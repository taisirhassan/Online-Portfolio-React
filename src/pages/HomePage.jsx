import React from "react";
import { Link } from "react-router-dom";
import ContentSection from "../components/ContentSection";
import ProjectCard from "../components/ProjectCard";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { Github, Linkedin, Globe } from "lucide-react";
import { experiences } from "../data/experiences";
import { RESUME_FILENAME, SOCIAL_LINKS, PROJECTS } from "../constants";

const HomePage = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <main className="terminal__content">
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
              data-track="resume_download"
            >
              Download Resume
            </a>
            <a href="#contact" className="about__button" aria-label="Go to contact section" data-track="contact_button">
              Contact Me
            </a>
            <Link to="/now" className="about__button" aria-label="See what I'm working on now" data-track="now_page">
              What I'm Doing Now
            </Link>
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

      <ContentSection id="skills" title="skills">
        <Skills />
      </ContentSection>

      <Contact />
    </main>
  );
};

export default HomePage; 