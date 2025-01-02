import React from 'react';
import { Github } from 'lucide-react';
import '../styles/main.scss';

const ProjectCard = ({ title, tech, description, repo }) => (
  <div className="project-card">
    <div className="project-card__header">
      <h3 className="project-card__title">{title}</h3>
      {repo && (
        <a href={repo} className="project-card__repo-link">
          <Github />
        </a>
      )}
    </div>
    <div className="project-card__tech">{tech}</div>
    <div className="project-card__description">{description}</div>
  </div>
);

export default ProjectCard;

