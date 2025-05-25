import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import { analytics } from './analytics';
import { config } from '../config/environment';

// Function to send performance metrics to analytics
const sendToAnalytics = (metric) => {
  try {
    // Send to actual analytics service in production
    if (config.isProduction) {
      // Send to configured analytics service
      analytics.trackEvent('web_vitals', {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
        delta: metric.delta,
        navigationType: metric.navigationType || 'unknown',
        timestamp: Date.now()
      });

      // Send to Netlify Analytics if available
      if (typeof window !== 'undefined' && window.netlifyAnalytics) {
        window.netlifyAnalytics.track('performance_metric', {
          metric_name: metric.name,
          metric_value: metric.value,
          rating: metric.rating
        });
      }

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: metric.name,
          value: Math.round(metric.value),
          custom_map: {
            metric_id: metric.id,
            metric_rating: metric.rating
          }
        });
      }
    } else {
      // Log in development for debugging
      console.log('Performance Metric:', {
        name: metric.name,
        value: `${metric.value}ms`,
        rating: metric.rating,
        id: metric.id,
        delta: metric.delta
      });
    }
  } catch (error) {
    console.error('Failed to send performance metric to analytics:', error);
    // Fallback: at least log the metric so it's not lost
    console.log('Fallback Performance Metric:', metric);
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
  if (!('performance' in window)) {
    console.warn('Performance API not available');
    return null;
  }

  try {
    // Check if the required marks exist before measuring
    const marks = performance.getEntriesByName(startMark, 'mark');
    const endMarks = performance.getEntriesByName(endMark, 'mark');
    
    if (marks.length === 0) {
      console.warn(`Start mark '${startMark}' not found. Cannot measure performance.`);
      return null;
    }
    
    if (endMarks.length === 0) {
      console.warn(`End mark '${endMark}' not found. Cannot measure performance.`);
      return null;
    }

    // Perform the measurement
    performance.measure(name, startMark, endMark);
    
    // Get the measurement result with error handling
    const measures = performance.getEntriesByName(name, 'measure');
    
    if (measures.length === 0) {
      console.warn(`Measure '${name}' was not created successfully.`);
      return null;
    }

    const measure = measures[measures.length - 1]; // Get the most recent measure
    
    if (typeof measure.duration !== 'number' || isNaN(measure.duration)) {
      console.warn(`Invalid duration for measure '${name}': ${measure.duration}`);
      return null;
    }

    // Log in development
    if (config.isDevelopment) {
      console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
    }

    // Send to analytics in production
    if (config.isProduction) {
      try {
        analytics.trackEvent('custom_performance', {
          measureName: name,
          duration: measure.duration,
          startMark,
          endMark,
          timestamp: Date.now()
        });
      } catch (analyticsError) {
        console.error('Failed to track custom performance metric:', analyticsError);
      }
    }

    return {
      name,
      duration: measure.duration,
      startTime: measure.startTime,
      startMark,
      endMark
    };

  } catch (error) {
    console.error(`Error measuring performance for '${name}':`, error);
    
    // Try to provide some context about what went wrong
    if (error.name === 'SyntaxError') {
      console.error('Invalid mark names provided. Mark names must be strings.');
    } else if (error.name === 'InvalidAccessError') {
      console.error('Performance marks may have been cleared or are invalid.');
    }
    
    return null;
  }
}; 