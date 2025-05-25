import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Function to send performance metrics to analytics
const sendToAnalytics = (metric) => {
  // In production, you would send this to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metric:', metric);
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

// Custom performance markers
export const markPerformance = (name) => {
  if ('performance' in window) {
    performance.mark(name);
  }
};

export const measurePerformance = (name, startMark, endMark) => {
  if ('performance' in window) {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${measure.duration}ms`);
    }
  }
}; 