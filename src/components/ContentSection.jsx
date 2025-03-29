import React from 'react';
import { motion } from 'framer-motion';
import TypeWriter from './TypeWriter';
import '../styles/main.scss';

const ContentSection = ({ id, title, children }) => (
  <motion.section 
    id={id} 
    className="content-section"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="content-section__header">
      <span className="content-section__prompt">$</span>
      <TypeWriter text={`cat ${title}.txt`} delay={30} />
    </div>
    <motion.div 
      className="content-section__content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {children}
    </motion.div>
  </motion.section>
);

export default ContentSection;