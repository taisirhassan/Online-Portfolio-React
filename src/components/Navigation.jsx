// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '../utils/analytics';
import '../styles/Navigation.scss';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollToSection = (id) => {
    // Track navigation
    track.navigation(id);
    
    if (id === 'now') {
      navigate('/now');
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands = [
    { id: 'about', label: 'View personal information' },
    { id: 'now', label: 'View what I\'m currently doing' },
    { id: 'experience', label: 'View work experience' },
    { id: 'skills', label: 'View technical skills' },
    { id: 'hardware', label: 'View hardware projects' },
    { id: 'software', label: 'View software projects' },
    { id: 'contact', label: 'View contact information' }
  ];

  return (
    <motion.nav 
      className="terminal-nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="terminal-nav__header">
        <span className="terminal-nav__prompt">_taisir@portfolio:~</span>
        <div className="terminal-nav__actions">
          <motion.button 
            onClick={() => {
              track.themeToggle(isDarkMode ? 'light' : 'dark');
              toggleDarkMode();
            }}
            className="terminal-nav__theme-toggle"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <span className="terminal-nav__time">
            {currentTime}
          </span>
        </div>
      </div>

      <div className="terminal-nav__help">
        <div className="terminal-nav__help-text">
          &gt; Type 'help' for available commands:
        </div>
        <div className="terminal-nav__commands">
          {commands.map((command, index) => (
            <motion.div 
              key={command.id} 
              className="terminal-nav__command"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button 
                onClick={() => handleScrollToSection(command.id)}
                className="terminal-nav__command-btn"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="terminal-nav__command-name">{command.id}</span>
                <span className="terminal-nav__command-desc">- {command.label}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;