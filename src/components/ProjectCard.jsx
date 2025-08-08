import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { track } from '../utils/analytics';
import '../styles/ProjectCard.scss';

const ProjectCard = ({ title, tech, description, repo }) => {
  const techBadges = (tech || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
  <motion.div 
    className="project-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => track.projectView(title)}
  >
    <div className="project-card__content">
      <div className="project-card__header">
        <h3 className="project-card__title">{title}</h3>
      </div>
      {techBadges.length > 0 && (
        <div className="project-card__badges">
          {techBadges.map((badge) => (
            <span key={badge} className="project-card__badge">{badge}</span>
          ))}
        </div>
      )}
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
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
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
};

export default ProjectCard;

