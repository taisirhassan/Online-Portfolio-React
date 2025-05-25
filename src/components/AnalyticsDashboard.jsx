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
      const data = analytics.getSummary();
      setSummary(data);
      setEvents(data.events.slice(-10)); // Last 10 events
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
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}
      >
        📊
      </motion.button>

      {/* Dashboard panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="analytics-dashboard"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              width: '400px',
              maxHeight: '80vh',
              background: '#1a1a1a',
              color: '#e2e8f0',
              border: '1px solid #22c55e',
              borderRadius: '8px',
              padding: '20px',
              zIndex: 9998,
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#22c55e', margin: 0 }}>📊 Analytics Dashboard</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {summary && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#22c55e', marginBottom: '10px' }}>Session Summary</h4>
                <div style={{ background: '#262626', padding: '10px', borderRadius: '4px' }}>
                  <div>Session ID: {summary.sessionId}</div>
                  <div>Events Count: {summary.eventsCount}</div>
                  <div>Time Spent: {summary.timeSpent}s</div>
                </div>
              </div>
            )}

            <div>
              <h4 style={{ color: '#22c55e', marginBottom: '10px' }}>Recent Events</h4>
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: '#262626',
                      padding: '8px',
                      marginBottom: '8px',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}
                  >
                    <div style={{ color: '#22c55e', fontWeight: 'bold' }}>
                      {event.event}
                    </div>
                    <div style={{ opacity: 0.7 }}>
                      {new Date(event.properties.timestamp).toLocaleTimeString()}
                    </div>
                    {Object.keys(event.properties).length > 2 && (
                      <details style={{ marginTop: '4px' }}>
                        <summary style={{ cursor: 'pointer', color: '#86efac' }}>
                          Properties
                        </summary>
                        <pre style={{ margin: '4px 0', fontSize: '10px', opacity: 0.8 }}>
                          {JSON.stringify(event.properties, null, 2)}
                        </pre>
                      </details>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px', fontSize: '10px', opacity: 0.7 }}>
              💡 This dashboard only appears in development mode
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnalyticsDashboard; 