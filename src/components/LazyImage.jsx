import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt = '', className = '', placeholder = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22180%22></svg>' }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`lazy-image ${className}`.trim()}>
      {inView ? (
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} style={{ opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease' }} />
      ) : (
        <img src={placeholder} alt="" aria-hidden="true" />
      )}
    </div>
  );
};

export default LazyImage;


