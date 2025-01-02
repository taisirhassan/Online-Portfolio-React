// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import '../styles/Navigation.scss';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands = [
    { id: 'about', label: 'View personal information' },
    { id: 'experience', label: 'View work experience' },
    { id: 'hardware', label: 'View hardware projects' },
    { id: 'software', label: 'View software projects' },
    { id: 'contact', label: 'View contact information' }
  ];

  return (
    <nav className="terminal-nav">
      <div className="terminal-nav__header">
        <span className="terminal-nav__prompt">_taisir@portfolio:~</span>
        <div className="terminal-nav__actions">
          <button 
            onClick={toggleDarkMode}
            className="terminal-nav__theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span className="terminal-nav__time">
            {new Date().toLocaleTimeString([], { hour12: false })}
          </span>
        </div>
      </div>

      <div className="terminal-nav__help">
        <div className="terminal-nav__help-text">
          &gt; Type 'help' for available commands:
        </div>
        <div className="terminal-nav__commands">
          {commands.map((command) => (
            <div key={command.id} className="terminal-nav__command">
              <button 
                onClick={() => handleScrollToSection(command.id)}
                className="terminal-nav__command-btn"
              >
                <span className="terminal-nav__command-name">{command.id}</span>
                <span className="terminal-nav__command-desc">- {command.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;