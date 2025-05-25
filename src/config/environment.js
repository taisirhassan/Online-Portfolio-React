// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

export const config = {
  isDevelopment,
  isProduction,
  isTest,
  
  // API configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 10000,
  },
  
  // Analytics configuration
  analytics: {
    enabled: isProduction,
    gaTrackingId: process.env.REACT_APP_GA_TRACKING_ID,
  },
  
  // Performance monitoring
  monitoring: {
    enabled: isProduction,
    sampleRate: isProduction ? 0.1 : 1.0, // Sample 10% in production, 100% in development
  },
  
  // Feature flags
  features: {
    matrixRain: true,
    bootSequence: true,
    darkMode: true,
    performanceMonitoring: true,
  },
  
  // Contact information
  contact: {
    email: 'taisir.hassan@uwaterloo.ca',
    phone: '647-667-3006',
  },
  
  // Social links
  social: {
    github: 'https://github.com/taisirhassan',
    linkedin: 'https://linkedin.com/in/taisir-hassan',
    portfolio: 'https://taisirhassan.netlify.app',
  },
}; 