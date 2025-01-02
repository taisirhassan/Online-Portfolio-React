import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ContentSection from "./components/ContentSection";
import ProjectCard from "./components/ProjectCard";
import MatrixRain from "./components/MatrixRain";
import BootSequence from "./components/BootSequence";
import { Github, Linkedin, Globe, Mail, Phone } from "lucide-react";
import "./App.css";
import "./styles/main.scss";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBooted, setIsBooted] = useState(false);

  const experiences = [
    {
      title: "Telesat",
      role: "Embedded Software Engineering Co-op",
      date: "Jan 2025 - Apr 2025",
      location: "Ottawa, ON",
      description:
        "Developing satellite User Terminal systems using C++ and Python, implementing networking solutions on Linux systems",
    },
    {
      title: "UW Rocketry",
      role: "Electrical Team Member",
      date: "May 2024 - Present",
      location: "Waterloo, ON",
      description:
        "Developing PWM and ADC drivers with low-pass filter logic, designing SDR with APRS receiver, leading PCB schematic design",
    },
    {
      title: "University of Waterloo",
      role: "Autonomous Vehicle Research Assistant",
      date: "September 2024 - Present",
      location: "Waterloo, ON",
      description:
        "Implementing CAN bus monitoring and ROS2 nodes for autonomous vehicle control systems",
    },
    {
      title: "Watonomous Design Team",
      role: "Embedded Systems Developer",
      date: "December 2023 - Present",
      location: "Waterloo, ON",
      description:
        "Engineering ROS2 nodes for camera and LiDAR functionality, optimizing Docker containers for sensor operations",
    },
    {
      title: "Cohere.ai",
      role: "Data Quality Specialist",
      date: "May 2023 - Sept 2023, May 2024 - Aug 2024",
      location: "Toronto, ON",
      description:
        "Led LLM quality assurance with 98% completion rate, reduced data discrepancies by 25%",
    },
    {
      title: "Playfair Technologies",
      role: "Junior Fullstack Developer",
      date: "Jan 2022 - Apr 2022",
      location: "Toronto, ON",
      description:
        "Developed React Native mobile app, improved performance by 30%, reduced deployment time by 40%",
    },
  ];

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className={`terminal ${isDarkMode ? "dark" : "light"}`}>
      <MatrixRain isDarkMode={isDarkMode} />

      <div className="terminal__container">
        <Navigation
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
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

              <div className="about__links">
                <a
                  href="https://github.com/taisirhassan"
                  className="about__link"
                >
                  <Github size={20} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/taisir-hassan"
                  className="about__link"
                >
                  <Linkedin size={20} /> LinkedIn
                </a>
                <a
                  href="https://taisirhassan.netlify.app"
                  className="about__link"
                >
                  <Globe size={20} /> Portfolio
                </a>
              </div>

              <div className="about__buttons">
                <a
                  href="https://taisirhassan.netlify.app/resume"
                  className="about__button"
                  download
                >
                  Download Resume
                </a>
                <a href="#contact" className="about__button">
                  Contact Me
                </a>
              </div>
            </div>
          </ContentSection>

          <ContentSection id="experience" title="experience">
            <div className="experience">
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
              <h2 className="projects-grid__title">Hardware Projects</h2>
              <div className="projects-grid__section">
                <ProjectCard
                  title="RISC-V Processor"
                  tech="Verilog, GTKWave, Icarus Verilog"
                  description="32-bit processor with 5-stage pipeline and hazard detection"
                  repo="https://github.com/taisirhassan/riscv_core"
                />

                <ProjectCard
                  title="De Bruijn Circuit Verification"
                  tech="Scala, Verilog, SystemVerilog"
                  description="URA Research: Digital circuit verification via De Bruijn sequences"
                  repo="https://git.uwaterloo.ca/MarkAagaard/debruijn/-/tree/main"
                />

                <ProjectCard
                  title="Firefighting Robot"
                  tech="C++, Arduino"
                  description="Autonomous robot with heat detection and navigation systems"
                  repo="https://github.com/taisirhassan/Firefighting-Robot"
                />
              </div>

              <h2 className="projects-grid__title">Software Projects</h2>
              <div className="projects-grid__section">
                <ProjectCard
                  title="Virtual SmartHome Dashboard"
                  tech="Python, Next.js, AWS, MQTT, Docker"
                  description="IoT simulation platform with real-time analytics"
                  repo="https://github.com/taisirhassan/Smart-Home-Dashboard"
                />

                <ProjectCard
                  title="ReadRight"
                  tech="React, Express, GCP, Cohere API"
                  description="HackThe6ix Winner: AI-powered reading assistance platform"
                  repo="https://github.com/JustinScitech/ReadRight"
                />

                <ProjectCard
                  title="AudioViz"
                  tech="C++, OpenGL, FFT"
                  description="Real-time audio visualization system"
                  repo="https://github.com/taisirhassan/audio_viz"
                />
              </div>
            </div>
          </ContentSection>

          <ContentSection id="contact" title="contact">
            <div className="contact">
              <a
                href="mailto:taisir.hassan@uwaterloo.ca"
                className="contact__item"
              >
                <Mail className="contact__icon" />
                <span>taisir.hassan@uwaterloo.ca</span>
              </a>

              <a href="tel:647-667-3006" className="contact__item">
                <Phone className="contact__icon" />
                <span>647-667-3006</span>
              </a>

              <div className="contact__social">
                <a
                  href="https://github.com/taisirhassan"
                  className="contact__social-link"
                >
                  <Github className="contact__social-icon" />
                </a>
                <a
                  href="https://linkedin.com/in/taisir-hassan"
                  className="contact__social-link"
                >
                  <Linkedin className="contact__social-icon" />
                </a>
              </div>
            </div>
          </ContentSection>
        </main>

        <footer className="terminal__footer">
          <p>
            Built with React & SASS •{" "}
            <a href="https://github.com/taisirhassan/Online-Portfolio-React">
              View source on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
