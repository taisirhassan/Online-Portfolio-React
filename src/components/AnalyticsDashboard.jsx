import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analytics } from '../utils/analytics';
import { config } from '../config/environment';

const AnalyticsDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const data = analytics.getSummary();
        setSummary(data);
        setEvents(data.events.slice(-10)); // Last 10 events
      } catch (error) {
        console.error('Failed to get analytics summary:', error);
        // Set fallback data to prevent UI from breaking
        setSummary({
          sessionId: 'unknown',
          eventsCount: 0,
          timeSpent: 0
        });
        setEvents([]);
      }
    }
  }, [isOpen]);

  // Only show in development
  if (!config.isDevelopment) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="analytics-dashboard__toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Analytics Dashboard"
      >
        📊
      </motion.button>

      {/* Dashboard panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="analytics-dashboard__panel"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="analytics-dashboard__header">
              <h3 className="analytics-dashboard__title">📊 Analytics Dashboard</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="analytics-dashboard__close-btn"
                aria-label="Close Analytics Dashboard"
              >
                ✕
              </button>
            </div>

            {summary && (
              <div className="analytics-dashboard__section">
                <h4 className="analytics-dashboard__section-title">Session Summary</h4>
                <div className="analytics-dashboard__summary-card">
                  <div className="analytics-dashboard__summary-item">
                    Session ID: {summary.sessionId}
                  </div>
                  <div className="analytics-dashboard__summary-item">
                    Events Count: {summary.eventsCount}
                  </div>
                  <div className="analytics-dashboard__summary-item">
                    Time Spent: {summary.timeSpent}s
                  </div>
                </div>
              </div>
            )}

            <div className="analytics-dashboard__section">
              <h4 className="analytics-dashboard__section-title">Recent Events</h4>
              <div className="analytics-dashboard__events-container">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="analytics-dashboard__event-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="analytics-dashboard__event-name">
                      {event.event}
                    </div>
                    <div className="analytics-dashboard__event-time">
                      {new Date(event.properties.timestamp).toLocaleTimeString()}
                    </div>
                    {Object.keys(event.properties).length > 2 && (
                      <details className="analytics-dashboard__event-properties">
                        <summary>Properties</summary>
                        <pre>
                          {JSON.stringify(event.properties, null, 2)}
                        </pre>
                      </details>
                    )}
                  </motion.div>
                ))}
                
                {events.length === 0 && (
                  <div className="analytics-dashboard__event-item">
                    <div className="analytics-dashboard__event-name">
                      No events yet
                    </div>
                    <div className="analytics-dashboard__event-time">
                      Start interacting with the portfolio to see analytics data
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="analytics-dashboard__footer-note">
              💡 This dashboard only appears in development mode
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnalyticsDashboard; 