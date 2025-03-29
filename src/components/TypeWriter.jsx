import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/main.scss';

const TypeWriter = ({ text, delay = 50, onComplete = () => {} }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <motion.span 
      className="typewriter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {currentText}
      <motion.span 
        className="typewriter__cursor"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        _
      </motion.span>
    </motion.span>
  );
};

export default TypeWriter;