import React, { useState, useEffect } from 'react';
import TypeWriter from './TypeWriter';
import '../styles/main.scss';

const BootSequence = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
const bootSteps = [
  { text: "[  0.000000] Starting portfolio boot sequence...", delay: 1000 },
  { text: "[  0.250000] Running 'sudo show_off_skills'...", delay: 700 },
  { text: "[  0.500000] Accessing creative mindset...", delay: 600 },
  { text: "[  0.750000] Verifying achievements...", delay: 800 },
  { text: "[  1.000000] Compiling fun facts...", delay: 700 },
  { text: "[  1.250000] All systems operational.", delay: 500 },
  { text: "[  1.500000] Welcome, Taisir Hassan!", delay: 1000 }
];


  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === bootSteps.length - 1) {
          setTimeout(onComplete, 1000);
        }
      }, bootSteps[currentStep].delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, bootSteps.length, onComplete]);

  return (
    <div className="boot-sequence">
      <div className="boot-sequence__container">
        {bootSteps.slice(0, currentStep + 1).map((step, index) => (
          <div
            key={index}
            className={`boot-sequence__line ${
              index === currentStep ? '' : 'boot-sequence__line--completed'
            }`}
          >
            {index === currentStep ? (
              <TypeWriter text={step.text} delay={50} />
            ) : (
              <span>
                {step.text}
                <span className="boot-sequence__checkmark">✓</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootSequence;