import React, { useState, useEffect } from 'react';
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
    <span className="typewriter">
      {currentText}
      <span className="typewriter__cursor">_</span>
    </span>
  );
};

export default TypeWriter;