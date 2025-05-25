// Analytics utilities for Netlify Analytics and custom tracking
import { config } from '../config/environment';

class Analytics {
  constructor() {
    this.isEnabled = config.analytics.enabled;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    
    if (this.isEnabled) {
      this.init();
    }
  }

  init() {
    // Track page load
    this.trackEvent('page_load', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    // Track scroll depth
    this.setupScrollTracking();
    
    // Track time on page
    this.setupTimeTracking();
    
    // Track clicks on important elements
    this.setupClickTracking();
  }

  generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  trackEvent(eventName, properties = {}) {
    if (!this.isEnabled) return;

    const event = {
      id: this.generateSessionId(),
      sessionId: this.sessionId,
      event: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };

    this.events.push(event);

    // Send to Netlify Analytics (if available)
    if (window.netlifyAnalytics) {
      window.netlifyAnalytics.track(eventName, properties);
    }

    // Send to Google Analytics (if available)
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Log in development
    if (config.isDevelopment) {
      console.log('📊 Analytics Event:', event);
    }

    // Send to custom endpoint in production
    if (config.isProduction) {
      this.sendToEndpoint(event);
    }
  }

  setupScrollTracking() {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90];
    const tracked = new Set();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          this.trackEvent('scroll_depth', { 
            depth: threshold,
            maxDepth: maxScroll 
          });
        }
      });
    };

    window.addEventListener('scroll', this.throttle(trackScroll, 1000));
  }

  setupTimeTracking() {
    // Track time spent on page
    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
      this.trackEvent('time_on_page', { timeSpent });
    };

    // Track every 30 seconds
    setInterval(trackTimeSpent, 30000);
    
    // Track on page unload
    window.addEventListener('beforeunload', trackTimeSpent);
  }

  setupClickTracking() {
    // Track clicks on important elements
    document.addEventListener('click', (event) => {
      const element = event.target.closest('a, button, [data-track]');
      if (!element) return;

      const trackingData = {
        element: element.tagName.toLowerCase(),
        text: element.textContent?.trim().substring(0, 50),
        href: element.href || null,
        id: element.id || null,
        className: element.className || null,
        dataset: element.dataset || {}
      };

      // Track specific types of clicks
      if (element.href && element.href.startsWith('mailto:')) {
        this.trackEvent('contact_email_click', trackingData);
      } else if (element.href && element.href.includes('github.com')) {
        this.trackEvent('github_click', trackingData);
      } else if (element.href && element.href.includes('linkedin.com')) {
        this.trackEvent('linkedin_click', trackingData);
      } else if (element.href && element.href.includes('.pdf')) {
        this.trackEvent('resume_download', trackingData);
      } else if (element.dataset.track) {
        this.trackEvent(element.dataset.track, trackingData);
      } else {
        this.trackEvent('click', trackingData);
      }
    });
  }

  // Track custom events
  trackNavigation(section) {
    this.trackEvent('navigation', { section });
  }

  trackProjectView(projectName) {
    this.trackEvent('project_view', { projectName });
  }

  trackThemeToggle(theme) {
    this.trackEvent('theme_toggle', { theme });
  }

  trackSkillsView() {
    this.trackEvent('skills_view');
  }

  trackBootSequenceComplete() {
    this.trackEvent('boot_sequence_complete', {
      loadTime: Date.now() - this.startTime
    });
  }

  trackError(error, errorInfo) {
    this.trackEvent('error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack
    });
  }

  // Utility functions
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  async sendToEndpoint(event) {
    try {
      // This would send to your analytics endpoint
      // For now, we'll just store in localStorage as a fallback
      const existingEvents = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
      existingEvents.push(event);
      
      // Keep only last 100 events to prevent storage overflow
      if (existingEvents.length > 100) {
        existingEvents.splice(0, existingEvents.length - 100);
      }
      
      localStorage.setItem('portfolio_analytics', JSON.stringify(existingEvents));
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  // Get analytics summary
  getSummary() {
    return {
      sessionId: this.sessionId,
      eventsCount: this.events.length,
      timeSpent: Math.round((Date.now() - this.startTime) / 1000),
      events: this.events
    };
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Netlify Analytics initialization
export const initNetlifyAnalytics = () => {
  if (typeof window !== 'undefined' && config.isProduction) {
    // Netlify Analytics auto-tracks page views
    // We just need to ensure it's enabled in Netlify dashboard
    
    // Optional: Add custom Netlify Analytics script if needed
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://unpkg.com/netlify-analytics@latest/netlify.js';
    script.onload = () => {
      if (window.netlifyAnalytics) {
        analytics.trackEvent('netlify_analytics_loaded');
      }
    };
    document.head.appendChild(script);
  }
};

// Export tracking functions for easy use in components
export const track = {
  navigation: (section) => analytics.trackNavigation(section),
  projectView: (project) => analytics.trackProjectView(project),
  themeToggle: (theme) => analytics.trackThemeToggle(theme),
  skillsView: () => analytics.trackSkillsView(),
  bootComplete: () => analytics.trackBootSequenceComplete(),
  error: (error, errorInfo) => analytics.trackError(error, errorInfo),
  custom: (event, properties) => analytics.trackEvent(event, properties)
}; 