import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initPerformanceMonitoring } from './utils/performance';
import { initNetlifyAnalytics } from './utils/analytics';
import './utils/deploymentCheck';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Initialize performance monitoring
try {
  initPerformanceMonitoring();
} catch (error) {
  console.error('Failed to initialize performance monitoring:', error);
}

// Initialize Netlify Analytics
try {
  initNetlifyAnalytics();
} catch (error) {
  console.error('Failed to initialize Netlify Analytics:', error);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
