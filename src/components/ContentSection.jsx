import React from 'react';
import TypeWriter from './TypeWriter';
import '../styles/main.scss';

const ContentSection = ({ id, title, children }) => (
  <section id={id} className="content-section">
    <div className="content-section__header">
      <span className="content-section__prompt">$</span>
      <TypeWriter text={`cat ${title}.txt`} delay={30} />
    </div>
    <div className="content-section__content">
      {children}
    </div>
  </section>
);

export default ContentSection;