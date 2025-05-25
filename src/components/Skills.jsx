import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.scss';

const Skills = () => {
  const skillCategories = useMemo(() => [
    {
      title: "Programming Languages",
      skills: [
        { name: "C/C++", level: 90 },
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "Verilog/SystemVerilog", level: 85 },
        { name: "Rust", level: 70 },
        { name: "Scala", level: 75 }
      ]
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { name: "React", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 70 },
        { name: "ROS2", level: 80 },
        { name: "MQTT", level: 75 }
      ]
    },
    {
      title: "Hardware & Embedded",
      skills: [
        { name: "RISC-V Architecture", level: 85 },
        { name: "Arduino/Embedded C", level: 90 },
        { name: "PCB Design", level: 75 },
        { name: "Digital Signal Processing", level: 80 },
        { name: "FPGA Development", level: 70 },
        { name: "CAN Bus", level: 75 }
      ]
    }
  ], []); // Empty dependency array since this is static data

  return (
    <div className="skills">
      <div className="skills__command">$ cat technical_skills.txt</div>
      
      <div className="skills__grid">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            className="skills__category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
          >
            <h3 className="skills__category-title">{category.title}</h3>
            <div className="skills__list">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="skills__item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                >
                  <div className="skills__item-header">
                    <span className="skills__name">{skill.name}</span>
                    <span className="skills__level">{skill.level}%</span>
                  </div>
                  <div 
                    className="skills__bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={skill.level}
                    aria-label={`${skill.name} skill level`}
                  >
                    <motion.div
                      className="skills__progress"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3,
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 