import React, { useState } from 'react';
import { Terminal, Sun, Moon } from 'lucide-react';
import '../styles/main.scss';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'software', label: 'Software' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <Terminal className="navigation__icon" />
        <span>Taisir_Terminal</span>
      </div>
      
      <div className="navigation__links">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="navigation__link"
          >
            {section.label}
          </button>
        ))}
        
        <button 
          className="navigation__theme-toggle"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;