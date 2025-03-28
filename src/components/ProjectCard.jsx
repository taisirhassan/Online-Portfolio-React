import React from 'react';
import { Github } from 'lucide-react';
import '../styles/ProjectCard.scss';

const ProjectCard = ({ title, tech, description, repo }) => (
  <div className="project-card">
    <div className="project-card__content">
      <div className="project-card__header">
        <h3 className="project-card__title">{title}</h3>
      </div>
      <div className="project-card__tech">{tech}</div>
      <div className="project-card__description">{description}</div>
    </div>
    {repo && (
      <div className="project-card__footer">
        <a 
          href={repo} 
          className="project-card__repo-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on GitHub`}
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={20} /> View on GitHub
        </a>
      </div>
    )}
  </div>
);

export default ProjectCard;

