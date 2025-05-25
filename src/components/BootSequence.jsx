import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypeWriter from './TypeWriter';
import { track } from '../utils/analytics';
import '../styles/main.scss';

const BootSequence = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const bootSteps = useMemo(() => [
    { text: "[  0.000000] Starting portfolio boot sequence...", delay: 1000 },
    { text: "[  0.250000] Running 'sudo show_off_skills'...", delay: 700 },
    { text: "[  0.500000] Accessing creative mindset...", delay: 600 },
    { text: "[  0.750000] Verifying achievements...", delay: 800 },
    { text: "[  1.000000] Compiling fun facts...", delay: 700 },
    { text: "[  1.250000] All systems operational.", delay: 500 },
    { text: "[  1.500000] Welcome, Taisir Hassan!", delay: 1000 }
  ], []); // Empty dependency array since bootSteps is static

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === bootSteps.length - 1) {
          setTimeout(() => {
            track.bootComplete();
            onComplete();
          }, 1000);
        }
      }, bootSteps[currentStep].delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, bootSteps, bootSteps.length, onComplete]);

  return (
    <motion.div 
      className="boot-sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="boot-sequence__container">
        <AnimatePresence>
          {bootSteps.slice(0, currentStep + 1).map((step, index) => (
            <motion.div
              key={index}
              className={`boot-sequence__line ${
                index === currentStep ? '' : 'boot-sequence__line--completed'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {index === currentStep ? (
                <TypeWriter text={step.text} delay={50} />
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.text}
                  <motion.span 
                    className="boot-sequence__checkmark"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.span>
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BootSequence;