import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Loading.scss';

const Loading = () => {
  return (
    <motion.div 
      className="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading__container">
        <div className="loading__text">
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Initializing system...
          </motion.span>
        </div>
        <div className="loading__bar">
          <motion.div 
            className="loading__progress"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loading; 