import React from 'react';
import { motion } from 'framer-motion';

const CaseStudy = ({ title, role, stack, problem, approach, impact }) => {
  return (
    <motion.article
      className="case-study"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <header className="case-study__header">
        <h3 className="case-study__title">{title}</h3>
        <div className="case-study__meta">
          <span>{role}</span>
          <span>•</span>
          <span>{stack}</span>
        </div>
      </header>
      <div className="case-study__grid">
        <section>
          <h4>Problem</h4>
          <p>{problem}</p>
        </section>
        <section>
          <h4>Approach</h4>
          <p>{approach}</p>
        </section>
        <section>
          <h4>Impact</h4>
          <p>{impact}</p>
        </section>
      </div>
    </motion.article>
  );
};

export default CaseStudy;


