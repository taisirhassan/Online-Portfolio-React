import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { initPerformanceMonitoring } from './utils/performance';
import { initNetlifyAnalytics } from './utils/analytics';
import './utils/deploymentCheck';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

try {
  initPerformanceMonitoring();
} catch (error) {
  console.error('Failed to initialize performance monitoring:', error);
}

try {
  initNetlifyAnalytics();
} catch (error) {
  console.error('Failed to initialize Netlify Analytics:', error);
}

reportWebVitals();


