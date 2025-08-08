import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { playEnter, playKeyClick } from '../utils/sound';
import { SOCIAL_LINKS, RESUME_FILENAME } from '../constants';

const helpText = `Available commands:\n\
  help                Show this help\n\
  about               Scroll to About\n\
  experience          Scroll to Experience\n\
  skills              Scroll to Skills\n\
  hardware            Scroll to Hardware Projects\n\
  software            Scroll to Software Projects\n\
  contact             Scroll to Contact\n\
  now                 Open Now page\n\
  resume              Open resume PDF\n\
  github              Open GitHub profile\n\
  linkedin            Open LinkedIn profile\n\
  theme [dark|light]  Switch theme\n\
  clear               Clear terminal`;

const commands = new Set([
  'help','about','experience','skills','hardware','software','contact','now','resume','github','linkedin','theme','clear'
]);

const TerminalOverlay = ({ isOpen, onClose, onNavigate, onTheme }) => {
  const [history, setHistory] = useState([`taisir@portfolio:~$ type 'help' to get started`]);
  const [buffer, setBuffer] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => setCursorVisible((v) => !v), 550);
    return () => clearInterval(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const exec = useCallback((raw) => {
    const line = raw.trim();
    if (!line) return;
    const [cmd, arg] = line.split(/\s+/, 2);
    if (!commands.has(cmd)) {
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`, `command not found: ${cmd}`]);
      return;
    }
    if (cmd === 'help') {
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`, helpText]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'resume') {
      window.open(`/${RESUME_FILENAME}`, '_blank', 'noopener');
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`]);
    } else if (cmd === 'github') {
      window.open(SOCIAL_LINKS.github, '_blank', 'noopener');
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`]);
    } else if (cmd === 'linkedin') {
      window.open(SOCIAL_LINKS.linkedin, '_blank', 'noopener');
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`]);
    } else if (cmd === 'theme') {
      const next = arg === 'light' ? 'light' : arg === 'dark' ? 'dark' : null;
      if (next) {
        onTheme(next);
        setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`, `Theme switched to ${next}`]);
      } else {
        setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`, `Usage: theme [dark|light]`]);
      }
    } else if (cmd === 'now') {
      onNavigate('now');
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`]);
    } else {
      onNavigate(cmd);
      setHistory((h) => [...h, `taisir@portfolio:~$ ${line}`]);
    }
  }, [onNavigate, onTheme]);

  const onKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      playKeyClick();
    }
    if (e.key === 'Enter') {
      playEnter();
      exec(buffer);
      setBuffer('');
      e.preventDefault();
    } else if (e.key === 'Backspace') {
      setBuffer((b) => b.slice(0, -1));
      e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setBuffer((b) => b + e.key);
      e.preventDefault();
    }
  };

  useEffect(() => {
    const onGlobal = (e) => {
      // Ctrl+K toggles
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        isOpen ? onClose() : inputRef.current?.focus();
        e.preventDefault();
      }
      // Esc closes
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onGlobal);
    return () => window.removeEventListener('keydown', onGlobal);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="terminal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="terminal-overlay__panel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="terminal-overlay__header">
            <div className="terminal-overlay__title">_taisir@portfolio:~</div>
            <button className="terminal-overlay__close" onClick={onClose} aria-label="Close terminal">
              <X size={16} />
            </button>
          </div>
          <div className="terminal-overlay__body" ref={scrollRef}>
            {history.map((line, idx) => (
              <div key={idx} className="terminal-overlay__line">{line}</div>
            ))}
            <div className="terminal-overlay__prompt">
              <span>taisir@portfolio:~$&nbsp;</span>
              <span className="terminal-overlay__input" aria-hidden>{buffer}</span>
              <span className="terminal-overlay__cursor" aria-hidden style={{ opacity: cursorVisible ? 1 : 0 }}>▮</span>
              <input
                ref={inputRef}
                className="terminal-overlay__hidden-input"
                onKeyDown={onKeyDown}
                aria-label="Terminal input"
              />
            </div>
          </div>
          <div className="terminal-overlay__footer">Press Ctrl/Cmd+K to toggle • Type 'help' to begin</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalOverlay;


