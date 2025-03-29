import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import '../styles/ProjectCard.scss';

const ProjectCard = ({ title, tech, description, repo }) => (
  <motion.div 
    className="project-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="project-card__content">
      <div className="project-card__header">
        <h3 className="project-card__title">{title}</h3>
      </div>
      <div className="project-card__tech">{tech}</div>
      <div className="project-card__description">{description}</div>
    </div>
    {repo && (
      <motion.div 
        className="project-card__footer"
        whileHover={{ scale: 1.05 }}
      >
        <a 
          href={repo} 
          className="project-card__repo-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on GitHub`}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            whileHover={{ rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <Github size={20} />
          </motion.div>
          View on GitHub
        </a>
      </motion.div>
    )}
  </motion.div>
);

export default ProjectCard;

