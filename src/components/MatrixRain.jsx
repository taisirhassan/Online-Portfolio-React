import React, { useEffect, useRef } from 'react';
import '../styles/main.scss';

const MatrixRain = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let drops = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recalculate drops when canvas resizes
      const columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    };
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789♔⚡';
    const fontSize = 16;
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = isDarkMode
      ? ['#22c55e', '#16a34a', '#86efac']
      : ['#737373', '#a3a3a3', '#d1d5db']; // Neutral colors for light mode

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      drops.forEach((drop, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        ctx.fillStyle = color;
        ctx.fillText(char, i * fontSize, drop * fontSize);

        if (drop * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="matrix-rain" />;
};

export default MatrixRain;
